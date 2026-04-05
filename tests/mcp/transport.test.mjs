import assert from "node:assert/strict";
import test from "node:test";
import { callJsonRpc, callWorker } from "./_helpers.mjs";

const protocolVersion = "2025-11-25";

function createInitializeParams() {
    return {
        protocolVersion,
        capabilities: {},
        clientInfo: {
            name: "ui-kit-mcp-tests",
            version: "1.0.0",
        },
    };
}

test("initialize returns the MCP server metadata", async () => {
    const { response, parsed } = await callJsonRpc("initialize", createInitializeParams(), { id: 1 });

    assert.equal(response.status, 200);
    assert.equal(parsed.jsonrpc, "2.0");
    assert.equal(parsed.id, 1);
    assert.equal(parsed.result.protocolVersion, protocolVersion);
    assert.equal(parsed.result.serverInfo.name, "incursa-ui-kit-mcp");
    assert.equal(parsed.result.serverInfo.version, "1.5.0");
});

test("GET /mcp and resource pages render the human-readable docs surface", async () => {
    const index = await callWorker("/mcp");
    const resource = await callWorker(`/mcp/resource/${encodeURIComponent("ui-kit://overview")}`);

    assert.equal(index.response.status, 200);
    assert.equal(resource.response.status, 200);
    assert.match(index.text, /Incursa UI Kit MCP/);
    assert.match(index.text, /href="\/mcp\/resource\//);
    assert.match(resource.text, /ui-kit:\/\/overview/);
    assert.match(resource.text, /Overview/);
    assert.match(resource.text, /href="\/mcp"/);
});

test("prefixed /ui-kit requests route to the same MCP surface", async () => {
    const index = await callWorker("/ui-kit/mcp");
    const resource = await callWorker(`/ui-kit/mcp/resource/${encodeURIComponent("ui-kit://overview")}`);
    const { response, parsed } = await callJsonRpc("initialize", createInitializeParams(), { id: 10, pathname: "/ui-kit/mcp" });

    assert.equal(index.response.status, 200);
    assert.equal(resource.response.status, 200);
    assert.equal(response.status, 200);
    assert.equal(parsed.result.serverInfo.name, "incursa-ui-kit-mcp");
    assert.match(index.text, /Incursa UI Kit MCP/);
    assert.match(index.text, /href="\/ui-kit\/mcp\/resource\//);
    assert.match(resource.text, /ui-kit:\/\/overview/);
    assert.match(resource.text, /href="\/ui-kit\/mcp"/);
});

test("MCP path prefix can be configured through the worker env", async () => {
    const env = { MCP_PATH_PREFIX: "/custom-mcp" };
    const index = await callWorker("/custom-mcp/mcp", { env });
    const resource = await callWorker(`/custom-mcp/mcp/resource/${encodeURIComponent("ui-kit://overview")}`, { env });
    const { response, parsed } = await callJsonRpc("initialize", createInitializeParams(), { id: 11, pathname: "/custom-mcp/mcp", env });

    assert.equal(index.response.status, 200);
    assert.equal(resource.response.status, 200);
    assert.equal(response.status, 200);
    assert.equal(parsed.result.serverInfo.name, "incursa-ui-kit-mcp");
    assert.match(index.text, /href="\/custom-mcp\/mcp\/resource\//);
    assert.match(resource.text, /href="\/custom-mcp\/mcp"/);
});

test("resources list exposes the generated manifest surface and templates", async () => {
    const { response, parsed } = await callJsonRpc("resources/list", {}, { id: 2 });
    const { response: templatesResponse, parsed: templatesParsed } = await callJsonRpc("resources/templates/list", {}, { id: 3 });

    assert.equal(response.status, 200);
    assert.equal(templatesResponse.status, 200);
    assert.equal(parsed.jsonrpc, "2.0");
    assert.equal(templatesParsed.jsonrpc, "2.0");

    const resourceUris = new Set(parsed.result.resources.map((resource) => resource.uri));
    assert.ok(resourceUris.has("ui-kit://overview"));
    assert.ok(resourceUris.has("ui-kit://install"));
    assert.ok(resourceUris.has("ui-kit://install/decision-tree"));
    assert.ok(resourceUris.has("ui-kit://components/buttons"));
    assert.ok(resourceUris.has("ui-kit://patterns/reference"));

    const templateUris = new Set(templatesParsed.result.resourceTemplates.map((template) => template.uriTemplate));
    assert.ok(templateUris.has("ui-kit://component/{name}"));
    assert.ok(templateUris.has("ui-kit://pattern/{name}"));
    assert.ok(templateUris.has("ui-kit://spec/{id}"));
    assert.ok(templateUris.has("ui-kit://example/{name}"));
    assert.ok(templateUris.has("ui-kit://file/{path}"));
});

test("resources read returns representative content pages", async () => {
    const { response: overviewResponse, parsed: overviewParsed } = await callJsonRpc("resources/read", { uri: "ui-kit://overview" }, { id: 4 });
    const { response: buttonsResponse, parsed: buttonsParsed } = await callJsonRpc("resources/read", { uri: "ui-kit://components/buttons" }, { id: 5 });

    assert.equal(overviewResponse.status, 200);
    assert.equal(buttonsResponse.status, 200);
    assert.ok(overviewParsed.result.contents[0].text.includes("canonical public API"));
    assert.ok(buttonsParsed.result.contents[0].text.includes("inc-btn"));
    assert.ok(buttonsParsed.result.contents[0].text.includes("Canonical markup"));
});

test("tools list and tool calls succeed over the HTTP transport", async () => {
    const { response: toolsResponse, parsed: toolsParsed } = await callJsonRpc("tools/list", {}, { id: 6 });
    const toolNames = new Set(toolsParsed.result.tools.map((tool) => tool.name));

    assert.equal(toolsResponse.status, 200);
    assert.ok(toolNames.has("search_ui_kit"));
    assert.ok(toolNames.has("get_component_markup"));
    assert.ok(toolNames.has("get_installation_instructions"));

    const { parsed: searchParsed } = await callJsonRpc(
        "tools/call",
        {
            name: "search_ui_kit",
            arguments: {
                query: "buttons",
                kind: "component",
                include_examples: false,
                include_installation: true,
                max_results: 5,
            },
        },
        { id: 7 },
    );

    const { parsed: markupParsed } = await callJsonRpc(
        "tools/call",
        {
            name: "get_component_markup",
            arguments: {
                component_name: "forms",
                framework: "html",
            },
        },
        { id: 8 },
    );

    const { parsed: installParsed } = await callJsonRpc(
        "tools/call",
        {
            name: "get_installation_instructions",
            arguments: {
                framework: "react",
                use_case: "scss",
                package_manager: "pnpm",
            },
        },
        { id: 9 },
    );

    assert.equal(searchParsed.result.structuredContent.results[0].uri, "ui-kit://components/buttons");
    assert.ok(markupParsed.result.structuredContent.markup.includes("inc-form"));
    assert.ok(installParsed.result.structuredContent.install_commands[0].includes("pnpm add @incursa/ui-kit bootstrap sass"));
    assert.ok(installParsed.result.content[0].text.includes("Use case: scss"));
});
