import { expect, test } from "@playwright/test";

async function navigateAndSkipIntro(page, url = "/") {
  const response = await page.goto(url);
  await page.waitForFunction(() => {
    const intro = document.querySelector("[data-brand-intro]");
    return (
      document.body.classList.contains("brand-intro-running") ||
      !intro ||
      getComputedStyle(intro).display === "none"
    );
  });
  const skipButton = page.getByRole("button", { name: "Skip intro" });
  if (await skipButton.isVisible().catch(() => false)) await skipButton.click();
  return response;
}

test("intro exposes an immediate skip and does not replay on section navigation", async ({
  page,
}) => {
  await page.goto("/");

  const dialog = page.getByRole("dialog", {
    name: "FULL MOONs Family Restaurant logo introduction",
  });
  const skipButton = page.getByRole("button", { name: "Skip intro" });
  await expect(dialog).toBeVisible();
  await expect(skipButton).toBeVisible();
  await expect(skipButton).toHaveCSS("min-height", "44px");
  await page.waitForFunction(() =>
    document.body.classList.contains("brand-intro-running"),
  );
  await skipButton.click();

  await expect(dialog).toBeHidden();
  await expect(page.locator("[data-brand-logo]")).toBeVisible();
  expect(
    await page.evaluate(() => ({
      overflow: document.documentElement.style.overflow,
      paddingRight: document.body.style.paddingRight,
      inert: document.querySelector("main")?.inert ?? false,
      completion: sessionStorage.getItem("fullmoons:brand-intro:complete:v1"),
    })),
  ).toEqual({ overflow: "", paddingRight: "", inert: false, completion: "1" });

  const mobileMenu = page.getByRole("button", { name: "Open menu" });
  if (await mobileMenu.isVisible()) {
    await mobileMenu.click();
    await page
      .getByRole("navigation", { name: "Mobile Primary" })
      .getByRole("link", { name: "Menu", exact: true })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Menu", exact: true })
      .click();
  }

  await expect(page).toHaveURL(/#menu$/);
  await expect(
    page.getByRole("heading", { name: "Menu Overview" }),
  ).toBeVisible();
  await expect(dialog).toBeHidden();
});

test("intro completes at the measured responsive header logo position", async ({
  page,
}, testInfo) => {
  const width = testInfo.project.name.includes("mobile") ? 320 : 1440;
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");

  const dialog = page.getByRole("dialog", {
    name: "FULL MOONs Family Restaurant logo introduction",
  });
  await expect(dialog).toBeVisible();
  await page.waitForFunction(
    () => {
      const movingLogo = document.querySelector("[data-brand-intro-logo]");
      const headerLogo = document.querySelector("[data-brand-logo]");
      if (
        !(movingLogo instanceof HTMLElement) ||
        !(headerLogo instanceof HTMLElement)
      )
        return false;
      const moving = movingLogo.getBoundingClientRect();
      const target = headerLogo.getBoundingClientRect();
      return (
        Math.abs(moving.left - target.left) < 2 &&
        Math.abs(moving.top - target.top) < 2 &&
        Math.abs(moving.width - target.width) < 2 &&
        Math.abs(moving.height - target.height) < 2
      );
    },
    null,
    { polling: "raf", timeout: 8_000 },
  );

  await expect(dialog).toBeHidden({ timeout: 2_000 });
  await expect(page.locator("[data-brand-logo]")).toBeVisible();
  expect(
    await page.evaluate(() =>
      document.body.classList.contains("brand-intro-running"),
    ),
  ).toBe(false);
  expect(
    await page.evaluate(() => document.querySelector("main")?.inert ?? false),
  ).toBe(false);

  // Completion is persisted for this tab; a fresh section URL does not replay it.
  await page.goto("/#menu");
  await expect(dialog).toBeHidden();
  await expect(
    page.getByRole("heading", { name: "Menu Overview" }),
  ).toBeVisible();
});

test("reduced motion bypasses the introduction without locking the page", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("dialog", {
      name: "FULL MOONs Family Restaurant logo introduction",
    }),
  ).toBeHidden();
  await expect(page.locator("[data-brand-logo]")).toBeVisible();
  expect(
    await page.evaluate(() =>
      document.body.classList.contains("brand-intro-running"),
    ),
  ).toBe(false);
  expect(
    await page.evaluate(() => document.querySelector("main")?.inert ?? false),
  ).toBe(false);
});

