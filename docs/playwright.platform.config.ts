import { defineConfig } from "@playwright/test";

const browserName = (process.env.PLATFORM_BROWSER ?? "chromium") as "chromium" | "firefox" | "webkit";
const mobile = process.env.PLATFORM_DEVICE === "mobile";
const mode = process.env.PLATFORM_MODE === "dark" ? "dark" : "light";
const id = process.env.PLATFORM_ID ?? `${browserName}-${mobile ? "mobile" : "desktop"}-${mode}`;

export default defineConfig({
  testDir: "./tests/platform",
  fullyParallel: false,
  workers: 2,
  retries: 0,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  outputDir: `test-results/platform/${id}`,
  reporter: [["list"], ["json", { outputFile: `test-results/platform-report-${id}.json` }]],
  use: {
    baseURL: "https://neumorphism-ui.andongmin.com",
    browserName,
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 960 },
    colorScheme: mode,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
