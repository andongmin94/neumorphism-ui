import { defineConfig } from "@playwright/test";
import smoke from "./playwright.published.config";

export default defineConfig({
  ...smoke,
  testDir: "./tests",
  testMatch: ["**/smoke/deployment.spec.ts", "**/cloudflare/static-assets.spec.ts", "**/browser/web-analytics.spec.ts"],
  use: { ...smoke.use, baseURL: "http://127.0.0.1:4179" },
  webServer: {
    command: "npm run preview:cloudflare",
    url: "http://127.0.0.1:4179/en",
    reuseExistingServer: false,
    timeout: 60_000,
  },
  outputDir: "test-results/cloudflare",
  reporter: [["list"], ["json", { outputFile: "test-results/cloudflare-report.json" }]],
});
