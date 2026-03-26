import { expect, test } from "@playwright/test";
import { openPage } from "./_helpers.mjs";

function resolveRgbColor(page, color) {
    return page.evaluate((rawColor) => {
        const probe = document.createElement("span");
        probe.style.color = rawColor;
        probe.style.position = "absolute";
        probe.style.left = "-9999px";
        document.body.append(probe);
        const normalized = window.getComputedStyle(probe).color;
        probe.remove();
        return normalized;
    }, color);
}

function relativeLuminance({ r, g, b }) {
    const normalize = (value) => {
        const channel = value / 255;
        return channel <= 0.03928
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4;
    };

    const red = normalize(r);
    const green = normalize(g);
    const blue = normalize(b);
    return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function contrastRatio(foreground, background) {
    const parseRgb = (color) => {
        const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (!match) {
            return null;
        }

        return {
            r: Number.parseInt(match[1], 10),
            g: Number.parseInt(match[2], 10),
            b: Number.parseInt(match[3], 10),
        };
    };

    const fg = parseRgb(foreground);
    const bg = parseRgb(background);
    if (!fg || !bg) {
        return 0;
    }

    const fgLum = relativeLuminance(fg);
    const bgLum = relativeLuminance(bg);
    const light = Math.max(fgLum, bgLum);
    const dark = Math.min(fgLum, bgLum);
    return (light + 0.05) / (dark + 0.05);
}

async function openPageWithTheme(page, relativePath, mode) {
    await page.addInitScript((themeMode) => {
        try {
            window.localStorage.setItem("inc-theme-mode", themeMode);
        } catch {
            // Ignore storage restrictions in locked-down contexts.
        }

        const root = document.documentElement;
        root.setAttribute("data-inc-theme-mode", themeMode);
        root.setAttribute("data-bs-theme", themeMode);
        root.style.colorScheme = themeMode;
    }, mode);

    await openPage(page, relativePath);
}

test("demo showcase presents the CSS-first baseline and palette", async ({ page }) => {
    await openPage(page, "demo.html");

    const comparison = page.locator("#demo-comparison");
    const palette = page.locator("#demo-palette");

    await expect(page.getByRole("heading", { name: "Data-heavy home screen" })).toBeVisible();
    await expect(comparison).toContainText("Plain HTML / CSS-first");
    await expect(comparison).toContainText("Web Components counterpart");
    await expect(page.locator("table.inc-table").first()).toBeVisible();
    await expect(page.locator(".demo-swatch")).toHaveCount(6);
    await expect(palette).toContainText("Primary");
    await expect(palette).toContainText("Surface");

    await expect(comparison).toHaveScreenshot("demo-comparison.png", {
        animations: "disabled",
    });
});

test("demo showcase dark mode keeps comparison panels and swatches readable", async ({ page }) => {
    await openPageWithTheme(page, "demo.html", "dark");

    const comparison = page.locator("#demo-comparison");
    await expect(page.locator("html")).toHaveAttribute("data-bs-theme", "dark");

    const panelBackground = await comparison.locator(".demo-compare__panel").first().evaluate((node) => (
        window.getComputedStyle(node).backgroundColor
    ));
    expect(panelBackground).not.toBe("rgb(255, 255, 255)");

    const compareCopyContrast = await comparison.locator(".demo-compare__copy").first().evaluate((node) => {
        const styles = window.getComputedStyle(node);
        const foreground = styles.color;
        const background = window.getComputedStyle(node.closest(".demo-compare__panel")).backgroundColor;
        return { foreground, background };
    });
    const demoCopyForeground = await resolveRgbColor(page, compareCopyContrast.foreground);
    const demoCopyBackground = await resolveRgbColor(page, compareCopyContrast.background);
    expect(contrastRatio(demoCopyForeground, demoCopyBackground)).toBeGreaterThanOrEqual(4);

    await expect(comparison).toHaveScreenshot("demo-comparison-dark.png", {
        animations: "disabled",
    });

    const swatchContrasts = await page.locator("#demo-palette .demo-swatch").evaluateAll((nodes) => (
        nodes.map((swatch) => {
            const swatchNode = swatch;
            const valueNode = swatchNode.querySelector(".demo-swatch__value");
            if (!valueNode) {
                return 0;
            }

            const foreground = window.getComputedStyle(valueNode).color;
            const background = window.getComputedStyle(swatchNode).backgroundColor;
            const normalize = (color) => {
                const probe = document.createElement("span");
                probe.style.color = color;
                probe.style.position = "absolute";
                probe.style.left = "-9999px";
                document.body.append(probe);
                const normalized = window.getComputedStyle(probe).color;
                probe.remove();
                return normalized;
            };
            const parseRgb = (color) => {
                const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
                if (!match) {
                    return null;
                }

                return {
                    r: Number.parseInt(match[1], 10),
                    g: Number.parseInt(match[2], 10),
                    b: Number.parseInt(match[3], 10),
                };
            };
            const luminance = ({ r, g, b }) => {
                const normalize = (value) => {
                    const channel = value / 255;
                    return channel <= 0.03928
                        ? channel / 12.92
                        : ((channel + 0.055) / 1.055) ** 2.4;
                };

                const red = normalize(r);
                const green = normalize(g);
                const blue = normalize(b);
                return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
            };

            const fg = parseRgb(normalize(foreground));
            const bg = parseRgb(normalize(background));
            if (!fg || !bg) {
                return 0;
            }

            const light = Math.max(luminance(fg), luminance(bg));
            const dark = Math.min(luminance(fg), luminance(bg));
            return (light + 0.05) / (dark + 0.05);
        })
    ));

    swatchContrasts.forEach((ratio) => {
        expect(ratio).toBeGreaterThanOrEqual(3);
    });
});

test("web components showcase presents the layered counterpart and shared vocabulary", async ({ page }) => {
    await openPage(page, "web-components.html");

    const comparison = page.locator("#wc-comparison");

    await expect(page.getByRole("heading", { name: "Browser-native components that stay inside the same CSS kit." })).toBeVisible();
    await expect(page.locator("inc-app-shell#wc-shell")).toBeVisible();
    await expect(comparison).toContainText("Plain HTML equivalent");
    await expect(comparison).toContainText("Web Components equivalent");
    await expect(page.locator("inc-tabs#wc-tabs")).toBeVisible();
    await expect(page.locator("table.inc-table").first()).toBeVisible();
    await expect(page.locator(".demo-swatch")).toHaveCount(4);
    await expect(page.locator("#wc-data-presentation")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Tables, colors, and buttons stay CSS-first" })).toBeVisible();

    await expect(comparison).toHaveScreenshot("wc-comparison.png", {
        animations: "disabled",
    });
});

test("web components showcase dark mode keeps comparison parity and readability", async ({ page }) => {
    await openPageWithTheme(page, "web-components.html", "dark");

    const comparison = page.locator("#wc-comparison");
    await expect(page.locator("html")).toHaveAttribute("data-bs-theme", "dark");
    await expect(page.locator("inc-app-shell#wc-shell")).toBeVisible();
    await expect(comparison).toContainText("Plain HTML equivalent");
    await expect(comparison).toContainText("Web Components equivalent");

    const panelBackground = await comparison.locator(".demo-compare__panel").first().evaluate((node) => (
        window.getComputedStyle(node).backgroundColor
    ));
    expect(panelBackground).not.toBe("rgb(255, 255, 255)");

    const compareCopyContrast = await comparison.locator(".demo-compare__copy").first().evaluate((node) => {
        const styles = window.getComputedStyle(node);
        const foreground = styles.color;
        const background = window.getComputedStyle(node.closest(".demo-compare__panel")).backgroundColor;
        return { foreground, background };
    });
    const wcCopyForeground = await resolveRgbColor(page, compareCopyContrast.foreground);
    const wcCopyBackground = await resolveRgbColor(page, compareCopyContrast.background);
    expect(contrastRatio(wcCopyForeground, wcCopyBackground)).toBeGreaterThanOrEqual(4);

    await expect(comparison).toHaveScreenshot("wc-comparison-dark.png", {
        animations: "disabled",
    });
});
