import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import path from "path";

import sitemap from "@astrojs/sitemap";
console.log(path.resolve("src"));

// https://astro.build/config
export default defineConfig({
	root: ".",
	base: ".",
	site: "https://example.com",
	trailingSlash: "ignore",
	integrations: [mdx(), sitemap()],
	vite: {
		resolve: {
			"@": path.resolve("src/"),
		},
	},
});
