import { test, expect } from "@playwright/test";

const allPages = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/faq",
  "/patient-information",
  "/referring-doctors",
  "/services/root-canal",
  "/services/retreatment",
  "/services/apicoectomy",
  "/services/cracked-teeth",
  "/services/dental-trauma",
  "/services/cbct-imaging",
];

test.describe("Accessibility", () => {
  test("no duplicate h1 tags on any page", async ({ page }) => {
    for (const route of allPages) {
      await page.goto(route);
      const h1Count = await page.locator("h1").count();
      expect(
        h1Count,
        `${route} has ${h1Count} H1 tags (expected 1)`
      ).toBe(1);
    }
  });

  test("all visible images have alt text", async ({ page }) => {
    for (const route of ["/", "/about", "/services", "/contact"]) {
      await page.goto(route);
      const images = page.locator('img:not([aria-hidden="true"])');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const alt = await img.getAttribute("alt");
          expect(
            alt,
            `Image ${i} on ${route} is missing alt text`
          ).toBeTruthy();
        }
      }
    }
  });

  test("buttons have accessible names", async ({ page }) => {
    await page.goto("/");

    const buttons = page.locator("button");
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      if (await btn.isVisible()) {
        const ariaLabel = await btn.getAttribute("aria-label");
        const textContent = (await btn.textContent())?.trim();
        const ariaLabelledBy = await btn.getAttribute("aria-labelledby");

        const hasName =
          (ariaLabel && ariaLabel.trim().length > 0) ||
          (textContent && textContent.length > 0) ||
          (ariaLabelledBy && ariaLabelledBy.trim().length > 0);

        expect(
          hasName,
          `Button ${i} on homepage has no accessible name`
        ).toBeTruthy();
      }
    }
  });

  test("links have accessible names", async ({ page }) => {
    await page.goto("/");

    const links = page.locator("a");
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      if (await link.isVisible()) {
        const ariaLabel = await link.getAttribute("aria-label");
        const textContent = (await link.textContent())?.trim();
        const ariaLabelledBy = await link.getAttribute("aria-labelledby");
        const hasImage = (await link.locator("img[alt]").count()) > 0;
        const hasSvgTitle = (await link.locator("svg title").count()) > 0;

        const hasName =
          (ariaLabel && ariaLabel.trim().length > 0) ||
          (textContent && textContent.length > 0) ||
          (ariaLabelledBy && ariaLabelledBy.trim().length > 0) ||
          hasImage ||
          hasSvgTitle;

        expect(
          hasName,
          `Link ${i} on homepage has no accessible name`
        ).toBeTruthy();
      }
    }
  });

  test("skip-to-content link exists on every page", async ({ page }) => {
    for (const route of ["/", "/about", "/services", "/contact"]) {
      await page.goto(route);
      const skipLink = page.locator('a[href="#main-content"]');
      await expect(skipLink).toBeAttached();
    }
  });
});
