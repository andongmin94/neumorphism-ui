import { readFileSync } from "node:fs";
import { defineConfig } from "@playwright/test";
import base from "./playwright.config";
const registry = JSON.parse(readFileSync(new URL("../registry/public/r/registry.json", import.meta.url), "utf8")) as { homepage: string };
export default defineConfig({
  ...base,
  testDir: "./tests",
  testMatch: ["**/detail/header-fit.spec.ts", "**/detail/gallery-finish.spec.ts", "**/detail/template-boundary.spec.ts", "**/browser/presentation.spec.ts", "**/browser/registry-origin.spec.ts", "**/detail/docs-reading.spec.ts", "**/detail/reference-plate.spec.ts", "**/detail/workspace-plates.spec.ts", "**/detail/task-composition.spec.ts", "**/detail/language-label.spec.ts", "**/detail/content-review.spec.ts", "**/detail/resource-copy.spec.ts", "**/detail/chrome-finish.spec.ts"],
  use: { ...base.use, baseURL: new URL(registry.homepage).origin },
  webServer: undefined,
  outputDir: "test-results/published-browser",
  reporter: [["list"], ["json", { outputFile: "test-results/published-browser-report.json" }]],
});
