import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, expect, inject } from "vitest";

const activeId = inject("mutatorActive") ?? -1;
const covDir = inject("mutatorCovDir") ?? "";

const hits = new Set();

globalThis.__MUTATOR__ = {
  a: activeId,
  c(...ids) {
    if (activeId === -1) {
      for (const id of ids) {
        hits.add(id);
      }
    }
  },
};

if (activeId === -1 && covDir) {
  afterAll(() => {
    const testPath = expect.getState().testPath;
    if (!testPath || hits.size === 0) return;
    mkdirSync(covDir, { recursive: true });
    const fileHash = createHash("sha256").update(testPath).digest("hex").slice(0, 12);
    writeFileSync(
      join(covDir, `${fileHash}.json`),
      JSON.stringify({ testPath, hits: [...hits] }),
      "utf-8",
    );
  });
}
