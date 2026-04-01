import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

async function openReferenceWithTheme(page, mode) {
    await page.addInitScript((themeMode) => {
        try {
            window.localStorage.setItem("inc-theme-mode", themeMode);
        } catch {
            // Ignore storage restrictions in locked-down contexts.
        }
    }, mode);

    await openPage(page, "reference.html");
}

async function primeCopyCapture(page) {
    await page.addInitScript(() => {
        window.__referenceSnippetCopies = [];

        try {
            Object.defineProperty(navigator, "clipboard", {
                configurable: true,
                value: {
                    writeText: async (text) => {
                        window.__referenceSnippetCopies.push(String(text));
                    },
                },
            });
        } catch {
            // Ignore clipboard overrides when the browser makes them read-only.
        }

        window.prompt = (_message, value) => {
            window.__referenceSnippetCopies.push(String(value ?? ""));
            return null;
        };
    });
}

test("reference page defaults to web components and toggles snippet modes", async ({ page }) => {
    await primeCopyCapture(page);
    await openPage(page, "reference.html");

    const htmlMode = page.locator('[data-demo-code-mode="html"]');
    const wcMode = page.locator('[data-demo-code-mode="wc"]');
    const firstViewer = page.locator("[data-demo-code-viewer]").first();
    const firstViewerSummary = firstViewer.locator("summary");
    const firstViewerSource = firstViewer.locator(".demo-code-viewer__source");
    const firstViewerCopy = firstViewer.locator(".demo-code-viewer__copy");
    const buttonsViewer = page.locator('[data-demo-code-key="buttons"]');
    const buttonsSummary = buttonsViewer.locator("summary");
    const buttonsNote = buttonsViewer.locator(".demo-code-viewer__note");
    const buttonsSource = buttonsViewer.locator(".demo-code-viewer__source");

    await expect(wcMode).toHaveAttribute("aria-selected", "true");
    await expect(htmlMode).toHaveAttribute("aria-selected", "false");
    await expect(firstViewer).not.toHaveAttribute("open");
    await expect(firstViewerCopy).toHaveText("Copy");
    await firstViewerCopy.click();
    await expect(firstViewer).not.toHaveAttribute("open");
    await expect(firstViewerCopy).toHaveText("Copied");

    await firstViewerSummary.click();
    await expect(firstViewer).toHaveAttribute("open");
    await expect(firstViewerSource).toContainText("<inc-theme-switcher");

    await expect(buttonsViewer).not.toHaveAttribute("open");
    await buttonsSummary.click();
    await expect(buttonsViewer).toHaveAttribute("open");
    await expect(buttonsNote).toHaveText("CSS-first in v1");
    await expect(buttonsNote).toBeVisible();

    const copiedWc = await page.evaluate(() => window.__referenceSnippetCopies.at(-1));
    expect(copiedWc).toContain("<inc-theme-switcher");

    await htmlMode.click();

    await expect(htmlMode).toHaveAttribute("aria-selected", "true");
    await expect(wcMode).toHaveAttribute("aria-selected", "false");
    await expect(firstViewerSource).toContainText("data-inc-theme-switcher");
    await expect(buttonsNote).toBeHidden();
    await expect(buttonsSource).toContainText("inc-btn--primary");

    await firstViewerCopy.click();

    const copiedHtml = await page.evaluate(() => window.__referenceSnippetCopies.at(-1));
    expect(copiedHtml).toContain("data-inc-theme-switcher");
});

test("reference page keeps the new viewer chrome readable in dark mode", async ({ page }) => {
    await openReferenceWithTheme(page, "dark");

    const firstCard = page.locator("section.inc-card").first();
    const codeViewer = firstCard.locator("[data-demo-code-viewer]").first();
    const codeViewerHeader = codeViewer.locator(".demo-code-viewer__header");
    const codeViewerCopy = codeViewer.locator(".demo-code-viewer__copy");
    const codeViewerNote = page.locator('[data-demo-code-key="buttons"] .demo-code-viewer__note');

    await expect(page.locator("html")).toHaveAttribute("data-bs-theme", "dark");
    await expect(codeViewer).not.toHaveAttribute("open");
    await expect(codeViewerHeader).toBeVisible();
    await expect(codeViewerCopy).toHaveText("Copy");
    await expect(codeViewerNote).toBeHidden();

    await expect(firstCard).toHaveScreenshot("reference-first-card-dark.png", {
        animations: "disabled",
    });
});
