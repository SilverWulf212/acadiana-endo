import { test, expect } from "@playwright/test";

test.describe("Appointment Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("form renders with all required fields", async ({ page }) => {
    await expect(page.locator("#fullName")).toBeVisible();
    await expect(page.locator("#phone")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#preferredDate")).toBeVisible();
    await expect(page.locator("#preferredTime")).toBeVisible();
    await expect(page.locator("#reason")).toBeVisible();
  });

  test("shows validation errors for empty required fields", async ({ page }) => {
    await page.click('button:has-text("Request Appointment")');

    await expect(page.locator("text=Full name is required")).toBeVisible();
    await expect(page.locator("text=Phone number is required")).toBeVisible();
    await expect(page.locator("text=Email address is required")).toBeVisible();
  });

  test("shows email validation error for invalid email", async ({ page }) => {
    await page.fill("#fullName", "Test User");
    await page.fill("#phone", "3375550100");
    await page.fill("#email", "not-an-email");
    await page.click('button:has-text("Request Appointment")');

    await expect(
      page.locator("text=Please enter a valid email address")
    ).toBeVisible();
  });

  test("phone number auto-formats as user types", async ({ page }) => {
    await page.fill("#phone", "3375550100");
    const value = await page.inputValue("#phone");
    expect(value).toBe("(337) 555-0100");
  });

  test("honeypot field is hidden from view", async ({ page }) => {
    const honeypot = page.locator("#website");
    await expect(honeypot).toBeAttached();
    // The parent container should be positioned off-screen
    const parent = page.locator('[aria-hidden="true"]:has(#website)');
    await expect(parent).toBeAttached();
  });
});

test.describe("Referral Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/referring-doctors");
  });

  test("form renders with all required fields", async ({ page }) => {
    await expect(page.locator("#doctorName")).toBeVisible();
    await expect(page.locator("#doctorPhone")).toBeVisible();
    await expect(page.locator("#doctorEmail")).toBeVisible();
    await expect(page.locator("#patientName")).toBeVisible();
    await expect(page.locator("#reason")).toBeVisible();
  });

  test("shows validation errors for empty required fields", async ({ page }) => {
    await page.click('button:has-text("Submit Referral")');

    await expect(
      page.locator("text=Referring doctor name is required")
    ).toBeVisible();
    await expect(page.locator("text=Phone number is required")).toBeVisible();
    await expect(page.locator("text=Email address is required")).toBeVisible();
    await expect(page.locator("text=Patient name is required")).toBeVisible();
  });

  test("urgency radio buttons are functional", async ({ page }) => {
    // Click the label wrapping the urgent radio
    await page.locator('label:has(input[value="urgent"])').click();
    const urgentRadio = page.locator('input[name="urgency"][value="urgent"]');
    await expect(urgentRadio).toBeChecked();

    // Click the label wrapping the emergency radio
    await page.locator('label:has(input[value="emergency"])').click();
    const emergencyRadio = page.locator(
      'input[name="urgency"][value="emergency"]'
    );
    await expect(emergencyRadio).toBeChecked();
  });
});