test("homepage remains available when client scripting is disabled", async ({
  browser,
  baseURL,
}, testInfo) => {
  test.skip(
    testInfo.project.name.includes("mobile"),
    "The no-script fallback only needs one browser project",
  );

  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(".brand-intro")).toBeHidden();
    await expect(
      page.getByRole("heading", { name: "Discover Your Next Favourite Dish." }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test("intro fails open if SVG path measurement is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    SVGPathElement.prototype.getTotalLength = () => {
      throw new Error("SVG path metrics unavailable");
    };
  });
  await page.goto("/");

  await expect(
    page.getByRole("dialog", {
      name: "FULL MOONs Family Restaurant logo introduction",
    }),
  ).toBeHidden({ timeout: 3_000 });
  await expect(page.locator("[data-brand-logo]")).toBeVisible();
  expect(
    await page.evaluate(() =>
      document.body.classList.contains("brand-intro-running"),
    ),
  ).toBe(false);
  expect(
    await page.evaluate(() => document.querySelector("main")?.inert ?? false),
  ).toBe(false);
});

test("Escape safely interrupts an in-progress intro and restores page interaction", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("dialog", {
      name: "FULL MOONs Family Restaurant logo introduction",
    }),
  ).toBeVisible();
  await page.waitForFunction(() =>
    document.body.classList.contains("brand-intro-running"),
  );
  await page.waitForTimeout(950);
  await page.keyboard.press("Escape");

  await expect(
    page.getByRole("dialog", {
      name: "FULL MOONs Family Restaurant logo introduction",
    }),
  ).toBeHidden();
  await expect(page.locator("[data-brand-logo]")).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.style.overflow),
  ).toBe("");
  expect(
    await page.evaluate(() => document.querySelector("main")?.inert ?? false),
  ).toBe(false);
});

test("mobile menu opens, navigates, and closes", async ({ page }, testInfo) => {
  // The hamburger button only exists on mobile viewports; this journey is
  // meaningless (and previously failed) on the desktop project.
  test.skip(
    testInfo.project.name.includes("desktop"),
    "Mobile menu is only rendered on mobile",
  );

  await navigateAndSkipIntro(page, "/");

  const menuButton = page.getByRole("button", {
    name: /open menu|close menu/i,
  });
  await expect(menuButton).toBeVisible();

  await menuButton.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile Primary" }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: "Mobile Primary" })
    .getByRole("link", { name: "Menu", exact: true })
    .click();
  await expect(page).toHaveURL(/#menu/);
  await expect(
    page.getByRole("heading", { name: "Menu Overview" }),
  ).toBeVisible();
  // Navigating from the mobile menu should close it again.
  await expect(
    page.getByRole("navigation", { name: "Mobile Primary" }),
  ).toBeHidden();

  // Escape closes an open mobile menu.
  await menuButton.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile Primary" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Mobile Primary" }),
  ).toBeHidden();
});

test("brand header stays balanced across mobile, tablet and desktop widths", async ({
  page,
}) => {
  await navigateAndSkipIntro(page, "/");
  await page.waitForFunction(() => {
    const logo = document.querySelector("header img");
    return (
      logo instanceof HTMLImageElement && logo.complete && logo.naturalWidth > 0
    );
  });

  for (const width of [320, 360, 375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });

    const layout = await page.evaluate(() => {
      const header = document.querySelector("header");
      const row = header?.firstElementChild;
      const logo = header?.querySelector("img");
      const menuButton = header?.querySelector("button");
      const desktopNav = header?.querySelector('nav[aria-label="Primary"]');
      const desktopCta = Array.from(header?.querySelectorAll("a") ?? []).find(
        (link) => link.textContent?.includes("Explore Menu"),
      );
      const hero = document.querySelector("#home");
      const rect = (element) => element?.getBoundingClientRect();
      const logoRect = rect(logo);
      const rowRect = rect(row);
      const headerRect = rect(header);
      const heroRect = rect(hero);

      return {
        logoLoaded: Boolean(logo?.complete && logo.naturalWidth > 0),
        logoRatio: logoRect ? logoRect.width / logoRect.height : 0,
        logoRight: logoRect?.right ?? 0,
        menuVisible: Boolean(menuButton?.getClientRects().length),
        menuLeft: rect(menuButton)?.left ?? 0,
        desktopNavVisible: Boolean(desktopNav?.getClientRects().length),
        desktopCtaVisible: Boolean(desktopCta?.getClientRects().length),
        rowHeight: rowRect?.height ?? 0,
        heroTop: heroRect?.top ?? 0,
        headerBottom: headerRect?.bottom ?? 0,
        headerOverflow: Boolean(row && row.scrollWidth > row.clientWidth),
        documentWidth: document.documentElement.scrollWidth,
      };
    });

    expect(layout.logoLoaded, `logo should load at ${width}px`).toBe(true);
    expect(
      layout.logoRatio,
      `logo should keep its proportions at ${width}px`,
    ).toBeCloseTo(1200 / 355, 2);
    expect(
      layout.headerOverflow,
      `header should not overflow at ${width}px`,
    ).toBe(false);
    expect(
      layout.documentWidth,
      `page should not overflow at ${width}px`,
    ).toBeLessThanOrEqual(width);
    expect(
      layout.heroTop,
      `hero should begin below the header at ${width}px`,
    ).toBeGreaterThanOrEqual(layout.headerBottom - 1);

    if (width < 768) {
      expect(
        layout.menuVisible,
        `mobile menu button should show at ${width}px`,
      ).toBe(true);
      expect(
        layout.desktopNavVisible,
        `desktop links should be hidden at ${width}px`,
      ).toBe(false);
      expect(
        layout.desktopCtaVisible,
        `desktop CTA should be hidden at ${width}px`,
      ).toBe(false);
      expect(
        layout.logoRight,
        `logo should not overlap the menu button at ${width}px`,
      ).toBeLessThan(layout.menuLeft);
    } else {
      expect(
        layout.menuVisible,
        `mobile menu button should be hidden at ${width}px`,
      ).toBe(false);
      expect(
        layout.desktopNavVisible,
        `desktop links should show at ${width}px`,
      ).toBe(true);
      expect(
        layout.desktopCtaVisible,
        `desktop CTA should show at ${width}px`,
      ).toBe(true);
    }

    const expectedRowHeight =
      width < 768 ? 72 : width < 1024 ? 84 : width < 1280 ? 92 : 96;
    expect(
      layout.rowHeight,
      `header row should use the intended height at ${width}px`,
    ).toBe(expectedRowHeight);
  }
});

