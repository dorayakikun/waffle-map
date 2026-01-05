import type { Separator } from "../types";

/**
 * Parse meshcodes from URL pathname.
 * Supports both comma and dot separators.
 * Examples:
 *   - /5339-35-97,5339-35-98/ -> meshcodes: ["5339-35-97", "5339-35-98"], separator: ","
 *   - /5339-35-97.5339-35-98/ -> meshcodes: ["5339-35-97", "5339-35-98"], separator: "."
 */
export function parseMeshcodesFromUrl(pathname: string): {
  meshcodes: string[];
  separator: Separator;
} {
  // Remove leading/trailing slashes and get the path segment
  const match = pathname.match(/^\/([^/]+)\/?$/);
  if (!match) {
    return { meshcodes: [], separator: "." };
  }

  const meshcodesString = match[1];

  // Determine separator: comma takes precedence if present
  const separator = meshcodesString.includes(",") ? "," : ".";

  const meshcodes = meshcodesString
    .split(separator)
    .map((code) => code.trim())
    .filter((code) => code !== "");

  return { meshcodes, separator };
}

/**
 * Generate URL pathname from meshcodes.
 */
export function generateMeshcodesUrl(
  meshcodes: string[],
  separator: Separator,
): string {
  if (meshcodes.length === 0) {
    return "/";
  }
  return `/${meshcodes.join(separator)}/`;
}
