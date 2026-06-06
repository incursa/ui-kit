// node_modules/lucide/dist/esm/defaultAttributes.mjs
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

// node_modules/lucide/dist/esm/createElement.mjs
var createSVGElement = ([tag, attrs, children]) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.keys(attrs).forEach((name) => {
    element.setAttribute(name, String(attrs[name]));
  });
  if (children?.length) {
    children.forEach((child) => {
      const childElement = createSVGElement(child);
      element.appendChild(childElement);
    });
  }
  return element;
};
var createElement = (iconNode, customAttrs = {}) => {
  const tag = "svg";
  const attrs = {
    ...defaultAttributes,
    ...customAttrs
  };
  return createSVGElement([tag, attrs, iconNode]);
};

// node_modules/lucide/dist/esm/icons/circle-check.mjs
var CircleCheck = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m9 12 2 2 4-4" }]
];

// node_modules/lucide/dist/esm/icons/circle-question-mark.mjs
var CircleQuestionMark = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
  ["path", { d: "M12 17h.01" }]
];

// node_modules/lucide/dist/esm/icons/circle-x.mjs
var CircleX = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m15 9-6 6" }],
  ["path", { d: "m9 9 6 6" }]
];

// node_modules/lucide/dist/esm/icons/download.mjs
var Download = [
  ["path", { d: "M12 15V3" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
  ["path", { d: "m7 10 5 5 5-5" }]
];

// node_modules/lucide/dist/esm/icons/external-link.mjs
var ExternalLink = [
  ["path", { d: "M15 3h6v6" }],
  ["path", { d: "M10 14 21 3" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]
];

// node_modules/lucide/dist/esm/icons/file-text.mjs
var FileText = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M10 9H8" }],
  ["path", { d: "M16 13H8" }],
  ["path", { d: "M16 17H8" }]
];

// node_modules/lucide/dist/esm/icons/folder-plus.mjs
var FolderPlus = [
  ["path", { d: "M12 10v6" }],
  ["path", { d: "M9 13h6" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ]
];

// node_modules/lucide/dist/esm/icons/info.mjs
var Info = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 16v-4" }],
  ["path", { d: "M12 8h.01" }]
];

// node_modules/lucide/dist/esm/icons/lock.mjs
var Lock = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }]
];

// node_modules/lucide/dist/esm/icons/pause.mjs
var Pause = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1" }]
];

// node_modules/lucide/dist/esm/icons/play.mjs
var Play = [
  [
    "path",
    { d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" }
  ]
];

// node_modules/lucide/dist/esm/icons/refresh-cw.mjs
var RefreshCw = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }],
  ["path", { d: "M21 3v5h-5" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }],
  ["path", { d: "M8 16H3v5" }]
];

// node_modules/lucide/dist/esm/icons/search-x.mjs
var SearchX = [
  ["path", { d: "m13.5 8.5-5 5" }],
  ["path", { d: "m8.5 8.5 5 5" }],
  ["circle", { cx: "11", cy: "11", r: "8" }],
  ["path", { d: "m21 21-4.3-4.3" }]
];

// node_modules/lucide/dist/esm/icons/settings.mjs
var Settings = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3" }]
];

// node_modules/lucide/dist/esm/icons/shield-check.mjs
var ShieldCheck = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4" }]
];

