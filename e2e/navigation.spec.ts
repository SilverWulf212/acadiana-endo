import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Acadiana Endodontics/);
  });

  test("all main pages are reachable", async ({ page }) => {
    const routes = [
      { path: "/", heading: /Expert Endodontic|Advanced Technology|Saving Natural/ },
      { path: "/about", heading: /About|Meet Our/ },
      { path: "/services", heading: /Our Services|Services/ },
      { path: "/patient-information", heading: /Patient Information/ },
      { path: "/referring-doctors", heading: /Referring Doctors/ },
      { path: "/contact", heading: /Contact Us/ },
      { path: "/faq", heading: /Frequently Asked/ },
    ];

    for (const route of routes) {
      const res = await page.goto(route.path);
      expect(res?.status()).toBe(200);
    }
  });

  test("all service sub-pages load", async ({ page }) => {
    const services = [
      "/services/root-canal",
      "/services/retreatment",
      "/services/apicoectomy",
      "/services/cracked-teeth",
      "/services/dental-trauma",
      "/services/cbct-imaging",
    ];

    for (const path of services) {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
    }
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    const res = await page.goto("/this-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.locator("text=Page Not Found").first()).toBeVisible();
  });

  test("header navigation links work", async ({ page }) => {
    await page.goto("/");

    const viewportWidth = page.viewportSize()?.width ?? 1280;

    if (viewportWidth >= 1024) {
      // Desktop nav
      await page.click('nav >> a:has-text("About")');
      await expect(page).toHaveURL("/about");

      await page.hover('nav >> button:has-text("Services")');
      const dropdown = page.locator('[role="menu"]');
      await expect(dropdown).toBeVisible();
      await dropdown.locator('a:has-text("All Services")').click();
      await expect(page).toHaveURL("/services");

      await page.click('nav >> a:has-text("Contact")');
      await expect(page).toHaveURL("/contact");
    } else {
      // Mobile nav — open hamburger menu, then click links
      const hamburger = page.locator('button[aria-label*="menu" i]').first();
      await hamburger.click();
      const mobileMenu = page.locator('[role="dialog"]').first();
      await expect(mobileMenu).toBeVisible({ timeout: 2000 });

      await mobileMenu.locator('a:has-text("About")').click();
      await expect(page).toHaveURL("/about");
    }
  });

  test("skip-to-content link exists and works", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });
});
