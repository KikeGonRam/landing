import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { inspectAttr } from "kimi-plugin-inspect-react";
import { siteConfig, siteMeta } from "./src/config";

function escapeAttr(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const origin = (env.VITE_SITE_URL || "https://www.urbakblade.com").replace(
    /\/$/,
    ""
  );
  const ogImagePath = siteMeta.ogImage.startsWith("/")
    ? siteMeta.ogImage
    : `/${siteMeta.ogImage}`;
  const ogImageAbs = `${origin}${ogImagePath}`;
  const pageUrl = `${origin}/`;
  const title = escapeAttr(siteConfig.title);
  const description = escapeAttr(siteConfig.description);

  return {
    base: "./",
    plugins: [
      inspectAttr(),
      react(),
      {
        name: "inject-seo-meta",
        transformIndexHtml(html: string) {
          const twitter =
            siteMeta.twitterSite?.replace(/^@/, "") ?? "urbakblade";
          const inject = `
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${escapeAttr(pageUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeAttr(pageUrl)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${escapeAttr(ogImageAbs)}" />
    <meta property="og:locale" content="es_ES" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${escapeAttr(ogImageAbs)}" />
    <meta name="twitter:site" content="@${escapeAttr(twitter)}" />
    <meta name="theme-color" content="#000000" />`;
          return html.replace("</head>", `${inject}\n  </head>`);
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
            'vendor-gsap': ['gsap', '@gsap/react', 'lenis'],
            'vendor-icons': ['lucide-react'],
            'vendor-ui': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-dialog',
              '@radix-ui/react-navigation-menu',
              'embla-carousel-react',
              'sonner'
            ],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
