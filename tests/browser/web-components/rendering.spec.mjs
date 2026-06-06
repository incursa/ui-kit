import { expect, test } from "@playwright/test";
import { openWebComponentsPage } from "./helpers.mjs";

async function openWebComponentsWithTheme(page, mode) {
    await page.addInitScript((themeMode) => {
        try {
            window.localStorage.setItem("inc-theme-mode", themeMode);
        } catch {
            // Ignore storage restrictions in locked-down contexts.
        }

        const root = document.documentElement;
        root.setAttribute("data-inc-theme-mode", themeMode);
        root.setAttribute("data-bs-theme", themeMode);
        root.style.colorScheme = themeMode;
    }, mode);

    await openWebComponentsPage(page);
}

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
            "inc-button",
            "inc-button-group",
            "inc-button-toolbar",
            "inc-close-button",
            "inc-alert",
            "inc-empty-state",
            "inc-badge",
            "inc-spinner",
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
            "inc-list-group",
            "inc-key-value-grid",
            "inc-key-value",
            "inc-sparkline",
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
    await expect(page.locator("#wc-button-primary")).toHaveClass(/inc-button/);
    await expect(page.locator("#wc-button-primary .inc-button__control")).toHaveClass(/inc-btn--primary/);
    await expect(page.locator("#wc-button-loading .inc-button__control")).toHaveClass(/inc-btn--outline-secondary/);
    await expect(page.locator("#wc-button-loading .inc-button__control")).toHaveClass(/is-loading/);
    await expect(page.locator("#wc-button-loading .inc-button__control")).toHaveAttribute("aria-busy", "true");
    await expect(page.locator("#wc-button-inline-loading .inc-button__control")).toContainText("Publishing");
    await expect(page.locator("#wc-button-inline-loading .inc-spinner")).toHaveCount(1);
    await expect(page.locator("#wc-button-inline-loading-secondary .inc-button__control")).toContainText("Refreshing");
    await expect(page.locator("#wc-button-inline-loading-secondary .inc-spinner")).toHaveCount(1);
    await expect(page.locator("#wc-button-group")).toHaveClass(/inc-button-group--sm/);
    await expect(page.locator("#wc-button-group")).toHaveAttribute("aria-label", "Queue mode");
    await expect(page.locator("#wc-button-toolbar")).toHaveAttribute("role", "toolbar");
    await expect(page.locator("#wc-close-button")).not.toHaveClass(/inc-close-button/);
    await expect(page.locator("#wc-close-button button")).toHaveClass(/inc-close-button/);
    await expect(page.locator("#wc-close-button button")).toHaveAttribute("aria-label", "Dismiss panel");
    await expect(page.locator("#wc-alert-success")).toHaveClass(/inc-alert--success/);
    await expect(page.locator("#wc-alert-success")).toHaveClass(/inc-alert--dismissible/);
    await expect(page.locator("#wc-alert-success [part='progress']")).toHaveCount(1);
    await expect(page.locator("#wc-alert-warning")).toHaveClass(/inc-alert--warning/);
    await expect(page.locator("#wc-alert-warning")).toHaveClass(/inc-alert--dismissible/);
    await expect(page.locator("#wc-empty-state")).toHaveClass(/inc-empty-state/);
    await expect(page.locator("#wc-list-group")).toHaveClass(/inc-list-group/);
    await expect(page.locator("#wc-numbered-list-group")).toHaveClass(/inc-list-group--numbered/);
    await expect(page.locator("#wc-key-value-grid")).toHaveClass(/inc-key-value-grid/);
    const keyValueGridColumns = await page.locator("#wc-key-value-grid").evaluate((host) => host.style.gridTemplateColumns);
    expect(keyValueGridColumns).toBe("repeat(2, minmax(0px, 1fr))");
    await expect(page.locator("#wc-key-value-record")).toHaveClass(/inc-key-value--card/);
    await expect(page.locator("#wc-key-value-record")).toContainText("AP-2026-00142");
    await expect(page.locator("#wc-badge-success")).toHaveClass(/inc-badge--success/);
    await expect(page.locator("#wc-badge-success")).toHaveClass(/inc-badge--pill/);
    await expect(page.locator("#wc-spinner-border")).toHaveClass(/inc-spinner--border/);
    await expect(page.locator("#wc-spinner-border")).toHaveAttribute("role", "status");
    await expect(page.locator("#wc-spinner-border")).toHaveAttribute("aria-label", "Loading queue");
    await expect(page.locator("#wc-sparkline-values")).toHaveClass(/inc-sparkline--line/);

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

    await expect(page.locator("[data-test='atoms-region']")).toHaveScreenshot("wc-atoms-region.png", {
        animations: "disabled",
        caret: "hide",
    });

    await expect(page.locator("[data-test='actions-region']")).toHaveScreenshot("wc-actions-region.png", {
        animations: "disabled",
        caret: "hide",
    });
});

test("collection shells region is visually stable", async ({ page }) => {
    await openWebComponentsPage(page);

    await expect(page.locator("#wc-collection-card")).toHaveScreenshot("wc-collection-shells-region.png", {
        animations: "disabled",
        caret: "hide",
    });
});

test("web components dark mode keeps action and feedback regions readable", async ({ page }) => {
    await openWebComponentsWithTheme(page, "dark");

    await expect(page.locator("html")).toHaveAttribute("data-bs-theme", "dark");

    await expect(page.locator("[data-test='atoms-region']")).toHaveScreenshot("wc-atoms-region-dark.png", {
        animations: "disabled",
        caret: "hide",
    });

    await expect(page.locator("[data-test='actions-region']")).toHaveScreenshot("wc-actions-region-dark.png", {
        animations: "disabled",
        caret: "hide",
    });

    await expect(page.locator("[data-test='forms-feedback-region']")).toHaveScreenshot("wc-forms-feedback-region-dark.png", {
        animations: "disabled",
        caret: "hide",
    });
});
