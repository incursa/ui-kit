import AxeBuilder from "@axe-core/playwright";
import { auditShellDocument } from "./shell.mjs";

export async function expectSemanticShell(page, expect) {
    const violations = await page.evaluate(() => {
        const findings = [];
        const mains = document.querySelectorAll("main");
        if (mains.length !== 1) findings.push(`Expected one main; found ${mains.length}.`);
        const main = mains[0];
        if (!main?.id || !document.querySelector(`a[href="#${main.id}"]`)) findings.push("Skip link must target main.");
        for (const selector of ["header", "nav", "footer"]) {
            if (!document.querySelector(selector)) findings.push(`Missing ${selector} landmark.`);
        }
        if (document.querySelectorAll('[aria-current="page"]').length !== 1) findings.push("Expected one current page.");
        if (!document.querySelector("[data-inc-shell-version]")?.textContent.trim()) findings.push("Missing version text.");
        if (!document.querySelector("[data-inc-shell-revision]")?.textContent.trim()) findings.push("Missing revision text.");
        return findings;
    });
    expect(violations).toEqual([]);
}

export async function expectAutomatedAccessibility(page, expect) {
    const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
    expect(results.violations).toEqual([]);
}

export async function expectShellInteraction(page, expect) {
    const menu = page.locator("details.inc-native-menu").first();
    const summary = menu.locator("summary");
    await summary.focus();
    await summary.press("Enter");
    await expect(menu).toHaveAttribute("open", "");
    await summary.press("Enter");
    await expect(menu).not.toHaveAttribute("open", "");
    await expect(summary).toBeFocused();
}

export async function expectBoundedVisual(locator, expect, baselineName, options = {}) {
    await expect(locator).toHaveScreenshot(baselineName, {
        animations: "disabled",
        caret: "hide",
        ...options,
    });
}
