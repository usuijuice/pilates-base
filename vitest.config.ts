import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    include: ["**/__tests__/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["{app,components,lib}/**/*.{ts,tsx}"],
      thresholds: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
    },
  },
});
