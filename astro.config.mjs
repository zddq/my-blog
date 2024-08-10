import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import path from "path";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), sitemap()],
	site: "https://zddq.github.io",
	base: import.meta.env.DEV ? "." : "/my-blog/",
	trailingSlash: "always",
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
