import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: [],
		exclude: ["node_modules", "dist", "e2e"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
});
