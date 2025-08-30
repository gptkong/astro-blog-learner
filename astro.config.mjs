// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import remarkToc from "remark-toc";
import { rehypeCodeBlock } from "./src/lib/rehype-code-block.js";

// https://astro.build/config
export default defineConfig({
  site: "https://oaico.de",
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: false,
    },
    remarkPlugins: [
      [remarkToc, { tight: true, ordered: true }], // You can customize options here
    ],
    rehypePlugins: [
      rehypeCodeBlock,
    ],
  },
});
