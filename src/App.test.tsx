import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renderiza la marca en la navegación", () => {
    render(<App />);
    expect(screen.getByRole("navigation", { name: /principal/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "URBAKBLADE" })).toBeInTheDocument();
  });
});
