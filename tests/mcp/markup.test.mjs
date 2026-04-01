import assert from "node:assert/strict";
import test from "node:test";
import { callJsonRpc } from "./_helpers.mjs";

const cases = [
    {
        title: "buttons",
        component_name: "buttons",
        expectedClass: "inc-btn",
    },
    {
        title: "forms",
        component_name: "forms",
        expectedClass: "inc-form__control",
    },
    {
        title: "tables",
        component_name: "tables",
        expectedClass: "inc-table",
    },
    {
        title: "layout",
        component_name: "layout",
        expectedClass: "inc-page",
    },
    {
        title: "states",
        component_name: "states",
        expectedClass: "inc-state-panel",
    },
];

for (const [index, scenario] of cases.entries()) {
    test(`get_component_markup returns canonical markup for ${scenario.title}`, async () => {
        const { response, parsed } = await callJsonRpc(
            "tools/call",
            {
                name: "get_component_markup",
                arguments: {
                    component_name: scenario.component_name,
                    framework: "html",
                },
            },
            { id: 300 + index },
        );

        const result = parsed.result.structuredContent;

        assert.equal(response.status, 200);
        assert.equal(result.component_name, scenario.component_name);
        assert.equal(result.framework, "html");
        assert.ok(result.markup.includes(scenario.expectedClass), `Expected ${scenario.expectedClass} in markup`);
        assert.ok(result.requiredClasses.includes(scenario.expectedClass), `Expected ${scenario.expectedClass} in requiredClasses`);
        assert.ok(result.notes.some((line) => line.includes("Canonical snippet from the source docs")));
        assert.ok(result.relatedUris.length > 0);
    });
}

