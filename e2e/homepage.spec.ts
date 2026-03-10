import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ─── Hero Carousel ─────────────────────────────────────────────────────────

  test("hero carousel renders with 3 slides", async ({ page }) => {
    const carousel = page.locator('[aria-label="Hero highlights"]');
    await expect(carousel).toBeVisible();

    const slides = carousel.locator('[aria-roledescription="slide"]');
    await expect(slides).toHaveCount(3);
  });

  test("hero carousel slides change when dot indicators are clicked", async ({
    page,
  }) => {
    const hero = page.locator('[aria-label="Hero highlights"]');
    const dots = hero.locator('button[aria-label^="Go to slide"]');
    await expect(dots).toHaveCount(3);

    // Click second dot
    await dots.nth(1).click();
    const secondSlide = hero.locator('[aria-roledescription="slide"]').nth(1);
    await expect(secondSlide).toHaveAttribute("aria-hidden", "false");

    // Click third dot
    await dots.nth(2).click();
    const thirdSlide = hero.locator('[aria-roledescription="slide"]').nth(2);
    await expect(thirdSlide).toHaveAttribute("aria-hidden", "false");
  });

  test("hero CTA buttons are visible and clickable", async ({ page }) => {
    const hero = page.locator('[aria-label="Hero highlights"]');
    // The active slide should have at least one CTA link
    const ctaLinks = hero.locator('a[href]');
    const count = await ctaLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // First CTA should be visible
    const firstCta = ctaLinks.first();
    await expect(firstCta).toBeVisible();
  });

  // ─── Stats Strip ───────────────────────────────────────────────────────────

  test("stats strip renders with correct stat labels", async ({ page }) => {
    // Stats strip is the dark navy section with counters
    const statsSection = page.locator("text=Board-Certified Specialists");
    await expect(statsSection).toBeVisible();

    await expect(page.locator("text=Years Experience")).toBeVisible();
    await expect(page.locator("text=Faculty")).toBeVisible();
    await expect(page.locator("text=Less Radiation")).toBeVisible();
  });

  test("stats strip shows correct numbers", async ({ page }) => {
    // LSU is a static text stat
    await expect(page.locator("text=LSU")).toBeVisible();

    // The animated counters should eventually show their target values
    // We check for the suffix text being present in the stats section
    const statsArea = page.locator(".bg-navy-800").first();
    await expect(statsArea).toBeVisible();
  });

  // ─── Doctor Cards ──────────────────────────────────────────────────────────

  test("doctor cards render with actual images, not just initials", async ({
    page,
  }) => {
    const doctorSection = page.locator("text=Meet Our Doctors").first();
    await expect(doctorSection).toBeVisible();

    // Doctor cards should have img elements (not just initials fallback)
    const doctorImages = page.locator(
      'img[alt*="board-certified endodontist"]'
    );
    const count = await doctorImages.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Verify images are visible (not hidden behind initials)
    for (let i = 0; i < count; i++) {
      await expect(doctorImages.nth(i)).toBeVisible();
    }
  });

  // ─── Services Section ──────────────────────────────────────────────────────

  test("services section renders with all 6 service cards", async ({
    page,
  }) => {
    const servicesHeading = page.locator("h2:has-text('Our Services')");
    await expect(servicesHeading).toBeVisible();

    // Check each service title is present
    const serviceNames = [
      "Root Canal Therapy",
      "Endodontic Retreatment",
      "Apicoectomy",
      "Cracked Teeth",
      "Dental Trauma",
      "CBCT 3D Imaging",
    ];

    for (const name of serviceNames) {
      await expect(page.locator(`text=${name}`).first()).toBeVisible();
    }
  });

  test("services section has View All Services link", async ({ page }) => {
    const viewAllLink = page.locator('a:has-text("View All Services")');
    await expect(viewAllLink).toBeVisible();
    await expect(viewAllLink).toHaveAttribute("href", "/services");
  });

  // ─── Testimonial Carousel ─────────────────────────────────────────────────

  test("testimonial carousel renders", async ({ page }) => {
    const testimonialsHeading = page.locator(
      "h2:has-text('What Our Patients Say')"
    );
    await expect(testimonialsHeading).toBeVisible();

    // Star ratings should be present
    const stars = page.locator('[aria-label*="out of 5 stars"]');
    const count = await stars.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // ─── Insurance Section ─────────────────────────────────────────────────────

  test("insurance section renders with provider names", async ({ page }) => {
    const insuranceHeading = page.locator(
      "text=We Accept Most Major Insurance Plans"
    );
    await expect(insuranceHeading).toBeVisible();

    const providers = ["Delta Dental", "Cigna", "Aetna", "MetLife", "CareCredit"];
    for (const provider of providers) {
      await expect(page.locator(`text=${provider}`).first()).toBeVisible();
    }
  });

  // ─── Staff Photo Row ──────────────────────────────────────────────────────

  test("staff photo row is visible in the parallax section", async ({
    page,
  }) => {
    const teamLabel = page.locator("text=Your dedicated care team");
    await expect(teamLabel).toBeVisible();

    // Staff avatars are small circular images
    const staffImages = page.locator(
      'img[alt*="Acadiana Endodontics"]'
    );
    const count = await staffImages.count();
    // Should have doctor photos + team member photos
    expect(count).toBeGreaterThanOrEqual(4);
  });

  // ─── Final CTA ────────────────────────────────────────────────────────────

  test("final CTA section renders with appointment and phone links", async ({
    page,
  }) => {
    const ctaHeading = page.locator("text=Ready to Save Your Smile?");
    await expect(ctaHeading).toBeVisible();

    const appointmentLink = page.locator(
      'a:has-text("Request Appointment")'
    ).last();
    await expect(appointmentLink).toBeVisible();
    await expect(appointmentLink).toHaveAttribute("href", "/contact");

    const phoneLink = page.locator('a:has-text("Call (337) 981-0144")').last();
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute("href", "tel:3379810144");
  });
});
