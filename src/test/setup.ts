import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, expect, vi } from "vitest";

expect.extend(matchers);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// jsdom no implementa estas APIs del navegador; el sitio las usa al montar (scroll suave, animaciones).
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal("ResizeObserver", ResizeObserverMock);
// Las animaciones del sitio piden fotogramas en bucle; si piden uno cuando jsdom ya se desmontó, fallaría con
// "requestAnimationFrame is not defined". Se reemplazan por temporizadores de Node, que siempre existen.
vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => setTimeout(() => callback(Date.now()), 16));
vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

beforeAll(() => {
  const mockCtx = {
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
  };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    () => mockCtx as unknown as CanvasRenderingContext2D
  );
});

afterEach(() => {
  cleanup();
});
