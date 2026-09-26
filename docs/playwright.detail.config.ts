import { defineConfig } from "@playwright/test";
import base from "./playwright.config";
export default defineConfig({
  ...base, testDir:"./tests/detail", workers:2, maxFailures:0, timeout:30000,
  outputDir:"test-results/docs-browser/catalog",
  reporter:[["list"],["json",{outputFile:"test-results/detail-report.json"}]],
  projects:[
    {name:"desktop-light",use:{browserName:"chromium",viewport:{width:1440,height:1000},colorScheme:"light"}},
    {name:"desktop-dark",use:{browserName:"chromium",viewport:{width:1440,height:1000},colorScheme:"dark"}},
    {name:"mobile-light",use:{browserName:"chromium",viewport:{width:390,height:844},colorScheme:"light",isMobile:true,hasTouch:true}},
    {name:"mobile-dark",use:{browserName:"chromium",viewport:{width:390,height:844},colorScheme:"dark",isMobile:true,hasTouch:true}},
  ],
});
