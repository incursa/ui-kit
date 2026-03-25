import { expect, test } from "@playwright/test";
import { openWebComponentsPage } from "./helpers.mjs";

test("user menu supports keyboard open/close and focus restoration", async ({ page }) => {
    await openWebComponentsPage(page);

    const menuTrigger = page.locator("#wc-user-menu-trigger");
    const menuHost = page.locator("#wc-user-menu");
    const menuPanel = page.locator("#wc-user-menu-panel");

    await menuTrigger.focus();
    await page.keyboard.press("Enter");

    await expect.poll(async () => menuHost.evaluate((node) => node.hasAttribute("open") || node.classList.contains("is-open"))).toBe(true);
    await expect.poll(async () => page.evaluate(() => {
        const active = document.activeElement;
        const panel = document.querySelector("#wc-user-menu-panel");
        return Boolean(active && panel && panel.contains(active));
    })).toBe(true);

    await page.keyboard.press("Escape");

    await expect.poll(async () => menuHost.evaluate((node) => !(node.hasAttribute("open") || node.classList.contains("is-open")))).toBe(true);
    await expect(menuTrigger).toBeFocused();
    await expect(menuPanel).toBeHidden();
});

test("dialog and drawer restore focus after close and render stable overlay visuals", async ({ page }) => {
    await openWebComponentsPage(page);

    const dialogOpenButton = page.locator("#open-dialog");
    const dialogHost = page.locator("#wc-dialog");
    const dialogSurface = page.locator("#wc-dialog dialog.inc-native-dialog");

    await dialogOpenButton.click();

    await expect(dialogHost).toHaveAttribute("open", "");
    await expect(dialogSurface).toHaveJSProperty("open", true);
    await expect.poll(async () => page.evaluate(() => {
        const active = document.activeElement;
        const dialog = document.querySelector("#wc-dialog dialog");
        return Boolean(active && dialog && dialog.contains(active));
    })).toBe(true);

    await expect(dialogSurface).toHaveScreenshot("wc-dialog-open.png", {
        animations: "disabled",
        caret: "hide",
    });

    await page.keyboard.press("Escape");

    await expect(dialogSurface).toHaveJSProperty("open", false);
    await expect(dialogOpenButton).toBeFocused();

    const drawerOpenButton = page.locator("#open-drawer");
    const drawerSurface = page.locator("#wc-drawer dialog.inc-native-dialog");

    await drawerOpenButton.click();
    await expect(drawerSurface).toHaveJSProperty("open", true);

    await page.locator("#wc-drawer .inc-native-dialog__close").click();
    await expect(drawerSurface).toHaveJSProperty("open", false);
    await expect(drawerOpenButton).toBeFocused();
});
