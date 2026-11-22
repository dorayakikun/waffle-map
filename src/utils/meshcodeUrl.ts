import type { Separator } from "../types";

export function parseMeshcodesFromUrl(pathname: string): {
  meshcodes: string[];
  separator: Separator;
} {
  const match = pathname.match(/^\/([^/]+)\/?$/);
  if (!match) {
    return { meshcodes: [], separator: "." };
  }

  const meshcodesString = match[1];

  const separator = meshcodesString.includes(",") ? "," : ".";

  const meshcodes = meshcodesString
    .split(separator)
    .map((code) => code.trim())
    .filter((code) => code !== "");

  return { meshcodes, separator };
}

export function generateMeshcodesUrl(meshcodes: string[], separator: Separator): string {
  if (meshcodes.length === 0) {
    return "/";
  }
  return `/${meshcodes.join(separator)}/`;
}
