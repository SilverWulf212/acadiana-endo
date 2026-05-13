// Visual e2e audit — capture screenshots of every route at three viewports.
// Run with: node scripts/visual-audit.mjs

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";
const OUT_DIR = path.resolve("visual-audit");

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/root-canal",
  "/services/dental-trauma",
  "/services/cbct-imaging",
  "/patient-information",
  "/referring-doctors",
  "/contact",
  "/faq",
];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

function slugForRoute(route) {
  if (route === "/") return "home";
  return route.replace(/^\//, "").replace(/\//g, "_");
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const manifest = [];
  const consoleErrors = [];

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        consoleErrors.push({
          viewport: viewport.name,
          url: page.url(),
          type: msg.type(),
          text: msg.text(),
        });
      }
    });
    page.on("pageerror", (err) => {
      consoleErrors.push({
        viewport: viewport.name,
        url: page.url(),
        type: "pageerror",
        text: err.message,
      });
    });

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route}`;
      const slug = slugForRoute(route);
      const filename = `${slug}-${viewport.name}.png`;
      const filepath = path.join(OUT_DIR, filename);

      console.log(`[${viewport.name}] ${url}`);
      try {
        const response = await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 30000,
        });
        // Allow fonts + lazy images a beat to settle.
        await page.waitForTimeout(600);

        // Sanity check signals.
        const h1 = await page.locator("h1").first().textContent().catch(() => null);
        const regionCount = await page.locator('[role="region"]').count();
        const sectionCount = await page.locator("section").count();
        const headingCount = await page.locator("h1, h2, h3").count();
        const status = response ? response.status() : null;

        // Detect horizontal overflow as a proxy for layout breakage.
        const overflow = await page.evaluate(() => {
          const docW = document.documentElement.clientWidth;
          const scrollW = document.documentElement.scrollWidth;
          return {
            docW,
            scrollW,
            overflowing: scrollW > docW + 1,
          };
        });

        await page.screenshot({ path: filepath, fullPage: true, animations: "disabled" });

        manifest.push({
          route,
          viewport: viewport.name,
          width: viewport.width,
          height: viewport.height,
          status,
          h1: h1 ? h1.trim() : null,
          regionCount,
          sectionCount,
          headingCount,
          overflow,
          screenshot: filename,
        });
      } catch (err) {
        console.error(`  FAILED ${url}:`, err.message);
        manifest.push({
          route,
          viewport: viewport.name,
          width: viewport.width,
          height: viewport.height,
          error: err.message,
          screenshot: null,
        });
      }
    }

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify({ baseUrl: BASE_URL, capturedAt: new Date().toISOString(), entries: manifest, consoleErrors }, null, 2),
  );
  console.log(`\nWrote ${manifest.length} screenshots + manifest to ${OUT_DIR}`);
  console.log(`Console events captured: ${consoleErrors.length}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
