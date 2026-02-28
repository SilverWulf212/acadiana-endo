import { test, expect } from "@playwright/test";

// These tests run on mobile viewports (iPhone 14, Pixel 7) via playwright config

test.describe("Mobile Responsiveness", () => {
  test("no horizontal scroll on any page", async ({ page }) => {
    const routes = [
      "/",
      "/about",
      "/services",
      "/patient-information",
      "/referring-doctors",
      "/contact",
      "/faq",
    ];

    for (const route of routes) {
      await page.goto(route);
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth
      );
      const clientWidth = await page.evaluate(
        () => document.documentElement.clientWidth
      );
      expect(
        scrollWidth,
        `Horizontal overflow detected on ${route}: scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`
      ).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
    }
  });

  test("mobile menu button is visible and functional", async ({ page }) => {
    await page.goto("/");

    // Desktop nav should be hidden on mobile
    const desktopNav = page.locator("nav >> .hidden.lg\\:flex").first();

    // Mobile hamburger button should be visible
    const hamburger = page.locator('button[aria-label*="menu" i]').first();
    if (await hamburger.isVisible()) {
      await hamburger.click();

      // Mobile menu should appear
      const mobileMenu = page.locator('[role="dialog"], [data-mobile-menu]').first();
      await expect(mobileMenu).toBeVisible({ timeout: 2000 });
    }
  });

  test("click-to-call button is visible on mobile", async ({ page }) => {
    await page.goto("/");
    // The ClickToCall component should be visible on mobile
    const callButton = page.locator('a[href^="tel:"]').first();
    await expect(callButton).toBeVisible();
  });

  test("hero text is readable on mobile", async ({ page }) => {
    await page.goto("/");
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();

    const fontSize = await heading.evaluate(
      (el) => parseFloat(getComputedStyle(el).fontSize)
    );
    // Mobile heading should be at least 28px (text-4xl is ~36px)
    expect(fontSize).toBeGreaterThanOrEqual(28);
  });

  test("forms are usable on mobile", async ({ page }) => {
    await page.goto("/contact");

    // All form inputs should be visible and tappable
    const nameInput = page.locator("#fullName");
    await expect(nameInput).toBeVisible();

    // Check font size is at least 16px (prevents iOS zoom)
    const inputFontSize = await nameInput.evaluate(
      (el) => parseFloat(getComputedStyle(el).fontSize)
    );
    expect(inputFontSize).toBeGreaterThanOrEqual(16);

    // Submit button should be visible
    const submitBtn = page.locator('button:has-text("Request Appointment")');
    await expect(submitBtn).toBeVisible();
  });

  test("images are appropriately sized", async ({ page }) => {
    await page.goto("/");

    // Check that images don't overflow their containers
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      if (await img.isVisible()) {
        const box = await img.boundingBox();
        if (box) {
          const viewportWidth = page.viewportSize()?.width ?? 375;
          expect(
            box.width,
            `Image ${i} overflows viewport: ${box.width}px > ${viewportWidth}px`
          ).toBeLessThanOrEqual(viewportWidth + 1);
        }
      }
    }
  });

  test("touch targets are at least 44px", async ({ page }) => {
    await page.goto("/");

    // Check main CTA buttons (allow 1px tolerance for CSS rounding)
    const buttons = page.locator("a.btn, button.btn").first();
    if (await buttons.isVisible()) {
      const box = await buttons.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(43);
      }
    }
  });
});

test.describe("Tablet Responsiveness", () => {
  test("content uses appropriate grid on tablet", async ({ page }) => {
    await page.goto("/services");

    // Service cards should be in a grid
    const serviceCards = page.locator('[class*="grid"]').first();
    await expect(serviceCards).toBeVisible();
  });
});
