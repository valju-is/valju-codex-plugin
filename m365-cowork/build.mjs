import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = dirname(fileURLToPath(import.meta.url));
const root = dirname(source);

function legalUrl(value, field) {
  if (!value) throw new Error(`${field} is required`);
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.hostname !== 'valju.is' || !url.pathname.startsWith('/mcp/')) {
    throw new Error(`${field} must be a public https://valju.is/mcp/ URL`);
  }
  return url.href;
}

const manifest = JSON.parse(readFileSync(join(source, 'manifest.json'), 'utf8'));
const privacyUrl = legalUrl(manifest.developer.privacyUrl, 'developer.privacyUrl');
const termsUrl = legalUrl(manifest.developer.termsOfUseUrl, 'developer.termsOfUseUrl');
if (privacyUrl === termsUrl) throw new Error('Privacy and terms must be separate pages');
if (manifest.manifestVersion !== '1.28' || !manifest.agentConnectors?.[0]?.toolSource?.remoteMcpServer?.mcpToolDescription?.file) {
  throw new Error('Expected Microsoft 365 v1.28 manifest with a remote MCP tool description');
}
if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) throw new Error('Expected a numeric app version');
const toolFile = manifest.agentConnectors[0].toolSource.remoteMcpServer.mcpToolDescription.file;
if (toolFile !== 'tools/valju.json' || !existsSync(join(source, toolFile))) {
  throw new Error('The MCP tool description must use the exact ZIP entry path tools/valju.json');
}
const skillFolder = manifest.agentSkills?.[0]?.folder;
if (skillFolder !== 'skills/valju' || !existsSync(join(source, skillFolder, 'SKILL.md'))) {
  throw new Error('The Valjú skill must use the exact ZIP directory path skills/valju');
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
  const output = resolve(root, `dist/valju-m365-cowork-${manifest.version}.zip`);
  mkdirSync(dirname(output), { recursive: true });
  if (existsSync(output)) throw new Error(`Package already exists: ${output}. Bump the version before rebuilding.`);
  execFileSync('zip', ['-q', '-r', output, 'manifest.json', 'color.png', 'outline.png', 'skills', 'tools'], { cwd: staging });
  const zipEntries = execFileSync('unzip', ['-Z1', output], { encoding: 'utf8' }).trim().split(/\r?\n/);
  if (!zipEntries.includes(toolFile)) throw new Error(`MCP tool description not found at exact ZIP path: ${toolFile}`);
  if (!zipEntries.includes(`${skillFolder}/SKILL.md`)) throw new Error(`Valjú skill not found at exact ZIP path: ${skillFolder}/SKILL.md`);
  console.log(output);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
