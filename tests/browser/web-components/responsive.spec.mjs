import { expect, test } from "@playwright/test";
import { openWebComponentsPage } from "./helpers.mjs";

test("layout composition adapts from desktop to compact viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await openWebComponentsPage(page);

    const shellBody = page.locator("#wc-shell-body");
    const shellContent = page.locator("#wc-shell-content");
    const responsiveRegion = page.locator("[data-test='responsive-region']");

    await expect(shellBody).toHaveClass(/inc-app-shell__body/);
    await expect(shellContent).toHaveCSS("padding-left", "24px");
    await expect(shellContent).toHaveCSS("padding-right", "24px");

    await expect(responsiveRegion).toHaveScreenshot("wc-responsive-wide.png", {
        animations: "disabled",
        caret: "hide",
    });

    await page.setViewportSize({ width: 900, height: 1200 });
    await openWebComponentsPage(page);

    await expect(shellContent).toHaveCSS("padding-left", "16px");
    await expect(shellContent).toHaveCSS("padding-right", "16px");

    await expect(responsiveRegion).toHaveScreenshot("wc-responsive-narrow.png", {
        animations: "disabled",
        caret: "hide",
    });
});
