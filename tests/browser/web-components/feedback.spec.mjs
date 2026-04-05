import { expect, test } from "@playwright/test";
import { openWebComponentsPage } from "./helpers.mjs";

test("state panel, badge/spinner atoms, live region, and auto-refresh surfaces reflect runtime state", async ({ page }) => {
    await openWebComponentsPage(page);

    const statePanel = page.locator("#wc-state-panel");
    const liveRegion = page.locator("#wc-live-region");
    const autoRefresh = page.locator("#wc-auto-refresh");
    const badge = page.locator("#wc-badge-success");
    const spinner = page.locator("#wc-spinner-border");
    const growSpinner = page.locator("#wc-spinner-grow");
    const loadingButton = page.locator("#wc-button-loading .inc-button__control");
    const warningAlert = page.locator("#wc-alert-warning");
    const emptyState = page.locator("#wc-empty-state");
    const toggle = autoRefresh.locator(".inc-auto-refresh__toggle");

    await expect(statePanel).toHaveClass(/inc-state-panel/);
    await expect(statePanel).toHaveClass(/inc-state-panel--warning/);
    await expect(statePanel).toHaveAttribute("aria-hidden", "false");
    await expect(statePanel).toHaveAttribute("title", "Review Required");
    await expect(statePanel).toHaveAttribute("body", "Vendor profile is pending verification.");

    await expect(badge).toHaveClass(/inc-badge/);
    await expect(badge).toHaveClass(/inc-badge--success/);
    await expect(badge).toHaveClass(/inc-badge--pill/);
    await expect(badge).toContainText("Approved");

    await expect(spinner).toHaveClass(/inc-spinner/);
    await expect(spinner).toHaveClass(/inc-spinner--border/);
    await expect(spinner).toHaveAttribute("role", "status");
    await expect(spinner).toHaveAttribute("aria-live", "polite");
    await expect(spinner).toHaveAttribute("aria-label", "Loading queue");

    await expect(growSpinner).toHaveClass(/inc-spinner--grow/);
    await expect(growSpinner).toHaveClass(/inc-spinner--grow--sm/);
    await expect(growSpinner).toHaveClass(/inc-spinner--grow--primary/);
    await expect(growSpinner).toHaveAttribute("aria-label", "Refreshing");

    await expect(page.locator("#wc-button-primary")).toHaveClass(/inc-button/);
    await expect(page.locator("#wc-button-primary .inc-button__control")).toHaveClass(/inc-btn--primary/);
    await expect(loadingButton).toHaveClass(/inc-btn--outline-secondary/);
    await expect(loadingButton).toHaveClass(/is-loading/);
    await expect(loadingButton).toHaveAttribute("aria-busy", "true");
    await expect(loadingButton.locator("[data-inc-button-spinner]")).toHaveCount(1);

    await expect(warningAlert).toHaveClass(/inc-alert--warning/);
    await expect(warningAlert).toHaveClass(/inc-alert--dismissible/);
    await expect(warningAlert.locator("[data-inc-alert-dismiss]")).toHaveAttribute("aria-label", "Dismiss warning");
    await warningAlert.locator("[data-inc-alert-dismiss]").click();
    await expect(warningAlert).toHaveAttribute("aria-hidden", "true");
    await expect(warningAlert).toBeHidden();

    await expect(emptyState).toHaveClass(/inc-empty-state/);
    await expect(emptyState).toContainText("No saved views");
    await expect(emptyState.locator(".inc-empty-state__actions .inc-button__control")).toHaveCount(2);

    await expect(liveRegion).toHaveAttribute("role", "status");
    await expect(liveRegion).toHaveAttribute("aria-live", "polite");
    await liveRegion.evaluate((element) => element.announce("Queue refreshed"));
    await expect(liveRegion).toContainText("Queue refreshed");

    await expect(autoRefresh).toHaveClass(/inc-auto-refresh/);
    await expect(autoRefresh).toHaveClass(/is-paused/);
    await expect(autoRefresh).toHaveAttribute("aria-busy", "false");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(toggle).toHaveAttribute("aria-label", "Resume");
    await expect(toggle).toHaveText("Resume");

    await toggle.click();

    await expect(autoRefresh).not.toHaveClass(/is-paused/);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Pause");
    await expect(toggle).toHaveText("Pause");
});
