#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const errors = [];

function read(relPath) {
  const full = resolve(root, relPath);
  if (!existsSync(full)) {
    errors.push(`Missing required file: ${relPath}`);
    return "";
  }
  return readFileSync(full, "utf8");
}

function listDirs(relPath) {
  return readdirSync(resolve(root, relPath), { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("__") && !d.name.startsWith("."))
    .map((d) => d.name)
    .sort();
}

function listFiles(relPath, pattern) {
  return readdirSync(resolve(root, relPath), { withFileTypes: true })
    .filter((d) => d.isFile() && pattern.test(d.name))
    .map((d) => d.name)
    .sort();
}

function majorVersion(range) {
  const match = String(range || "").match(/(\d+)/);
  return match ? match[1] : null;
}

const agentsMd = read("AGENTS.md");
const claudeMd = read("CLAUDE.md");
const readmeMd = read("README.md");
const pkg = JSON.parse(read("package.json") || "{}");
const viteConfig = read("vite.config.ts");
const nodeVersion = read(".node-version").trim();
const miseToml = read("mise.toml");

if (claudeMd.trim() !== "@AGENTS.md") {
  errors.push('CLAUDE.md must import "@AGENTS.md" as its sole content to keep a single source of truth.');
}

for (const hookConfig of [
  ".agents/hooks.json",
  ".claude/settings.json",
  ".codex/hooks.json",
  ".cursor/hooks.json",
]) {
  const raw = read(hookConfig);
  if (!raw) continue;
  try {
    JSON.parse(raw);
  } catch (err) {
    errors.push(`${hookConfig} is not valid JSON: ${err instanceof Error ? err.message : String(err)}`);
  }
}

const scripts = pkg.scripts ?? {};
const scriptNames = Object.keys(scripts);

for (const [docName, content] of [
  ["AGENTS.md", agentsMd],
  ["README.md", readmeMd],
]) {
  for (const match of content.matchAll(/\bnpm run ([a-zA-Z0-9:_-]+)/g)) {
    const scriptName = match[1];
    if (!Object.hasOwn(scripts, scriptName)) {
      errors.push(`${docName} references unknown npm script "npm run ${scriptName}".`);
    }
  }
}

for (const scriptName of scriptNames) {
  if (scriptName === "test") {
    if (!readmeMd.includes("npm test")) {
      errors.push('README.md is missing script "npm test".');
    }
    continue;
  }
  if (!readmeMd.includes(`npm run ${scriptName}`)) {
    errors.push(`README.md is missing package.json script "npm run ${scriptName}".`);
  }
}

const pathPrefixes = [
  "src/",
  "netlify/",
  "scripts/",
  "public/",
  "e2e/",
  "netlify.toml",
  ".node-version",
  "mise.toml",
];

for (const match of agentsMd.matchAll(/`([^`\n]+)`/g)) {
  const token = match[1].trim();
  if (token.includes(" ") || token.includes("*")) continue;
  if (!pathPrefixes.some((p) => token === p || token.startsWith(p))) continue;
  const clean = token.replace(/\/$/, "");
  if (!existsSync(resolve(root, clean))) {
    errors.push(`AGENTS.md references non-existent path "${token}".`);
  }
}

for (const dir of listDirs("src")) {
  if (!agentsMd.includes(`${dir}/`)) {
    errors.push(`AGENTS.md is missing src/ subdirectory "${dir}/".`);
  }
}

for (const dir of listDirs("src/components")) {
  if (!agentsMd.includes(`${dir}/`)) {
    errors.push(`AGENTS.md is missing src/components/ subdirectory "${dir}/".`);
  }
}

for (const storeFile of listFiles("src/stores", /^use.*\.ts$/)) {
  const storeName = storeFile.replace(/\.ts$/, "");
  if (!agentsMd.includes(`\`${storeName}\``)) {
    errors.push(`AGENTS.md is missing Zustand store "${storeName}".`);
  }
}

