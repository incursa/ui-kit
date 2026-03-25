import { expect, test } from "@playwright/test";
import { openWebComponentsPage } from "./helpers.mjs";

test("state panel, live region, and auto-refresh surfaces reflect runtime state", async ({ page }) => {
    await openWebComponentsPage(page);

    const statePanel = page.locator("#wc-state-panel");
    const liveRegion = page.locator("#wc-live-region");
    const autoRefresh = page.locator("#wc-auto-refresh");
    const toggle = autoRefresh.locator(".inc-auto-refresh__toggle");

    await expect(statePanel).toHaveClass(/inc-state-panel/);
    await expect(statePanel).toHaveClass(/inc-state-panel--warning/);
    await expect(statePanel).toHaveAttribute("aria-hidden", "false");
    await expect(statePanel).toContainText("Review Required");

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
