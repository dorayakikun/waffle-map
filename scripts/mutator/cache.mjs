import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const CACHE_VERSION = 1;

export function hashFiles(filePaths) {
  const hash = createHash("sha256");
  for (const p of [...filePaths].sort()) {
    hash.update(p);
    hash.update("\0");
    if (existsSync(p)) {
      hash.update(readFileSync(p));
    }
    hash.update("\0");
  }
  return hash.digest("hex").slice(0, 16);
}

export function getCachePath(cwd) {
  return join(cwd, ".mutator", "cache.json");
}

export function loadCache(cwd) {
  const path = getCachePath(cwd);
  if (!existsSync(path)) {
    return { version: CACHE_VERSION, entries: {} };
  }
  try {
    const parsed = JSON.parse(readFileSync(path, "utf-8"));
    if (parsed?.version === CACHE_VERSION && parsed.entries) {
      return parsed;
    }
  } catch {
  }
  return { version: CACHE_VERSION, entries: {} };
}

export function saveCache(cwd, cache) {
  const path = getCachePath(cwd);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(cache, null, 2), "utf-8");
}

export function makeCacheKey(mutant, coveringTestsHash) {
  return `${mutant.identity}::${coveringTestsHash}`;
}
