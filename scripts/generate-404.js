#!/usr/bin/env node

/**
 * Generate 404.html from template with configurable repo name.
 *
 * Usage:
 *   node scripts/generate-404.js [output-dir]
 *
 * Environment variables:
 *   REPO_NAME - Repository name for GitHub Pages (e.g., "waffle-map")
 *               If not set, defaults to empty string (root deployment)
 *
 * Examples:
 *   # For GitHub Pages with repo name
 *   REPO_NAME=waffle-map node scripts/generate-404.js dist
 *
 *   # For root deployment (e.g., custom domain)
 *   node scripts/generate-404.js dist
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Get repo name from environment variable, default to empty string
const repoName = process.env.REPO_NAME || "";

// Get output directory from command line argument, default to "dist"
const outputDir = process.argv[2] || "dist";
const outputPath = join(projectRoot, outputDir, "404.html");

// Read template
const templatePath = join(projectRoot, "public", "404.html.template");
if (!existsSync(templatePath)) {
  console.error(`Error: Template file not found: ${templatePath}`);
  process.exit(1);
}

const template = readFileSync(templatePath, "utf-8");

// Replace placeholder
const output = template.replace(/\{\{REPO_NAME\}\}/g, repoName);

// Ensure output directory exists
const outputDirPath = dirname(outputPath);
if (!existsSync(outputDirPath)) {
  mkdirSync(outputDirPath, { recursive: true });
}

// Write output
writeFileSync(outputPath, output, "utf-8");

console.log(`Generated ${outputPath} with REPO_NAME="${repoName}"`);
