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

test("canonical shell maps logical layout to right-to-left direction", async ({ page }) => {
    const geometryFor = async (direction) => page.evaluate((dir) => {
        document.documentElement.dir = dir;
        const menu = document.querySelector("details.inc-native-menu");
        const panel = document.querySelector(".inc-native-menu__panel");
        menu.open = true;
        const menuRect = menu.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
        return {
            menuLeft: menuRect.left,
            menuRight: menuRect.right,
            panelLeft: panelRect.left,
            panelRight: panelRect.right,
        };
    }, direction);

    const ltr = await geometryFor("ltr");
    const rtl = await geometryFor("rtl");

    expect(Math.abs(ltr.panelRight - ltr.menuRight)).toBeLessThan(1);
    expect(Math.abs(rtl.panelLeft - rtl.menuLeft)).toBeLessThan(1);
});
