#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const formatArg = process.argv.find((arg) => arg.startsWith("--format="));
const format = formatArg ? formatArg.slice("--format=".length) : "agy";

let input = {};
try {
  const stdin = readFileSync(0, "utf8").trim();
  if (stdin) {
    input = JSON.parse(stdin);
  }
} catch {
  input = {};
}

function allowStop() {
  process.stdout.write("{}\n");
  process.exit(0);
}

if (format === "agy") {
  if (input.continuationActive === true) allowStop();
  if (input.terminationReason && input.terminationReason !== "NO_TOOL_CALL") allowStop();
} else if (format === "claude" || format === "codex") {
  if (input.stop_hook_active === true) allowStop();
} else if (format === "cursor") {
  if (typeof input.loop_count === "number" && input.loop_count >= 1) allowStop();
  if (input.status === "aborted" || input.status === "error") allowStop();
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const fallbackRoot = resolve(scriptDir, "..");
const repoRoot =
  typeof input.cwd === "string" && existsSync(join(input.cwd, "package.json"))
    ? input.cwd
    : fallbackRoot;

const checks = [
  ["check:docs", join(repoRoot, "scripts", "check-docs-sync.mjs")],
  ["check:comments", join(repoRoot, "scripts", "check-no-comments.mjs")],
];

const failures = [];
for (const [label, scriptPath] of checks) {
  if (!existsSync(scriptPath)) continue;
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    const detail = `${result.stderr || ""}${result.stdout || ""}`.trim();
    failures.push(`[npm run ${label}]\n${detail}`);
  }
}

if (failures.length === 0) {
  allowStop();
}

const reason = [
  "Automated workspace checks failed. Fix the issues below and verify with `npm run check:docs && npm run check:comments` before finishing:",
  "",
  ...failures,
].join("\n");

if (format === "agy") {
  process.stdout.write(`${JSON.stringify({ decision: "continue", reason })}\n`);
} else if (format === "claude" || format === "codex") {
  process.stdout.write(`${JSON.stringify({ decision: "block", reason })}\n`);
} else if (format === "cursor") {
  process.stdout.write(`${JSON.stringify({ followup_message: reason })}\n`);
} else {
  process.stdout.write(`${JSON.stringify({ decision: "block", reason })}\n`);
}
