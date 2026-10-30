// Content source for the site: the "Sitio Web UVG GLOBAL" folder.
//
//   Paginas/<Pagina>/<componente>.md  -> card data (YAML frontmatter `items: [...]`)
//   Imagenes/**                         -> photos, referenced by file name in `imagen`
//
// Where that folder is read from (first configured wins):
//   1. Nextcloud   — NEXTCLOUD_URL + NEXTCLOUD_USER + NEXTCLOUD_PASSWORD (WebDAV).
//   2. HTTP bucket — CONTENT_BASE_URL, a static mirror of the same folder.
//   3. Local copy  — nextcloud/Sitio Web UVG GLOBAL/ in this repo.
//
// Remote reads are cached in memory for CONTENT_CACHE_TTL seconds. If the remote
// source fails, the last good copy is served; if there is none yet, the local
// copy is used, so the site never goes down because Nextcloud is unreachable.
//
// Runs on the server only (component frontmatter / API routes), never in the browser.
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  CONTENT_BASE_URL,
  CONTENT_CACHE_TTL,
  NEXTCLOUD_CONTENT_DIR,
  NEXTCLOUD_PASSWORD,
  NEXTCLOUD_URL,
  NEXTCLOUD_USER,
} from "astro:env/server";

export const LOCAL_CONTENT_ROOT = path.resolve(process.cwd(), "nextcloud", "Sitio Web UVG GLOBAL");
const PAGES_DIR = "Paginas";
const IMAGES_DIR = "Imagenes";
const REQUEST_TIMEOUT_MS = 5000;

const IMAGE_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

export interface ComponentContent<T> {
  items: T[];
}

// ---------------------------------------------------------------- sources --

const nextcloud =
  NEXTCLOUD_URL && NEXTCLOUD_USER && NEXTCLOUD_PASSWORD
    ? {
        base: NEXTCLOUD_URL.replace(/\/+$/, ""),
        user: NEXTCLOUD_USER,
        dir: NEXTCLOUD_CONTENT_DIR,
        auth: "Basic " + Buffer.from(`${NEXTCLOUD_USER}:${NEXTCLOUD_PASSWORD}`).toString("base64"),
      }
    : null;

const bucketBase = !nextcloud && CONTENT_BASE_URL ? CONTENT_BASE_URL.replace(/\/+$/, "") : null;

/** Which source is active — handy for logs and the docs. */
export const contentSource: "nextcloud" | "bucket" | "local" = nextcloud ? "nextcloud" : bucketBase ? "bucket" : "local";

/** "a b/c" -> "a%20b/c" (each segment encoded, slashes kept). */
function encodePath(relative: string): string {
  return relative.split("/").filter(Boolean).map(encodeURIComponent).join("/");
}

function davRoot(): string {
  return `${nextcloud!.base}/remote.php/dav/files/${encodeURIComponent(nextcloud!.user)}/${encodePath(nextcloud!.dir)}`;
}

function remoteUrl(relative: string): string {
  return nextcloud ? `${davRoot()}/${encodePath(relative)}` : `${bucketBase}/${encodePath(relative)}`;
}

function remoteHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return nextcloud ? { Authorization: nextcloud.auth, ...extra } : extra;
}

// --------------------------------------------------------- auth pause --
// Every request with a wrong password counts as a failed login for
// Nextcloud's brute-force protection; enough of them and Nextcloud blocks the
// site's IP (HTTP 429) even after the password is fixed. So on 401/403/429 we
// stop calling Nextcloud for AUTH_PAUSE_MS and serve the backup instead.
const AUTH_PAUSE_MS = 5 * 60 * 1000;
let pausedUntil = 0;

class RemoteAuthError extends Error {}

function remotePaused(): boolean {
  return Date.now() < pausedUntil;
}

function pauseRemote(status: number) {
  const first = !remotePaused();
  pausedUntil = Date.now() + AUTH_PAUSE_MS;
  if (!first) return;
  const why =
    status === 429
      ? "Nextcloud bloqueó temporalmente al sitio por demasiados intentos fallidos (protección contra fuerza bruta)"
      : "usuario o contraseña incorrectos (revisa CONTENT_USER y CONTENT_PASSWORD en .env, y que la cuenta exista)";
  console.warn(
    `[contenido] ${why}. Se pausan las consultas a Nextcloud por ${AUTH_PAUSE_MS / 60000} minutos y se usa la copia de respaldo. ` +
      "Ver /docs/guias/docker-nextcloud/#problemas-comunes."
  );
}

