import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import path from "path";

// https://astro.build/config
export default defineConfig({
	root: ".",
	base: ".",
	site: "https://zddq.github.io/my-blog",
	trailingSlash: "ignore",
	integrations: [mdx(), sitemap()],
	outDir: "docs",
	vite: {
		resolve: {
			"@": path.resolve("src/"),
		},
	},
});
