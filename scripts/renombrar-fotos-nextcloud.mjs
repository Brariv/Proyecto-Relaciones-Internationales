#!/usr/bin/env node
// One-time migration: renames the photos already uploaded to Nextcloud from the
// old names (Pais_Nombre.jpg, Pendiente_….jpg, Carrusel_….jpg) to the names
// guided by page (Destinos_….jpg, Testimonios-Viajes_….jpg, Inicio-Carrusel_….jpg),
// using the table in scripts/fotos-renombradas.json. Then uploads the updated
// .md files (whose `imagen` fields point to the new names) and the photo list.
//
//   npm run nextcloud:renombrar-fotos
//
// - old exists, new doesn't -> MOVE (rename in place, no re-upload)
// - both exist              -> DELETE old (goes to Nextcloud's trash bin)
// Safe to run more than once.
import fs from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const env = process.env;
const USER = env.CONTENT_USER || "contenido";
const PASS = env.CONTENT_PASSWORD;
const DIR = env.CONTENT_DIR || "Sitio Web UVG GLOBAL";
const BASE = (
  env.NEXTCLOUD_UPLOAD_URL ||
  (env.NEXTCLOUD_URL && !/\/\/nextcloud(:|\/|$)/.test(env.NEXTCLOUD_URL) ? env.NEXTCLOUD_URL : "") ||
  `http://127.0.0.1:${env.NEXTCLOUD_PORT || 8000}`
).replace(/\/+$/, "");

if (!PASS) {
  console.error("Falta CONTENT_PASSWORD. Corre: npm run nextcloud:renombrar-fotos");
  process.exit(1);
}

const auth = "Basic " + Buffer.from(`${USER}:${PASS}`).toString("base64");
const enc = (rel) => rel.split("/").filter(Boolean).map(encodeURIComponent).join("/");
const url = (rel) => `${BASE}/remote.php/dav/files/${encodeURIComponent(USER)}/${enc(DIR)}/Imagenes/${enc(rel)}`;
const dav = async (method, rel, headers = {}) => {
  const res = await fetch(url(rel), { method, headers: { Authorization: auth, ...headers } });
  if (res.status === 401) die("Nextcloud rechazó el usuario o la contraseña (CONTENT_USER / CONTENT_PASSWORD).");
  if (res.status === 429) die("Nextcloud está bloqueando por demasiados intentos fallidos. Ver /docs/guias/docker-nextcloud/#problemas-comunes.");
  return res;
};
function die(msg) {
  console.error(`\n✗ ${msg}`);
  process.exit(1);
}

const table = JSON.parse(await fs.readFile(new URL("./fotos-renombradas.json", import.meta.url), "utf-8"));
const pairs = Object.entries(table).filter(([k]) => !k.startsWith("_"));

console.log(`Nextcloud: ${BASE}  ·  cuenta: ${USER}  ·  carpeta: ${DIR}/Imagenes\n`);
const t = { renombradas: 0, papelera: 0, ok: 0, faltan: 0, errores: 0 };

for (const [oldRel, newRel] of pairs) {
  const [oldRes, newRes] = await Promise.all([dav("HEAD", oldRel), dav("HEAD", newRel)]);
  const oldExists = oldRes.status === 200;
  const newExists = newRes.status === 200;

  if (oldExists && !newExists) {
    const res = await dav("MOVE", oldRel, { Destination: url(newRel), Overwrite: "F" });
    if ([201, 204].includes(res.status)) {
      t.renombradas++;
      console.log(`  → ${oldRel}\n      ${newRel}`);
    } else {
      t.errores++;
      console.log(`  ✗ ${oldRel} (${res.status} ${res.statusText}${res.status === 423 ? ": está abierta o bloqueada" : ""})`);
    }
  } else if (oldExists && newExists) {
    const res = await dav("DELETE", oldRel);
    if ([204, 200].includes(res.status)) {
      t.papelera++;
      console.log(`  🗑 ${oldRel}  (ya existía con el nombre nuevo; la vieja va a la papelera)`);
    } else {
      t.errores++;
      console.log(`  ✗ ${oldRel} (${res.status} ${res.statusText})`);
    }
  } else if (newExists) {
    t.ok++;
  } else {
    t.faltan++; // not in Nextcloud under any name: the upload below adds it
  }
}

console.log(
  `\nRenombradas: ${t.renombradas} · a la papelera: ${t.papelera} · ya tenían el nombre nuevo: ${t.ok}` +
    ` · por subir: ${t.faltan}${t.errores ? ` · con error: ${t.errores}` : ""}\n`
);

// Upload the .md files that now point to the new names, the photo list, and any missing photo
console.log("Subiendo los .md actualizados y las fotos que falten…\n");
const md = [
  "Paginas/Inicio/carousel.md",
  "Paginas/Destinos/convenios.md",
  "Paginas/Especializaciones/especializaciones.md",
  "Paginas/Viajes/viajes.md",
  "Paginas/Testimonios/intercambios.md",
  "Paginas/Testimonios/pasantias.md",
  "Paginas/Testimonios/viajes.md",
];
const up = spawnSync(process.execPath, [fileURLToPath(new URL("./subir-a-nextcloud.mjs", import.meta.url)), "Imagenes", ...md], {
  stdio: "inherit",
  env,
});
process.exit(t.errores ? 1 : (up.status ?? 1));