// node_modules/lucide/dist/esm/icons/triangle-alert.mjs
var TriangleAlert = [
  ["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }],
  ["path", { d: "M12 9v4" }],
  ["path", { d: "M12 17h.01" }]
];

// node_modules/lucide/dist/esm/icons/upload.mjs
var Upload = [
  ["path", { d: "M12 3v12" }],
  ["path", { d: "m17 8-5-5-5 5" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }]
];

// src/icons/index.js
var ICON_NODES = Object.freeze({
  info: Info,
  help: CircleQuestionMark,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
  upload: Upload,
  document: FileText,
  download: Download,
  settings: Settings,
  "external-link": ExternalLink,
  empty: FolderPlus,
  "no-results": SearchX,
  loading: RefreshCw,
  lock: Lock,
  pause: Pause,
  play: Play,
  permission: ShieldCheck
});
var ICON_NAMES = Object.freeze(Object.keys(ICON_NODES));
var DEFAULT_SIZE = 16;
function getNamespace() {
  if (typeof globalThis === "undefined") {
    return null;
  }
  const root = globalThis.IncWebComponents || (globalThis.IncWebComponents = {});
  const icons = root.icons || (root.icons = {});
  if (!icons.names) {
    icons.names = ICON_NAMES;
  }
  if (!icons.defaultRenderer) {
    icons.defaultRenderer = renderDefaultIcon;
  }
  if (!icons.render) {
    icons.render = renderIncIcon;
  }
  if (!icons.setRenderer) {
    icons.setRenderer = setIconRenderer;
  }
  return icons;
}
function normalizeIconName(name) {
  return String(name || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
}
function normalizeSize(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_SIZE;
}
function buildIconAttributes(name, options = {}) {
  const size = normalizeSize(options.size);
  const className = options.className || "inc-icon";
  const attrs = {
    width: size,
    height: size,
    "data-inc-icon": name,
    class: className,
    focusable: "false"
  };
  if (options.decorative !== false) {
    attrs["aria-hidden"] = "true";
  } else {
    attrs.role = "img";
    attrs["aria-label"] = options.label || name;
  }
  return attrs;
}
function renderDefaultIcon(name, options = {}) {
  const normalizedName = normalizeIconName(name);
  const iconNode = ICON_NODES[normalizedName] || ICON_NODES.info;
  if (typeof document === "undefined") {
    return "";
  }
  return createElement(iconNode, buildIconAttributes(normalizedName, options));
}
function coerceIconResult(result) {
  if (!result || typeof document === "undefined") {
    return null;
  }
  if (result instanceof Node) {
    return result;
  }
  if (typeof result === "string") {
    const template = document.createElement("template");
    template.innerHTML = result.trim();
    return template.content.firstElementChild || null;
  }
  return null;
}
function getIconRenderer() {
  const namespace = getNamespace();
  return typeof namespace?.renderer === "function" ? namespace.renderer : renderDefaultIcon;
}
function setIconRenderer(renderer) {
  const namespace = getNamespace();
  if (!namespace) {
    return null;
  }
  if (renderer == null) {
    delete namespace.renderer;
    return null;
  }
  if (typeof renderer !== "function") {
    throw new TypeError("Inc icon renderer must be a function.");
  }
  namespace.renderer = renderer;
  return renderer;
}
function renderIncIcon(name, options = {}) {
  const normalizedName = normalizeIconName(name) || "info";
  const renderer = getIconRenderer();
  const rendered = renderer(normalizedName, options);
  const icon = coerceIconResult(rendered) || coerceIconResult(renderDefaultIcon(normalizedName, options));
  if (icon instanceof Element && options.decorative !== false) {
    icon.setAttribute("aria-hidden", "true");
    icon.removeAttribute("aria-label");
    icon.removeAttribute("role");
  }
  return icon;
}
function replaceIconContents(container, name, options = {}) {
  if (!(container instanceof Element)) {
    return null;
  }
  container.replaceChildren();
  const icon = renderIncIcon(name, options);
  if (icon) {
    icon.setAttribute("data-inc-generated-icon", "true");
    icon.setAttribute("data-inc-icon-upgraded", "true");
    container.append(icon);
  }
  return icon;
}
function upgradeIconPlaceholders(root = typeof document !== "undefined" ? document : null) {
  if (!root || typeof root.querySelectorAll !== "function") {
    return [];
  }
  const upgraded = [];
  root.querySelectorAll("[data-inc-icon]").forEach((node) => {
    if (!(node instanceof Element)) {
      return;
    }
    const name = node.getAttribute("data-inc-icon");
    if (!name || node.hasAttribute("data-inc-icon-upgraded") || node.hasAttribute("data-inc-generated-icon")) {
      return;
    }
    replaceIconContents(node, name, {
      className: node.getAttribute("data-inc-icon-class") || "inc-icon",
      decorative: node.getAttribute("aria-hidden") !== "false",
      label: node.getAttribute("aria-label") || void 0,
      size: node.getAttribute("data-inc-icon-size") || void 0
    });
    node.setAttribute("data-inc-icon-upgraded", "true");
    upgraded.push(node);
  });
  return upgraded;
}
getNamespace();
export {
  getIconRenderer,
  ICON_NAMES as incIconNames,
  normalizeIconName,
  renderDefaultIcon,
  renderIncIcon,
  replaceIconContents,
  setIconRenderer,
  upgradeIconPlaceholders
};
/*! Bundled license information:

lucide/dist/esm/defaultAttributes.mjs:
lucide/dist/esm/createElement.mjs:
lucide/dist/esm/icons/circle-check.mjs:
lucide/dist/esm/icons/circle-question-mark.mjs:
lucide/dist/esm/icons/circle-x.mjs:
lucide/dist/esm/icons/download.mjs:
lucide/dist/esm/icons/external-link.mjs:
lucide/dist/esm/icons/file-text.mjs:
lucide/dist/esm/icons/folder-plus.mjs:
lucide/dist/esm/icons/info.mjs:
lucide/dist/esm/icons/lock.mjs:
lucide/dist/esm/icons/pause.mjs:
lucide/dist/esm/icons/play.mjs:
lucide/dist/esm/icons/refresh-cw.mjs:
lucide/dist/esm/icons/search-x.mjs:
lucide/dist/esm/icons/settings.mjs:
lucide/dist/esm/icons/shield-check.mjs:
lucide/dist/esm/icons/triangle-alert.mjs:
lucide/dist/esm/icons/upload.mjs:
  (**
   * @license lucide v1.17.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
