import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      all: true,
      exclude: ["*.js"],
    },
    environment: "happy-dom",
    includeSource: ["**/*.ts"],
  },
});
