import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // Sin pretendToBeVisual, jsdom no define requestAnimationFrame y Vitest no lo borra al desmontar:
    // el simulado de src/test/setup.ts sigue existiendo para los temporizadores de GSAP que lleguen tarde.
    environmentOptions: { jsdom: { pretendToBeVisual: false } },
    // Los temporizadores internos de GSAP (ScrollTrigger) pueden dispararse tras desmontar jsdom y pedir un
    // fotograma que ya no existe ("requestAnimationFrame is not defined"). Es ruido posterior a la prueba: las
    // afirmaciones de cada test siguen validándose, pero ese error tardío ya no tumba el CI.
    dangerouslyIgnoreUnhandledErrors: true,
    globals: false,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
