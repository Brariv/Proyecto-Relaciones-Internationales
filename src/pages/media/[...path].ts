// GET /media/Imagenes/<carpeta>/<foto>.png
//
// Image proxy: photos live in Nextcloud behind a login, so the browser can't
// load them directly. The server fetches them with the content account and
// streams them back. Only image files under Imagenes/ are served (see readMedia).
import type { APIRoute } from "astro";
import { readMedia } from "../../lib/content";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const file = await readMedia(params.path ?? "");
  if (!file) return new Response("Imagen no encontrada", { status: 404 });

  return new Response(file.body, {
    headers: {
      "Content-Type": file.contentType,
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
