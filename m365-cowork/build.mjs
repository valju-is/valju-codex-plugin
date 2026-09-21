import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = dirname(fileURLToPath(import.meta.url));
const root = dirname(source);
const options = Object.fromEntries(process.argv.slice(2).reduce((pairs, arg, index, args) => {
  if (arg.startsWith('--') && index + 1 < args.length) pairs.push([arg, args[index + 1]]);
  return pairs;
}, []));

function legalUrl(value, flag) {
  if (!value) throw new Error(`${flag} is required`);
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.hostname !== 'valju.is') {
    throw new Error(`${flag} must be a public https://valju.is URL`);
  }
  return url.href;
}

const privacyUrl = legalUrl(options['--privacy-url'], '--privacy-url');
const termsUrl = legalUrl(options['--terms-url'], '--terms-url');
if (privacyUrl === termsUrl) throw new Error('Privacy and terms must be separate pages');

const manifest = JSON.parse(readFileSync(join(source, 'manifest.template.json'), 'utf8'));
manifest.developer.privacyUrl = privacyUrl;
manifest.developer.termsOfUseUrl = termsUrl;
if (manifest.manifestVersion !== '1.28' || !manifest.agentConnectors?.[0]?.toolSource?.remoteMcpServer?.mcpToolDescription?.file) {
  throw new Error('Expected Microsoft 365 v1.28 manifest with a remote MCP tool description');
}

const tools = JSON.parse(readFileSync(join(source, 'tools/valju.json'), 'utf8')).tools;
if (tools.length !== 9 || !tools.every(tool => tool.name && tool.description && tool.inputSchema)) {
  throw new Error('Valjú MCP tool description is incomplete');
}

const staging = mkdtempSync(join(tmpdir(), 'valju-m365-'));
try {
  writeFileSync(join(staging, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  for (const icon of ['color.png', 'outline.png']) {
    if (!existsSync(join(source, icon))) throw new Error(`Missing ${icon}`);
    cpSync(join(source, icon), join(staging, icon));
  }
  cpSync(join(source, 'skills'), join(staging, 'skills'), { recursive: true });
  cpSync(join(source, 'tools'), join(staging, 'tools'), { recursive: true });
  const output = resolve(root, 'dist/valju-m365-cowork-0.1.0.zip');
  mkdirSync(dirname(output), { recursive: true });
  if (existsSync(output)) throw new Error(`Package already exists: ${output}. Bump the version before rebuilding.`);
  execFileSync('zip', ['-q', '-r', output, 'manifest.json', 'color.png', 'outline.png', 'skills', 'tools'], { cwd: staging });
  console.log(output);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
