import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

test("queue tabs switch panes and support keyboard navigation", async ({ page }) => {
    await openPage(page, "work-queue.html");

    const reviewTab = page.getByRole("tab", { name: "Needs Review" });
    const readyTab = page.getByRole("tab", { name: "Ready To Approve" });
    const exportedTab = page.getByRole("tab", { name: "Recently Exported" });
    const reviewPane = page.locator("#queue-pane-review");
    const readyPane = page.locator("#queue-pane-ready");
    const exportedPane = page.locator("#queue-pane-exported");

    await expect(reviewTab).toHaveAttribute("aria-selected", "true");
    await expect(reviewPane).toBeVisible();
    await expect(readyPane).toBeHidden();
    await expect(exportedPane).toBeHidden();

    await readyTab.click();

    await expect(readyTab).toHaveAttribute("aria-selected", "true");
    await expect(readyPane).toBeVisible();
    await expect(reviewPane).toBeHidden();
    await expect(exportedPane).toBeHidden();

    await expect(readyTab).toBeFocused();
    await page.keyboard.press("ArrowRight");

    await expect(exportedTab).toHaveAttribute("aria-selected", "true");
    await expect(exportedPane).toBeVisible();
    await expect(reviewPane).toBeHidden();
    await expect(readyPane).toBeHidden();
});