test("gallery lightbox opens, navigates and closes with escape", async ({
  page,
}) => {
  await navigateAndSkipIntro(page, "/#gallery");

  const openImageButton = page.getByRole("button", {
    name: /open image 1 in gallery/i,
  });
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

test("contact and directions actions are present and valid", async ({
  page,
}) => {
  await navigateAndSkipIntro(page, "/#visit-us");

  const directions = page.getByRole("link", { name: "Get Directions" }).first();
  await expect(directions).toHaveAttribute("href", /google\.com\/maps/);

  const callLink = page.getByRole("link", { name: "Call Restaurant" });
  await expect(callLink).toHaveAttribute("href", /^tel:/);
});

test("menu explorer searches, filters and links to WhatsApp", async ({
  page,
}) => {
  await navigateAndSkipIntro(page, "/#menu");

  // Search narrows the highlights down.
  await page.getByLabel(/search menu highlights/i).fill("paneer");
  await expect(page.getByText(/highlights? found/)).toBeVisible();
  await expect(
    page.getByRole("link", { name: /enquire about paneer butter masala/i }),
  ).toHaveAttribute("href", /wa\.me\/918106907036/);

  // Clearing restores the full list; the Veg-only toggle hides non-veg items.
  await page
    .getByRole("button", { name: /clear filters/i })
    .first()
    .click();
  const vegSwitch = page.getByRole("switch", { name: /veg only/i });
  await vegSwitch.click();
  await expect(vegSwitch).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("Chicken Dum Biryani")).toBeHidden();
  await expect(page.getByText("Veg Biryani", { exact: true })).toBeVisible();

  // Category pills filter to a single category and auto-scroll the
  // highlights into view.
  await vegSwitch.click();
  await expect(vegSwitch).toHaveAttribute("aria-checked", "false");
  await page
    .getByRole("button", { name: "Seafood", exact: true })
    .first()
    .click();
  await expect(page.getByText("Fish Curry", { exact: true })).toBeVisible();
  await expect(page.getByText("Veg Biryani", { exact: true })).toBeHidden();
  await expect
    .poll(() =>
      page.evaluate(() => {
        const el = document.querySelector("#menu-highlights");
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= -20 && rect.top < window.innerHeight;
      }),
    )
    .toBe(true);
});

test("featured card filters the menu explorer", async ({ page }) => {
  await navigateAndSkipIntro(page, "/");
  await page
    .getByRole("button", { name: /explore seafood in the menu/i })
    .click();
  await expect(page).toHaveURL(/#menu/);
  await expect(page.getByText("Prawn Fry")).toBeVisible();
});

test("visit planner validates and builds a WhatsApp enquiry", async ({
  page,
}) => {
  await navigateAndSkipIntro(page, "/#visit-us");

  // Submitting without a date shows a validation message.
  await page.getByRole("button", { name: /send enquiry on whatsapp/i }).click();
  await expect(page.locator('#visit-us p[role="alert"]')).toContainText(
    /choose a visit date/i,
  );

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
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
  const response = await navigateAndSkipIntro(page, "/");
  expect(response?.ok()).toBeTruthy();

  const broken = await page.evaluate(async () => {
    const sources = Array.from(document.images).map(
      (img) => img.currentSrc || img.src,
    );
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
