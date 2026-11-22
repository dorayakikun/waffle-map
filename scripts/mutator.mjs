#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { createVitest } from "vitest/node";
import { hashFiles, loadCache, makeCacheKey, saveCache } from "./mutator/cache.mjs";
import { getChangedLinesSince } from "./mutator/diff.mjs";
import { instrumentFile } from "./mutator/instrument.mjs";

const DEFAULT_TARGETS = [
  "src/domain/convertLatLng.ts",
  "src/domain/roundPoint.ts",
  "src/utils/meshcodeUrl.ts",
  "src/errors/messages.ts",
  "src/types/result.ts",
  "src/og/meta.ts",
  "src/hooks/useUrlSync.ts",
  "src/stores/useColorModeStore.ts",
  "src/stores/useCoordPopupStore.ts",
  "src/stores/useGeodeticInputStore.ts",
  "src/stores/useMarkerInputStore.ts",
  "src/stores/useMeshcodesInputStore.ts",
  "src/stores/useMeshToggleStore.ts",
  "src/stores/useTileToggleStore.ts",
];

function parseArgs(argv) {
  const opts = {
    since: null,
    noCache: false,
    minScore: 95,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--since" && argv[i + 1]) {
      opts.since = argv[++i];
    } else if (arg === "--no-cache") {
      opts.noCache = true;
    } else if (arg === "--min-score" && argv[i + 1]) {
      opts.minScore = Number.parseFloat(argv[++i]);
    }
  }
  return opts;
}

function normalizePath(p) {
  return p.replace(/\\/g, "/");
}

