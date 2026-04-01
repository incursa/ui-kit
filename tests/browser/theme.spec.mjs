import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

test("manual theme controls persist explicit selection and cycle back to system", async ({ page }) => {
    await openPage(page, "reference.html");
    await page.evaluate(() => {
        try {
            window.localStorage.clear();
        } catch {
            // Ignore storage restrictions in the browser context.
        }
    });
    await page.reload();

    const root = page.locator("html");
    const manualSwitcher = page.locator(".inc-theme-toggle").first();
    const darkButton = manualSwitcher.locator('[data-inc-theme-mode="dark"]');
    const cycleButton = manualSwitcher.locator("[data-inc-theme-toggle]");

    await darkButton.click();

    await expect(root).toHaveAttribute("data-inc-theme-mode", "dark");
    await expect(root).toHaveAttribute("data-bs-theme", "dark");
    await expect(darkButton).toHaveAttribute("aria-pressed", "true");
    expect(await page.evaluate(() => window.localStorage.getItem("inc-theme-mode"))).toBe("dark");

    await page.reload();

    await expect(root).toHaveAttribute("data-inc-theme-mode", "dark");
    await expect(root).toHaveAttribute("data-bs-theme", "dark");
    await expect(manualSwitcher.locator('[data-inc-theme-mode="dark"]')).toHaveAttribute("aria-pressed", "true");

    await cycleButton.click();

    await expect(root).toHaveAttribute("data-inc-theme-mode", "system");
    expect(await page.evaluate(() => window.localStorage.getItem("inc-theme-mode"))).toBeNull();
});

test("system mode follows the browser preference", async ({ page }) => {
    await page.addInitScript(() => {
        try {
            window.localStorage.clear();
        } catch {
            // Ignore storage restrictions in the browser context.
        }
    });

    await page.emulateMedia({ colorScheme: "dark" });
    await openPage(page, "reference.html");

    const root = page.locator("html");
    const systemButton = page.locator('.inc-theme-toggle [data-inc-theme-mode="system"]').first();

    await systemButton.click();
    await expect(root).toHaveAttribute("data-inc-theme-mode", "system");
    await expect(root).toHaveAttribute("data-bs-theme", "dark");

    await page.emulateMedia({ colorScheme: "light" });
    await expect(root).toHaveAttribute("data-bs-theme", "light");
});

test("dark themed highlighted data grid rows keep readable text", async ({ page }) => {
    await page.addInitScript(() => {
        try {
            window.localStorage.setItem("inc-theme-mode", "dark");
        } catch {
            // Ignore storage restrictions in the browser context.
        }
    });

    await openPage(page, "data-grid-advanced.html");

    const root = page.locator("html");
    const highlightedRows = page.locator(
        ".inc-table__row--selected, .inc-table__row--warning, .inc-table__row--danger, .inc-table__row--locked",
    );

    await expect(root).toHaveAttribute("data-bs-theme", "dark");
    await expect(highlightedRows.first()).toBeVisible();

    const rowColors = await highlightedRows.evaluateAll((rows) =>
        rows.map((row) => {
            const cell = row.querySelector(".inc-table__cell--data") || row.querySelector(".inc-table__cell") || row;
            return window.getComputedStyle(cell).color;
        }),
    );

    for (const color of rowColors) {
        expect(color).not.toBe("rgb(18, 19, 22)");
    }
});

test("mounted navbar switcher exposes radio semantics and restores focus on escape", async ({ page }) => {
    await page.addInitScript(() => {
        try {
            window.localStorage.clear();
        } catch {
            // Ignore storage restrictions in the browser context.
        }
    });

    await openPage(page, "index.html");

    const root = page.locator("html");
    const switcher = page.locator(".inc-navbar__utilities details.inc-theme-switcher").first();
    const summary = switcher.locator("summary");
    const status = switcher.locator('[data-inc-theme-label="status"]');
    const darkOption = switcher.locator('.inc-theme-switcher__panel [data-inc-theme-mode="dark"]');

    await expect(switcher).toBeVisible();
    await expect(summary).toBeVisible();
    await expect(status).toContainText(/Light|Dark|System/);

    await summary.click();
    await expect(darkOption).toHaveAttribute("role", "menuitemradio");

    await darkOption.click();

    await expect(root).toHaveAttribute("data-inc-theme-mode", "dark");
    await expect(root).toHaveAttribute("data-bs-theme", "dark");
    await expect(status).toHaveText("Dark");

    await summary.click();
    await darkOption.focus();
    await page.keyboard.press("Escape");

    await expect(summary).toBeFocused();
});
