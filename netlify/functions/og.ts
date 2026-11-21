import { renderOgPng } from "../../src/og/renderOgPng";

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const codes = url.searchParams.get("codes") ?? "";
  const displayUrl = codes ? `${url.host}/${codes}/` : url.host;

  const png = renderOgPng(codes, displayUrl);

  return new Response(png as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    },
  });
}

export const config = {
  path: "/api/og",
};
