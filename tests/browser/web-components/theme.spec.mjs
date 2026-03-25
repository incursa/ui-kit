import { expect, test } from "@playwright/test";
import { openWebComponentsPage } from "./helpers.mjs";

test("theme switcher updates root theme attributes and persists explicit mode", async ({ page }) => {
    await openWebComponentsPage(page);

    const root = page.locator("html");
    await page.evaluate(() => {
        try {
            window.localStorage.removeItem("inc-theme-mode");
        } catch {
            // Ignore storage restrictions in the browser context.
        }

        const switcher = document.querySelector("#wc-theme-switcher");
        if (switcher && typeof switcher.setMode === "function") {
            switcher.setMode("system");
        }
    });

    await page.evaluate(() => {
        document.querySelector("#wc-theme-switcher")?.setMode("dark");
    });

    await expect(root).toHaveAttribute("data-inc-theme-mode", "dark");
    await expect(root).toHaveAttribute("data-bs-theme", "dark");
    expect(await page.evaluate(() => window.localStorage.getItem("inc-theme-mode"))).toBe("dark");

    await openWebComponentsPage(page, { clearThemeStorage: false });

    await expect(root).toHaveAttribute("data-inc-theme-mode", "dark");
    await expect(root).toHaveAttribute("data-bs-theme", "dark");

    await page.evaluate(() => {
        document.querySelector("#wc-theme-switcher")?.setMode("system");
    });

    await expect(root).toHaveAttribute("data-inc-theme-mode", "system");
    expect(await page.evaluate(() => window.localStorage.getItem("inc-theme-mode"))).toBeNull();
});

test("theme switcher supports keyboard navigation and stable panel rendering", async ({ page }) => {
    await openWebComponentsPage(page);

    const switcher = page.locator("#wc-theme-switcher");
    const summary = switcher.locator("summary");
    const details = switcher.locator("details.inc-theme-switcher");

    await page.evaluate(() => {
        const switcherHost = document.querySelector("#wc-theme-switcher");
        if (switcherHost && typeof switcherHost.setMode === "function") {
            switcherHost.setMode("system");
        }
    });

    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(details).toHaveJSProperty("open", true);

    await expect(details).toHaveScreenshot("wc-theme-switcher-panel.png", {
        animations: "disabled",
        caret: "hide",
    });

    await page.keyboard.press("Escape");
    await expect(summary).toBeFocused();
});
