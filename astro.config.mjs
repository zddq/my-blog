import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import path from "path";

// https://astro.build/config
export default defineConfig({
	site: "https://zddq.github.io",
	base: "/my-blog/",
	integrations: [mdx(), sitemap()],
	outDir: "docs",
	vite: {
		resolve: {
			"@": path.resolve("src/"),
		},
	},
	server: {
		port: 8888,
	},
});
