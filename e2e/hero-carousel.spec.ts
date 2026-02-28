import { test, expect } from "@playwright/test";

test.describe("Hero Carousel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("carousel renders with slides", async ({ page }) => {
    const carousel = page.locator('[aria-label="Hero highlights"]');
    await expect(carousel).toBeVisible();

    const slides = carousel.locator('[aria-roledescription="slide"]');
    const count = await slides.count();
    expect(count).toBe(3);
  });

  test("dot indicators are visible and clickable", async ({ page }) => {
    const hero = page.locator('[aria-label="Hero highlights"]');
    const dots = hero.locator('button[aria-label^="Go to slide"]');
    const count = await dots.count();
    expect(count).toBe(3);

    // Click second dot
    await dots.nth(1).click();

    // Second slide should become active
    const secondSlide = hero.locator('[aria-roledescription="slide"]').nth(1);
    await expect(secondSlide).toHaveAttribute("aria-hidden", "false");
  });

  test("carousel auto-advances", async ({ page }) => {
    const hero = page.locator('[aria-label="Hero highlights"]');
    // First slide should be active initially
    const firstSlide = hero.locator('[aria-roledescription="slide"]').first();
    await expect(firstSlide).toHaveAttribute("aria-hidden", "false");

    // Wait for auto-advance (5 seconds + generous buffer for CI)
    await page.waitForTimeout(7000);

    // First slide should no longer be active
    await expect(firstSlide).toHaveAttribute("aria-hidden", "true", {
      timeout: 3000,
    });
  });

  test("hero background images load", async ({ page }) => {
    const hero = page.locator('[aria-label="Hero highlights"]');
    // Check that hero images are present
    const heroImages = hero.locator("img");
    const count = await heroImages.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
