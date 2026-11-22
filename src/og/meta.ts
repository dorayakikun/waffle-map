import { parseMeshcodesFromUrl } from "../utils/meshcodeUrl.ts";

export type OgMeta = {
  title: string;
  description: string;
  ogUrl: string;
  ogImage: string;
  twitterCard: "summary_large_image";
};

const MESH_SEGMENT_PATTERN = /^[0-9A-Za-z._,-]+$/;

const STATIC_EXT_PATTERN =
  /\.(js|mjs|css|png|jpg|jpeg|gif|svg|ico|json|xml|txt|webp|woff2?|ttf|map)$/i;

export function isStaticAssetPath(pathname: string): boolean {
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/images/")
  ) {
    return true;
  }
  return STATIC_EXT_PATTERN.test(pathname);
}

export function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildOgMeta(pathname: string, origin: string): OgMeta {
  const cleanOrigin = origin.replace(/\/$/, "");
  const { meshcodes, separator } = parseMeshcodesFromUrl(pathname);

  const validSegment =
    meshcodes.length > 0 && meshcodes.every((code) => MESH_SEGMENT_PATTERN.test(code));

  if (!validSegment) {
    return {
      title: "Waffle Map",
      description: "Fantastic mesh renderer for Japanese mesh codes",
      ogUrl: `${cleanOrigin}/`,
      ogImage: `${cleanOrigin}/api/og`,
      twitterCard: "summary_large_image",
    };
  }

  const joinedDisplay =
    meshcodes.length <= 3
      ? meshcodes.join(", ")
      : `${meshcodes.slice(0, 3).join(", ")} +${meshcodes.length - 3}`;
  const rawCodes = meshcodes.join(separator);

  return {
    title: `${joinedDisplay} · Waffle Map`,
    description: `Japanese mesh code map for ${joinedDisplay} (${meshcodes.length} ${meshcodes.length === 1 ? "mesh" : "meshes"})`,
    ogUrl: `${cleanOrigin}/${rawCodes}/`,
    ogImage: `${cleanOrigin}/api/og?codes=${encodeURIComponent(rawCodes)}`,
    twitterCard: "summary_large_image",
  };
}

function replaceOrInsertMeta(
  html: string,
  attr: "property" | "name",
  key: string,
  content: string,
): string {
  const escaped = escapeHtmlAttr(content);
  const pattern = new RegExp(`<meta\\s+[^>]*${attr}=["']${key}["'][^>]*\\/?>`, "i");
  const tag = `<meta ${attr}="${key}" content="${escaped}" />`;
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

export function injectOgMeta(html: string, meta: OgMeta): string {
  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtmlAttr(meta.title)}</title>`);
  out = replaceOrInsertMeta(out, "name", "Description", meta.description);
  out = replaceOrInsertMeta(out, "property", "og:title", meta.title);
  out = replaceOrInsertMeta(out, "property", "og:description", meta.description);
  out = replaceOrInsertMeta(out, "property", "og:url", meta.ogUrl);
  out = replaceOrInsertMeta(out, "property", "og:image", meta.ogImage);
  out = replaceOrInsertMeta(out, "property", "og:image:width", "1200");
  out = replaceOrInsertMeta(out, "property", "og:image:height", "630");
  out = replaceOrInsertMeta(out, "name", "twitter:card", meta.twitterCard);
  out = replaceOrInsertMeta(out, "name", "twitter:title", meta.title);
  out = replaceOrInsertMeta(out, "name", "twitter:description", meta.description);
  out = replaceOrInsertMeta(out, "name", "twitter:image", meta.ogImage);
  return out;
}
