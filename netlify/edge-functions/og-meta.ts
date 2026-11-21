import { buildOgMeta, injectOgMeta, isStaticAssetPath } from "../../src/og/meta.ts";

type EdgeContext = {
  next: () => Promise<Response>;
};

export default async function handler(req: Request, context: EdgeContext): Promise<Response> {
  const url = new URL(req.url);
  if (isStaticAssetPath(url.pathname)) {
    return context.next();
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  const html = await response.text();
  const meta = buildOgMeta(url.pathname, url.origin);
  const rewritten = injectOgMeta(html, meta);

  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return new Response(rewritten, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
