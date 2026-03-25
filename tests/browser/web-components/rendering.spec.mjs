import { expect, test } from "@playwright/test";
import { openWebComponentsPage } from "./helpers.mjs";

test("web components register and render expected light-DOM structure", async ({ page }) => {
    await openWebComponentsPage(page);

    const entrypointLoaded = await page.evaluate(() => typeof window.IncWebComponents?.registerIncWebComponents === "function");
    expect(entrypointLoaded).toBe(true);

    const registrationState = await page.evaluate(() => {
        const required = [
            "inc-app-shell",
            "inc-page",
            "inc-page-header",
            "inc-section",
            "inc-card",
            "inc-summary-overview",
            "inc-summary-block",
            "inc-footer-bar",
            "inc-navbar",
            "inc-tabs",
            "inc-user-menu",
            "inc-field",
            "inc-input-group",
            "inc-choice-group",
            "inc-readonly-field",
            "inc-validation-summary",
            "inc-state-panel",
            "inc-live-region",
            "inc-auto-refresh",
            "inc-theme-switcher",
            "inc-disclosure",
            "inc-dialog",
            "inc-drawer",
        ];

        return required.every((name) => customElements.get(name));
    });
    expect(registrationState).toBe(true);

    await expect(page.locator("#wc-shell")).toHaveClass(/inc-app-shell/);
    await expect(page.locator("#wc-shell-header")).toHaveClass(/inc-app-shell__header/);
    await expect(page.locator("#wc-shell-body")).toHaveClass(/inc-app-shell__main/);
    await expect(page.locator("#wc-page-header")).toHaveClass(/inc-page-header/);
    await expect(page.locator("#wc-card")).toHaveClass(/inc-card/);
    const cardTone = await page.locator("#wc-card").evaluate((host) => host.getAttribute("tone"));
    await expect(page.locator("#wc-card")).toHaveClass(new RegExp(`inc-card--tone-${cardTone}`));
    await expect(page.locator("#wc-card")).toHaveClass(/inc-card--elevated/);

    const summaryColumns = await page.locator("#wc-summary").evaluate((host) => host.style.getPropertyValue("--inc-summary-columns").trim());
    expect(summaryColumns).toBe("3");

    await expect(page.locator("#wc-disclosure details.inc-disclosure")).toBeVisible();
    await expect(page.locator("#wc-validation-summary .inc-form__error-summary-list li")).toHaveCount(2);
    await expect(page.locator("#wc-theme-switcher [data-inc-theme-mode]")).toHaveCount(3);
});

test("layout and forms-feedback regions are visually stable", async ({ page }) => {
    await openWebComponentsPage(page);

    await expect(page.locator("[data-test='layout-region']")).toHaveScreenshot("wc-layout-region.png", {
        animations: "disabled",
        caret: "hide",
    });

    await expect(page.locator("[data-test='forms-feedback-region']")).toHaveScreenshot("wc-forms-feedback-region.png", {
        animations: "disabled",
        caret: "hide",
    });
});