async function main() {
  const startedAt = performance.now();
  const cwd = process.cwd();
  const opts = parseArgs(process.argv.slice(2));

  const instrumentedMap = new Map();
  const allMutants = [];
  let nextId = 1;

  for (const rel of DEFAULT_TARGETS) {
    const abs = resolve(cwd, rel);
    if (!existsSync(abs)) continue;
    const raw = readFileSync(abs, "utf-8");
    const result = instrumentFile(rel, raw, nextId);
    nextId = result.nextId;
    instrumentedMap.set(normalizePath(abs), result.code);
    allMutants.push(...result.mutants);
  }

  let selectedMutants = allMutants;
  if (opts.since) {
    const changedLines = getChangedLinesSince(opts.since, cwd);
    selectedMutants = allMutants.filter((m) => changedLines.get(m.file)?.has(m.line));
    console.log(
      `[mutator] Diff mode (--since ${opts.since}): ${selectedMutants.length}/${allMutants.length} mutants in diff.`,
    );
    if (selectedMutants.length === 0) {
      console.log("[mutator] No mutants touched by diff. Done.");
      return;
    }
  } else {
    console.log(
      `[mutator] Instrumented ${instrumentedMap.size} files (${allMutants.length} mutants, in-memory oxc).`,
    );
  }

  const mutatorPlugin = {
    name: "waffle-mutator-instrument",
    enforce: "pre",
    transform(_code, id) {
      const cleanId = normalizePath(id.split("?")[0]);
      const instrumented = instrumentedMap.get(cleanId);
      if (instrumented !== undefined) {
        return { code: instrumented, map: null };
      }
      return null;
    },
  };

  const covDir = join(cwd, ".mutator", "dry-run-cov");
  rmSync(covDir, { recursive: true, force: true });
  mkdirSync(covDir, { recursive: true });

  const setupFile = resolve(cwd, "scripts/mutator/setup.mjs");

  const vitest = await createVitest(
    "test",
    {
      watch: false,
      silent: true,
      reporters: [],
      bail: 1,
      setupFiles: [setupFile],
    },
    {
      plugins: [mutatorPlugin],
    },
  );

  try {
    const project = vitest.getRootProject();
    const allSpecs = await vitest.globTestSpecifications();

    project.provide("mutatorActive", -1);
    project.provide("mutatorCovDir", covDir);

    const dryStart = performance.now();
    const dryResult = await vitest.runTestSpecifications(allSpecs);
    const baselineFailed = dryResult.testModules.filter((m) => !m.ok());
    if (baselineFailed.length > 0) {
      console.error(
        `[mutator] Baseline tests failed (${baselineFailed.map((m) => relative(cwd, m.moduleId)).join(", ")}). Aborting.`,
      );
      process.exitCode = 1;
      return;
    }
    const dryMs = Math.round(performance.now() - dryStart);

    const mutantToTests = new Map();
    for (const file of readdirSync(covDir)) {
      if (!file.endsWith(".json")) continue;
      const { testPath, hits } = JSON.parse(readFileSync(join(covDir, file), "utf-8"));
      const normTest = normalizePath(testPath);
      for (const id of hits) {
        let set = mutantToTests.get(id);
        if (!set) {
          set = new Set();
          mutantToTests.set(id, set);
        }
        set.add(normTest);
      }
    }
    rmSync(covDir, { recursive: true, force: true });

    const specByPath = new Map();
    for (const spec of allSpecs) {
      specByPath.set(normalizePath(spec.moduleId), spec);
    }

    const cache = opts.noCache ? { version: 1, entries: {} } : loadCache(cwd);
    const testHashMemo = new Map();
    const results = new Map();
    let cacheHits = 0;
    let executed = 0;

    project.provide("mutatorCovDir", "");

    for (const mutant of selectedMutants) {
      const testPaths = [...(mutantToTests.get(mutant.id) ?? [])].sort((a, b) => {
        const aProp = a.includes(".property.") ? 1 : 0;
        const bProp = b.includes(".property.") ? 1 : 0;
        return aProp - bProp || a.localeCompare(b);
      });

      if (testPaths.length === 0) {
        results.set(mutant.id, { status: "NoCoverage", cached: false });
        continue;
      }

      const testKey = testPaths.join("|");
      let coveringHash = testHashMemo.get(testKey);
      if (!coveringHash) {
        coveringHash = hashFiles(testPaths);
        testHashMemo.set(testKey, coveringHash);
      }

      const cacheKey = makeCacheKey(mutant, coveringHash);
      if (!opts.noCache && cache.entries[cacheKey]) {
        results.set(mutant.id, { status: cache.entries[cacheKey].status, cached: true });
        cacheHits++;
        continue;
      }

      project.provide("mutatorActive", mutant.id);
      let status = "Survived";
      for (const testPath of testPaths) {
        const spec = specByPath.get(testPath);
        if (!spec) continue;
        const runRes = await vitest.runTestSpecifications([spec]);
        if (runRes.testModules.some((m) => !m.ok())) {
          status = "Killed";
          break;
        }
      }

      executed++;
      cache.entries[cacheKey] = { status };
      results.set(mutant.id, { status, cached: false });
    }

    saveCache(cwd, cache);

    const byFile = new Map();
    const survivors = [];
    const noCov = [];

    for (const m of selectedMutants) {
      const r = results.get(m.id);
      let stats = byFile.get(m.file);
      if (!stats) {
        stats = { killed: 0, survived: 0, noCoverage: 0 };
        byFile.set(m.file, stats);
      }
      if (r.status === "Killed") stats.killed++;
      else if (r.status === "Survived") {
        stats.survived++;
        survivors.push(m);
      } else {
        stats.noCoverage++;
        noCov.push(m);
      }
    }

    console.log(
      `\n[mutator] Dry run: ${dryMs}ms | Executed: ${executed} | Reused from cache: ${cacheHits}`,
    );
    console.log("------------------------------------------------------------------------");
    console.log("File                                 |  Score | Killed | Surv | NoCov");
    console.log("------------------------------------------------------------------------");

    let totalKilled = 0;
    let totalSurvived = 0;
    let totalNoCov = 0;

    for (const [file, s] of byFile.entries()) {
      const total = s.killed + s.survived + s.noCoverage;
      const score = total === 0 ? 100 : (s.killed / total) * 100;
      totalKilled += s.killed;
      totalSurvived += s.survived;
      totalNoCov += s.noCoverage;
      console.log(
        `${file.padEnd(36)} | ${score.toFixed(1).padStart(5)}% | ${String(s.killed).padStart(6)} | ${String(s.survived).padStart(4)} | ${String(s.noCoverage).padStart(5)}`,
      );
    }

    const grandTotal = totalKilled + totalSurvived + totalNoCov;
    const grandScore = grandTotal === 0 ? 100 : (totalKilled / grandTotal) * 100;
    const elapsedSec = ((performance.now() - startedAt) / 1000).toFixed(2);

    console.log("------------------------------------------------------------------------");
    console.log(
      `${"All files".padEnd(36)} | ${grandScore.toFixed(1).padStart(5)}% | ${String(totalKilled).padStart(6)} | ${String(totalSurvived).padStart(4)} | ${String(totalNoCov).padStart(5)}`,
    );
    console.log("------------------------------------------------------------------------");

    if (survivors.length > 0) {
      console.log(`\nSurvived mutants (${survivors.length}):`);
      for (const m of survivors) {
        console.log(
          `  - ${m.file}:${m.line}:${m.column} [${m.mutator}] ${m.original} -> ${m.replacement}`,
        );
      }
    }
    if (noCov.length > 0) {
      console.log(`\nNoCoverage mutants (${noCov.length}):`);
      for (const m of noCov) {
        console.log(`  - ${m.file}:${m.line}:${m.column} [${m.mutator}] ${m.original}`);
      }
    }

    console.log(`\n[mutator] Score: ${grandScore.toFixed(2)}% (min: ${opts.minScore}%) in ${elapsedSec}s`);

    if (grandScore < opts.minScore) {
      console.error(`[mutator] FAILED: score ${grandScore.toFixed(2)}% < ${opts.minScore}%`);
      process.exitCode = 1;
    } else {
      process.exitCode = 0;
    }
  } finally {
    await vitest.close();
  }
}

main().catch((err) => {
  console.error("[mutator] Fatal error:", err);
  process.exitCode = 1;
});
