import { test, expect } from "@playwright/test";

const innerPages = [
  {
    path: "/about",
    headingPattern: /About|Meet Our|Our Endodontists/,
    hasHeroImage: true,
  },
  {
    path: "/services",
    headingPattern: /Services|Our Services/,
    hasHeroImage: true,
  },
  {
    path: "/contact",
    headingPattern: /Contact/,
    hasHeroImage: true,
  },
  {
    path: "/faq",
    headingPattern: /Frequently Asked|FAQ/,
    hasHeroImage: true,
  },
  {
    path: "/patient-information",
    headingPattern: /Patient Information/,
    hasHeroImage: true,
  },
  {
    path: "/referring-doctors",
    headingPattern: /Referring Doctors|Refer a Patient/,
    hasHeroImage: true,
  },
];

test.describe("Inner Pages", () => {
  for (const pg of innerPages) {
    test(`${pg.path} loads with proper heading`, async ({ page }) => {
      const res = await page.goto(pg.path);
      expect(res?.status()).toBe(200);

      // Page should have exactly one h1
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toBeVisible();

      // H1 text should match expected pattern
      const h1Text = await h1.textContent();
      expect(h1Text).toMatch(pg.headingPattern);
    });

    test(`${pg.path} has a PageHero section`, async ({ page }) => {
      await page.goto(pg.path);

      // PageHero renders as a section with navy background
      // The h1 is inside it, and it should be the first major section
      const heroSection = page.locator("section").first();
      await expect(heroSection).toBeVisible();

      // Hero should contain the h1
      const h1InHero = heroSection.locator("h1");
      await expect(h1InHero).toBeVisible();
    });
  }
});

test.describe("Service Subpages", () => {
  const servicePages = [
    { path: "/services/root-canal", titlePattern: /Root Canal/ },
    { path: "/services/retreatment", titlePattern: /Retreatment/ },
    { path: "/services/apicoectomy", titlePattern: /Apicoectomy/ },
    { path: "/services/cracked-teeth", titlePattern: /Cracked Teeth/ },
    { path: "/services/dental-trauma", titlePattern: /Dental Trauma/ },
    { path: "/services/cbct-imaging", titlePattern: /CBCT|3D Imaging/ },
  ];

  for (const sp of servicePages) {
    test(`${sp.path} loads with correct content`, async ({ page }) => {
      const res = await page.goto(sp.path);
      expect(res?.status()).toBe(200);

      // Should have exactly one h1
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toBeVisible();

      // Page title should contain service name
      const title = await page.title();
      expect(title).toMatch(sp.titlePattern);
    });

    test(`${sp.path} has a hero section and CTA`, async ({ page }) => {
      await page.goto(sp.path);

      // Hero section exists
      const heroSection = page.locator("section").first();
      await expect(heroSection).toBeVisible();

      // Should have a CTA / contact link somewhere on the page
      const ctaLinks = page.locator('a[href="/contact"], a[href^="tel:"]');
      const count = await ctaLinks.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test(`${sp.path} has breadcrumb navigation`, async ({ page }) => {
      await page.goto(sp.path);

      const breadcrumbs = page.locator("nav[aria-label='Breadcrumb']");
      if (await breadcrumbs.isVisible()) {
        // Breadcrumb should have a link back to services
        const servicesLink = breadcrumbs.locator('a[href="/services"]');
        await expect(servicesLink).toBeVisible();
      }
    });
  }
});