for (const fnFile of listFiles("netlify/functions", /\.ts$/)) {
  if (!agentsMd.includes(fnFile)) {
    errors.push(`AGENTS.md is missing Netlify function "${fnFile}".`);
  }
}

for (const edgeFile of listFiles("netlify/edge-functions", /\.ts$/)) {
  if (!agentsMd.includes(edgeFile)) {
    errors.push(`AGENTS.md is missing Netlify edge function "${edgeFile}".`);
  }
}

for (const scriptFile of listFiles("scripts", /\.(mjs|js)$/)) {
  if (!agentsMd.includes(scriptFile)) {
    errors.push(`AGENTS.md is missing script "${scriptFile}".`);
  }
}

const portMatch = viteConfig.match(/port:\s*(\d+)/);
if (portMatch) {
  const port = portMatch[1];
  for (const [docName, content] of [
    ["AGENTS.md", agentsMd],
    ["README.md", readmeMd],
  ]) {
    if (!content.includes(`localhost:${port}`)) {
      errors.push(`${docName} does not reference Vite dev port "localhost:${port}".`);
    }
  }
}

const enginesNode = pkg.engines?.node;
if (enginesNode) {
  for (const [docName, content] of [
    ["AGENTS.md", agentsMd],
    ["README.md", readmeMd],
  ]) {
    if (!content.includes(enginesNode)) {
      errors.push(`${docName} does not mention package.json engines.node "${enginesNode}".`);
    }
  }
}

const miseNodeMatch = miseToml.match(/node\s*=\s*"([^"]+)"/);
if (miseNodeMatch && miseNodeMatch[1] !== nodeVersion) {
  errors.push(`.node-version (${nodeVersion}) and mise.toml (${miseNodeMatch[1]}) disagree on Node version.`);
}

if (pkg.homepage) {
  for (const [docName, content] of [
    ["AGENTS.md", agentsMd],
    ["README.md", readmeMd],
  ]) {
    if (!content.includes(pkg.homepage)) {
      errors.push(`${docName} does not reference package.json homepage "${pkg.homepage}".`);
    }
  }
}

const allDeps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
const versionChecks = [
  ["react", /React(?:\*\*)?:?\s*v?(\d+)/],
  ["typescript", /TypeScript(?:\*\*)?:?\s*v?(\d+)/],
  ["vite", /Vite(?:\]\([^)]+\))?(?:\*\*)?\s*v?(\d+)/],
  ["vitest", /Vitest(?:\]\([^)]+\))?(?:\*\*)?\s*v?(\d+)/],
  ["zustand", /Zustand(?:\*\*)?:?\s*v?(\d+)/],
  ["@chakra-ui/react", /Chakra UI(?:\*\*)?:?\s*v?(\d+)/],
  ["react-leaflet", /React Leaflet(?:\*\*)?:?\s*v?(\d+)/],
  ["lucide-react", /Lucide React(?:\*\*)?:?\s*v?(\d+)/],
  ["@biomejs/biome", /Biome(?:\]\([^)]+\))?(?:\*\*)?\s*v?(\d+)/],
  ["fast-check", /fast-check(?:\]\([^)]+\))?(?:\*\*)?\s*v?(\d+)/],
];

for (const [depName, regex] of versionChecks) {
  const expected = majorVersion(allDeps[depName]);
  if (!expected) continue;
  for (const [docName, content] of [
    ["AGENTS.md", agentsMd],
    ["README.md", readmeMd],
  ]) {
    const match = content.match(regex);
    if (!match) {
      errors.push(`${docName} is missing major version mention for "${depName}" (expected v${expected}).`);
    } else if (match[1] !== expected) {
      errors.push(`${docName} mentions "${depName}" v${match[1]}, but package.json has v${expected}.`);
    }
  }
}

if (errors.length > 0) {
  console.error("Documentation sync check failed:");
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log("Documentation sync check passed (AGENTS.md, CLAUDE.md, README.md).");
