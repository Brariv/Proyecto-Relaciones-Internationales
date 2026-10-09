// Content collections. `docs` is required by Starlight: every .md/.mdx file
// under src/content/docs/ becomes a documentation page.
import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
