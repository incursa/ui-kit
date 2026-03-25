import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

test("demo showcase presents the CSS-first baseline and palette", async ({ page }) => {
    await openPage(page, "demo.html");

    const comparison = page.locator("#demo-comparison");
    const palette = page.locator("#demo-palette");

    await expect(page.getByRole("heading", { name: "Data-heavy home screen" })).toBeVisible();
    await expect(comparison).toContainText("Plain HTML / CSS-first");
    await expect(comparison).toContainText("Web Components counterpart");
    await expect(page.locator("table.inc-table").first()).toBeVisible();
    await expect(page.locator(".demo-swatch")).toHaveCount(6);
    await expect(palette).toContainText("Primary");
    await expect(palette).toContainText("Surface");

    await expect(comparison).toHaveScreenshot("demo-comparison.png", {
        animations: "disabled",
    });
});

test("web components showcase presents the layered counterpart and shared vocabulary", async ({ page }) => {
    await openPage(page, "web-components.html");

    const comparison = page.locator("#wc-comparison");

    await expect(page.getByRole("heading", { name: "Browser-native components that stay inside the same CSS kit." })).toBeVisible();
    await expect(page.locator("inc-app-shell#wc-shell")).toBeVisible();
    await expect(comparison).toContainText("Plain HTML equivalent");
    await expect(comparison).toContainText("Web Components equivalent");
    await expect(page.locator("inc-tabs#wc-tabs")).toBeVisible();
    await expect(page.locator("table.inc-table").first()).toBeVisible();
    await expect(page.locator(".demo-swatch")).toHaveCount(4);
    await expect(page.locator("#wc-data-presentation")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Tables, colors, and buttons stay CSS-first" })).toBeVisible();

    await expect(comparison).toHaveScreenshot("wc-comparison.png", {
        animations: "disabled",
    });
});
