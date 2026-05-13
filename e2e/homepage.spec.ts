import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ─── Banner / Hero ─────────────────────────────────────────────────────────

  test("page renders with a single H1 containing the practice name", async ({
    page,
  }) => {
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Acadiana Endodontics");
  });

  test("banner has Request an Appointment CTA", async ({ page }) => {
    const cta = page
      .locator('a:has-text("Request an Appointment")')
      .first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/contact");
  });

  test("banner has a tel: phone CTA", async ({ page }) => {
    const phoneCta = page.locator('a[href^="tel:"]').first();
    await expect(phoneCta).toBeVisible();
  });

  // ─── Featured Card Rows ────────────────────────────────────────────────────

  test("featured card rows render with Learn more links", async ({ page }) => {
    // Both home rows (entry points + procedure spotlights) use FeaturedCardRow,
    // which renders default "Learn more about <title>" links per item.
    const learnMore = page.locator('a:has-text("Learn more about")');
    const count = await learnMore.count();
    expect(count).toBeGreaterThanOrEqual(1);
    await expect(learnMore.first()).toBeVisible();
  });

  // ─── Reviews ───────────────────────────────────────────────────────────────

  test("review section heading is visible", async ({ page }) => {
    const reviewHeading = page.locator("h2:has-text('Care, in their own words')");
    await expect(reviewHeading).toBeVisible();
  });

  // ─── Locations ─────────────────────────────────────────────────────────────

  test("locations block heading is visible", async ({ page }) => {
    const locationsHeading = page.locator(
      "h2:has-text('Two locations across Acadiana')"
    );
    await expect(locationsHeading).toBeVisible();
  });

  // ─── Final CTA ────────────────────────────────────────────────────────────

  test("final CTA renders with appointment and phone links", async ({
    page,
  }) => {
    const ctaHeading = page.locator("h2:has-text('Ready to save your tooth?')");
    await expect(ctaHeading).toBeVisible();

    // There may be multiple "Request an Appointment" links on the page
    // (banner + final CTA); both should exist and point to /contact.
    const apptLinks = page.locator('a:has-text("Request an Appointment")');
    const apptCount = await apptLinks.count();
    expect(apptCount).toBeGreaterThanOrEqual(1);
    await expect(apptLinks.last()).toHaveAttribute("href", "/contact");

    const phoneLinks = page.locator('a[href^="tel:"]');
    const phoneCount = await phoneLinks.count();
    expect(phoneCount).toBeGreaterThanOrEqual(1);
  });
});
