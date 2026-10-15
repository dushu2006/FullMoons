import { expect, test } from "@playwright/test";

test("mobile menu opens, navigates, and closes", async ({ page }, testInfo) => {
  // The hamburger button only exists on mobile viewports; this journey is
  // meaningless (and previously failed) on the desktop project.
  test.skip(testInfo.project.name.includes("desktop"), "Mobile menu is only rendered on mobile");

  await page.goto("/");

  const menuButton = page.getByRole("button", { name: /open menu|close menu/i });
  await expect(menuButton).toBeVisible();

  await menuButton.click();
  await expect(page.getByRole("navigation", { name: "Mobile Primary" })).toBeVisible();

  await page
    .getByRole("navigation", { name: "Mobile Primary" })
    .getByRole("link", { name: "Menu", exact: true })
    .click();
  await expect(page).toHaveURL(/#menu/);
  await expect(page.getByRole("heading", { name: "Menu Overview" })).toBeVisible();
  // Navigating from the mobile menu should close it again.
  await expect(page.getByRole("navigation", { name: "Mobile Primary" })).toBeHidden();

  // Escape closes an open mobile menu.
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: "Mobile Primary" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile Primary" })).toBeHidden();
});

test("gallery lightbox opens, navigates and closes with escape", async ({ page }) => {
  await page.goto("/#gallery");

  const openImageButton = page.getByRole("button", { name: /open image 1 in gallery/i });
  await openImageButton.click();

  const dialog = page.getByRole("dialog", { name: "Image gallery lightbox" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("1 / 6")).toBeVisible();

  await page.getByRole("button", { name: "Next image" }).click();
  await expect(dialog.getByText("2 / 6")).toBeVisible();

  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByText("1 / 6")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("contact and directions actions are present and valid", async ({ page }) => {
  await page.goto("/#visit-us");

  const directions = page.getByRole("link", { name: "Get Directions" }).first();
  await expect(directions).toHaveAttribute("href", /google\.com\/maps/);

  const callLink = page.getByRole("link", { name: "Call Restaurant" });
  await expect(callLink).toHaveAttribute("href", /^tel:/);
});

test("menu explorer searches, filters and links to WhatsApp", async ({ page }) => {
  await page.goto("/#menu");

  // Search narrows the highlights down.
  await page.getByLabel(/search menu highlights/i).fill("paneer");
  await expect(page.getByText(/highlights? found/)).toBeVisible();
  await expect(page.getByRole("link", { name: /enquire about paneer butter masala/i })).toHaveAttribute(
    "href",
    /wa\.me\/918106907036/,
  );

  // Clearing restores the full list; the Veg-only toggle hides non-veg items.
  await page.getByRole("button", { name: /clear filters/i }).first().click();
  await page.getByLabel(/veg only/i).check();
  await expect(page.getByText("Chicken Dum Biryani")).toBeHidden();
  await expect(page.getByText("Veg Biryani")).toBeVisible();

  // Category pills filter to a single category.
  await page.getByLabel(/veg only/i).uncheck();
  await page.getByRole("button", { name: "Seafood", exact: true }).first().click();
  await expect(page.getByText("Fish Curry")).toBeVisible();
  await expect(page.getByText("Veg Biryani")).toBeHidden();
});

test("featured card filters the menu explorer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /explore seafood in the menu/i }).click();
  await expect(page).toHaveURL(/#menu/);
  await expect(page.getByText("Prawn Fry")).toBeVisible();
});

test("visit planner validates and builds a WhatsApp enquiry", async ({ page }) => {
  await page.goto("/#visit-us");

  // Submitting without a date shows a validation message.
  await page.getByRole("button", { name: /send enquiry on whatsapp/i }).click();
  await expect(page.getByRole("alert")).toContainText(/choose a visit date/i);

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  await page.getByLabel(/visit date/i).fill(tomorrow);
  await page.getByLabel(/number of guests/i).fill("4");

  // The submit opens WhatsApp in a new tab; assert the fallback link instead
  // of depending on the popup.
  await page.getByRole("button", { name: /send enquiry on whatsapp/i }).click();
  const fallback = page.getByRole("link", { name: /tap here to open it/i });
  await expect(fallback).toBeVisible();
  await expect(fallback).toHaveAttribute("href", /wa\.me\/918106907036\?text=/);
  await expect(fallback).toHaveAttribute("href", /Guests/);
});

test("health endpoint always answers JSON", async ({ request }) => {
  const response = await request.get("/api/health");
  // 200 when a database is configured/reachable, 503 when it is not — but
  // never an import-time crash / HTML error page.
  expect([200, 503]).toContain(response.status());
  const body = await response.json();
  expect(typeof body.ok).toBe("boolean");
});

test("all referenced food images load", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();

  const broken = await page.evaluate(async () => {
    const sources = Array.from(document.images).map((img) => img.currentSrc || img.src);
    const results = await Promise.all(
      [...new Set(sources)].map(async (src) => {
        try {
          const res = await fetch(src, { method: "HEAD" });
          return res.ok ? null : `${src} -> ${res.status}`;
        } catch {
          return `${src} -> fetch failed`;
        }
      }),
    );
    return results.filter(Boolean);
  });
  expect(broken).toEqual([]);
});
