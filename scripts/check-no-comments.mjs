#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseSync } from "oxc-parser";

const root = process.cwd();
const files = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean);

function isAllowedJsComment(raw) {
  if (raw.startsWith("#!")) return true;
  if (/^\/\/\/\s*<reference\b/.test(raw)) return true;
  if (/^\/\*\s*@vite-ignore\s*\*\/$/.test(raw)) return true;
  if (/\b(SPDX-License-Identifier|Copyright|MIT License|License:|@license)\b/i.test(raw)) {
    return true;
  }
  return false;
}

function lineNumberAt(source, index) {
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (source.charCodeAt(i) === 10) line++;
  }
  return line;
}

const violations = [];

for (const file of files.filter((f) => /\.(ts|tsx|js|mjs|cjs)$/.test(f))) {
  const full = resolve(root, file);
  let code;
  try {
    code = readFileSync(full, "utf8");
  } catch {
    continue;
  }
  const parsed = parseSync(file, code);
  for (const c of parsed.comments || []) {
    const raw = code.slice(c.start, c.end);
    if (!isAllowedJsComment(raw)) {
      const line = lineNumberAt(code, c.start);
      const preview = raw.replace(/\s+/g, " ").slice(0, 80);
      violations.push(`${file}:${line}: ${preview}`);
    }
  }
}

for (const file of files.filter((f) => f.endsWith(".css"))) {
  const full = resolve(root, file);
  let code;
  try {
    code = readFileSync(full, "utf8");
  } catch {
    continue;
  }
  for (const match of code.matchAll(/\/\*[\s\S]*?\*\//g)) {
    const raw = match[0];
    if (/\b(SPDX-License-Identifier|Copyright|MIT License|License:)\b/i.test(raw)) continue;
    const line = lineNumberAt(code, match.index ?? 0);
    const preview = raw.replace(/\s+/g, " ").slice(0, 80);
    violations.push(`${file}:${line}: ${preview}`);
  }
}

if (violations.length > 0) {
  console.error("Code comment check failed (only license headers and required directives are allowed):");
  for (const v of violations) {
    console.error(`  - ${v}`);
  }
  process.exit(1);
}

console.log("Code comment check passed.");
