import { execFileSync } from "node:child_process";

export function getChangedLinesSince(ref, cwd) {
  const output = execFileSync("git", ["diff", "-U0", "--no-color", ref], {
    cwd,
    encoding: "utf-8",
    maxBuffer: 10 * 1024 * 1024,
  });

  const changedByFile = new Map();
  let currentFile = null;

  for (const line of output.split("\n")) {
    if (line.startsWith("+++ b/")) {
      currentFile = line.slice(6).trim();
      if (!changedByFile.has(currentFile)) {
        changedByFile.set(currentFile, new Set());
      }
    } else if (line.startsWith("@@ ") && currentFile) {
      const match = line.match(/\+(\d+)(?:,(\d+))?/);
      if (match) {
        const start = Number.parseInt(match[1], 10);
        const count = match[2] === undefined ? 1 : Number.parseInt(match[2], 10);
        const lineSet = changedByFile.get(currentFile);
        for (let l = start; l < start + Math.max(count, 1); l++) {
          lineSet.add(l);
        }
      }
    }
  }

  return changedByFile;
}
