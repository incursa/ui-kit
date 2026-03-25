import { expect, test } from "@playwright/test";
import { openWebComponentsFixture } from "./helpers.mjs";

test("wc layout hosts upgrade, reflect classes, and preserve slot composition", async ({ page }) => {
    await openWebComponentsFixture(page);

    const shell = page.locator("inc-app-shell#wc-shell");
    const pageHost = page.locator("inc-page#wc-page");
    const header = page.locator("inc-page-header#wc-page-header");
    const section = page.locator("inc-section#wc-section");
    const card = page.locator("inc-card#wc-card");
    const summaryOverview = page.locator("inc-summary-overview#wc-summary");
    const disclosure = page.locator("inc-disclosure#wc-disclosure");
    const dialog = page.locator("inc-dialog#wc-dialog");
    const drawer = page.locator("inc-drawer#wc-drawer");

    await expect(shell).toHaveClass(/inc-app-shell/);
    await expect(shell).toHaveClass(/inc-app-shell--workspace/);
    await expect(shell).toHaveClass(/inc-app-shell--dense/);
    await expect(shell).toHaveClass(/inc-app-shell--collapsed/);
    await expect(shell).toHaveAttribute("part", /shell/);

    await expect(pageHost).toHaveClass(/inc-page--detail/);
    await expect(pageHost).toHaveClass(/inc-page--wide/);
    await expect(header).toHaveClass(/inc-page-header--detail/);
    await expect(header).toHaveClass(/inc-page-header--dense/);

    await expect(section).toHaveClass(/inc-section/);
    await expect(section).toHaveClass(/inc-section--dense/);
    await expect(section).toHaveClass(/inc-section--tone-info/);
    await expect(card).toHaveClass(/inc-card--elevated/);
    await expect(card).toHaveClass(/inc-card--tone-accent/);
    await expect(summaryOverview).toHaveClass(/inc-summary-overview--3-col/);

    await expect(shell.locator(".inc-app-shell__header")).toContainText("Web Components Fixture Shell");
    await expect(pageHost.locator(".inc-page__breadcrumbs")).toContainText("Home");
    await expect(pageHost.locator(".inc-page__breadcrumbs")).toContainText("Fixture");
    await expect(card.locator(".inc-card__body")).toContainText("No sanctions or duplicate checks failed.");
    await expect(summaryOverview.locator(".inc-summary-block")).toHaveCount(3);

    await expect(disclosure.locator("details.inc-disclosure")).toHaveJSProperty("open", false);
    await expect(dialog.locator("dialog.inc-native-dialog")).toHaveJSProperty("open", false);
    await expect(drawer.locator("dialog.inc-native-dialog")).toHaveJSProperty("open", false);

    await expect(page.locator("#layout-snapshot")).toHaveScreenshot("layout-snapshot-light.png", {
        animations: "disabled",
    });
});
