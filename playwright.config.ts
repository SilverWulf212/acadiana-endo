import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-iphone",
      use: {
        ...devices["iPhone 14"],
        defaultBrowserType: "chromium",
      },
    },
    {
      name: "mobile-android",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "tablet-ipad",
      use: {
        ...devices["iPad (gen 7)"],
        defaultBrowserType: "chromium",
      },
    },
  ],
  webServer: {
    command: "pnpm dev --port 3001",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
