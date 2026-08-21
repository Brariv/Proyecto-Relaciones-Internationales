// Loads the per-component markdown documents under /data (see docs/Format_Page.md).
//
// Source resolution:
//   - CONTENT_BASE_URL set  -> fetched over HTTP from that base (e.g. a cloud static bucket).
//   - CONTENT_BASE_URL unset -> read from the local /data directory on disk.
//
// Runs at build time inside Astro component frontmatter (Node), never in the browser.
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const LOCAL_DATA_ROOT = path.resolve(process.cwd(), "data");

export interface ComponentContent<T> {
  items: T[];
}

function resolveRemoteUrl(base: string, relativePath: string): string {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return new URL(relativePath, normalizedBase).toString();
}

export async function loadComponentContent<T = Record<string, unknown>>(
  page: string,
  component: string
): Promise<ComponentContent<T>> {
  const relativePath = `${page}/${component}.md`;
  const baseUrl = import.meta.env.CONTENT_BASE_URL;

  const raw = baseUrl
    ? await fetch(resolveRemoteUrl(baseUrl, relativePath)).then((res) => {
        if (!res.ok) {
          throw new Error(`No se pudo cargar el contenido remoto "${relativePath}": ${res.status} ${res.statusText}`);
        }
        return res.text();
      })
    : await fs.readFile(path.join(LOCAL_DATA_ROOT, relativePath), "utf-8");

  const { data } = matter(raw);
  return data as ComponentContent<T>;
}
