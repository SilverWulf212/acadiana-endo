import { test, expect } from "@playwright/test";

test.describe("ClickToCall Floating Button", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("floating phone button is visible on mobile", async ({ page }) => {
    await page.goto("/");

    const callButton = page.locator('a[aria-label*="Call"]').first();
    await expect(callButton).toBeVisible();
  });

  test("floating phone button has correct tel: href", async ({ page }) => {
    await page.goto("/");

    const callButton = page.locator('a[aria-label*="Call"]').first();
    await expect(callButton).toBeVisible();

    const href = await callButton.getAttribute("href");
    expect(href).toMatch(/^tel:\d+$/);
    expect(href).toContain("3379810144");
  });

  test("floating phone button is fixed positioned", async ({ page }) => {
    await page.goto("/");

    const callButton = page.locator('a[aria-label*="Call"]').first();
    await expect(callButton).toBeVisible();

    const position = await callButton.evaluate(
      (el) => getComputedStyle(el).position
    );
    expect(position).toBe("fixed");
  });

  test("floating phone button is hidden on desktop", async ({ page }) => {
    // Use a desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    // The ClickToCall component uses md:hidden, so it should not be visible
    const callButton = page.locator('a[aria-label*="Call Acadiana"]');
    // It may be attached but not visible due to md:hidden
    const count = await callButton.count();
    if (count > 0) {
      await expect(callButton).not.toBeVisible();
    }
  });
});
