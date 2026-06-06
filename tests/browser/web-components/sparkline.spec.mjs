import { expect, test } from "@playwright/test";
import { openWebComponentsFixture } from "./helpers.mjs";

function expectFinitePath(path) {
    expect(path).toBeTruthy();
    expect(path).not.toMatch(/NaN|Infinity|-Infinity/u);
}

test("sparkline numeric values attribute parses and renders a path", async ({ page }) => {
    await openWebComponentsFixture(page);

    const sparkline = page.locator("#wc-sparkline-values");
    await expect(sparkline).toHaveClass(/inc-sparkline/);
    await expect(sparkline).toHaveClass(/inc-sparkline--line/);
    await expect(sparkline.locator("[part='svg']")).toHaveCount(1);
    await expect(sparkline.locator("[part='line']")).toHaveCount(1);

    expectFinitePath(await sparkline.locator("[part='line']").getAttribute("d"));
});

test("sparkline points property renders area, line, and marker", async ({ page }) => {
    await openWebComponentsFixture(page);

    const sparkline = page.locator("#wc-sparkline-property");
    await expect(sparkline).toHaveClass(/inc-sparkline--area/);
    await expect(sparkline).toHaveClass(/inc-sparkline--tone-accent/);
    await expect(sparkline.locator("[part='area']")).toHaveCount(1);
    await expect(sparkline.locator("[part='line']")).toHaveCount(1);
    await expect(sparkline.locator("[part='marker']")).toHaveCount(1);

    expectFinitePath(await sparkline.locator("[part='area']").getAttribute("d"));
    expectFinitePath(await sparkline.locator("[part='line']").getAttribute("d"));
});

test("sparkline empty and malformed data renders quiet empty state", async ({ page }) => {
    await openWebComponentsFixture(page);

    const sparkline = page.locator("#wc-sparkline-empty");
    await expect(sparkline.locator("[part='empty']")).toContainText("No data");
    await expect(sparkline.locator("[part='line']")).toHaveCount(1);
    await expect(sparkline.locator("[part='area']")).toHaveCount(0);
});

test("sparkline single-point and flat data render without invalid coordinates", async ({ page }) => {
    await openWebComponentsFixture(page);

    await page.evaluate(() => {
        const single = document.createElement("inc-sparkline");
        single.id = "wc-sparkline-single";
        single.setAttribute("values", "7");
        single.setAttribute("show-last-marker", "");
        single.setAttribute("aria-label", "Single point trend");
        document.body.append(single);
    });

    const singlePath = await page.locator("#wc-sparkline-single [part='line']").getAttribute("d");
    const flatPath = await page.locator("#wc-sparkline-flat [part='line']").getAttribute("d");
    expectFinitePath(singlePath);
    expectFinitePath(flatPath);
    await expect(page.locator("#wc-sparkline-single [part='marker']")).toHaveCount(1);
    await expect(page.locator("#wc-sparkline-flat [part='marker']")).toHaveCount(1);
});

test("sparkline reference line, min/max markers, and accessibility metadata render", async ({ page }) => {
    await openWebComponentsFixture(page);

    const sparkline = page.locator("#wc-sparkline-reference");
    await expect(sparkline).toHaveClass(/inc-sparkline--tone-positive/);
    await expect(sparkline.locator("[part='reference']")).toHaveCount(1);
    await expect(sparkline.locator("[part='marker']")).toHaveCount(2);
    await expect(sparkline.locator("svg")).toHaveAttribute("role", "img");
    await expect(sparkline.locator("title")).toContainText("Reference sparkline");
    await expect(sparkline.locator("desc")).toContainText("Reference value 0.");
});
