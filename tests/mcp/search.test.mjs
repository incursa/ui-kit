import assert from "node:assert/strict";
import test from "node:test";
import { callJsonRpc } from "./_helpers.mjs";

function extractResults(parsed) {
    return parsed.result.structuredContent.results;
}

test("search_ui_kit ranks the canonical component first for an exact match", async () => {
    const { parsed } = await callJsonRpc(
        "tools/call",
        {
            name: "search_ui_kit",
            arguments: {
                query: "buttons",
                kind: "component",
                include_examples: false,
                include_installation: true,
                max_results: 8,
            },
        },
        { id: 101 },
    );

    const results = extractResults(parsed);
    assert.ok(results.length > 0);
    assert.equal(results[0].uri, "ui-kit://components/buttons");
    assert.ok(results.every((result) => result.kind === "component"));
});

test("search_ui_kit respects kind filtering for guides", async () => {
    const anyQuery = await callJsonRpc(
        "tools/call",
        {
            name: "search_ui_kit",
            arguments: {
                query: "surface selection",
                kind: "any",
                include_examples: true,
                include_installation: true,
                max_results: 10,
            },
        },
        { id: 102 },
    );

    const guideQuery = await callJsonRpc(
        "tools/call",
        {
            name: "search_ui_kit",
            arguments: {
                query: "surface selection",
                kind: "guide",
                include_examples: true,
                include_installation: true,
                max_results: 10,
            },
        },
        { id: 103 },
    );

    const anyResults = extractResults(anyQuery.parsed);
    const guideResults = extractResults(guideQuery.parsed);

    assert.ok(anyResults.some((result) => result.kind === "install"));
    assert.ok(guideResults.length > 0);
    assert.ok(guideResults.every((result) => result.kind === "guide"));
    assert.ok(guideResults.every((result) => result.kind !== "install"));
    assert.ok(guideResults.some((result) => result.uri === "ui-kit://guides/choose-css-vs-scss-vs-js-vs-web-components"));
    assert.ok(guideResults.every((result) => !result.uri.startsWith("ui-kit://install/")));
});

test("search_ui_kit can exclude example resources and installation resources", async () => {
    const withExamples = await callJsonRpc(
        "tools/call",
        {
            name: "search_ui_kit",
            arguments: {
                query: "reference",
                kind: "any",
                include_examples: true,
                include_installation: true,
                max_results: 10,
            },
        },
        { id: 104 },
    );
    const withoutExamples = await callJsonRpc(
        "tools/call",
        {
            name: "search_ui_kit",
            arguments: {
                query: "reference",
                kind: "any",
                include_examples: false,
                include_installation: true,
                max_results: 10,
            },
        },
        { id: 105 },
    );

    assert.ok(extractResults(withExamples.parsed).some((result) => result.uri.startsWith("ui-kit://example/")));
    assert.ok(!extractResults(withoutExamples.parsed).some((result) => result.uri.startsWith("ui-kit://example/")));

    const withInstallation = await callJsonRpc(
        "tools/call",
        {
            name: "search_ui_kit",
            arguments: {
                query: "install",
                kind: "any",
                include_examples: true,
                include_installation: true,
                max_results: 10,
            },
        },
        { id: 106 },
    );
    const withoutInstallation = await callJsonRpc(
        "tools/call",
        {
            name: "search_ui_kit",
            arguments: {
                query: "install",
                kind: "any",
                include_examples: true,
                include_installation: false,
                max_results: 10,
            },
        },
        { id: 107 },
    );

    assert.ok(extractResults(withInstallation.parsed).some((result) => result.uri.startsWith("ui-kit://install")));
    assert.ok(!extractResults(withoutInstallation.parsed).some((result) => result.uri.startsWith("ui-kit://install")));
});
