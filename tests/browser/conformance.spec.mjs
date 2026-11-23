import { expect, test } from "@playwright/test";
import {
    expectAutomatedAccessibility,
    expectSemanticShell,
    expectShellInteraction,
} from "../../conformance/playwright.mjs";

test.beforeEach(async ({ page }) => {
    await page.goto(new URL("../../conformance/fixture.html", import.meta.url).href);
});

test("canonical shell passes semantic and application-shell checks", async ({ page }) => {
    await expectSemanticShell(page, expect);
});

test("canonical shell passes automated WCAG checks", async ({ page }) => {
    await expectAutomatedAccessibility(page, expect);
});

test("canonical native account menu preserves keyboard operation and focus", async ({ page }) => {
    await expectShellInteraction(page, expect);
});
