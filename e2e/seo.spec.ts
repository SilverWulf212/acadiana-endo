import { test, expect } from "@playwright/test";

test.describe("SEO & Meta", () => {
  test("homepage has correct meta tags", async ({ page }) => {
    await page.goto("/");

    // Title
    const title = await page.title();
    expect(title).toContain("Acadiana Endodontics");

    // Meta description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /endodont/i);

    // Canonical
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toBeAttached();
  });

  test("each page has unique title", async ({ page }) => {
    const pageTitles: Record<string, string> = {};
    const routes = ["/", "/about", "/services", "/contact", "/faq"];

    for (const route of routes) {
      await page.goto(route);
      const title = await page.title();
      expect(title).toBeTruthy();
      // Ensure titles are unique
      for (const [prevRoute, prevTitle] of Object.entries(pageTitles)) {
        expect(title, `${route} has same title as ${prevRoute}`).not.toBe(
          prevTitle
        );
      }
      pageTitles[route] = title;
    }
  });

  test("JSON-LD schema markup is present", async ({ page }) => {
    await page.goto("/");
    const schemas = page.locator('script[type="application/ld+json"]');
    const count = await schemas.count();
    expect(count).toBeGreaterThan(0);

    // Parse and validate first schema
    const content = await schemas.first().textContent();
    expect(content).toBeTruthy();
    const parsed = JSON.parse(content!);
    expect(parsed["@context"]).toBe("https://schema.org");
  });

  test("sitemap is accessible", async ({ page }) => {
    const res = await page.goto("/sitemap.xml");
    expect(res?.status()).toBe(200);
    const content = await page.content();
    expect(content).toContain("<urlset");
  });

  test("robots.txt is accessible", async ({ page }) => {
    const res = await page.goto("/robots.txt");
    expect(res?.status()).toBe(200);
  });

  test("llms.txt endpoint returns content", async ({ page }) => {
    const res = await page.goto("/llms.txt");
    expect(res?.status()).toBe(200);
  });

  test("images have alt attributes", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img:not([aria-hidden='true'])");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(
        alt,
        `Image ${i} is missing alt text`
      ).toBeTruthy();
    }
  });

  test("heading hierarchy is correct (single H1 per page)", async ({
    page,
  }) => {
    const routes = ["/", "/about", "/services", "/contact", "/faq"];

    for (const route of routes) {
      await page.goto(route);
      const h1Count = await page.locator("h1").count();
      expect(
        h1Count,
        `${route} has ${h1Count} H1 tags (expected 1)`
      ).toBe(1);
    }
  });
});
