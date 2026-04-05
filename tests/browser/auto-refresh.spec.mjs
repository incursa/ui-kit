import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

test("auto-refresh toggle pauses and resumes the shared helper state", async ({ page }) => {
    await openPage(page, "states.html");

    const autoRefresh = page.locator(".inc-auto-refresh[data-inc-auto-refresh]").first();
    const toggle = autoRefresh.locator('[data-inc-action="auto-refresh-toggle"]');
    const toggleIcon = autoRefresh.locator(".inc-auto-refresh__toggle-icon");
    const toggleText = autoRefresh.locator(".inc-auto-refresh__toggle-text");
    const countdown = autoRefresh.locator(".inc-auto-refresh__countdown");
    const status = autoRefresh.locator(".inc-auto-refresh__status");

    await expect(autoRefresh).toHaveAttribute("aria-busy", "false");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Pause");
    await expect(toggleIcon).toBeVisible();
    await expect(toggleText).toHaveText("Pause");
    await expect(countdown).toBeVisible();
    await expect(status).toBeHidden();

    const initialBoxes = await Promise.all([
        toggle.boundingBox(),
        countdown.boundingBox(),
        autoRefresh.boundingBox(),
    ]);
    expect(initialBoxes[0]).not.toBeNull();
    expect(initialBoxes[1]).not.toBeNull();
    expect(initialBoxes[2]).not.toBeNull();
    expect(initialBoxes[0].x).toBeLessThan(initialBoxes[1].x);
    expect(initialBoxes[2].width).toBeLessThan(320);

    const initialIconColor = await toggleIcon.evaluate((node) => window.getComputedStyle(node).color);
    await toggle.hover();
    const hoveredIconColor = await toggleIcon.evaluate((node) => window.getComputedStyle(node).color);
    expect(hoveredIconColor).toBe(initialIconColor);

    await toggle.click();

    await expect(autoRefresh).toHaveClass(/is-paused/);
    await expect(autoRefresh).toHaveAttribute("aria-busy", "false");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(toggle).toHaveAttribute("aria-label", "Resume");
    await expect(toggleIcon).toBeVisible();
    await expect(toggleText).toHaveText("Resume");
    await expect(countdown).toBeVisible();
    await expect(status).toBeHidden();

    const pausedIconColor = await toggleIcon.evaluate((node) => window.getComputedStyle(node).color);
    await toggle.hover();
    const pausedHoveredIconColor = await toggleIcon.evaluate((node) => window.getComputedStyle(node).color);
    expect(pausedHoveredIconColor).toBe(pausedIconColor);

    await toggle.click();

    await expect(autoRefresh).not.toHaveClass(/is-paused/);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Pause");
    await expect(toggleText).toHaveText("Pause");
});
