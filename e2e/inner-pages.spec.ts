import { test, expect } from "@playwright/test";

const innerPages = [
  {
    path: "/about",
    headingPattern: /About|Meet Our|Our Endodontists/,
  },
  {
    path: "/services",
    headingPattern: /Services|Our Services/,
  },
  {
    path: "/contact",
    headingPattern: /Contact/,
  },
  {
    path: "/faq",
    headingPattern: /Frequently Asked|FAQ/,
  },
  {
    path: "/patient-information",
    headingPattern: /Patient Information/,
  },
  {
    path: "/referring-doctors",
    headingPattern: /Referring Doctors|Refer a Patient/,
  },
];

test.describe("Inner Pages", () => {
  for (const pg of innerPages) {
    test(`${pg.path} loads with a single H1`, async ({ page }) => {
      const res = await page.goto(pg.path);
      expect(res?.status()).toBe(200);

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toBeVisible();

      const h1Text = await h1.textContent();
      expect(h1Text).toMatch(pg.headingPattern);
    });

    test(`${pg.path} has a PageHero section containing the H1`, async ({
      page,
    }) => {
      await page.goto(pg.path);

      // PageHero is the first <section> inside <main>.
      const heroSection = page.locator("main section").first();
      await expect(heroSection).toBeVisible();

      const h1InHero = heroSection.locator("h1");
      await expect(h1InHero).toBeVisible();
    });

    test(`${pg.path} has breadcrumb navigation`, async ({ page }) => {
      await page.goto(pg.path);

      const breadcrumbs = page.locator("nav[aria-label='Breadcrumb']");
      await expect(breadcrumbs).toBeVisible();

      // Every inner-page breadcrumb should link back to Home.
      const homeLink = breadcrumbs.locator('a[href="/"]').first();
      await expect(homeLink).toBeVisible();
    });

    test(`${pg.path} has at least one contact CTA`, async ({ page }) => {
      await page.goto(pg.path);

      const ctaLinks = page.locator('a[href="/contact"], a[href^="tel:"]');
      const count = await ctaLinks.count();
      expect(count).toBeGreaterThanOrEqual(1);
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

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toBeVisible();

      const title = await page.title();
      expect(title).toMatch(sp.titlePattern);
    });

    test(`${sp.path} has a hero section and CTA`, async ({ page }) => {
      await page.goto(sp.path);

      const heroSection = page.locator("main section").first();
      await expect(heroSection).toBeVisible();

      const ctaLinks = page.locator('a[href="/contact"], a[href^="tel:"]');
      const count = await ctaLinks.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test(`${sp.path} has breadcrumb navigation back to /services`, async ({
      page,
    }) => {
      await page.goto(sp.path);

      const breadcrumbs = page.locator("nav[aria-label='Breadcrumb']");
      await expect(breadcrumbs).toBeVisible();

      const servicesLink = breadcrumbs.locator('a[href="/services"]');
      await expect(servicesLink).toBeVisible();
    });
  }
});
