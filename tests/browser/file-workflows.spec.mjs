import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

test("reference file workflow example opens the picker and renders removable selected files", async ({ page }) => {
    await openPage(page, "reference.html");

    const example = page.locator("#ref-file-workflow-example");
    const browseButton = example.getByRole("button", { name: "Browse Files" });
    const list = example.locator("[data-inc-file-list]");
    const emptyState = list.locator("[data-inc-file-empty]");

    await expect(emptyState).toBeVisible();
    await expect(example.locator(".inc-file-row")).toHaveCount(0);

    const chooserPromise = page.waitForEvent("filechooser");
    await browseButton.click();
    const chooser = await chooserPromise;
    await chooser.setFiles([
        {
            name: "waiver.pdf",
            mimeType: "application/pdf",
            buffer: Buffer.from("test waiver"),
        },
    ]);

    const addedRow = list.locator(".inc-file-row").last();
    await expect(addedRow).toContainText("waiver.pdf");
    await expect(addedRow).toContainText("PDF");
    await expect(addedRow).toContainText("Ready");
    await expect(addedRow.getByRole("link", { name: "Preview" })).toBeVisible();
    await expect(addedRow.getByRole("button", { name: "Remove waiver.pdf" })).toBeVisible();
    await expect(emptyState).toBeHidden();

    await addedRow.getByRole("button", { name: "Remove waiver.pdf" }).click();
    await expect(example.locator(".inc-file-row")).toHaveCount(0);
    await expect(emptyState).toBeVisible();
});

test("states file workflow example accepts dropped files and appends them to the list", async ({ page }) => {
    await openPage(page, "states.html");

    const example = page.locator("#states-file-workflow-example");
    const dropzone = example.locator("[data-inc-file-dropzone]");
    const list = example.locator("[data-inc-file-list]");
    const initialCount = await list.locator(".inc-file-row").count();

    const dataTransfer = await page.evaluateHandle(() => {
        const transfer = new DataTransfer();
        transfer.items.add(new File(["insurance body"], "updated-insurance.pdf", {
            type: "application/pdf",
        }));
        return transfer;
    });

    await dropzone.dispatchEvent("dragenter", { dataTransfer });
    await expect(dropzone).toHaveClass(/is-drag-over/);

    await dropzone.dispatchEvent("drop", { dataTransfer });
    await expect(dropzone).not.toHaveClass(/is-drag-over/);
    await expect(list.locator(".inc-file-row")).toHaveCount(initialCount + 1);

    const addedRow = list.locator(".inc-file-row").last();
    await expect(addedRow).toContainText("updated-insurance.pdf");
    await expect(addedRow).toContainText("PDF");
    await expect(addedRow).toContainText("Ready");
});
