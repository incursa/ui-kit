import { defineConfig, devices } from "@playwright/test";

const browserChannel = process.env.PLAYWRIGHT_BROWSER_CHANNEL;
const browserExecutablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;

export default defineConfig({
    testDir: "./tests/browser",
    timeout: 30_000,
    expect: {
        timeout: 5_000,
    },
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    reporter: [["list"]],
    use: {
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: browserExecutablePath ? "off" : "retain-on-failure",
        viewport: { width: 1440, height: 1200 },
    },
    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                ...(browserChannel ? { channel: browserChannel } : {}),
                ...(browserExecutablePath ? { launchOptions: { executablePath: browserExecutablePath } } : {}),
            },
        },
    ],
});