async function remoteFetch(relative: string, init: RequestInit = {}): Promise<Response> {
  if (remotePaused()) throw new RemoteAuthError("consultas a Nextcloud en pausa");
  const res = await fetch(remoteUrl(relative), {
    ...init,
    headers: remoteHeaders((init.headers as Record<string, string>) ?? {}),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (nextcloud && (res.status === 401 || res.status === 403 || res.status === 429)) {
    pauseRemote(res.status);
    throw new RemoteAuthError(`${init.method ?? "GET"} ${relative} → ${res.status} ${res.statusText}`);
  }
  if (!res.ok && res.status !== 207) {
    throw new Error(`${init.method ?? "GET"} ${relative} → ${res.status} ${res.statusText}`);
  }
  return res;
}

/** Resolves a relative path inside the local copy, refusing anything outside it. */
function localPath(relative: string): string {
  const full = path.resolve(LOCAL_CONTENT_ROOT, relative);
  if (full !== LOCAL_CONTENT_ROOT && !full.startsWith(LOCAL_CONTENT_ROOT + path.sep)) {
    throw new Error(`Ruta fuera de la carpeta de contenido: ${relative}`);
  }
  return full;
}

// ------------------------------------------------------------------ cache --

interface CacheEntry {
  value: unknown;
  at: number;
}
const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<unknown>>();

/**
 * Remote value with an in-memory TTL cache. On failure serves the last good
 * value (stale), or `fallback()` when nothing was ever loaded.
 */
async function cachedRemote<T>(key: string, load: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CONTENT_CACHE_TTL * 1000) return hit.value as T;

  const pending = inflight.get(key);
  if (pending) return pending as Promise<T>;

  const job = (async () => {
    try {
      const value = await load();
      cache.set(key, { value, at: Date.now() });
      return value;
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      // Auth problems are logged once by pauseRemote(); don't repeat per file.
      const quiet = err instanceof RemoteAuthError;
      // Keep serving the backup for one TTL before retrying, so a hung
      // Nextcloud doesn't make every visit wait for the request timeout.
      if (hit) {
        if (!quiet) console.warn(`[contenido] No se pudo leer de ${contentSource}: ${reason}. Se sigue mostrando la última copia buena.`);
        cache.set(key, { value: hit.value, at: Date.now() });
        return hit.value as T;
      }
      if (!quiet) console.warn(`[contenido] No se pudo leer de ${contentSource}: ${reason}. Se usa la copia local.`);
      const value = await fallback();
      cache.set(key, { value, at: Date.now() });
      return value;
    } finally {
      inflight.delete(key);
    }
  })();
  inflight.set(key, job);
  return job;
}

// ---------------------------------------------------------------- content --

function parse<T>(raw: string, relative: string): ComponentContent<T> {
  let data: Record<string, unknown>;
  try {
    data = matter(raw).data;
  } catch (err) {
    const reason = err instanceof Error ? err.message.split("\n")[0] : String(err);
    throw new Error(`"${relative}" tiene un error de formato YAML: ${reason}`);
  }
  return { ...data, items: Array.isArray(data.items) ? data.items : [] } as ComponentContent<T>;
}

/**
 * Loads `Paginas/<page>/<component>.md` and returns its frontmatter.
 * Example: loadComponentContent("Inicio", "carousel").
 *
 * The file is parsed inside the remote loader, so a .md saved in Nextcloud
 * with broken YAML counts as a failed read: visitors keep seeing the last
 * good version and the error is logged, instead of the page breaking.
 */
export async function loadComponentContent<T = Record<string, unknown>>(
  page: string,
  component: string
): Promise<ComponentContent<T>> {
  const relative = `${PAGES_DIR}/${page}/${component}.md`;
  const local = async () => parse<T>(await fs.readFile(localPath(relative), "utf-8"), relative);
  if (contentSource === "local") return local();
  return cachedRemote(`page:${relative}`, async () => parse<T>(await (await remoteFetch(relative)).text(), relative), local);
}

// ----------------------------------------------------------------- images --

/** Every image file under Imagenes/, as paths relative to the content root. */
async function listImages(): Promise<string[]> {
  const local = async () => {
    const root = localPath(IMAGES_DIR);
    const entries = await fs.readdir(root, { recursive: true, withFileTypes: true }).catch(() => []);
    return entries
      .filter((e) => e.isFile() && IMAGE_TYPES[path.extname(e.name).toLowerCase()])
      .map((e) => path.relative(LOCAL_CONTENT_ROOT, path.join(e.parentPath, e.name)).split(path.sep).join("/"));
  };

  if (contentSource === "local") return local();
  // A plain bucket can't be listed: only explicit paths ("Carpeta/foto.png") work there.
  if (contentSource === "bucket") return [];
  return cachedRemote("images", listNextcloudImages, local);
}

/** Walks Imagenes/ on Nextcloud with PROPFIND (Depth: 1 per folder). */
async function listNextcloudImages(): Promise<string[]> {
  const files: string[] = [];
  const queue = [IMAGES_DIR];
  const marker = `/remote.php/dav/files/${encodeURIComponent(nextcloud!.user)}/`;
  const body =
    '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/></d:prop></d:propfind>';

  while (queue.length) {
    const folder = queue.shift()!;
    const res = await remoteFetch(`${folder}/`, {
      method: "PROPFIND",
      headers: { Depth: "1", "Content-Type": "application/xml" },
      body,
    });
    const xml = await res.text();
    for (const block of xml.split(/<(?:[a-z0-9]+:)?response[\s>]/i).slice(1)) {
      const href = block.match(/<(?:[a-z0-9]+:)?href>([^<]+)</i)?.[1];
      if (!href) continue;
      const decoded = decodeURIComponent(href);
      const at = decoded.indexOf(decodeURIComponent(marker));
      if (at === -1) continue;
      // strip ".../files/<user>/<content dir>/" -> path relative to the content root
      const afterUser = decoded.slice(at + decodeURIComponent(marker).length);
      const relative = afterUser.slice(nextcloud!.dir.length).replace(/^\/+|\/+$/g, "");
      if (!relative || relative === folder) continue;
      if (/<(?:[a-z0-9]+:)?collection\s*\/?>/i.test(block)) queue.push(relative);
      else if (IMAGE_TYPES[path.posix.extname(relative).toLowerCase()]) files.push(relative);
    }
  }
  return files;
}

const stem = (file: string) => path.posix.basename(file, path.posix.extname(file)).toLowerCase();

/**
 * Turns an `imagen` value from the .md files into a URL for <CoverImage src>.
 *  - "Espana_Universidad-Europea.png" -> searched by name anywhere under Imagenes/
 *    (case-insensitive; a .jpg with the same name also matches).
 *  - "Destinos/Europa/foto.jpg"       -> explicit path under Imagenes/.
 *  - "https://…"                       -> used as-is.
 * Returns undefined (→ placeholder) when the photo hasn't been uploaded yet.
 */
export async function resolveImage(imagen?: string): Promise<string | undefined> {
  const value = imagen?.trim();
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  if (!IMAGE_TYPES[path.posix.extname(value).toLowerCase()]) return undefined; // descriptive text, not a file

  const images = await listImages();
  if (value.includes("/")) {
    const explicit = `${IMAGES_DIR}/${value.replace(/^\/+/, "").replace(new RegExp(`^${IMAGES_DIR}/`), "")}`;
    const found = images.find((f) => f.toLowerCase() === explicit.toLowerCase());
    if (found || contentSource === "bucket") return `/media/${encodePath(found ?? explicit)}`;
    return undefined;
  }

  const wanted = path.posix.basename(value).toLowerCase();
  const found =
    images.find((f) => path.posix.basename(f).toLowerCase() === wanted) ??
    images.find((f) => stem(f) === stem(wanted));
  return found ? `/media/${encodePath(found)}` : undefined;
}

export interface MediaFile {
  body: BodyInit;
  contentType: string;
}

/** Reads one image for the /media proxy. Only files under Imagenes/ are allowed. */
export async function readMedia(relative: string): Promise<MediaFile | null> {
  const clean = path.posix.normalize(relative.replace(/\\/g, "/")).replace(/^\/+/, "");
  const contentType = IMAGE_TYPES[path.posix.extname(clean).toLowerCase()];
  if (!contentType || !clean.startsWith(`${IMAGES_DIR}/`) || clean.split("/").includes("..")) return null;

  const local = async (): Promise<MediaFile | null> => {
    try {
      return { body: new Uint8Array(await fs.readFile(localPath(clean))), contentType };
    } catch {
      return null;
    }
  };
  if (contentSource === "local") return local();

  try {
    const res = await remoteFetch(clean);
    return { body: res.body ?? new Uint8Array(await res.arrayBuffer()), contentType };
  } catch {
    return local();
  }
}
