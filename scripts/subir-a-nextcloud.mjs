#!/usr/bin/env node
// Uploads files from the repo copy (nextcloud/Sitio Web UVG GLOBAL/) to the
// content account in Nextcloud, over WebDAV — the same API the site reads from.
//
//   npm run nextcloud:subir                       # uploads Imagenes/ (default)
//   npm run nextcloud:subir -- Imagenes Paginas/Inicio/carousel.md
//   npm run nextcloud:subir -- --dry-run Imagenes # only shows what it would do
//
// Uses CONTENT_USER / CONTENT_PASSWORD / CONTENT_DIR / NEXTCLOUD_PORT from .env.
// - creates missing folders,
// - skips files that are already identical in Nextcloud,
// - before replacing a .md it saves Nextcloud's current version in
//   .nextcloud-backup/<fecha>/ (in case someone edited it there).
import fs from "node:fs/promises";
import path from "node:path";

const env = process.env;
const USER = env.CONTENT_USER || "contenido";
const PASS = env.CONTENT_PASSWORD;
const DIR = env.CONTENT_DIR || "Sitio Web UVG GLOBAL";
const BASE = (
  env.NEXTCLOUD_UPLOAD_URL ||
  (env.NEXTCLOUD_URL && !/\/\/nextcloud(:|\/|$)/.test(env.NEXTCLOUD_URL) ? env.NEXTCLOUD_URL : "") ||
  // 127.0.0.1 rather than "localhost": Node may resolve localhost to IPv6 (::1)
  `http://127.0.0.1:${env.NEXTCLOUD_PORT || 8000}`
).replace(/\/+$/, "");

const LOCAL_ROOT = path.resolve("nextcloud", DIR);
const SKIP = new Set([".gitkeep", ".DS_Store"]);
const TYPES = { ".md": "text/markdown; charset=utf-8", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif" };

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const targets = args.filter((a) => !a.startsWith("--"));
if (!targets.length) targets.push("Imagenes");

if (!PASS) {
  console.error("Falta CONTENT_PASSWORD. Corre el comando desde la carpeta del proyecto, con tu .env:\n  npm run nextcloud:subir");
  process.exit(1);
}

const auth = "Basic " + Buffer.from(`${USER}:${PASS}`).toString("base64");
const enc = (rel) => rel.split("/").filter(Boolean).map(encodeURIComponent).join("/");
const davUrl = (rel) => `${BASE}/remote.php/dav/files/${encodeURIComponent(USER)}/${enc(DIR)}/${enc(rel)}`;

async function dav(method, rel, init = {}) {
  const res = await fetch(davUrl(rel), { method, ...init, headers: { Authorization: auth, ...(init.headers || {}) } });
  if (res.status === 401) fail("Nextcloud rechazó el usuario o la contraseña (CONTENT_USER / CONTENT_PASSWORD del .env).");
  if (res.status === 429) fail("Nextcloud está bloqueando las peticiones por demasiados intentos fallidos. Ver /docs/guias/docker-nextcloud/#problemas-comunes.");
  return res;
}
function fail(msg) {
  console.error(`\n✗ ${msg}`);
  process.exit(1);
}

async function listLocal(rel) {
  const full = path.join(LOCAL_ROOT, rel);
  const stat = await fs.stat(full).catch(() => null);
  if (!stat) fail(`No existe en el repositorio: nextcloud/${DIR}/${rel}`);
  if (stat.isFile()) return [rel];
  const out = [];
  for (const e of await fs.readdir(full, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    out.push(...(await listLocal(path.posix.join(rel, e.name))));
  }
  return out;
}

const madeDirs = new Set();
async function ensureDir(relDir) {
  const parts = relDir.split("/").filter(Boolean);
  for (let i = 1; i <= parts.length; i++) {
    const d = parts.slice(0, i).join("/");
    if (madeDirs.has(d)) continue;
    if (!dryRun) {
      const res = await dav("MKCOL", d);
      if (![201, 405].includes(res.status)) fail(`No se pudo crear la carpeta "${d}": ${res.status} ${res.statusText}`);
    }
    madeDirs.add(d);
  }
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const totals = { subidos: 0, iguales: 0, respaldos: 0 };
const failed = [];

console.log(`Nextcloud: ${BASE}  ·  cuenta: ${USER}  ·  carpeta: ${DIR}${dryRun ? "  ·  (simulación)" : ""}\n`);
const probe = await fetch(`${BASE}/status.php`).catch(() => null);
if (!probe?.ok) fail(`No se encontró Nextcloud en ${BASE}. ¿Está corriendo? (npm run docker:up)`);

for (const target of targets) {
  for (const rel of await listLocal(target.replace(/^\/+|\/+$/g, ""))) {
    const local = await fs.readFile(path.join(LOCAL_ROOT, rel));
    const isText = rel.endsWith(".md");

    // Compare with what's already in Nextcloud
    const current = await dav("GET", rel);
    if (current.status === 200) {
      const remote = Buffer.from(await current.arrayBuffer());
      if (remote.equals(local)) {
        totals.iguales++;
        console.log(`  = ${rel}  (sin cambios)`);
        continue;
      }
      if (isText && !dryRun) {
        const backup = path.join(".nextcloud-backup", stamp, rel);
        await fs.mkdir(path.dirname(backup), { recursive: true });
        await fs.writeFile(backup, remote);
        totals.respaldos++;
        console.log(`  ↺ respaldo de la versión de Nextcloud: ${backup}`);
      }
    }

    await ensureDir(path.posix.dirname(rel));
    if (!dryRun) {
      const type = TYPES[path.extname(rel).toLowerCase()] || "application/octet-stream";
      let res;
      // 423 Locked: the file is open in Nextcloud's editor (or a lock hasn't
      // expired yet). Retry a few times, then skip it and keep going.
      for (let attempt = 1; attempt <= 4; attempt++) {
        res = await dav("PUT", rel, { body: local, headers: { "Content-Type": type } });
        if (res.status !== 423) break;
        if (attempt < 4) {
          console.log(`  … ${rel} está bloqueado en Nextcloud, reintentando en 5 s (${attempt}/3)`);
          await new Promise((r) => setTimeout(r, 5000));
        }
      }
      if (![201, 204].includes(res.status)) {
        const why =
          res.status === 423
            ? "está bloqueado: ciérralo si está abierto en el editor de Nextcloud y vuelve a correr el script"
            : `${res.status} ${res.statusText}`;
        failed.push(`${rel} — ${why}`);
        console.log(`  ✗ ${rel}  (${why})`);
        continue;
      }
    }
    totals.subidos++;
    console.log(`  ↑ ${rel}  (${Math.ceil(local.length / 1024)} KB)`);
  }
}

console.log(
  `\n✓ ${dryRun ? "Se subirían" : "Subidos"}: ${totals.subidos} · sin cambios: ${totals.iguales}` +
    (totals.respaldos ? ` · respaldos en .nextcloud-backup/${stamp}/` : "") +
    `\n  El sitio los mostrará en máximo ${env.CONTENT_CACHE_TTL || 60} segundos.`
);
if (failed.length) {
  console.error(`\n✗ No se pudieron subir ${failed.length}:\n  - ${failed.join("\n  - ")}`);
  process.exit(1);
}
