# UrbakBlade

Sitio one-page para barbería: hero a pantalla completa, animaciones con GSAP (ScrollTrigger), tema claro/oscuro, partículas en canvas, cursor personalizado en escritorio y contenido editable desde `src/config.ts`.

## Requisitos

- Node.js 20+ (recomendado 22)

## Desarrollo

```bash
npm install
npm run dev
```

## Scripts

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Typecheck + build de producción |
| `npm run preview` | Vista previa del `dist/` |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (tests unitarios) |

## Variables de entorno

Copia `.env.example` a `.env` y ajusta:

- **`VITE_SITE_URL`**: URL pública sin barra final (Open Graph, Twitter Card, `canonical`). En build, Vite inyecta las metaetiquetas en `index.html`.
- **`VITE_CONTACT_FORM_URL`** (opcional): URL que acepta `POST` JSON `{ name, email, service, message }`. Si no está definida, el formulario abre el cliente de correo con `mailto:` usando `contactConfig.contactEmail` en `config.ts`.

## SEO y redes sociales

Las etiquetas `description`, `og:*`, `twitter:*` y `canonical` se generan en el plugin de Vite (`vite.config.ts`) a partir de `siteConfig`, `siteMeta` y `VITE_SITE_URL`. La imagen social por defecto es `siteMeta.ogImage` (`/hero-main.jpg` en `public/`).

## Estructura relevante

```
src/
  config.ts           # Textos, precios, enlaces del footer, SEO auxiliar (siteMeta)
  App.tsx
  sections/           # Bloques de la landing
  components/         # Navigation, CustomCursor, ParticleField
  hooks/              # Tema y prefers-reduced-motion
```

## Accesibilidad y rendimiento

- Se respeta **`prefers-reduced-motion`**: se omiten animaciones GSAP pesadas, cursor custom y campo de partículas; el scroll deja de ser suave vía CSS.
- Enlaces y controles tienen **`:focus-visible`** visible.
- Imágenes fuera del hero usan **`loading="lazy"`** y **`decoding="async"`**; el hero usa **`fetchPriority="high"`** y **`loading="eager"`**.

## CI

El workflow `.github/workflows/ci.yml` ejecuta `lint`, `test` y `build` en push/PR a `main` o `master`.

## Enlaces sociales

Las URLs de Instagram, Facebook y TikTok están en `footerConfig.navLinks2` dentro de `config.ts`. Sustituye los paths `/urbakblade` y `@urbakblade` por los reales de tu negocio cuando los tengas.
