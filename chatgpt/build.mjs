import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = dirname(fileURLToPath(import.meta.url));
const root = dirname(source);

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function requireHttpsUrl(value, field, expectedHost) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || (expectedHost && url.hostname !== expectedHost)) {
    throw new Error(`${field} must use HTTPS${expectedHost ? ` on ${expectedHost}` : ''}`);
  }
  return url;
}

const pluginPath = join(source, 'plugin.json');
const mcpPath = join(source, 'mcp.json');
const appPath = join(source, '.app.json');
const skillPath = join(source, 'skills/valju/SKILL.md');
const assetPath = join(source, 'assets/valju-mark.png');
const readmePath = join(source, 'README.md');

for (const path of [pluginPath, mcpPath, appPath, skillPath, assetPath, readmePath]) {
  if (!existsSync(path)) throw new Error(`Missing package file: ${path}`);
}

const plugin = readJson(pluginPath);
if (plugin.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json') {
  throw new Error('plugin.json must use the Agent Plugins 1.0 schema');
}
if (plugin.name !== 'valju' || !/^\d+\.\d+\.\d+$/.test(plugin.version)) {
  throw new Error('Expected plugin name valju and a semantic version');
}
const openaiInterface = plugin.extensions?.['com.openai']?.interface;
if (!openaiInterface || openaiInterface.displayName !== 'Valjú') {
  throw new Error('Missing OpenAI interface metadata');
}

if (plugin.extensions?.['com.openai']?.apps !== './.app.json') {
  throw new Error('OpenAI app mapping must reference ./.app.json');
}
const app = readJson(appPath);
const registeredApp = app.apps?.valju;
if (registeredApp?.id !== 'asdk_app_6ab394f5691081918b65ce2780df4375' || registeredApp.required !== true) {
  throw new Error('Expected the required registered Valjú ChatGPT app mapping');
}
if (!/^(?:asdk_app|connector|templated_apps)_[A-Za-z0-9_-]+$/.test(registeredApp.id)) {
  throw new Error('Registered ChatGPT app ID has an unsupported format');
}
requireHttpsUrl(openaiInterface.privacyPolicyURL, 'privacyPolicyURL', 'valju.is');
requireHttpsUrl(openaiInterface.termsOfServiceURL, 'termsOfServiceURL', 'valju.is');
for (const field of ['composerIcon', 'logo']) {
  if (openaiInterface[field] !== './assets/valju-mark.png') {
    throw new Error(`${field} must reference the packaged Valjú mark`);
  }
}

const mcp = readJson(mcpPath);
if (mcp.$schema !== 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json') {
  throw new Error('mcp.json must use the Agent Plugins 1.0 schema');
}
const server = mcp.mcpServers?.valju;
if (server?.type !== 'streamable-http' || server.url !== 'https://api.valju.is/mcp') {
  throw new Error('Expected the hosted Valjú streamable HTTP MCP server');
}
requireHttpsUrl(server.url, 'mcpServers.valju.url', 'api.valju.is');

const skill = readFileSync(skillPath, 'utf8');
if (!skill.startsWith('---\nname: valju\n') || !skill.includes('https://api.valju.is/mcp')) {
  throw new Error('The Valjú skill metadata or MCP connection instructions are incomplete');
}

const staging = mkdtempSync(join(tmpdir(), 'valju-chatgpt-'));
try {
  writeFileSync(join(staging, 'plugin.json'), `${JSON.stringify(plugin, null, 2)}\n`);
  writeFileSync(join(staging, 'mcp.json'), `${JSON.stringify(mcp, null, 2)}\n`);
  writeFileSync(join(staging, '.app.json'), `${JSON.stringify(app, null, 2)}\n`);
  cpSync(join(source, 'skills'), join(staging, 'skills'), { recursive: true });
  cpSync(join(source, 'assets'), join(staging, 'assets'), { recursive: true });
  cpSync(readmePath, join(staging, 'README.md'));

  const output = resolve(root, `dist/valju-chatgpt-plugin-${plugin.version}.zip`);
  mkdirSync(dirname(output), { recursive: true });
  if (existsSync(output)) {
    throw new Error(`Package already exists: ${output}. Bump the version before rebuilding.`);
  }

  execFileSync('zip', ['-q', '-r', output, 'plugin.json', 'mcp.json', '.app.json', 'skills', 'assets', 'README.md'], { cwd: staging });
  const entries = execFileSync('unzip', ['-Z1', output], { encoding: 'utf8' }).trim().split(/\r?\n/);
  for (const required of ['plugin.json', 'mcp.json', '.app.json', 'skills/valju/SKILL.md', 'assets/valju-mark.png', 'README.md']) {
    if (!entries.includes(required)) throw new Error(`ZIP is missing required entry: ${required}`);
  }
  if (entries.some(entry => entry.startsWith('chatgpt/'))) {
    throw new Error('Package files must be at the ZIP root, not inside a chatgpt directory');
  }

  console.log(output);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
