import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

test("native dialog launchers open and close the browser dialog surface", async ({ page }) => {
    await openPage(page, "native-patterns.html");

    const reviewDialog = page.locator("#native-review-dialog");
    const reviewDrawer = page.locator("#native-review-drawer");

    await expect(reviewDialog).toHaveJSProperty("open", false);
    await page.getByRole("button", { name: "Open Native Dialog" }).click();
    await expect(reviewDialog).toBeVisible();
    await expect(reviewDialog).toHaveJSProperty("open", true);
    await reviewDialog.getByRole("button", { name: "Close dialog" }).click();
    await expect(reviewDialog).toHaveJSProperty("open", false);

    await page.getByRole("button", { name: "Launch Review Drawer" }).click();
    await expect(reviewDrawer).toBeVisible();
    await expect(reviewDrawer).toHaveJSProperty("open", true);
    await reviewDrawer.getByRole("button", { name: "Close drawer" }).click();
    await expect(reviewDrawer).toHaveJSProperty("open", false);
});
