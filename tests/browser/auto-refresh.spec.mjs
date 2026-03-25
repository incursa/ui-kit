import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

test("auto-refresh toggle pauses and resumes the shared helper state", async ({ page }) => {
    await openPage(page, "states.html");

    const autoRefresh = page.locator(".inc-auto-refresh[data-inc-auto-refresh]").first();
    const toggle = autoRefresh.locator('[data-inc-action="auto-refresh-toggle"]');
    const toggleText = autoRefresh.locator(".inc-auto-refresh__toggle-text");
    const countdown = autoRefresh.locator(".inc-auto-refresh__countdown");
    const status = autoRefresh.locator(".inc-auto-refresh__status");

    await expect(autoRefresh).toHaveAttribute("aria-busy", "false");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Pause");
    await expect(toggleText).toHaveText("Pause");
    await expect(countdown).toBeVisible();
    await expect(status).toBeHidden();

    await toggle.click();

    await expect(autoRefresh).toHaveClass(/is-paused/);
    await expect(autoRefresh).toHaveAttribute("aria-busy", "false");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(toggle).toHaveAttribute("aria-label", "Resume");
    await expect(toggleText).toHaveText("Resume");
    await expect(countdown).toBeVisible();
    await expect(status).toBeHidden();

    await toggle.click();

    await expect(autoRefresh).not.toHaveClass(/is-paused/);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Pause");
    await expect(toggleText).toHaveText("Pause");
});
