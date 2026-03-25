import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

test("helper-managed overlays open, trap focus, and restore focus on close", async ({ page }) => {
    await openPage(page, "overlay-workflows.html");

    const modalButton = page.getByRole("button", { name: "Open approval modal" });
    const modal = page.locator("#approval-modal");
    const modalClose = modal.getByRole("button", { name: "Close dialog" });
    const modalPrimary = modal.getByRole("button", { name: "Approve Exception" });
    const body = page.locator("body");

    await modalButton.click();

    await expect(modal).toHaveClass(/is-open/);
    await expect(body).toHaveClass(/inc-modal-open/);
    await expect(modalClose).toBeFocused();

    await page.keyboard.press("Shift+Tab");

    await expect(modalPrimary).toBeFocused();

    await page.keyboard.press("Escape");

    await expect(modal).toBeHidden();
    await expect(body).not.toHaveClass(/inc-modal-open/);
    await expect(modalButton).toBeFocused();

    const drawerButton = page.getByRole("button", { name: "Open assignment drawer" });
    const drawer = page.locator("#assignment-drawer");
    const drawerBackdrop = page.locator('[data-inc-backdrop-for="assignment-drawer"]');

    await drawerButton.click();

    await expect(drawer).toHaveClass(/is-open/);
    await expect(body).toHaveClass(/inc-offcanvas-open/);
    await expect(drawerBackdrop).toBeVisible();

    await drawerBackdrop.click();

    await expect(drawer).toHaveAttribute("aria-hidden", "true");
    await expect(body).not.toHaveClass(/inc-offcanvas-open/);
    await expect(drawerButton).toBeFocused();
});
