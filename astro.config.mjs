import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';
import starlight from '@astrojs/starlight';

// The public site lives in src/pages/[...slug].astro (/, /exchanges, ...) and is
// rendered on each request (Node server) so content edited in Nextcloud shows up
// without rebuilding. Starlight serves the documentation under /docs as static
// pages — they live in src/content/docs/docs/**, so they never collide.
export default defineConfig({
  adapter: node({ mode: 'standalone' }),

  // Read at runtime (Docker passes them as environment variables; in `npm run dev`
  // they come from .env). See src/lib/content.ts and .env.example.
  env: {
    schema: {
      NEXTCLOUD_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      NEXTCLOUD_USER: envField.string({ context: 'server', access: 'secret', optional: true }),
      NEXTCLOUD_PASSWORD: envField.string({ context: 'server', access: 'secret', optional: true }),
      NEXTCLOUD_CONTENT_DIR: envField.string({
        context: 'server',
        access: 'secret',
        default: 'Sitio Web UVG GLOBAL',
      }),
      CONTENT_BASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTENT_CACHE_TTL: envField.number({ context: 'server', access: 'secret', default: 60 }),
    },
  },

  integrations: [
    starlight({
      title: 'UVG Global · Documentación',
      description:
        'Documentación técnica del sitio de Relaciones Internacionales de la UVG: instalación, estructura, contenido y componentes.',
      // Spanish UI for Starlight's own labels ("En esta página", "Buscar", ...)
      defaultLocale: 'root',
      locales: {
        root: { label: 'Español', lang: 'es' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Brariv/Proyecto-Relaciones-Internationales',
        },
      ],
      customCss: ['./src/styles/docs.css'],
      sidebar: [
        {
          label: 'Empezar',
          items: [
            { label: 'Introducción', slug: 'docs' },
            { label: 'Instalación y comandos', slug: 'docs/instalacion' },
          ],
        },
        {
          label: 'Guías',
          // every file in src/content/docs/docs/guias/ shows up here automatically
          items: [{ autogenerate: { directory: 'docs/guias' } }],
        },
      ],
    }),
  ],
});
