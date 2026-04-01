import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import * as z from "zod/v4";
import resourcesManifest from "../../dist/mcp/resources.json";
import searchIndex from "../../dist/mcp/search-index.json";

type ResourceRecord = {
  uri: string;
  title: string;
  kind: string;
  searchKind: string;
  summary: string;
  body: string;
  sourcePaths: string[];
  mimeType: string;
  aliases: string[];
  relatedUris: string[];
  group: string;
  priority: number;
  includeInSearch?: boolean;
  searchText: string;
  canonicalMarkup?: {
    default: string;
    variants?: Record<string, string>;
  };
};

type SearchIndexEntry = {
  uri: string;
  title: string;
  kind: string;
  summary: string;
  sourcePaths: string[];
  aliases: string[];
  priority: number;
  searchText: string;
  canonicalMarkup?: {
    default: string;
    variants?: Record<string, string>;
  };
};

type InstallData = typeof resourcesManifest.install;
type UpdateData = typeof resourcesManifest.update;

const packageName = resourcesManifest.packageName ?? "@incursa/ui-kit";
const packageVersion = resourcesManifest.packageVersion ?? "0.0.0";
const resources = resourcesManifest.resources as ResourceRecord[];
const resourceMap = new Map(resources.map((resource) => [resource.uri, resource]));
const searchEntries = searchIndex as SearchIndexEntry[];
const installData = resourcesManifest.install as InstallData;
const updateData = resourcesManifest.update as UpdateData;
const componentResources = resources.filter((resource) => resource.group === "components");
const patternResources = resources.filter((resource) => resource.group === "patterns");
const specResources = resources.filter((resource) => resource.group === "specs");
const exampleResources = resources.filter((resource) => resource.group === "examples");
const fileResources = resources.filter((resource) => resource.group === "files");
const guideResources = resources.filter((resource) => resource.group === "guides" || resource.group === "ai");

function normalizeText(value: string) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .toLowerCase();
}

