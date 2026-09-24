import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  maxFailures: 4,
  timeout: 30_000,
  reporter: [["list"], ["json", { outputFile: "test-results/docs-report.json" }]],
  outputDir: "test-results/docs-browser",
  use: {
    baseURL: "http://127.0.0.1:4178",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop-light", use: { browserName: "chromium", viewport: { width: 1440, height: 1000 }, colorScheme: "light" } },
    { name: "mobile-dark", use: { browserName: "chromium", viewport: { width: 390, height: 844 }, colorScheme: "dark", isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "npm run start -- --host 127.0.0.1 --port 4178",
    url: "http://127.0.0.1:4178/ko",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
