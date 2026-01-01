import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
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