function escapeHtml(value: string) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(value: string) {
  return normalizeText(value)
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function collectClasses(markup: string) {
  const classes = new Set<string>();
  for (const match of markup.matchAll(/class=(["'])([^"']+)\1/g)) {
    for (const cls of match[2].split(/\s+/g)) {
      if (cls.startsWith("inc-")) {
        classes.add(cls);
      }
    }
  }
  return Array.from(classes).sort();
}

function collectHelperHooks(markup: string) {
  const hooks = new Set<string>();
  for (const match of markup.matchAll(/\b(data-inc-[a-z0-9-]+)(?:=|\s|>)/gi)) {
    hooks.add(match[1].toLowerCase());
  }
  if (/\bis-loading\b/i.test(markup)) {
    hooks.add("is-loading");
  }
  return Array.from(hooks).sort();
}

function frameworkShape(markup: string, framework: string | undefined) {
  if (framework !== "react") {
    return markup;
  }

  return markup
    .replace(/\bclass=/g, "className=")
    .replace(/\bfor=/g, "htmlFor=");
}

function formatList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function lookupResource(uri: string) {
  const resource = resourceMap.get(uri);
  if (!resource) {
    throw new Error(`Unknown resource: ${uri}`);
  }
  return resource;
}

function renderDocsIndexHtml() {
  const groups = [
    ["Guides", guideResources],
    ["Components", componentResources],
    ["Patterns", patternResources],
    ["Specs", specResources],
    ["Examples", exampleResources],
    ["Curated files", fileResources],
  ] as const;

  const groupHtml = groups
    .map(([title, group]) => {
      const items = group
        .slice()
        .sort((left, right) => left.title.localeCompare(right.title))
        .map(
          (resource) => `
            <li>
              <a href="/mcp/resource/${encodeURIComponent(resource.uri)}">${escapeHtml(resource.title)}</a>
              <div class="meta">${escapeHtml(resource.summary)}</div>
            </li>
          `,
        )
        .join("");

      return `
        <section class="group">
          <h2>${escapeHtml(title)}</h2>
          <ul>${items}</ul>
        </section>
      `;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Incursa UI Kit MCP</title>
    <style>
      :root { color-scheme: light dark; font-family: Inter, Segoe UI, sans-serif; }
      body { margin: 0; padding: 2rem; background: #0f172a; color: #e2e8f0; }
      main { max-width: 1080px; margin: 0 auto; }
      h1, h2 { margin: 0 0 0.75rem; }
      .intro { max-width: 70ch; color: #cbd5e1; }
      .group { margin-top: 2rem; padding: 1.25rem; border: 1px solid #334155; border-radius: 1rem; background: rgba(15, 23, 42, 0.7); }
      ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.75rem; }
      a { color: #7dd3fc; text-decoration: none; font-weight: 600; }
      .meta { color: #94a3b8; font-size: 0.94rem; margin-top: 0.2rem; }
      code { color: #f8fafc; }
    </style>
  </head>
  <body>
    <main>
      <h1>Incursa UI Kit MCP</h1>
      <p class="intro">Deterministic, stateless Model Context Protocol surface for the UI kit. POST to <code>/mcp</code> for protocol traffic or open a resource page below.</p>
      ${groupHtml}
    </main>
  </body>
</html>`;
}

function renderResourcePage(resource: ResourceRecord) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(resource.title)} - Incursa UI Kit MCP</title>
    <style>
      :root { color-scheme: light dark; font-family: Inter, Segoe UI, sans-serif; }
      body { margin: 0; padding: 2rem; background: #0f172a; color: #e2e8f0; }
      main { max-width: 1080px; margin: 0 auto; }
      .card { padding: 1.25rem; border: 1px solid #334155; border-radius: 1rem; background: rgba(15, 23, 42, 0.7); }
      .meta { color: #94a3b8; font-size: 0.94rem; }
      pre { overflow: auto; padding: 1rem; border-radius: 0.85rem; background: #020617; border: 1px solid #334155; white-space: pre-wrap; }
      a { color: #7dd3fc; text-decoration: none; }
      .chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }
      .chip { padding: 0.25rem 0.55rem; border-radius: 999px; background: #1e293b; color: #cbd5e1; font-size: 0.85rem; }
    </style>
  </head>
  <body>
    <main>
      <p><a href="/mcp">Back to index</a></p>
      <div class="card">
        <h1>${escapeHtml(resource.title)}</h1>
        <p class="meta">${escapeHtml(resource.uri)}</p>
        <p>${escapeHtml(resource.summary)}</p>
        <div class="chips">
          <span class="chip">${escapeHtml(resource.group)}</span>
          <span class="chip">${escapeHtml(resource.kind)}</span>
          <span class="chip">${escapeHtml(resource.mimeType)}</span>
        </div>
        <p class="meta">Source: ${escapeHtml(resource.sourcePaths.join(", "))}</p>
        <pre>${escapeHtml(resource.body)}</pre>
      </div>
    </main>
  </body>
</html>`;
}

function normalizeLookupKey(value: string) {
  return slugify(value);
}

function buildComponentLookup() {
  const lookup = new Map<string, ResourceRecord>();
  for (const resource of componentResources) {
    lookup.set(normalizeLookupKey(resource.title), resource);
    lookup.set(normalizeLookupKey(resource.uri), resource);
    lookup.set(normalizeLookupKey(resource.uri.replace("ui-kit://components/", "")), resource);
    for (const alias of resource.aliases ?? []) {
      lookup.set(normalizeLookupKey(alias), resource);
    }
  }
  return lookup;
}

const componentLookup = buildComponentLookup();

function scoreEntry(entry: SearchIndexEntry, query: string, tokens: string[]) {
  const text = normalizeText(entry.searchText);
  const title = normalizeText(entry.title);
  const uri = normalizeText(entry.uri);
  let score = 0;
  let matched = false;

  if (!query) {
    return entry.priority ?? 0;
  }

  if (query === title) {
    score += 1000;
    matched = true;
  }
  if (query === uri) {
    score += 1200;
    matched = true;
  }
  if (title.startsWith(query)) {
    score += 500;
    matched = true;
  }
  if (uri.startsWith(query)) {
    score += 400;
    matched = true;
  }
  if (text.includes(query)) {
    score += 200;
    matched = true;
  }

  for (const token of tokens) {
    if (!token) continue;
    if (title.includes(token)) {
      score += 80;
      matched = true;
    }
    if (uri.includes(token)) {
      score += 70;
      matched = true;
    }
    if (text.includes(token)) {
      score += 20;
      matched = true;
    }
    if ((entry.aliases ?? []).some((alias) => normalizeText(alias).includes(token))) {
      score += 60;
      matched = true;
    }
  }

  if (tokens.length > 1 && tokens.every((token) => text.includes(token))) {
    score += 100;
    matched = true;
  }

  return matched ? score + (entry.priority ?? 0) : 0;
}

function searchUiKit({
  query,
  kind = "any",
  include_examples = true,
  include_installation = true,
  max_results = 8,
}: {
  query: string;
  kind?: string;
  include_examples?: boolean;
  include_installation?: boolean;
  max_results?: number;
}) {
  const normalizedQuery = normalizeText(query);
  const tokens = normalizedQuery.match(/[a-z0-9]+/g) ?? [];

  let candidates = searchEntries.slice();

  if (!include_examples) {
    candidates = candidates.filter((entry) => entry.kind !== "example");
  }

  if (!include_installation) {
    candidates = candidates.filter((entry) => entry.kind !== "install");
  }

  if (kind !== "any") {
    candidates = candidates.filter((entry) => entry.kind === kind);
  }

  const ranked = candidates
    .map((entry) => ({
      ...entry,
      score: searchEntryScore(entry, normalizedQuery, tokens),
    }))
    .filter((entry) => entry.score > 0 || normalizedQuery.length === 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title) || left.uri.localeCompare(right.uri))
    .slice(0, Math.max(1, Math.min(max_results ?? 8, 20)));

  return {
    query,
    kind,
    include_examples,
    include_installation,
    max_results,
    results: ranked.map((entry) => ({
      uri: entry.uri,
      title: entry.title,
      kind: entry.kind,
      summary: entry.summary,
      sourcePaths: entry.sourcePaths,
      score: entry.score,
      relatedUris: resourceMap.get(entry.uri)?.relatedUris ?? [],
    })),
    starterSuggestions: ranked.slice(0, 3).map((entry) => ({
      uri: entry.uri,
      title: entry.title,
      kind: entry.kind,
    })),
  };
}

function searchEntryScore(entry: SearchIndexEntry, query: string, tokens: string[]) {
  return scoreEntry(entry, query, tokens);
}

function buildSearchText(results: ReturnType<typeof searchUiKit>) {
  if (results.results.length === 0) {
    return "No matches found.";
  }

  return [
    `Matches for "${results.query || "(empty query)"}":`,
    ...results.results.map((result) => `- ${result.title} (${result.uri})${result.summary ? ` - ${result.summary}` : ""}`),
  ].join("\n");
}

function chooseComponentMarkup(resource: ResourceRecord, variant?: string) {
  if (!resource.canonicalMarkup) {
    return resource.body;
  }

  if (variant && resource.canonicalMarkup.variants?.[variant]) {
    return resource.canonicalMarkup.variants[variant];
  }

  return resource.canonicalMarkup.default;
}

function getComponentMarkup({
  component_name,
  variant,
  framework = "html",
}: {
  component_name: string;
  variant?: string;
  framework?: string;
}) {
  const lookupKey = normalizeLookupKey(component_name);
  const resource = componentLookup.get(lookupKey);

  if (!resource) {
    throw new Error(`Unknown component name: ${component_name}`);
  }

  const chosenMarkup = chooseComponentMarkup(resource, variant);
  const shapedMarkup = frameworkShape(chosenMarkup, framework);
  const requiredClasses = collectClasses(chosenMarkup);
  const helperHooks = collectHelperHooks(chosenMarkup);

  return {
    component_name,
    variant: variant ?? "default",
    framework,
    markup: shapedMarkup,
    notes: [
      `Source: ${resource.sourcePaths.join(", ")}`,
      variant && chosenMarkup !== resource.canonicalMarkup?.default ? `Variant "${variant}" selected from the canonical snippet set.` : "Canonical snippet from the source docs.",
      framework === "react" ? "class attributes were converted to className and for to htmlFor." : "No framework-specific transform was applied.",
    ],
    requiredClasses,
    helperHooks,
    relatedUris: Array.from(new Set([resource.uri, ...(resource.relatedUris ?? [])])),
  };
}

function buildInstallCommands(packageManager: string, useCase: string) {
  const packageInstall =
    packageManager === "npm"
      ? `npm install ${packageName}`
      : packageManager === "pnpm"
        ? `pnpm add ${packageName}`
        : `yarn add ${packageName}`;

  const scssInstall =
    packageManager === "npm"
      ? `npm install ${packageName} bootstrap sass`
      : packageManager === "pnpm"
        ? `pnpm add ${packageName} bootstrap sass`
        : `yarn add ${packageName} bootstrap sass`;

  switch (useCase) {
    case "scss":
      return scssInstall;
    default:
      return packageInstall;
  }
}

function buildUpdateCommands(packageManager: string) {
  if (packageManager === "npm") {
    return `npm install ${packageName}@latest`;
  }
  if (packageManager === "pnpm") {
    return `pnpm up ${packageName}`;
  }
  return `yarn upgrade ${packageName}`;
}

function getInstallationInstructions({
  framework = "html",
  use_case = "css-only",
  package_manager = "npm",
}: {
  framework?: string;
  use_case?: string;
  package_manager?: string;
}) {
  const primary = {
    "css-only": installData.importExamples.cssOnly,
    scss: installData.importExamples.scss,
    "js-helper": installData.importExamples.jsHelper,
    "web-components": installData.importExamples.webComponents,
  }[use_case];

  const installCommands = [buildInstallCommands(package_manager, use_case)];
  const updateCommands = [buildUpdateCommands(package_manager)];

  const importExamples = [
    `Compiled CSS: ${installData.importExamples.cssOnly}`,
    `JS helper: ${installData.importExamples.jsHelper}`,
    `Web components: ${installData.importExamples.webComponents}`,
    `SCSS source: ${installData.importExamples.scss}`,
  ];

  return {
    framework,
    use_case,
    package_manager,
    install_commands: installCommands,
    update_commands: updateCommands,
    import_examples: [
      `Primary for ${use_case}: ${primary}`,
      ...importExamples,
    ],
    notes: [
      ...installData.notes,
      framework === "react" ? "React callers should adapt class attributes to className when they copy snippets." : "HTML, Razor, and Blazor can reuse the HTML snippets directly.",
    ],
    relatedUris: installData.relatedUris,
  };
}

function buildInstallationText(result: ReturnType<typeof getInstallationInstructions>) {
  return [
    `Use case: ${result.use_case}`,
    `Package manager: ${result.package_manager}`,
    "",
    "Install commands:",
    ...result.install_commands.map((command) => `- ${command}`),
    "",
    "Update commands:",
    ...result.update_commands.map((command) => `- ${command}`),
    "",
    "Import examples:",
    ...result.import_examples.map((line) => `- ${line}`),
    "",
    "Notes:",
    ...result.notes.map((line) => `- ${line}`),
  ].join("\n");
}

function registerResourceHandlers(server: McpServer) {
  for (const resource of resources) {
    server.registerResource(
      resource.title,
      resource.uri,
      {
        description: resource.summary,
        mimeType: resource.mimeType,
      },
      async () => ({
        contents: [
          {
            uri: resource.uri,
            mimeType: resource.mimeType,
            text: resource.body,
          },
        ],
      }),
    );
  }

  const templateGroups: Array<[string, ResourceRecord["group"]]> = [
    ["ui-kit://component/{name}", "components"],
    ["ui-kit://pattern/{name}", "patterns"],
    ["ui-kit://spec/{id}", "specs"],
    ["ui-kit://example/{name}", "examples"],
    ["ui-kit://file/{path}", "files"],
  ];

  for (const [template, group] of templateGroups) {
    const groupResources = resources.filter((resource) => resource.group === group);
    server.registerResource(
      `${group}-template`,
      new ResourceTemplate(template, {
        list: async () => ({
          resources: groupResources.map((resource) => ({
            uri: resource.uri,
            name: resource.title,
            title: resource.title,
            description: resource.summary,
            mimeType: resource.mimeType,
          })),
        }),
      }),
      {
        description: `${group} resource template`,
        mimeType: "text/markdown; charset=utf-8",
      },
      async (uri: URL, _variables: Record<string, string>, _extra: unknown) => {
        const resource = lookupResource(uri.toString());
        return {
          contents: [
            {
              uri: resource.uri,
              mimeType: resource.mimeType,
              text: resource.body,
            },
          ],
        };
      },
    );
  }
}

function registerTools(server: McpServer) {
  server.registerTool(
    "search_ui_kit",
    {
      description: "Search the precompiled UI kit manifest.",
      inputSchema: {
        query: z.string().describe("Search text"),
        kind: z.enum(["component", "pattern", "spec", "guide", "install", "any"]).default("any"),
        include_examples: z.boolean().default(true),
        include_installation: z.boolean().default(true),
        max_results: z.number().int().positive().max(20).default(8),
      },
      outputSchema: {
        query: z.string(),
        kind: z.string(),
        include_examples: z.boolean(),
        include_installation: z.boolean(),
        max_results: z.number(),
        results: z.array(
          z.object({
            uri: z.string(),
            title: z.string(),
            kind: z.string(),
            summary: z.string(),
            sourcePaths: z.array(z.string()),
            score: z.number(),
            relatedUris: z.array(z.string()),
          }),
        ),
        starterSuggestions: z.array(
          z.object({
            uri: z.string(),
            title: z.string(),
            kind: z.string(),
          }),
        ),
      },
    },
    async (args) => {
      const result = searchUiKit(args);
      return {
        content: [{ type: "text", text: buildSearchText(result) }],
        structuredContent: result,
      };
    },
  );

  server.registerTool(
    "get_component_markup",
    {
      description: "Return canonical starter markup for a known UI kit component.",
      inputSchema: {
        component_name: z.string().describe("Component name"),
        variant: z.string().optional(),
        framework: z.enum(["html", "razor", "blazor", "react"]).default("html"),
      },
      outputSchema: {
        component_name: z.string(),
        variant: z.string(),
        framework: z.string(),
        markup: z.string(),
        notes: z.array(z.string()),
        requiredClasses: z.array(z.string()),
        helperHooks: z.array(z.string()),
        relatedUris: z.array(z.string()),
      },
    },
    async (args) => {
      const result = getComponentMarkup(args);
      return {
        content: [
          {
            type: "text",
            text: result.markup,
          },
        ],
        structuredContent: result,
      };
    },
  );

  server.registerTool(
    "get_installation_instructions",
    {
      description: "Return package installation and update instructions.",
      inputSchema: {
        framework: z.enum(["html", "razor", "blazor", "react"]).default("html"),
        use_case: z.enum(["css-only", "scss", "js-helper", "web-components"]).default("css-only"),
        package_manager: z.enum(["npm", "pnpm", "yarn"]).default("npm"),
      },
      outputSchema: {
        framework: z.string(),
        use_case: z.string(),
        package_manager: z.string(),
        install_commands: z.array(z.string()),
        update_commands: z.array(z.string()),
        import_examples: z.array(z.string()),
        notes: z.array(z.string()),
        relatedUris: z.array(z.string()),
      },
    },
    async (args) => {
      const result = getInstallationInstructions(args);
      return {
        content: [{ type: "text", text: buildInstallationText(result) }],
        structuredContent: result,
      };
    },
  );
}

function createServer() {
  const server = new McpServer({ name: "incursa-ui-kit-mcp", version: packageVersion }, { capabilities: { logging: {} } });
  registerResourceHandlers(server);
  registerTools(server);
  return server;
}

async function handleMcpRequest(request: Request) {
  const server = createServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  await server.connect(transport);
  return transport.handleRequest(request);
}

function isResourcePath(pathname: string) {
  return pathname === "/mcp" || pathname === "/";
}

function findResourceForRequest(url: URL) {
  if (url.pathname === "/mcp" || url.pathname === "/") {
    return null;
  }

  const resourcePrefix = "/mcp/resource/";
  const rawResourcePrefix = "/resource/";
  let encodedUri = "";

  if (url.pathname.startsWith(resourcePrefix)) {
    encodedUri = url.pathname.slice(resourcePrefix.length);
  } else if (url.pathname.startsWith(rawResourcePrefix)) {
    encodedUri = url.pathname.slice(rawResourcePrefix.length);
  } else if (url.searchParams.has("uri")) {
    encodedUri = url.searchParams.get("uri") ?? "";
  }

  if (!encodedUri) {
    return null;
  }

  const decodedUri = decodeURIComponent(encodedUri);
  return lookupResource(decodedUri);
}

export async function fetch(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (request.method === "POST" && url.pathname === "/mcp") {
    return handleMcpRequest(request);
  }

  if (request.method === "GET" && isResourcePath(url.pathname)) {
    return new Response(renderDocsIndexHtml(), {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  if (request.method === "GET") {
    try {
      const resource = findResourceForRequest(url);
      if (resource) {
        return new Response(renderResourcePage(resource), {
          headers: {
            "content-type": "text/html; charset=utf-8",
          },
        });
      }
    } catch (error) {
      return new Response(String(error instanceof Error ? error.message : error), {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
        },
      });
    }
  }

  return new Response("Not found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}

export default {
  fetch,
};
