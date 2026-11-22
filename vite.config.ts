import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { buildOgMeta, injectOgMeta, isStaticAssetPath } from "./src/og/meta.ts";

function localOgPreviewPlugin(): Plugin {
	return {
		name: "waffle-local-og-preview",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				if (!req.url?.startsWith("/api/og")) {
					next();
					return;
				}
				try {
					const host = req.headers.host ?? "localhost:8080";
					const parsed = new URL(req.url, `http://${host}`);
					const codes = parsed.searchParams.get("codes") ?? "";
					const displayUrl = codes ? `${host}/${codes}/` : host;
					const { renderOgPng } = await import("./src/og/renderOgPng.ts");
					const png = await renderOgPng(codes, displayUrl);
					res.statusCode = 200;
					res.setHeader("Content-Type", "image/png");
					res.setHeader("Cache-Control", "no-store");
					res.end(Buffer.from(png));
				} catch (err) {
					next(err);
				}
			});
		},
		transformIndexHtml: {
			order: "post",
			handler(html, ctx) {
				const rawUrl = ctx.originalUrl ?? "/";
				const pathname = rawUrl.split("?")[0] || "/";
				if (isStaticAssetPath(pathname)) {
					return html;
				}
				const meta = buildOgMeta(pathname, "http://localhost:8080");
				return injectOgMeta(html, meta);
			},
		},
	};
}

export default defineConfig({
	plugins: [react(), localOgPreviewPlugin()],
	root: ".",
	publicDir: "public",
	build: {
		outDir: "dist",
		emptyOutDir: true,
		target: "esnext",
	},
	server: {
		port: 8080,
		open: true,
	},
	define: {
		LOGIC_TYPE: JSON.stringify(
			process.env.npm_package_wafflemap_meshcalculator,
		),
	},
});
