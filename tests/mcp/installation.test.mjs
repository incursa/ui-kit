import assert from "node:assert/strict";
import test from "node:test";
import { callJsonRpc } from "./_helpers.mjs";

const cases = [
    {
        title: "css-only npm",
        framework: "html",
        use_case: "css-only",
        package_manager: "npm",
        install: "npm install @incursa/ui-kit",
        update: "npm install @incursa/ui-kit@latest",
        importSnippet: "dist/inc-design-language.css",
    },
    {
        title: "scss pnpm",
        framework: "html",
        use_case: "scss",
        package_manager: "pnpm",
        install: "pnpm add @incursa/ui-kit bootstrap sass",
        update: "pnpm up @incursa/ui-kit",
        importSnippet: "@incursa/ui-kit/src/inc-design-language",
    },
    {
        title: "js-helper yarn",
        framework: "react",
        use_case: "js-helper",
        package_manager: "yarn",
        install: "yarn add @incursa/ui-kit",
        update: "yarn upgrade @incursa/ui-kit",
        importSnippet: "dist/inc-design-language.js",
    },
    {
        title: "web-components npm",
        framework: "html",
        use_case: "web-components",
        package_manager: "npm",
        install: "npm install @incursa/ui-kit",
        update: "npm install @incursa/ui-kit@latest",
        importSnippet: "@incursa/ui-kit/web-components",
    },
];

for (const scenario of cases) {
    test(`get_installation_instructions covers the ${scenario.title} path`, async () => {
        const { response, parsed } = await callJsonRpc(
            "tools/call",
            {
                name: "get_installation_instructions",
                arguments: {
                    framework: scenario.framework,
                    use_case: scenario.use_case,
                    package_manager: scenario.package_manager,
                },
            },
            { id: 200 + cases.indexOf(scenario) },
        );

        const result = parsed.result.structuredContent;

        assert.equal(response.status, 200);
        assert.equal(result.framework, scenario.framework);
        assert.equal(result.use_case, scenario.use_case);
        assert.equal(result.package_manager, scenario.package_manager);
        assert.equal(result.install_commands.length, 1);
        assert.equal(result.update_commands.length, 1);
        assert.equal(result.install_commands[0], scenario.install);
        assert.equal(result.update_commands[0], scenario.update);
        assert.ok(result.import_examples.some((line) => line.includes(scenario.importSnippet)));
        assert.ok(result.import_examples.some((line) => line.includes("dist/inc-design-language.css")));
        assert.ok(result.import_examples.some((line) => line.includes("dist/inc-design-language.js")));
        assert.ok(result.import_examples.some((line) => line.includes("@incursa/ui-kit/web-components")));
        assert.ok(result.notes.some((line) => line.includes("compiled CSS already includes the Bootstrap layer")));
        assert.ok(result.notes.some((line) => line.includes("same-package web-components entrypoint is additive")));

        if (scenario.use_case === "scss") {
            assert.ok(result.notes.some((line) => line.includes("Bootstrap Sass at build time")));
        }

        if (scenario.framework === "react") {
            assert.ok(result.notes.some((line) => line.includes("className")));
        }
    });
}
