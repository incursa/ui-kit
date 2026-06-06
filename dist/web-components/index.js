// src/web-components/shared.js
var BOOLEAN_FALSE_TOKENS = /* @__PURE__ */ new Set(["false", "0", "off", "no"]);
function isCustomElementsAvailable() {
  return typeof globalThis !== "undefined" && "customElements" in globalThis;
}
function toKebabCase(value) {
  return String(value).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").toLowerCase();
}
function normalizeAttributeConfig(propertyName, config) {
  const normalized = typeof config === "string" ? { attribute: config } : { ...config };
  const type = normalized.type || "string";
  return {
    property: propertyName,
    attribute: normalized.attribute || toKebabCase(propertyName),
    type,
    reflect: normalized.reflect !== false,
    defaultValue: normalized.defaultValue,
    parse: normalized.parse,
    serialize: normalized.serialize
  };
}
function parseBoolean(value) {
  if (value == null) {
    return false;
  }
  return !BOOLEAN_FALSE_TOKENS.has(String(value).toLowerCase());
}
function parseNumber(value, fallback = null) {
  if (value == null || value === "") {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
function parseValueFromAttribute(rawValue, config) {
  if (typeof config.parse === "function") {
    return config.parse(rawValue);
  }
  if (config.type === "boolean") {
    return parseBoolean(rawValue);
  }
  if (config.type === "number") {
    return parseNumber(rawValue, config.defaultValue ?? null);
  }
  return rawValue ?? config.defaultValue ?? "";
}
function serializeValueForAttribute(value, config) {
  if (typeof config.serialize === "function") {
    return config.serialize(value);
  }
  if (config.type === "boolean") {
    return value ? "" : null;
  }
  if (value == null) {
    return null;
  }
  return String(value);
}
function reflectAttributeValue(host, attribute, serializedValue) {
  if (!host || typeof host.setAttribute !== "function") {
    return;
  }
  if (serializedValue == null) {
    host.removeAttribute(attribute);
    return;
  }
  host.setAttribute(attribute, serializedValue);
}
function readReflectedAttribute(host, config) {
  const rawValue = host.getAttribute(config.attribute);
  return parseValueFromAttribute(rawValue, config);
}
function getAssignedSlotElements(host, slotName = "") {
  if (!host || typeof host.querySelector !== "function") {
    return [];
  }
  const selector = slotName ? `slot[name="${slotName}"]` : "slot:not([name])";
  const slot = host.querySelector(selector);
  if (typeof HTMLSlotElement === "undefined" || !(slot instanceof HTMLSlotElement)) {
    return [];
  }
  return slot.assignedElements({ flatten: true });
}
function dispatchComponentEvent(host, type, detail = {}, options = {}) {
  if (!host || typeof host.dispatchEvent !== "function") {
    return false;
  }
  const event = new CustomEvent(type, {
    bubbles: options.bubbles !== false,
    composed: options.composed !== false,
    cancelable: options.cancelable === true,
    detail
  });
  return host.dispatchEvent(event);
}
function getIncWebComponentsNamespace() {
  if (typeof globalThis === "undefined") {
    return null;
  }
  if (!globalThis.IncWebComponents || typeof globalThis.IncWebComponents !== "object") {
    globalThis.IncWebComponents = {};
  }
  return globalThis.IncWebComponents;
}
function defineCustomElement(name, constructor, registry = null) {
  if (!isCustomElementsAvailable()) {
    return { defined: false, reason: "custom-elements-unavailable", name };
  }
  const targetRegistry = registry || globalThis.customElements;
  const existing = targetRegistry.get(name);
  if (existing) {
    return {
      defined: existing === constructor,
      reason: existing === constructor ? "already-defined" : "name-conflict",
      name,
      constructor: existing
    };
  }
  targetRegistry.define(name, constructor);
  return { defined: true, reason: "defined", name, constructor };
}

// src/web-components/registry.js
var registryEntries = /* @__PURE__ */ new Map();
function registerComponent(name, constructor) {
  if (typeof name !== "string" || !name.startsWith("inc-")) {
    throw new TypeError(`Web Component name must use the "inc-" prefix. Received "${name}".`);
  }
  if (typeof constructor !== "function") {
    throw new TypeError(`Constructor for "${name}" must be a function.`);
  }
  registryEntries.set(name, constructor);
  return constructor;
}
function registerComponents(entries) {
  if (!entries || typeof entries !== "object") {
    return [];
  }
  const registered = [];
  Object.entries(entries).forEach(([name, constructor]) => {
    registerComponent(name, constructor);
    registered.push(name);
  });
  return registered;
}
function getRegisteredComponents() {
  return [...registryEntries.entries()].map(([name, constructor]) => ({ name, constructor }));
}
function defineAll(options = {}) {
  const results = [];
  const registry = options.registry || null;
  registryEntries.forEach((constructor, name) => {
    results.push(defineCustomElement(name, constructor, registry));
  });
  return results;
}
function hasRegisteredComponent(name) {
  return registryEntries.has(name);
}
function installRegistryNamespace() {
  const namespace2 = getIncWebComponentsNamespace();
  if (!namespace2) {
    return null;
  }
  namespace2.registry = {
    registerComponent,
    registerComponents,
    getRegisteredComponents,
    hasRegisteredComponent,
    defineAll
  };
  return namespace2.registry;
}

// src/web-components/components/layout.js
(function(root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  const exports = factory();
  root.IncWebComponents = root.IncWebComponents || {};
  root.IncWebComponents.layout = exports;
})(typeof globalThis !== "undefined" ? globalThis : window, function() {
  "use strict";
  const BOOLEAN_ATTRIBUTE_TYPES = /* @__PURE__ */ new Set(["boolean"]);
  const HTMLElementRef = typeof HTMLElement === "undefined" ? null : HTMLElement;
  const MutationObserverRef = typeof MutationObserver === "undefined" ? null : MutationObserver;
  const BaseElement = HTMLElementRef || class {
  };
  function toBooleanAttribute3(value) {
    return value === true || value === "" || value === "true";
  }
  function tokenList(value) {
    if (!value) {
      return [];
    }
    return String(value).split(/\s+/u).map((part) => part.trim()).filter(Boolean);
  }
  function dispatchSlotChange(host) {
    host.dispatchEvent(new Event("slotchange"));
  }
  class IncLayoutElement extends BaseElement {
    static get observedAttributes() {
      return this.layoutConfig ? Object.keys(this.layoutConfig.attributes || {}) : [];
    }
    constructor() {
      super();
      this._mutationObserver = null;
      this._syncQueued = false;
      this._appliedTokenClasses = /* @__PURE__ */ new Map();
      this._appliedBooleanClasses = /* @__PURE__ */ new Map();
      this._appliedIntegerClasses = /* @__PURE__ */ new Map();
    }
    connectedCallback() {
      this._applyHostClasses();
      this._syncChildren();
      if (!MutationObserverRef) {
        return;
      }
      if (!this._mutationObserver) {
        this._mutationObserver = new MutationObserverRef(() => this._queueSync());
      }
      this._mutationObserver.observe(this, {
        childList: true,
        attributes: true,
        subtree: false,
        attributeFilter: ["slot"]
      });
    }
    disconnectedCallback() {
      if (this._mutationObserver) {
        this._mutationObserver.disconnect();
      }
    }
    attributeChangedCallback() {
      this._applyHostClasses();
      this._queueSync();
    }
    _queueSync() {
      if (this._syncQueued) {
        return;
      }
      this._syncQueued = true;
      queueMicrotask(() => {
        this._syncQueued = false;
        this._syncChildren();
        dispatchSlotChange(this);
      });
    }
    _applyHostClasses() {
      const config = this.constructor.layoutConfig || {};
      const hostClasses = [config.baseClass, ...config.hostClasses || []].filter(Boolean);
      this.classList.add(...hostClasses);
      const parts = tokenList(config.parts);
      if (parts.length) {
        this.setAttribute("part", parts.join(" "));
      }
      const attributes = config.attributes || {};
      Object.entries(attributes).forEach(([name, meta]) => {
        const value = this.getAttribute(name);
        const baseClass = config.baseClass;
        const hostClassPrefix = meta.classPrefix || (baseClass ? `${baseClass}--` : "");
        if (meta.type === "token") {
          const values = tokenList(value);
          const appliedKey = `${name}:token`;
          const previousClasses = this._appliedTokenClasses.get(appliedKey) || [];
          previousClasses.forEach((className) => this.classList.remove(className));
          const nextClasses = values.map((token) => `${hostClassPrefix}${token}`);
          nextClasses.forEach((className) => this.classList.add(className));
          this._appliedTokenClasses.set(appliedKey, nextClasses);
          return;
        }
        if (BOOLEAN_ATTRIBUTE_TYPES.has(meta.type)) {
          const enabled = toBooleanAttribute3(value);
          const onClass = meta.trueClass || `${baseClass}--${name}`;
          const offClass = meta.falseClass;
          const appliedKey = `${name}:boolean`;
          const previousClasses = this._appliedBooleanClasses.get(appliedKey) || [];
          previousClasses.forEach((className) => this.classList.remove(className));
          const nextClasses = [];
          if (this.hasAttribute(name)) {
            if (enabled && onClass) {
              nextClasses.push(onClass);
            } else if (!enabled && offClass) {
              nextClasses.push(offClass);
            }
          }
          nextClasses.forEach((className) => this.classList.add(className));
          this._appliedBooleanClasses.set(appliedKey, nextClasses);
          return;
        }
        if (meta.type === "integer" && name === "columns") {
          const parsed = Number.parseInt(value || "", 10);
          const appliedKey = `${name}:integer`;
          const previousClasses = this._appliedIntegerClasses.get(appliedKey) || [];
          previousClasses.forEach((className) => this.classList.remove(className));
          if (Number.isInteger(parsed) && parsed > 0) {
            this.style.setProperty("--inc-summary-columns", String(parsed));
            const nextClasses = [`${baseClass}--${parsed}-col`];
            nextClasses.forEach((className) => this.classList.add(className));
            this._appliedIntegerClasses.set(appliedKey, nextClasses);
            return;
          }
          this.style.removeProperty("--inc-summary-columns");
          this._appliedIntegerClasses.set(appliedKey, []);
        }
      });
    }
    _syncChildren() {
      const config = this.constructor.layoutConfig || {};
      const slotClasses = config.slotClasses || {};
      const managedClasses = new Set(Object.values(slotClasses));
      Array.from(this.children).forEach((child) => {
        if (!HTMLElementRef || !(child instanceof HTMLElementRef)) {
          return;
        }
        managedClasses.forEach((className) => {
          child.classList.remove(className);
        });
        const slotName = child.getAttribute("slot");
        const slotClass = slotClasses[slotName] || null;
        if (slotClass) {
          child.classList.add(slotClass);
        }
      });
    }
  }
  function defineLayoutAccessors(ComponentClass) {
    const config = ComponentClass.layoutConfig || {};
    const attributes = config.attributes || {};
    Object.entries(attributes).forEach(([attributeName, meta]) => {
      if (Object.prototype.hasOwnProperty.call(ComponentClass.prototype, attributeName)) {
        return;
      }
      Object.defineProperty(ComponentClass.prototype, attributeName, {
        configurable: true,
        enumerable: true,
        get() {
          if (meta.type === "boolean") {
            return this.hasAttribute(attributeName);
          }
          if (meta.type === "integer") {
            const value = Number.parseInt(this.getAttribute(attributeName) || "", 10);
            return Number.isNaN(value) ? null : value;
          }
          return this.getAttribute(attributeName);
        },
        set(value) {
          if (meta.type === "boolean") {
            if (value) {
              this.setAttribute(attributeName, "");
            } else {
              this.removeAttribute(attributeName);
            }
            return;
          }
          if (value === null || value === void 0 || value === "") {
            this.removeAttribute(attributeName);
            return;
          }
          this.setAttribute(attributeName, String(value));
        }
      });
    });
  }
  class IncAppShellElement extends IncLayoutElement {
  }
  IncAppShellElement.layoutConfig = {
    baseClass: "inc-app-shell",
    parts: "shell header main footer",
    attributes: {
      variant: { type: "token" },
      dense: { type: "boolean" },
      collapsed: { type: "boolean" }
    },
    slotClasses: {
      header: "inc-app-shell__header",
      main: "inc-app-shell__main",
      footer: "inc-app-shell__footer"
    }
  };
  class IncPageElement extends IncLayoutElement {
  }
  IncPageElement.layoutConfig = {
    baseClass: "inc-page",
    parts: "page breadcrumbs body aside footer",
    attributes: {
      variant: { type: "token" },
      dense: { type: "boolean" },
      wide: { type: "boolean" }
    },
    slotClasses: {
      breadcrumbs: "inc-page__breadcrumbs",
      header: "inc-page__header",
      body: "inc-page__body",
      aside: "inc-page__aside",
      footer: "inc-page__footer"
    }
  };
  class IncPageHeaderElement extends IncLayoutElement {
  }
  IncPageHeaderElement.layoutConfig = {
    baseClass: "inc-page-header",
    parts: "header title body actions",
    attributes: {
      variant: { type: "token" },
      dense: { type: "boolean" }
    },
    slotClasses: {
      title: "inc-page-header__title",
      body: "inc-page-header__body",
      actions: "inc-page-header__actions"
    }
  };
  class IncSectionElement extends IncLayoutElement {
  }
  IncSectionElement.layoutConfig = {
    baseClass: "inc-section-container",
    hostClasses: ["inc-section"],
    parts: "section header body footer actions",
    attributes: {
      variant: { type: "token", classPrefix: "inc-section--" },
      dense: { type: "boolean", trueClass: "inc-section--dense" },
      tone: { type: "token", classPrefix: "inc-section--tone-" }
    },
    slotClasses: {
      header: "inc-section__header",
      body: "inc-section__body",
      footer: "inc-section__footer",
      actions: "inc-section__actions"
    }
  };
  class IncCardElement extends IncLayoutElement {
  }
  IncCardElement.layoutConfig = {
    baseClass: "inc-card",
    parts: "card header body footer",
    attributes: {
      variant: { type: "token" },
      tone: { type: "token", classPrefix: "inc-card--tone-" },
      elevated: { type: "boolean", trueClass: "inc-card--elevated" }
    },
    slotClasses: {
      header: "inc-card__header",
      body: "inc-card__body",
      footer: "inc-card__footer"
    }
  };
  class IncSummaryOverviewElement extends IncLayoutElement {
  }
  IncSummaryOverviewElement.layoutConfig = {
    baseClass: "inc-summary-overview",
    parts: "overview",
    attributes: {
      columns: { type: "integer" },
      dense: { type: "boolean" }
    },
    slotClasses: {}
  };
  class IncSummaryBlockElement extends IncLayoutElement {
  }
  IncSummaryBlockElement.layoutConfig = {
    baseClass: "inc-summary-block",
    parts: "block header body footer actions value status",
    attributes: {
      variant: { type: "token" },
      tone: { type: "token", classPrefix: "inc-summary-block--tone-" },
      dense: { type: "boolean" }
    },
    slotClasses: {
      header: "inc-summary-block__header",
      body: "inc-summary-block__body",
      footer: "inc-summary-block__footer",
      actions: "inc-summary-block__actions"
    }
  };
  class IncFooterBarElement extends IncLayoutElement {
  }
  IncFooterBarElement.layoutConfig = {
    baseClass: "inc-footer-bar",
    parts: "footer menu meta",
    attributes: {
      variant: { type: "token" },
      dense: { type: "boolean" }
    },
    slotClasses: {
      menu: "inc-footer-bar__menu",
      meta: "inc-footer-bar__meta"
    }
  };
  const layoutComponents = [
    ["inc-app-shell", IncAppShellElement],
    ["inc-page", IncPageElement],
    ["inc-page-header", IncPageHeaderElement],
    ["inc-section", IncSectionElement],
    ["inc-card", IncCardElement],
    ["inc-summary-overview", IncSummaryOverviewElement],
    ["inc-summary-block", IncSummaryBlockElement],
    ["inc-footer-bar", IncFooterBarElement]
  ];
  layoutComponents.forEach(([, ComponentClass]) => {
    defineLayoutAccessors(ComponentClass);
  });
  function defineLayoutComponents(registry) {
    const targetRegistry = registry || (typeof customElements !== "undefined" ? customElements : null);
    if (!targetRegistry) {
      return [];
    }
    const defined = [];
    layoutComponents.forEach(([tagName, ComponentClass]) => {
      if (targetRegistry.get(tagName)) {
        return;
      }
      targetRegistry.define(tagName, ComponentClass);
      defined.push(tagName);
    });
    return defined;
  }
  return {
    IncAppShellElement,
    IncPageElement,
    IncPageHeaderElement,
    IncSectionElement,
    IncCardElement,
    IncSummaryOverviewElement,
    IncSummaryBlockElement,
    IncFooterBarElement,
    layoutComponents,
    defineLayoutComponents
  };
});

// src/web-components/components/navigation.js
var NAVBAR_TAG = "inc-navbar";
var TABS_TAG = "inc-tabs";
var USER_MENU_TAG = "inc-user-menu";
var TAB_KEYS = /* @__PURE__ */ new Set(["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End", "Enter", " "]);
var MENU_KEYS = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Home", "End", "Escape", "Enter", " "]);
var HostElement = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
var uidCounter = 0;
function nextId(prefix) {
  uidCounter += 1;
  return `${prefix}-${uidCounter}`;
}
function asBoolean(value) {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "false" || normalized === "0" || normalized === "off" || normalized === "no") {
      return false;
    }
  }
  return Boolean(value);
}
function normalizeActivation(value) {
  return value === "manual" ? "manual" : "auto";
}
function normalizeOrientation(value) {
  return value === "vertical" ? "vertical" : "horizontal";
}
function emit(host, type, detail = {}) {
  host.dispatchEvent(new CustomEvent(type, {
    bubbles: true,
    composed: true,
    detail
  }));
}
function defineClassToken(element, token, on) {
  if (!element || !token) {
    return;
  }
  element.classList.toggle(token, Boolean(on));
}
function getFocusableItems(container) {
  if (!(container instanceof HTMLElement)) {
    return [];
  }
  return Array.from(container.querySelectorAll("a[href], button:not([disabled]), [role='menuitem'], [role='menuitemradio'], [role='menuitemcheckbox'], [tabindex]:not([tabindex='-1'])")).filter((candidate) => candidate instanceof HTMLElement && !candidate.hasAttribute("disabled") && !candidate.hasAttribute("aria-disabled"));
}
var IncNavbarElement = class extends HostElement {
  static get observedAttributes() {
    return ["expanded", "breakpoint", "app", "variant"];
  }
  constructor() {
    super();
    this._boundClick = (event) => this._onClick(event);
    this._boundKeydown = (event) => this._onKeydown(event);
    this._boundSlotChange = () => this._syncStructure();
  }
  connectedCallback() {
    this.classList.add("inc-navbar");
    this.setAttribute("role", this.getAttribute("role") || "navigation");
    this._syncStructure();
    this._syncClasses();
    this.addEventListener("click", this._boundClick);
    this.addEventListener("keydown", this._boundKeydown);
    this.addEventListener("slotchange", this._boundSlotChange);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this._boundClick);
    this.removeEventListener("keydown", this._boundKeydown);
    this.removeEventListener("slotchange", this._boundSlotChange);
  }
  attributeChangedCallback(name) {
    if (name === "expanded") {
      emit(this, "toggle", { expanded: this.expanded });
    }
    this._syncClasses();
  }
  get expanded() {
    return this.hasAttribute("expanded");
  }
  set expanded(value) {
    if (asBoolean(value)) {
      this.setAttribute("expanded", "");
    } else {
      this.removeAttribute("expanded");
    }
  }
  expand() {
    if (!this.expanded) {
      this.expanded = true;
      emit(this, "open", { expanded: true });
    }
  }
  collapse() {
    if (this.expanded) {
      this.expanded = false;
      emit(this, "close", { expanded: false });
    }
  }
  toggle() {
    if (this.expanded) {
      this.collapse();
      return false;
    }
    this.expand();
    return true;
  }
  _syncClasses() {
    defineClassToken(this, "inc-navbar--app", this.hasAttribute("app"));
    const breakpoint = this.getAttribute("breakpoint");
    Array.from(this.classList).filter((token) => token.startsWith("inc-navbar--expand-")).forEach((token) => this.classList.remove(token));
    if (breakpoint) {
      this.classList.add(`inc-navbar--expand-${breakpoint}`);
    }
    const variant = this.getAttribute("variant");
    Array.from(this.classList).filter((token) => token.startsWith("inc-navbar--variant-")).forEach((token) => this.classList.remove(token));
    if (variant) {
      this.classList.add(`inc-navbar--variant-${variant}`);
    }
    this.setAttribute("aria-expanded", this.expanded ? "true" : "false");
  }
  _syncStructure() {
    this.querySelectorAll(":scope > [slot='brand']").forEach((node) => node.classList.add("inc-navbar__brand"));
    this.querySelectorAll(":scope > [slot='nav']").forEach((node) => node.classList.add("inc-navbar__nav"));
    this.querySelectorAll(":scope > [slot='utilities']").forEach((node) => node.classList.add("inc-navbar__utilities"));
    this.querySelectorAll(":scope > [slot='collapse']").forEach((node) => node.classList.add("inc-navbar__collapse"));
  }
  _onClick(event) {
    const toggle = event.target instanceof Element ? event.target.closest("[data-inc-navbar-toggle]") : null;
    if (!toggle || !this.contains(toggle)) {
      return;
    }
    event.preventDefault();
    this.toggle();
  }
  _onKeydown(event) {
    if (event.key === "Escape" && this.expanded) {
      this.collapse();
    }
  }
};
var IncTabsElement = class extends HostElement {
  static get observedAttributes() {
    return ["selected", "orientation", "activation", "variant", "fill", "justified"];
  }
  constructor() {
    super();
    this._boundClick = (event) => this._onClick(event);
    this._boundKeydown = (event) => this._onKeydown(event);
    this._boundSlotChange = () => this._initialize();
  }
  connectedCallback() {
    this.classList.add("inc-tabs-host");
    this.addEventListener("click", this._boundClick);
    this.addEventListener("keydown", this._boundKeydown);
    this.addEventListener("slotchange", this._boundSlotChange);
    this._initialize();
  }
  disconnectedCallback() {
    this.removeEventListener("click", this._boundClick);
    this.removeEventListener("keydown", this._boundKeydown);
    this.removeEventListener("slotchange", this._boundSlotChange);
  }
  attributeChangedCallback(name) {
    if (name === "selected") {
      this.select(this.getAttribute("selected"), { emitEvents: false, focus: false });
      return;
    }
    this._syncHostClasses();
    this._syncTabs();
  }
  get selected() {
    return this.getAttribute("selected");
  }
  set selected(value) {
    if (value === null || value === void 0 || value === "") {
      this.removeAttribute("selected");
      return;
    }
    this.setAttribute("selected", String(value));
  }
  select(value, options = {}) {
    const tabs = this._tabs();
    const panels = this._panels();
    const target = this._resolveTab(value, tabs);
    if (!target) {
      return false;
    }
    const previous = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || null;
    const previousId = previous?.id || null;
    const nextId2 = target.id || null;
    if (previous === target && options.force !== true) {
      if (options.focus) {
        target.focus();
      }
      return true;
    }
    tabs.forEach((tab, index) => {
      const isActive = tab === target;
      const panel = this._resolvePanel(tab, panels, index);
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.tabIndex = isActive ? 0 : -1;
      if (panel) {
        panel.hidden = !isActive;
        panel.classList.toggle("active", isActive);
        panel.classList.toggle("show", isActive);
      }
    });
    if (nextId2) {
      this.setAttribute("selected", nextId2);
    }
    if (options.focus) {
      target.focus();
    }
    if (options.emitEvents !== false) {
      emit(this, "select", { previous: previousId, selected: nextId2, tab: target });
      emit(this, "change", { previous: previousId, selected: nextId2, tab: target });
    }
    return true;
  }
  next() {
    return this._stepSelection(1);
  }
  previous() {
    return this._stepSelection(-1);
  }
  _initialize() {
    this._syncHostClasses();
    this._syncTabs();
    const selected = this.getAttribute("selected");
    if (selected) {
      this.select(selected, { emitEvents: false, focus: false, force: true });
      return;
    }
    const tabs = this._tabs();
    const active = tabs.find((tab) => tab.classList.contains("active")) || tabs[0];
    if (active) {
      this.select(active.id, { emitEvents: false, focus: false, force: true });
    }
  }
  _syncHostClasses() {
    const orientation = normalizeOrientation(this.getAttribute("orientation"));
    this.setAttribute("data-inc-tabs-orientation", orientation);
    const activation = normalizeActivation(this.getAttribute("activation"));
    this.setAttribute("data-inc-tabs-activation", activation);
    const variant = this.getAttribute("variant");
    Array.from(this.classList).filter((token) => token.startsWith("inc-tabs-host--")).forEach((token) => this.classList.remove(token));
    if (variant) {
      this.classList.add(`inc-tabs-host--${variant}`);
    }
    defineClassToken(this, "inc-tabs-host--fill", this.hasAttribute("fill"));
    defineClassToken(this, "inc-tabs-host--justified", this.hasAttribute("justified"));
  }
  _syncTabs() {
    const tabs = this._tabs();
    const panels = this._panels();
    const orientation = normalizeOrientation(this.getAttribute("orientation"));
    const roleRoot = this.querySelector("[role='tablist'], .inc-tabs-nav");
    if (roleRoot instanceof HTMLElement) {
      roleRoot.setAttribute("role", "tablist");
      roleRoot.setAttribute("aria-orientation", orientation);
      if (!roleRoot.classList.contains("inc-tabs-nav")) {
        roleRoot.classList.add("inc-tabs-nav");
      }
    }
    tabs.forEach((tab, index) => {
      const panel = this._resolvePanel(tab, panels, index);
      if (!tab.id) {
        tab.id = nextId("inc-tab");
      }
      tab.setAttribute("role", "tab");
      if (!tab.hasAttribute("tabindex")) {
        tab.tabIndex = index === 0 ? 0 : -1;
      }
      if (panel && !panel.id) {
        panel.id = nextId("inc-tab-panel");
      }
      if (panel) {
        tab.setAttribute("aria-controls", panel.id);
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tab.id);
      }
    });
  }
  _tabs() {
    const explicit = Array.from(this.querySelectorAll(":scope > .inc-tabs-nav > li > *"));
    const unique = [];
    explicit.forEach((candidate) => {
      if (!(candidate instanceof HTMLElement)) {
        return;
      }
      if (!unique.includes(candidate)) {
        unique.push(candidate);
      }
    });
    return unique;
  }
  _panels() {
    const explicit = Array.from(this.querySelectorAll(":scope > [slot='panel'], [data-inc-tab-panel], .inc-tab-pane, [role='tabpanel']"));
    const unique = [];
    explicit.forEach((candidate) => {
      if (!(candidate instanceof HTMLElement)) {
        return;
      }
      if (!unique.includes(candidate)) {
        unique.push(candidate);
      }
    });
    return unique;
  }
  _resolveTab(value, tabs) {
    if (!tabs.length) {
      return null;
    }
    if (value === null || value === void 0 || value === "") {
      return tabs[0];
    }
    if (typeof value === "number") {
      return tabs[value] || null;
    }
    const raw = String(value);
    const noHash = raw.startsWith("#") ? raw.slice(1) : raw;
    const byId = tabs.find((tab) => tab.id === noHash);
    if (byId) {
      return byId;
    }
    const asNumber = Number.parseInt(raw, 10);
    if (Number.isFinite(asNumber)) {
      return tabs[asNumber] || null;
    }
    return tabs.find((tab) => tab.getAttribute("aria-controls") === noHash) || null;
  }
  _resolvePanel(tab, panels, fallbackIndex) {
    if (!(tab instanceof HTMLElement)) {
      return null;
    }
    const ariaControls = tab.getAttribute("aria-controls");
    if (ariaControls) {
      const escapedId = typeof CSS !== "undefined" && typeof CSS.escape === "function" ? CSS.escape(ariaControls) : ariaControls.replace(/([^\w-])/g, "\\$1");
      const direct = this.querySelector(`#${escapedId}`);
      if (direct instanceof HTMLElement) {
        return direct;
      }
    }
    const href = tab.getAttribute("href");
    if (href && href.startsWith("#")) {
      const fromHref = this.querySelector(href);
      if (fromHref instanceof HTMLElement) {
        return fromHref;
      }
    }
    const target = tab.getAttribute("data-inc-target");
    if (target) {
      try {
        const fromTarget = this.querySelector(target);
        if (fromTarget instanceof HTMLElement) {
          return fromTarget;
        }
      } catch {
      }
    }
    return panels[fallbackIndex] || null;
  }
  _stepSelection(delta) {
    const tabs = this._tabs();
    if (!tabs.length) {
      return false;
    }
    const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"));
    const nextIndex = (activeIndex + delta + tabs.length) % tabs.length;
    return this.select(tabs[nextIndex].id, { focus: true });
  }
  _onClick(event) {
    const tab = event.target instanceof Element ? event.target.closest("[slot='tab'], [data-inc-tab], [role='tab']") : null;
    if (!(tab instanceof HTMLElement) || !this.contains(tab)) {
      return;
    }
    if (tab.tagName === "A") {
      event.preventDefault();
    }
    this.select(tab.id || tab.getAttribute("aria-controls") || "", { focus: true });
  }
  _onKeydown(event) {
    if (!TAB_KEYS.has(event.key)) {
      return;
    }
    const tab = event.target instanceof Element ? event.target.closest("[slot='tab'], [data-inc-tab], [role='tab']") : null;
    if (!(tab instanceof HTMLElement) || !this.contains(tab)) {
      return;
    }
    const tabs = this._tabs();
    const currentIndex = tabs.indexOf(tab);
    if (currentIndex < 0) {
      return;
    }
    const orientation = normalizeOrientation(this.getAttribute("orientation"));
    const activation = normalizeActivation(this.getAttribute("activation"));
    let nextIndex = currentIndex;
    if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else if (event.key === "ArrowRight" && orientation === "horizontal" || event.key === "ArrowDown" && orientation === "vertical") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft" && orientation === "horizontal" || event.key === "ArrowUp" && orientation === "vertical") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.select(tab.id, { focus: true });
      return;
    } else {
      return;
    }
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    nextTab.focus();
    if (activation === "auto") {
      this.select(nextTab.id, { focus: false });
    }
  }
};
var IncUserMenuElement = class extends HostElement {
  static get observedAttributes() {
    return ["open", "label", "placement"];
  }
  constructor() {
    super();
    this._boundClick = (event) => this._onClick(event);
    this._boundKeydown = (event) => this._onKeydown(event);
    this._boundPointerDown = (event) => this._onPointerDown(event);
    this._boundSlotChange = () => this._syncStructure();
  }
  connectedCallback() {
    this.classList.add("inc-native-menu", "inc-user-menu");
    this._syncStructure();
    this._syncState();
    this.addEventListener("click", this._boundClick);
    this.addEventListener("keydown", this._boundKeydown);
    this.addEventListener("slotchange", this._boundSlotChange);
    document.addEventListener("pointerdown", this._boundPointerDown, true);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this._boundClick);
    this.removeEventListener("keydown", this._boundKeydown);
    this.removeEventListener("slotchange", this._boundSlotChange);
    document.removeEventListener("pointerdown", this._boundPointerDown, true);
  }
  attributeChangedCallback() {
    this._syncState();
  }
  open() {
    if (!this.hasAttribute("open")) {
      this.setAttribute("open", "");
      emit(this, "open", { open: true });
    }
  }
  close({ restoreFocus = false } = {}) {
    if (this.hasAttribute("open")) {
      this.removeAttribute("open");
      emit(this, "close", { open: false });
    }
    if (restoreFocus) {
      this._trigger()?.focus();
    }
  }
  toggle() {
    if (this.hasAttribute("open")) {
      this.close();
      return false;
    }
    this.open();
    return true;
  }
  _trigger() {
    return this.querySelector(":scope > [slot='trigger'], :scope > .inc-native-menu__summary");
  }
  _menu() {
    return this.querySelector(":scope > [slot='menu'], :scope > .inc-native-menu__panel");
  }
  _items() {
    const menu = this._menu();
    if (!(menu instanceof HTMLElement)) {
      return [];
    }
    return getFocusableItems(menu).filter((item) => menu.contains(item));
  }
  _syncStructure() {
    const trigger = this._trigger();
    const menu = this._menu();
    if (trigger instanceof HTMLElement) {
      trigger.classList.add("inc-native-menu__summary");
      if (!trigger.id) {
        trigger.id = nextId("inc-user-menu-trigger");
      }
      trigger.setAttribute("aria-haspopup", "menu");
    }
    if (menu instanceof HTMLElement) {
      menu.classList.add("inc-native-menu__panel");
      if (!menu.id) {
        menu.id = nextId("inc-user-menu-panel");
      }
      menu.setAttribute("role", "menu");
      menu.setAttribute("aria-label", this.getAttribute("label") || "User menu");
    }
    this.querySelectorAll(":scope > [slot='item']").forEach((item) => {
      item.classList.add("inc-native-menu__item");
      item.setAttribute("role", item.getAttribute("role") || "menuitem");
      if (!item.hasAttribute("tabindex")) {
        item.tabIndex = -1;
      }
    });
    if (trigger instanceof HTMLElement && menu instanceof HTMLElement) {
      trigger.setAttribute("aria-controls", menu.id);
    }
  }
  _syncState() {
    const trigger = this._trigger();
    const menu = this._menu();
    const isOpen = this.hasAttribute("open");
    defineClassToken(this, "is-open", isOpen);
    Array.from(this.classList).filter((token) => token.startsWith("inc-user-menu--")).forEach((token) => this.classList.remove(token));
    const placement = this.getAttribute("placement");
    if (placement) {
      this.classList.add(`inc-user-menu--${placement}`);
    }
    if (trigger instanceof HTMLElement) {
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
    if (menu instanceof HTMLElement) {
      menu.classList.toggle("show", isOpen);
      menu.hidden = !isOpen;
    }
  }
  _focusItem(direction) {
    const items = this._items();
    if (!items.length) {
      return;
    }
    const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const currentIndex = active ? items.indexOf(active) : -1;
    let next = items[0];
    if (direction === "last") {
      next = items[items.length - 1];
    } else if (direction === "next" && currentIndex >= 0) {
      next = items[(currentIndex + 1) % items.length];
    } else if (direction === "previous" && currentIndex >= 0) {
      next = items[(currentIndex - 1 + items.length) % items.length];
    } else if (direction === "previous" && currentIndex < 0) {
      next = items[items.length - 1];
    }
    next.focus();
  }
  _onPointerDown(event) {
    if (!(event.target instanceof Node)) {
      return;
    }
    if (!this.contains(event.target)) {
      this.close();
    }
  }
  _onClick(event) {
    const trigger = event.target instanceof Element ? event.target.closest("[slot='trigger'], .inc-native-menu__summary") : null;
    if (trigger && this.contains(trigger)) {
      event.preventDefault();
      const openNow = this.toggle();
      if (openNow) {
        this._focusItem("first");
      }
      return;
    }
    const item = event.target instanceof Element ? event.target.closest("[slot='item'], .inc-native-menu__item, [role='menuitem']") : null;
    if (!item || !this.contains(item)) {
      return;
    }
    emit(this, "select", {
      item,
      value: item.getAttribute("value") || item.getAttribute("data-value") || item.textContent?.trim() || "",
      text: item.textContent?.trim() || ""
    });
    this.close({ restoreFocus: true });
  }
  _onKeydown(event) {
    if (!MENU_KEYS.has(event.key)) {
      return;
    }
    const trigger = event.target instanceof Element ? event.target.closest("[slot='trigger'], .inc-native-menu__summary") : null;
    const menu = event.target instanceof Element ? event.target.closest("[slot='menu'], .inc-native-menu__panel") : null;
    if (trigger && this.contains(trigger)) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        this.open();
        this._focusItem(event.key === "ArrowDown" ? "first" : "last");
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const openNow = this.toggle();
        if (openNow) {
          this._focusItem("first");
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        this.close({ restoreFocus: true });
      }
      return;
    }
    if (menu && this.contains(menu)) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        this._focusItem("next");
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        this._focusItem("previous");
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        this._focusItem("first");
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        this._focusItem("last");
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        this.close({ restoreFocus: true });
      }
    }
  }
};
function defineNavigationComponents(registry = globalThis.customElements) {
  if (!registry) {
    return {
      navbarDefined: false,
      tabsDefined: false,
      userMenuDefined: false
    };
  }
  let navbarDefined = false;
  let tabsDefined = false;
  let userMenuDefined = false;
  if (!registry.get(NAVBAR_TAG)) {
    registry.define(NAVBAR_TAG, IncNavbarElement);
    navbarDefined = true;
  }
  if (!registry.get(TABS_TAG)) {
    registry.define(TABS_TAG, IncTabsElement);
    tabsDefined = true;
  }
  if (!registry.get(USER_MENU_TAG)) {
    registry.define(USER_MENU_TAG, IncUserMenuElement);
    userMenuDefined = true;
  }
  return { navbarDefined, tabsDefined, userMenuDefined };
}
var navigationApi = {
  NAVBAR_TAG,
  TABS_TAG,
  USER_MENU_TAG,
  IncNavbarElement,
  IncTabsElement,
  IncUserMenuElement,
  defineNavigationComponents
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = navigationApi;
}
if (typeof window !== "undefined") {
  window.IncWebComponents = window.IncWebComponents || {};
  window.IncWebComponents.navigation = navigationApi;
}

// src/web-components/components/forms.js
var NATIVE_CONTROL_SELECTOR = [
  "input:not([type='hidden'])",
  "select",
  "textarea",
  "button"
].join(", ");
var HostElement2 = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
var generatedIdCounter = 0;
function nextGeneratedId(prefix) {
  generatedIdCounter += 1;
  return `inc-wc-${prefix}-${generatedIdCounter}`;
}
function parseBooleanAttribute(host, name) {
  return host.hasAttribute(name) && host.getAttribute(name) !== "false";
}
function reflectBooleanAttribute(host, name, value) {
  if (value) {
    host.setAttribute(name, "");
  } else {
    host.removeAttribute(name);
  }
}
function toggleClass(element, className, enabled) {
  if (!element) {
    return;
  }
  element.classList.toggle(className, Boolean(enabled));
}
function withPart(element, partName) {
  if (!element || !partName) {
    return element;
  }
  const existing = (element.getAttribute("part") || "").split(/\s+/).filter(Boolean);
  if (!existing.includes(partName)) {
    existing.push(partName);
    element.setAttribute("part", existing.join(" "));
  }
  return element;
}
function resolveAssignedElement(host, slotName, selector) {
  const explicit = Array.from(host.children).find((child) => child instanceof HTMLElement && child.getAttribute("slot") === slotName);
  if (explicit instanceof HTMLElement) {
    return explicit;
  }
  if (!selector) {
    return null;
  }
  return Array.from(host.children).find((child) => child instanceof HTMLElement && child.matches(selector)) || null;
}
function ensureGeneratedElement(host, key, selector, factory) {
  let element = host.querySelector(selector);
  if (element instanceof HTMLElement) {
    return element;
  }
  if (!host.__incGeneratedElements) {
    host.__incGeneratedElements = /* @__PURE__ */ new Map();
  }
  if (host.__incGeneratedElements.has(key)) {
    return host.__incGeneratedElements.get(key);
  }
  element = factory();
  element.setAttribute("data-inc-generated", key);
  host.append(element);
  host.__incGeneratedElements.set(key, element);
  return element;
}
function ensureControlId(control) {
  if (!control.id) {
    control.id = nextGeneratedId("control");
  }
  return control.id;
}
function setDescribedBy(control, ids) {
  const validIds = ids.filter(Boolean);
  if (!validIds.length) {
    control.removeAttribute("aria-describedby");
    return;
  }
  control.setAttribute("aria-describedby", Array.from(new Set(validIds)).join(" "));
}
var IncFormsElement = class extends HostElement2 {
  constructor() {
    super();
    this.__observer = null;
    this.__syncScheduled = false;
  }
  connectedCallback() {
    this.__installObserver();
    this.sync();
  }
  disconnectedCallback() {
    this.__observer?.disconnect();
    this.__observer = null;
  }
  attributeChangedCallback() {
    this.requestSync();
  }
  requestSync() {
    if (this.__syncScheduled) {
      return;
    }
    this.__syncScheduled = true;
    queueMicrotask(() => {
      this.__syncScheduled = false;
      this.sync();
    });
  }
  sync() {
  }
  notifySlotChange() {
    this.dispatchEvent(new CustomEvent("slotchange", {
      bubbles: true,
      composed: true
    }));
  }
  __installObserver() {
    if (this.__observer) {
      return;
    }
    this.__observer = new MutationObserver(() => {
      this.sync();
      this.notifySlotChange();
    });
    this.__observer.observe(this, {
      childList: true,
      subtree: false,
      attributes: true,
      attributeFilter: ["slot"]
    });
  }
};
var IncFieldElement = class extends IncFormsElement {
  static get observedAttributes() {
    return ["label", "hint", "error", "required", "invalid", "dense"];
  }
  get label() {
    return this.getAttribute("label") || "";
  }
  set label(value) {
    if (value == null || value === "") {
      this.removeAttribute("label");
    } else {
      this.setAttribute("label", String(value));
    }
  }
  get hint() {
    return this.getAttribute("hint") || "";
  }
  set hint(value) {
    if (value == null || value === "") {
      this.removeAttribute("hint");
    } else {
      this.setAttribute("hint", String(value));
    }
  }
  get error() {
    return this.getAttribute("error") || "";
  }
  set error(value) {
    if (value == null || value === "") {
      this.removeAttribute("error");
    } else {
      this.setAttribute("error", String(value));
    }
  }
  get required() {
    return parseBooleanAttribute(this, "required");
  }
  set required(value) {
    reflectBooleanAttribute(this, "required", value);
  }
  get invalid() {
    return parseBooleanAttribute(this, "invalid");
  }
  set invalid(value) {
    reflectBooleanAttribute(this, "invalid", value);
  }
  get dense() {
    return parseBooleanAttribute(this, "dense");
  }
  set dense(value) {
    reflectBooleanAttribute(this, "dense", value);
  }
  focus() {
    const control = this.__resolveControl();
    control?.focus();
  }
  sync() {
    this.classList.add("inc-form__field");
    toggleClass(this, "inc-form__field--compact", this.dense);
    withPart(this, "field");
    const control = this.__resolveControl();
    const label = this.__resolveLabel(control);
    const hint = this.__resolveHint();
    const error = this.__resolveError();
    if (label) {
      withPart(label, "label");
      label.classList.add("inc-form__label");
      toggleClass(label, "inc-form__label--required", this.required);
      if (control && label instanceof HTMLLabelElement) {
        label.htmlFor = ensureControlId(control);
      }
    }
    if (control) {
      withPart(control, "control");
      if (!control.classList.contains("inc-form__control") && !control.classList.contains("inc-input-group") && control.slot !== "control") {
        control.classList.add("inc-form__control");
      }
      control.required = this.required;
      const invalid = this.invalid || this.error.length > 0;
      if (invalid) {
        control.setAttribute("aria-invalid", "true");
        control.classList.add("is-invalid");
      } else if (control.getAttribute("aria-invalid") === "true") {
        control.removeAttribute("aria-invalid");
      }
      const describedBy = [];
      if (hint?.id) {
        describedBy.push(hint.id);
      }
      if (error?.id) {
        describedBy.push(error.id);
      }
      setDescribedBy(control, describedBy);
    }
    if (hint) {
      withPart(hint, "hint");
      hint.classList.add("inc-form__hint");
    }
    if (error) {
      withPart(error, "error");
      error.classList.add("inc-form__invalid-feedback");
      error.setAttribute("aria-live", "polite");
    }
  }
  __resolveControl() {
    const control = resolveAssignedElement(this, "control", NATIVE_CONTROL_SELECTOR);
    if (!(control instanceof HTMLElement)) {
      return null;
    }
    return control;
  }
  __resolveLabel(control) {
    const explicit = resolveAssignedElement(this, "label", "label, [data-inc-field-label]");
    if (explicit instanceof HTMLElement) {
      return explicit;
    }
    if (!this.label) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "label",
      '[data-inc-generated="label"]',
      () => document.createElement("label")
    );
    generated.textContent = this.label;
    if (control instanceof HTMLElement) {
      generated.setAttribute("for", ensureControlId(control));
    }
    return generated;
  }
  __resolveHint() {
    const explicit = resolveAssignedElement(this, "hint", ".inc-form__hint, [data-inc-field-hint]");
    if (explicit instanceof HTMLElement) {
      if (!explicit.id) {
        explicit.id = nextGeneratedId("hint");
      }
      return explicit;
    }
    if (!this.hint) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "hint",
      '[data-inc-generated="hint"]',
      () => document.createElement("p")
    );
    if (!generated.id) {
      generated.id = nextGeneratedId("hint");
    }
    generated.textContent = this.hint;
    return generated;
  }
  __resolveError() {
    const explicit = resolveAssignedElement(this, "error", ".inc-form__invalid-feedback, [data-inc-field-error]");
    if (explicit instanceof HTMLElement) {
      if (!explicit.id) {
        explicit.id = nextGeneratedId("error");
      }
      return explicit;
    }
    if (!this.error) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "error",
      '[data-inc-generated="error"]',
      () => document.createElement("p")
    );
    if (!generated.id) {
      generated.id = nextGeneratedId("error");
    }
    generated.textContent = this.error;
    return generated;
  }
};
var IncInputGroupElement = class extends IncFormsElement {
  static get observedAttributes() {
    return ["prefix", "suffix", "dense", "expand"];
  }
  get prefix() {
    return this.getAttribute("prefix") || "";
  }
  set prefix(value) {
    if (value == null || value === "") {
      this.removeAttribute("prefix");
    } else {
      this.setAttribute("prefix", String(value));
    }
  }
  get suffix() {
    return this.getAttribute("suffix") || "";
  }
  set suffix(value) {
    if (value == null || value === "") {
      this.removeAttribute("suffix");
    } else {
      this.setAttribute("suffix", String(value));
    }
  }
  get dense() {
    return parseBooleanAttribute(this, "dense");
  }
  set dense(value) {
    reflectBooleanAttribute(this, "dense", value);
  }
  get expand() {
    return parseBooleanAttribute(this, "expand");
  }
  set expand(value) {
    reflectBooleanAttribute(this, "expand", value);
  }
  focus() {
    const control = this.__resolveControl();
    control?.focus();
  }
  sync() {
    this.classList.add("inc-input-group");
    toggleClass(this, "inc-input-group--sm", this.dense);
    toggleClass(this, "inc-input-group--expand", this.expand);
    withPart(this, "group");
    const prefix = this.__resolvePrefix();
    const suffix = this.__resolveSuffix();
    const control = this.__resolveControl();
    if (prefix) {
      withPart(prefix, "prefix");
      prefix.classList.add("inc-input-group__text");
    }
    if (suffix) {
      withPart(suffix, "suffix");
      suffix.classList.add("inc-input-group__text");
    }
    if (control) {
      withPart(control, "control");
      if (!control.classList.contains("inc-form__control")) {
        control.classList.add("inc-form__control");
      }
    }
  }
  __resolvePrefix() {
    const explicit = resolveAssignedElement(this, "prefix", ".inc-input-group__text[data-inc-prefix]");
    if (explicit instanceof HTMLElement) {
      return explicit;
    }
    if (!this.prefix) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "prefix",
      '[data-inc-generated="prefix"]',
      () => document.createElement("span")
    );
    generated.setAttribute("data-inc-prefix", "true");
    generated.textContent = this.prefix;
    return generated;
  }
  __resolveSuffix() {
    const explicit = resolveAssignedElement(this, "suffix", ".inc-input-group__text[data-inc-suffix]");
    if (explicit instanceof HTMLElement) {
      return explicit;
    }
    if (!this.suffix) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "suffix",
      '[data-inc-generated="suffix"]',
      () => document.createElement("span")
    );
    generated.setAttribute("data-inc-suffix", "true");
    generated.textContent = this.suffix;
    return generated;
  }
  __resolveControl() {
    const control = resolveAssignedElement(this, "control", NATIVE_CONTROL_SELECTOR);
    return control instanceof HTMLElement ? control : null;
  }
};
var IncChoiceGroupElement = class extends IncFormsElement {
  static get observedAttributes() {
    return ["type", "legend", "orientation", "inline", "dense", "hint", "error"];
  }
  get legend() {
    return this.getAttribute("legend") || "";
  }
  set legend(value) {
    if (value == null || value === "") {
      this.removeAttribute("legend");
    } else {
      this.setAttribute("legend", String(value));
    }
  }
  get inline() {
    return parseBooleanAttribute(this, "inline");
  }
  set inline(value) {
    reflectBooleanAttribute(this, "inline", value);
  }
  focusFirst() {
    const firstFocusable = this.querySelector(NATIVE_CONTROL_SELECTOR);
    firstFocusable?.focus();
  }
  sync() {
    this.classList.add("inc-form__fieldset");
    withPart(this, "group");
    this.setAttribute("role", "group");
    const legend = this.__resolveLegend();
    const choices = this.__resolveChoices();
    const hint = this.__resolveHint();
    const error = this.__resolveError();
    if (legend) {
      withPart(legend, "legend");
      legend.classList.add("inc-form__legend");
      if (!legend.id) {
        legend.id = nextGeneratedId("legend");
      }
      this.setAttribute("aria-labelledby", legend.id);
    }
    if (choices) {
      withPart(choices, "control");
      choices.classList.add("inc-form__choices");
      toggleClass(choices, "inc-form__choices--inline", this.inline);
    }
    if (hint) {
      withPart(hint, "hint");
      hint.classList.add("inc-form__hint");
    }
    if (error) {
      withPart(error, "error");
      error.classList.add("inc-form__invalid-feedback");
      error.setAttribute("aria-live", "polite");
    }
  }
  __resolveLegend() {
    const explicit = resolveAssignedElement(this, "legend", "legend, [data-inc-choice-legend]");
    if (explicit instanceof HTMLElement) {
      return explicit;
    }
    if (!this.legend) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "legend",
      '[data-inc-generated="legend"]',
      () => document.createElement("legend")
    );
    generated.setAttribute("data-inc-choice-legend", "true");
    generated.textContent = this.legend;
    return generated;
  }
  __resolveChoices() {
    const existing = this.querySelector(".inc-form__choices, [data-inc-choice-items]");
    if (existing instanceof HTMLElement) {
      return existing;
    }
    const slotItems = Array.from(this.children).filter((child) => child instanceof HTMLElement && child.getAttribute("slot") === "item");
    if (!slotItems.length) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "items",
      '[data-inc-generated="items"]',
      () => document.createElement("div")
    );
    generated.setAttribute("data-inc-choice-items", "true");
    for (const node of slotItems) {
      if (!generated.contains(node)) {
        generated.append(node);
      }
    }
    return generated;
  }
  __resolveHint() {
    const explicit = resolveAssignedElement(this, "hint", ".inc-form__hint, [data-inc-choice-hint]");
    if (explicit instanceof HTMLElement) {
      return explicit;
    }
    const hintText = this.getAttribute("hint");
    if (!hintText) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "hint",
      '[data-inc-generated="hint"]',
      () => document.createElement("p")
    );
    generated.setAttribute("data-inc-choice-hint", "true");
    generated.textContent = hintText;
    return generated;
  }
  __resolveError() {
    const explicit = resolveAssignedElement(this, "error", ".inc-form__invalid-feedback, [data-inc-choice-error]");
    if (explicit instanceof HTMLElement) {
      return explicit;
    }
    const errorText = this.getAttribute("error");
    if (!errorText) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "error",
      '[data-inc-generated="error"]',
      () => document.createElement("p")
    );
    generated.setAttribute("data-inc-choice-error", "true");
    generated.textContent = errorText;
    return generated;
  }
};
var IncReadonlyFieldElement = class extends IncFormsElement {
  static get observedAttributes() {
    return ["label", "value", "dense"];
  }
  sync() {
    this.classList.add("inc-readonly-field");
    withPart(this, "field");
    const label = this.__resolveLabel();
    const value = this.__resolveValue();
    const meta = resolveAssignedElement(this, "meta", '[slot="meta"], [data-inc-readonly-meta]');
    if (label) {
      withPart(label, "label");
    }
    if (value) {
      withPart(value, "value");
    }
    if (meta) {
      withPart(meta, "meta");
    }
  }
  __resolveLabel() {
    const explicit = resolveAssignedElement(this, "label", '[slot="label"], [data-inc-readonly-label]');
    if (explicit instanceof HTMLElement) {
      return explicit;
    }
    const labelText = this.getAttribute("label");
    if (!labelText) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "label",
      '[data-inc-generated="label"]',
      () => document.createElement("span")
    );
    generated.setAttribute("data-inc-readonly-label", "true");
    generated.textContent = labelText;
    return generated;
  }
  __resolveValue() {
    const explicit = resolveAssignedElement(this, "value", '[slot="value"], [data-inc-readonly-value]');
    if (explicit instanceof HTMLElement) {
      return explicit;
    }
    const valueText = this.getAttribute("value");
    if (!valueText) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "value",
      '[data-inc-generated="value"]',
      () => document.createElement("span")
    );
    generated.setAttribute("data-inc-readonly-value", "true");
    generated.textContent = valueText;
    return generated;
  }
};
var IncValidationSummaryElement = class extends IncFormsElement {
  static get observedAttributes() {
    return ["title", "count", "live"];
  }
  get title() {
    return this.getAttribute("title") || "";
  }
  set title(value) {
    if (value == null || value === "") {
      this.removeAttribute("title");
    } else {
      this.setAttribute("title", String(value));
    }
  }
  announce(message) {
    const announcement = String(message || "").trim();
    if (!announcement) {
      return;
    }
    const node = ensureGeneratedElement(
      this,
      "announcement",
      '[data-inc-generated="announcement"]',
      () => document.createElement("span")
    );
    node.style.position = "absolute";
    node.style.width = "1px";
    node.style.height = "1px";
    node.style.overflow = "hidden";
    node.style.clip = "rect(0 0 0 0)";
    node.style.clipPath = "inset(50%)";
    node.style.whiteSpace = "nowrap";
    node.setAttribute("aria-live", this.getAttribute("live") || "polite");
    node.textContent = announcement;
  }
  sync() {
    this.classList.add("inc-form__error-summary");
    withPart(this, "summary");
    const title = this.__resolveTitle();
    const list = this.__resolveList();
    const liveMode = this.getAttribute("live");
    if (liveMode) {
      this.setAttribute("aria-live", liveMode);
    } else {
      this.removeAttribute("aria-live");
    }
    if (title) {
      withPart(title, "title");
      title.classList.add("inc-form__error-summary-title");
      const count = this.getAttribute("count");
      if (count && title.getAttribute("data-inc-generated") === "title") {
        const numeric = Number.parseInt(count, 10);
        if (Number.isFinite(numeric) && numeric >= 0) {
          title.textContent = numeric === 1 ? "There is 1 issue to fix" : `There are ${numeric} issues to fix`;
        }
      }
    }
    if (list) {
      withPart(list, "list");
      list.classList.add("inc-form__error-summary-list");
      for (const item of list.children) {
        withPart(item, "item");
      }
    }
  }
  __resolveTitle() {
    const explicit = resolveAssignedElement(
      this,
      "title",
      ".inc-form__error-summary-title, [data-inc-validation-title]"
    );
    if (explicit instanceof HTMLElement) {
      return explicit;
    }
    const titleText = this.title;
    if (!titleText && !this.hasAttribute("count")) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "title",
      '[data-inc-generated="title"]',
      () => document.createElement("h3")
    );
    generated.setAttribute("data-inc-validation-title", "true");
    if (titleText) {
      generated.textContent = titleText;
    }
    return generated;
  }
  __resolveList() {
    const existing = this.querySelector(".inc-form__error-summary-list, [data-inc-validation-list]");
    if (existing instanceof HTMLElement) {
      return existing;
    }
    const slotItems = Array.from(this.children).filter((child) => child instanceof HTMLElement && child.getAttribute("slot") === "item");
    if (!slotItems.length) {
      return null;
    }
    const generated = ensureGeneratedElement(
      this,
      "list",
      '[data-inc-generated="list"]',
      () => document.createElement("ul")
    );
    generated.setAttribute("data-inc-validation-list", "true");
    for (const item of slotItems) {
      if (generated.contains(item)) {
        continue;
      }
      if (item.tagName !== "LI") {
        const wrapped = document.createElement("li");
        wrapped.append(item);
        generated.append(wrapped);
        continue;
      }
      generated.append(item);
    }
    return generated;
  }
};
var FORM_COMPONENTS = [
  ["inc-field", IncFieldElement],
  ["inc-input-group", IncInputGroupElement],
  ["inc-choice-group", IncChoiceGroupElement],
  ["inc-readonly-field", IncReadonlyFieldElement],
  ["inc-validation-summary", IncValidationSummaryElement]
];
function registerFormsComponents(registry = globalThis.customElements) {
  if (!registry || typeof registry.define !== "function" || typeof registry.get !== "function") {
    return [];
  }
  const registered = [];
  for (const [name, ctor] of FORM_COMPONENTS) {
    if (!registry.get(name)) {
      registry.define(name, ctor);
      registered.push(name);
    }
  }
  return registered;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    registerFormsComponents,
    IncFieldElement,
    IncInputGroupElement,
    IncChoiceGroupElement,
    IncReadonlyFieldElement,
    IncValidationSummaryElement
  };
}
if (typeof globalThis !== "undefined") {
  const namespace2 = globalThis.IncWebComponents || (globalThis.IncWebComponents = {});
  namespace2.forms = Object.assign({}, namespace2.forms, {
    register: registerFormsComponents,
    components: {
      IncFieldElement,
      IncInputGroupElement,
      IncChoiceGroupElement,
      IncReadonlyFieldElement,
      IncValidationSummaryElement
    }
  });
}

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
  const namespace2 = getNamespace();
  return typeof namespace2?.renderer === "function" ? namespace2.renderer : renderDefaultIcon;
}
function setIconRenderer(renderer) {
  const namespace2 = getNamespace();
  if (!namespace2) {
    return null;
  }
  if (renderer == null) {
    delete namespace2.renderer;
    return null;
  }
  if (typeof renderer !== "function") {
    throw new TypeError("Inc icon renderer must be a function.");
  }
  namespace2.renderer = renderer;
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
getNamespace();

// src/web-components/components/feedback.js
var THEME_MODES = ["light", "dark", "system"];
var DEFAULT_THEME_STORAGE_KEY = "inc-theme-mode";
var BADGE_TONES = /* @__PURE__ */ new Set(["primary", "secondary", "success", "danger", "warning", "info"]);
var SPINNER_VARIANTS = /* @__PURE__ */ new Set(["border", "grow"]);
var ICON_NAME_SET = new Set(ICON_NAMES);
var STATE_ICON_BY_VARIANT = /* @__PURE__ */ new Map([
  ["empty", "empty"],
  ["results", "no-results"],
  ["loading", "loading"],
  ["error", "error"],
  ["danger", "error"],
  ["warning", "warning"],
  ["success", "success"],
  ["info", "info"]
]);
var STATE_ICON_BY_STATUS = /* @__PURE__ */ new Map([
  ["+", "empty"],
  ["?", "no-results"],
  ["!", "error"],
  ["...", "loading"]
]);
var HostElement3 = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
var themeSubscribers = /* @__PURE__ */ new Set();
var themeRuntimeInitialized = false;
var themeMode = "system";
var themeResolved = "light";
var themeStorageKey = DEFAULT_THEME_STORAGE_KEY;
var themeMediaQuery = null;
var themeStorageListenerBound = false;
var themeMediaListenerBound = false;
function isThemeMode(value) {
  return THEME_MODES.includes(value);
}
function toBooleanAttribute(value) {
  if (value === null || value === void 0) {
    return false;
  }
  if (value === "" || value === "true") {
    return true;
  }
  return value !== "false";
}
function toPositiveInt(value) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
function normalizeToken(value) {
  return String(value ?? "").trim().toLowerCase();
}
function resolveStateIconName(icon, status, variant) {
  const explicitIcon = normalizeIconName(icon);
  if (explicitIcon) {
    return explicitIcon;
  }
  const normalizedStatus = normalizeIconName(status);
  if (STATE_ICON_BY_STATUS.has(String(status || "").trim())) {
    return STATE_ICON_BY_STATUS.get(String(status || "").trim());
  }
  if (ICON_NAME_SET.has(normalizedStatus)) {
    return normalizedStatus;
  }
  return STATE_ICON_BY_VARIANT.get(normalizeToken(variant)) || "info";
}
function renderDecorativeIcon(container, name, size = 18) {
  replaceIconContents(container, name, {
    className: "inc-icon",
    decorative: true,
    size
  });
  container.hidden = false;
}
function getSystemTheme() {
  if (!window.matchMedia) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function resolveTheme(mode) {
  return mode === "system" ? getSystemTheme() : mode;
}
function getRootThemeMode() {
  const root = document.documentElement;
  return root.getAttribute("data-inc-theme-mode") || root.dataset.incThemeMode || root.getAttribute("data-bs-theme") || "system";
}
function getStoredThemeMode(storageKey = DEFAULT_THEME_STORAGE_KEY) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return isThemeMode(stored) ? stored : null;
  } catch {
    return null;
  }
}
function persistThemeMode(mode, storageKey = DEFAULT_THEME_STORAGE_KEY) {
  try {
    if (mode === "system") {
      window.localStorage.removeItem(storageKey);
      return;
    }
    window.localStorage.setItem(storageKey, mode);
  } catch {
  }
}
function applyThemeMode(mode, options = {}) {
  const nextMode = isThemeMode(mode) ? mode : "system";
  const resolved = resolveTheme(nextMode);
  const root = document.documentElement;
  const storageKey = options.storageKey || themeStorageKey || DEFAULT_THEME_STORAGE_KEY;
  themeMode = nextMode;
  themeResolved = resolved;
  themeStorageKey = storageKey;
  root.setAttribute("data-inc-theme-mode", nextMode);
  root.setAttribute("data-bs-theme", resolved);
  root.style.colorScheme = resolved;
  root.dataset.incThemeModeState = nextMode;
  root.dataset.incThemeResolved = resolved;
  if (options.persist !== false) {
    persistThemeMode(nextMode, storageKey);
  }
  if (options.dispatch !== false) {
    const event = new CustomEvent("inc-theme-change", {
      bubbles: true,
      composed: true,
      detail: {
        mode: nextMode,
        resolved
      }
    });
    root.dispatchEvent(event);
  }
  themeSubscribers.forEach((notify) => {
    try {
      notify({ mode: nextMode, resolved });
    } catch {
    }
  });
  return { mode: nextMode, resolved };
}
function initializeThemeRuntime(storageKey = DEFAULT_THEME_STORAGE_KEY) {
  themeStorageKey = storageKey || DEFAULT_THEME_STORAGE_KEY;
  if (!themeRuntimeInitialized) {
    themeRuntimeInitialized = true;
    const initialMode = getStoredThemeMode(themeStorageKey) || getRootThemeMode();
    applyThemeMode(initialMode, {
      dispatch: false,
      persist: false,
      storageKey: themeStorageKey
    });
    if (!themeStorageListenerBound) {
      themeStorageListenerBound = true;
      window.addEventListener("storage", (event) => {
        if (event.key !== themeStorageKey) {
          return;
        }
        const storedMode = getStoredThemeMode(themeStorageKey) || getRootThemeMode();
        applyThemeMode(storedMode, {
          dispatch: false,
          persist: false,
          storageKey: themeStorageKey
        });
      });
    }
    if (!themeMediaListenerBound && window.matchMedia) {
      themeMediaListenerBound = true;
      themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const onMediaChange = () => {
        if (themeMode === "system") {
          applyThemeMode("system", {
            dispatch: true,
            persist: false,
            storageKey: themeStorageKey
          });
        }
      };
      if (typeof themeMediaQuery.addEventListener === "function") {
        themeMediaQuery.addEventListener("change", onMediaChange);
      } else if (typeof themeMediaQuery.addListener === "function") {
        themeMediaQuery.addListener(onMediaChange);
      }
    }
  }
  return {
    mode: themeMode,
    resolved: themeResolved
  };
}
function subscribeThemeState(handler) {
  themeSubscribers.add(handler);
  handler({ mode: themeMode, resolved: themeResolved });
  return () => themeSubscribers.delete(handler);
}
function formatRemaining(totalSeconds) {
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}
var IncStatePanel = class extends HostElement3 {
  static observedAttributes = ["tone", "variant", "title", "body", "status", "icon", "open"];
  #fallback = null;
  #appliedVariantClass = "";
  connectedCallback() {
    this.classList.add("inc-state-panel");
    this.setAttribute("part", "panel");
    this.#ensureFallback();
    this.#syncFromAttributes();
    this.#dispatchSlotChange();
  }
  attributeChangedCallback() {
    if (!this.isConnected) {
      return;
    }
    this.#syncFromAttributes();
  }
  #ensureFallback() {
    if (this.childElementCount > 0) {
      this.#fallback = null;
      return;
    }
    const head = document.createElement("div");
    const icon = document.createElement("span");
    const title = document.createElement("h2");
    const body = document.createElement("p");
    const actions = document.createElement("div");
    head.className = "inc-state-panel__head";
    icon.className = "inc-state-panel__icon";
    title.className = "inc-state-panel__title";
    body.className = "inc-state-panel__body";
    actions.className = "inc-state-panel__actions";
    icon.setAttribute("part", "icon");
    icon.setAttribute("aria-hidden", "true");
    title.setAttribute("part", "title");
    body.setAttribute("part", "body");
    actions.setAttribute("part", "actions");
    head.append(icon, title);
    this.append(head, body, actions);
    this.#fallback = { icon, title, body, actions };
  }
  #syncFromAttributes() {
    const nextVariant = this.getAttribute("variant") || this.getAttribute("tone") || "";
    if (this.#appliedVariantClass) {
      this.classList.remove(this.#appliedVariantClass);
      this.#appliedVariantClass = "";
    }
    if (nextVariant) {
      this.#appliedVariantClass = `inc-state-panel--${nextVariant}`;
      this.classList.add(this.#appliedVariantClass);
    }
    const isOpen = this.getAttribute("open") === null ? true : toBooleanAttribute(this.getAttribute("open"));
    this.toggleAttribute("hidden", !isOpen);
    this.setAttribute("aria-hidden", isOpen ? "false" : "true");
    if (!this.#fallback) {
      return;
    }
    const title = this.getAttribute("title") || "";
    const body = this.getAttribute("body") || "";
    const status = this.getAttribute("status") || "";
    const iconName = resolveStateIconName(this.getAttribute("icon"), status, nextVariant);
    this.#fallback.title.textContent = title;
    this.#fallback.body.textContent = body;
    if (iconName === "none") {
      this.#fallback.icon.replaceChildren();
      this.#fallback.icon.hidden = true;
    } else if (ICON_NAME_SET.has(iconName)) {
      renderDecorativeIcon(this.#fallback.icon, iconName, 22);
    } else {
      this.#fallback.icon.textContent = status;
      this.#fallback.icon.hidden = !status;
    }
    this.#fallback.actions.hidden = true;
  }
  #dispatchSlotChange() {
    this.dispatchEvent(new Event("slotchange", { bubbles: true, composed: true }));
  }
};
var IncBadgeElement = class extends HostElement3 {
  static observedAttributes = ["tone", "variant", "pill"];
  connectedCallback() {
    this.classList.add("inc-badge");
    this.#sync();
  }
  attributeChangedCallback() {
    this.#sync();
  }
  get tone() {
    return this.getAttribute("tone") || this.getAttribute("variant") || "";
  }
  set tone(value) {
    if (value == null || value === "") {
      this.removeAttribute("tone");
      return;
    }
    this.setAttribute("tone", String(value));
  }
  get pill() {
    return this.hasAttribute("pill");
  }
  set pill(value) {
    if (value) {
      this.setAttribute("pill", "");
    } else {
      this.removeAttribute("pill");
    }
  }
  #sync() {
    this.classList.add("inc-badge");
    BADGE_TONES.forEach((tone2) => this.classList.remove(`inc-badge--${tone2}`));
    this.classList.remove("inc-badge--pill");
    const tone = normalizeToken(this.tone);
    if (BADGE_TONES.has(tone)) {
      this.classList.add(`inc-badge--${tone}`);
    }
    if (this.pill) {
      this.classList.add("inc-badge--pill");
    }
  }
};
var IncLiveRegion = class extends HostElement3 {
  static observedAttributes = ["politeness", "atomic", "busy"];
  #announceNode = null;
  connectedCallback() {
    this.classList.add("inc-live-region");
    this.setAttribute("part", "region");
    this.#ensureNode();
    this.#syncA11y();
  }
  attributeChangedCallback() {
    if (!this.isConnected) {
      return;
    }
    this.#syncA11y();
  }
  announce(message) {
    this.#ensureNode();
    const text = message == null ? "" : String(message);
    this.#announceNode.textContent = "";
    const apply = () => {
      this.#announceNode.textContent = text;
    };
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(apply);
      return;
    }
    window.setTimeout(apply, 0);
  }
  #ensureNode() {
    if (this.#announceNode) {
      return;
    }
    this.#announceNode = document.createElement("span");
    this.#announceNode.className = "inc-live-region__message";
    this.#announceNode.setAttribute("part", "region");
    if (!this.firstElementChild) {
      this.append(this.#announceNode);
      return;
    }
    const existing = this.querySelector(".inc-live-region__message");
    if (existing instanceof HTMLElement) {
      this.#announceNode = existing;
      return;
    }
    this.append(this.#announceNode);
  }
  #syncA11y() {
    const politeness = this.getAttribute("politeness") || "polite";
    const isAtomic = this.getAttribute("atomic") === null ? true : toBooleanAttribute(this.getAttribute("atomic"));
    const isBusy = toBooleanAttribute(this.getAttribute("busy"));
    this.setAttribute("role", politeness === "assertive" ? "alert" : "status");
    this.setAttribute("aria-live", politeness);
    this.setAttribute("aria-atomic", isAtomic ? "true" : "false");
    this.setAttribute("aria-busy", isBusy ? "true" : "false");
  }
};
var IncSpinnerElement = class extends HostElement3 {
  static observedAttributes = ["variant", "tone", "size", "label"];
  connectedCallback() {
    this.#sync();
  }
  attributeChangedCallback() {
    this.#sync();
  }
  get variant() {
    return this.getAttribute("variant") || "";
  }
  set variant(value) {
    if (value == null || value === "") {
      this.removeAttribute("variant");
      return;
    }
    this.setAttribute("variant", String(value));
  }
  get tone() {
    return this.getAttribute("tone") || "";
  }
  set tone(value) {
    if (value == null || value === "") {
      this.removeAttribute("tone");
      return;
    }
    this.setAttribute("tone", String(value));
  }
  get size() {
    return this.getAttribute("size") || "";
  }
  set size(value) {
    if (value == null || value === "") {
      this.removeAttribute("size");
      return;
    }
    this.setAttribute("size", String(value));
  }
  get label() {
    return this.getAttribute("label") || "";
  }
  set label(value) {
    if (value == null || value === "") {
      this.removeAttribute("label");
      return;
    }
    this.setAttribute("label", String(value));
  }
  #sync() {
    this.classList.add("inc-spinner");
    SPINNER_VARIANTS.forEach((variant2) => {
      this.classList.remove(`inc-spinner--${variant2}`);
      this.classList.remove(`inc-spinner--${variant2}--sm`);
      BADGE_TONES.forEach((tone2) => this.classList.remove(`inc-spinner--${variant2}--${tone2}`));
    });
    const variant = normalizeToken(this.variant) || "border";
    const resolvedVariant = SPINNER_VARIANTS.has(variant) ? variant : "border";
    this.classList.add(`inc-spinner--${resolvedVariant}`);
    if (normalizeToken(this.size) === "sm") {
      this.classList.add(`inc-spinner--${resolvedVariant}--sm`);
    }
    const tone = normalizeToken(this.tone);
    if (BADGE_TONES.has(tone)) {
      this.classList.add(`inc-spinner--${resolvedVariant}--${tone}`);
    }
    const label = this.label.trim();
    if (label) {
      this.removeAttribute("aria-hidden");
      this.setAttribute("role", "status");
      this.setAttribute("aria-live", "polite");
      this.setAttribute("aria-label", label);
      return;
    }
    this.setAttribute("aria-hidden", "true");
    this.removeAttribute("role");
    this.removeAttribute("aria-live");
    this.removeAttribute("aria-label");
  }
};
var IncAutoRefresh = class extends HostElement3 {
  static observedAttributes = [
    "seconds",
    "label",
    "loading-label",
    "paused-label",
    "pause-action-label",
    "resume-action-label",
    "paused"
  ];
  #parts = null;
  #timeoutId = 0;
  #visibilityHandler = null;
  #isPaused = false;
  #isLoading = false;
  #deadline = 0;
  #remainingMs = 0;
  connectedCallback() {
    this.classList.add("inc-auto-refresh");
    this.#ensureMarkup();
    this.#bindHandlers();
    this.#start();
  }
  disconnectedCallback() {
    this.#stop();
    if (this.#visibilityHandler) {
      document.removeEventListener("visibilitychange", this.#visibilityHandler);
      this.#visibilityHandler = null;
    }
  }
  attributeChangedCallback(name) {
    if (!this.isConnected || !this.#parts) {
      return;
    }
    if (name === "paused") {
      if (toBooleanAttribute(this.getAttribute("paused"))) {
        this.pause();
      } else {
        this.resume();
      }
      return;
    }
    if (name === "seconds") {
      this.#start();
      return;
    }
    this.#render();
  }
  pause() {
    if (this.#isLoading || this.#isPaused) {
      return;
    }
    this.#isPaused = true;
    this.#remainingMs = Math.max(this.#deadline - Date.now(), 0);
    this.#stop();
    this.setAttribute("paused", "");
    this.#render();
    this.dispatchEvent(new CustomEvent("pause", { bubbles: true, composed: true }));
    this.#emitStateChange("paused");
  }
  resume() {
    if (this.#isLoading || !this.#isPaused) {
      return;
    }
    this.#isPaused = false;
    this.removeAttribute("paused");
    this.#deadline = Date.now() + Math.max(this.#remainingMs, 1e3);
    this.#remainingMs = 0;
    this.#scheduleTick();
    this.dispatchEvent(new CustomEvent("resume", { bubbles: true, composed: true }));
    this.#emitStateChange("running");
  }
  toggle() {
    if (this.#isPaused) {
      this.resume();
      return;
    }
    this.pause();
  }
  refresh() {
    if (this.#isLoading) {
      return;
    }
    this.#isLoading = true;
    this.#stop();
    this.#render();
    this.#emitStateChange("loading");
    const refreshEvent = new CustomEvent("refresh", {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: this.#buildState()
    });
    this.dispatchEvent(refreshEvent);
    if (!refreshEvent.defaultPrevented) {
      const deferToPaint = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : (callback) => window.setTimeout(callback, 16);
      deferToPaint(() => {
        window.setTimeout(() => {
          window.location.reload();
        }, 120);
      });
    }
  }
  #bindHandlers() {
    if (!this.#parts?.toggle) {
      return;
    }
    if (!this.#parts.toggle.dataset.incWcBound) {
      this.#parts.toggle.dataset.incWcBound = "true";
      this.#parts.toggle.addEventListener("click", (event) => {
        event.preventDefault();
        this.toggle();
      });
    }
    if (!this.#visibilityHandler) {
      this.#visibilityHandler = () => {
        if (document.hidden || this.#isPaused || this.#isLoading) {
          return;
        }
        if (this.#deadline - Date.now() <= 0) {
          this.refresh();
          return;
        }
        this.#scheduleTick();
      };
      document.addEventListener("visibilitychange", this.#visibilityHandler);
    }
  }
  #ensureMarkup() {
    if (this.querySelector(".inc-auto-refresh__countdown")) {
      this.#parts = this.#getParts();
      return;
    }
    this.innerHTML = `
<button type="button" class="inc-auto-refresh__toggle inc-btn inc-btn--outline-secondary inc-btn--micro" part="toggle">
  <span class="inc-auto-refresh__toggle-icon" aria-hidden="true"></span>
  <span class="inc-auto-refresh__toggle-text"></span>
</button>
<span class="inc-auto-refresh__countdown" part="countdown">
  <span class="inc-auto-refresh__label" part="label"></span>
  <span class="inc-auto-refresh__value" part="value"></span>
</span>
<span class="inc-auto-refresh__status" part="status" hidden>
  <span class="inc-auto-refresh__status-text"></span>
</span>
        `.trim();
    this.#parts = this.#getParts();
  }
  #getParts() {
    return {
      countdown: this.querySelector(".inc-auto-refresh__countdown"),
      label: this.querySelector(".inc-auto-refresh__label"),
      value: this.querySelector(".inc-auto-refresh__value"),
      status: this.querySelector(".inc-auto-refresh__status"),
      statusText: this.querySelector(".inc-auto-refresh__status-text"),
      toggle: this.querySelector(".inc-auto-refresh__toggle"),
      toggleIcon: this.querySelector(".inc-auto-refresh__toggle-icon"),
      toggleText: this.querySelector(".inc-auto-refresh__toggle-text")
    };
  }
  #start() {
    const refreshSeconds = toPositiveInt(this.getAttribute("seconds"));
    this.#stop();
    this.#isLoading = false;
    this.#isPaused = toBooleanAttribute(this.getAttribute("paused"));
    if (!refreshSeconds) {
      this.#render();
      return;
    }
    this.#deadline = Date.now() + refreshSeconds * 1e3;
    this.#remainingMs = refreshSeconds * 1e3;
    if (this.#isPaused) {
      this.#render();
      return;
    }
    this.#scheduleTick();
  }
  #scheduleTick() {
    if (this.#isPaused || this.#isLoading) {
      return;
    }
    this.#stop();
    const remainingMs = this.#deadline - Date.now();
    if (remainingMs <= 0) {
      this.refresh();
      return;
    }
    const remainingSeconds = Math.ceil(remainingMs / 1e3);
    this.#remainingMs = remainingMs;
    this.#renderCountdown(remainingSeconds);
    this.dispatchEvent(new CustomEvent("tick", {
      bubbles: true,
      composed: true,
      detail: this.#buildState()
    }));
    const nextDelay = remainingMs % 1e3 || 1e3;
    this.#timeoutId = window.setTimeout(() => {
      this.#scheduleTick();
    }, nextDelay);
  }
  #render() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const fallbackSeconds = Math.max(1, Math.ceil(this.#remainingMs / 1e3));
    if (this.#isPaused) {
      this.#renderPaused(fallbackSeconds);
      return;
    }
    this.#renderCountdown(fallbackSeconds);
  }
  #renderCountdown(seconds) {
    const label = this.getAttribute("label") || "Refresh in";
    if (this.#parts.label) {
      this.#parts.label.textContent = label;
    }
    if (this.#parts.value) {
      this.#parts.value.textContent = formatRemaining(seconds);
    }
    this.classList.remove("is-paused");
    this.classList.remove("is-loading");
    this.setAttribute("aria-busy", "false");
    if (this.#parts.countdown) {
      this.#parts.countdown.hidden = false;
    }
    if (this.#parts.status) {
      this.#parts.status.hidden = true;
    }
    this.#updateToggle();
  }
  #renderPaused(seconds) {
    const label = this.getAttribute("paused-label") || "Paused at";
    if (this.#parts.label) {
      this.#parts.label.textContent = label;
    }
    if (this.#parts.value) {
      this.#parts.value.textContent = formatRemaining(seconds);
    }
    this.classList.add("is-paused");
    this.classList.remove("is-loading");
    this.setAttribute("aria-busy", "false");
    if (this.#parts.countdown) {
      this.#parts.countdown.hidden = false;
    }
    if (this.#parts.status) {
      this.#parts.status.hidden = true;
    }
    this.#updateToggle();
  }
  #renderLoading() {
    const loadingLabel = this.getAttribute("loading-label") || "Refreshing";
    this.classList.remove("is-paused");
    this.classList.add("is-loading");
    this.setAttribute("aria-busy", "true");
    if (this.#parts.countdown) {
      this.#parts.countdown.hidden = true;
    }
    if (this.#parts.statusText) {
      this.#parts.statusText.textContent = loadingLabel;
    }
    if (this.#parts.status) {
      this.#parts.status.hidden = false;
    }
    this.#updateToggle();
  }
  #updateToggle() {
    if (!(this.#parts.toggle instanceof HTMLElement)) {
      return;
    }
    const pauseLabel = this.getAttribute("pause-action-label") || "Pause";
    const resumeLabel = this.getAttribute("resume-action-label") || "Resume";
    const actionLabel = this.#isPaused ? resumeLabel : pauseLabel;
    this.#parts.toggle.disabled = this.#isLoading;
    this.#parts.toggle.setAttribute("aria-pressed", this.#isPaused ? "true" : "false");
    this.#parts.toggle.setAttribute("aria-label", actionLabel);
    if (this.#parts.toggleText) {
      this.#parts.toggleText.textContent = actionLabel;
    }
    if (this.#parts.toggleIcon instanceof HTMLElement) {
      renderDecorativeIcon(this.#parts.toggleIcon, this.#isPaused ? "play" : "pause", 16);
    }
  }
  #stop() {
    if (this.#timeoutId) {
      window.clearTimeout(this.#timeoutId);
      this.#timeoutId = 0;
    }
  }
  #buildState() {
    return {
      paused: this.#isPaused,
      loading: this.#isLoading,
      remainingSeconds: Math.max(0, Math.ceil(this.#remainingMs / 1e3))
    };
  }
  #emitStateChange(status) {
    this.dispatchEvent(new CustomEvent("statechange", {
      bubbles: true,
      composed: true,
      detail: {
        status,
        ...this.#buildState()
      }
    }));
  }
};
var IncThemeSwitcher = class extends HostElement3 {
  static observedAttributes = ["mode", "variant", "block", "label", "menu-label", "heading", "storage-key"];
  #details = null;
  #summary = null;
  #status = null;
  #panel = null;
  #bound = false;
  #unsubscribe = null;
  #ignoreModeReflection = false;
  connectedCallback() {
    initializeThemeRuntime(this.storageKey);
    this.#ensureMarkup();
    this.#applyVisualConfig();
    this.#bindHandlers();
    this.#subscribeTheme();
    this.#syncModeFromAttribute();
  }
  disconnectedCallback() {
    if (this.#unsubscribe) {
      this.#unsubscribe();
      this.#unsubscribe = null;
    }
  }
  attributeChangedCallback(name) {
    if (!this.isConnected) {
      return;
    }
    if (name === "storage-key") {
      initializeThemeRuntime(this.storageKey);
      return;
    }
    if (name === "mode" && !this.#ignoreModeReflection) {
      this.setMode(this.getAttribute("mode") || "system");
      return;
    }
    this.#applyVisualConfig();
  }
  get storageKey() {
    return this.getAttribute("storage-key") || DEFAULT_THEME_STORAGE_KEY;
  }
  getMode() {
    return themeMode;
  }
  getResolvedTheme() {
    return themeResolved;
  }
  setMode(mode) {
    initializeThemeRuntime(this.storageKey);
    const next = isThemeMode(mode) ? mode : "system";
    applyThemeMode(next, {
      dispatch: true,
      persist: true,
      storageKey: this.storageKey
    });
  }
  cycleMode() {
    const index = THEME_MODES.indexOf(themeMode);
    const nextMode = THEME_MODES[(index + 1) % THEME_MODES.length];
    this.setMode(nextMode);
  }
  #ensureMarkup() {
    this.classList.add("inc-theme-switcher-host");
    this.#details = this.querySelector("details.inc-theme-switcher");
    if (!(this.#details instanceof HTMLDetailsElement)) {
      this.innerHTML = `
<details class="inc-native-menu inc-theme-switcher">
  <summary class="inc-native-menu__summary inc-theme-switcher__summary" part="summary">
    <span class="inc-theme-switcher__meta">
      <span class="inc-theme-switcher__label" part="label"></span>
      <span class="inc-theme-switcher__status" part="status"></span>
    </span>
  </summary>
  <div class="inc-native-menu__panel inc-theme-switcher__panel" role="menu" part="panel">
    <div class="inc-native-menu__header"></div>
  </div>
</details>
            `.trim();
      this.#details = this.querySelector("details.inc-theme-switcher");
    }
    this.#summary = this.#details?.querySelector("summary");
    this.#status = this.#details?.querySelector(".inc-theme-switcher__status");
    this.#panel = this.#details?.querySelector(".inc-theme-switcher__panel");
    if (!this.#panel) {
      return;
    }
    const header = this.#panel.querySelector(".inc-native-menu__header") || document.createElement("div");
    header.classList.add("inc-native-menu__header");
    header.textContent = this.getAttribute("heading") || "Choose appearance";
    if (!header.parentElement) {
      this.#panel.append(header);
    }
    const existingOptions = this.#panel.querySelectorAll("[data-inc-theme-mode]");
    if (!existingOptions.length) {
      THEME_MODES.forEach((mode) => {
        const option = document.createElement("button");
        const body = document.createElement("span");
        const label = document.createElement("span");
        const detail = document.createElement("span");
        option.type = "button";
        option.className = "inc-theme-switcher__option";
        option.dataset.incThemeMode = mode;
        option.setAttribute("data-inc-theme-mode", mode);
        option.setAttribute("role", "menuitemradio");
        option.setAttribute("part", "option");
        body.className = "inc-theme-switcher__option-body";
        body.setAttribute("part", "option-body");
        label.className = "inc-theme-switcher__option-label";
        label.setAttribute("part", "option-label");
        detail.className = "inc-theme-switcher__option-detail";
        detail.setAttribute("part", "option-detail");
        label.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
        detail.textContent = mode === "system" ? "Match the device preference automatically." : `Use the ${mode} application palette.`;
        body.append(label, detail);
        option.append(body);
        this.#panel.append(option);
      });
    }
  }
  #applyVisualConfig() {
    if (!(this.#details instanceof HTMLDetailsElement)) {
      return;
    }
    const label = this.getAttribute("label") || "Theme";
    const menuLabel = this.getAttribute("menu-label") || "Theme";
    const heading = this.getAttribute("heading") || "Choose appearance";
    const isBlock = toBooleanAttribute(this.getAttribute("block"));
    const variant = this.getAttribute("variant");
    this.#details.classList.remove("inc-native-menu--navbar", "inc-native-menu--block");
    if (variant === "navbar") {
      this.#details.classList.add("inc-native-menu--navbar");
    }
    if (isBlock) {
      this.#details.classList.add("inc-native-menu--block");
    }
    const labelNode = this.#details.querySelector(".inc-theme-switcher__label");
    const headerNode = this.#details.querySelector(".inc-native-menu__header");
    if (labelNode) {
      labelNode.textContent = label;
    }
    if (this.#panel) {
      this.#panel.setAttribute("aria-label", menuLabel);
    }
    if (headerNode) {
      headerNode.textContent = heading;
    }
  }
  #bindHandlers() {
    if (this.#bound || !this.#details) {
      return;
    }
    this.#bound = true;
    this.#details.addEventListener("click", (event) => {
      const control = event.target.closest("[data-inc-theme-mode]");
      if (!control) {
        return;
      }
      event.preventDefault();
      const mode = control.getAttribute("data-inc-theme-mode");
      this.setMode(mode);
      this.#details.open = false;
      if (this.#summary) {
        this.#summary.focus();
      }
    });
    this.#summary?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      this.#details.open = !this.#details.open;
      if (!this.#details.open && this.#summary) {
        this.#summary.focus();
      }
    });
    this.#details.addEventListener("keydown", (event) => {
      const control = event.target.closest("[data-inc-theme-mode]");
      if (event.key === "Escape" && this.#details.open) {
        this.#details.open = false;
        if (this.#summary) {
          this.#summary.focus();
        }
        return;
      }
      if (!control || !this.#panel) {
        return;
      }
      const options = Array.from(this.#panel.querySelectorAll("[data-inc-theme-mode]"));
      if (!options.length) {
        return;
      }
      const index = options.indexOf(control);
      if (index < 0) {
        return;
      }
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        options[(index + 1) % options.length]?.focus();
        return;
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        options[(index - 1 + options.length) % options.length]?.focus();
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        options[0]?.focus();
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        options[options.length - 1]?.focus();
      }
    });
  }
  #subscribeTheme() {
    if (this.#unsubscribe) {
      this.#unsubscribe();
    }
    this.#unsubscribe = subscribeThemeState((state) => {
      this.#syncUI(state.mode, state.resolved);
    });
  }
  #syncModeFromAttribute() {
    const declared = this.getAttribute("mode");
    if (!declared) {
      return;
    }
    this.setMode(declared);
  }
  #syncUI(mode, resolved) {
    if (this.#status) {
      const label = mode === "system" ? `System (${resolved.charAt(0).toUpperCase()}${resolved.slice(1)})` : `${mode.charAt(0).toUpperCase()}${mode.slice(1)}`;
      this.#status.textContent = label;
    }
    if (this.#panel) {
      const options = this.#panel.querySelectorAll("[data-inc-theme-mode]");
      options.forEach((option) => {
        const optionMode = option.getAttribute("data-inc-theme-mode");
        const isSelected = optionMode === mode;
        option.classList.toggle("is-selected", isSelected);
        option.setAttribute("aria-checked", isSelected ? "true" : "false");
        option.setAttribute("aria-pressed", isSelected ? "true" : "false");
      });
    }
    this.dataset.incThemeModeState = mode;
    this.dataset.incThemeResolved = resolved;
    this.#ignoreModeReflection = true;
    this.setAttribute("mode", mode);
    this.#ignoreModeReflection = false;
  }
};
var feedbackDefinitions = [
  ["inc-badge", IncBadgeElement],
  ["inc-state-panel", IncStatePanel],
  ["inc-live-region", IncLiveRegion],
  ["inc-spinner", IncSpinnerElement],
  ["inc-auto-refresh", IncAutoRefresh],
  ["inc-theme-switcher", IncThemeSwitcher]
];
function defineFeedbackComponents(definer = typeof customElements !== "undefined" ? customElements : null) {
  if (!definer || typeof definer.get !== "function" || typeof definer.define !== "function") {
    return;
  }
  feedbackDefinitions.forEach(([tagName, ctor]) => {
    if (!definer.get(tagName)) {
      definer.define(tagName, ctor);
    }
  });
}
if (typeof globalThis !== "undefined") {
  const namespace2 = globalThis.IncWebComponents || (globalThis.IncWebComponents = {});
  namespace2.feedback = Object.assign({}, namespace2.feedback, {
    defineFeedbackComponents,
    feedbackDefinitions,
    components: {
      IncBadgeElement,
      IncSpinnerElement,
      IncStatePanel,
      IncLiveRegion,
      IncAutoRefresh,
      IncThemeSwitcher
    }
  });
}

// src/web-components/components/dom-helpers.js
var ElementRef = typeof Element === "undefined" ? null : Element;
function normalizeToken2(value) {
  return String(value ?? "").trim().toLowerCase();
}
function addClass(node, className) {
  if (ElementRef && node instanceof ElementRef && className) {
    node.classList.add(className);
  }
}
function removeMatchingClasses(node, predicate) {
  if (!ElementRef || !(node instanceof ElementRef)) {
    return;
  }
  Array.from(node.classList).filter((token) => predicate(token)).forEach((token) => node.classList.remove(token));
}
function moveChildNodes(source, target, predicate = () => true) {
  Array.from(source.childNodes).filter((node) => predicate(node)).forEach((node) => target.append(node));
}
function ensureNode(parent, selector, build) {
  const existing = parent.querySelector(`:scope > ${selector}`);
  if (existing) {
    return existing;
  }
  const node = build();
  parent.append(node);
  return node;
}

// src/web-components/components/actions.js
var FALSE_TOKENS = /* @__PURE__ */ new Set(["false", "0", "off", "no"]);
var BADGE_TONES2 = /* @__PURE__ */ new Set(["primary", "secondary", "success", "danger", "warning", "info"]);
var BUTTON_VARIANTS = /* @__PURE__ */ new Set([
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "link",
  "outline-primary",
  "outline-secondary",
  "outline-success",
  "outline-danger",
  "outline-warning",
  "outline-info"
]);
var BUTTON_SIZES = /* @__PURE__ */ new Set(["sm", "lg", "micro"]);
var ALERT_DEFAULT_ROLE_BY_TONE = /* @__PURE__ */ new Map([
  ["info", "status"],
  ["secondary", "status"]
]);
var ALERT_ICON_BY_TONE = /* @__PURE__ */ new Map([
  ["success", "success"],
  ["danger", "error"],
  ["warning", "warning"],
  ["info", "info"],
  ["secondary", "info"],
  ["primary", "info"]
]);
var HostElement4 = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
function toBoolean(value, fallback = false) {
  if (value == null) {
    return fallback;
  }
  return !FALSE_TOKENS.has(String(value).toLowerCase());
}
function toPositiveInt2(value) {
  const parsed = Number.parseInt(String(value ?? "").trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
function emit2(host, type, detail = {}, options = {}) {
  return host.dispatchEvent(new CustomEvent(type, {
    detail,
    bubbles: options.bubbles !== false,
    composed: options.composed !== false,
    cancelable: options.cancelable === true
  }));
}
function getDirectIconSlot(host) {
  return Array.from(host.children || []).find((node) => node instanceof HTMLElement && node.getAttribute("slot") === "icon") || null;
}
function hasConsumerIcon(container) {
  return Array.from(container.children || []).some((node) => node instanceof HTMLElement && !node.hasAttribute("data-inc-generated-icon"));
}
function renderDecorativeIcon2(container, name, options = {}) {
  replaceIconContents(container, name, {
    className: "inc-icon",
    decorative: true,
    size: options.size || 16
  });
  container.hidden = false;
}
var IncElement = class extends HostElement4 {
  emit(type, detail = {}, options = {}) {
    return emit2(this, type, detail, options);
  }
};
var IncButtonElement = class extends IncElement {
  static get observedAttributes() {
    return ["tone", "variant", "size", "loading", "href", "type", "disabled", "label", "target", "rel", "download", "icon"];
  }
  connectedCallback() {
    addClass(this, "inc-button");
    this.bindEvents();
    this.sync();
  }
  disconnectedCallback() {
    if (this._boundClick) {
      this.removeEventListener("click", this._boundClick);
    }
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.sync();
    }
  }
  bindEvents() {
    if (this._boundClick) {
      return;
    }
    this._boundClick = (event) => {
      if (!this._control || !this.contains(this._control)) {
        return;
      }
      const isBlocked = this._control.hasAttribute("aria-disabled") || this._control.classList.contains("is-loading");
      if (!isBlocked || this._control.tagName !== "A") {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
    };
    this.addEventListener("click", this._boundClick);
  }
  sync() {
    addClass(this, "inc-button");
    this.setAttribute("part", "button");
    const control = this.ensureControl();
    const variant = normalizeToken2(this.getAttribute("variant") || this.getAttribute("tone")) || "secondary";
    const resolvedVariant = BUTTON_VARIANTS.has(variant) ? variant : "secondary";
    const size = normalizeToken2(this.getAttribute("size"));
    const loading = toBoolean(this.getAttribute("loading"));
    const disabled = toBoolean(this.getAttribute("disabled")) || loading;
    control.className = "inc-btn inc-button__control";
    control.setAttribute("part", "control");
    control.classList.add(`inc-btn--${resolvedVariant}`);
    if (BUTTON_SIZES.has(size)) {
      control.classList.add(`inc-btn--${size}`);
    }
    control.classList.toggle("is-loading", loading);
    if (control.tagName === "BUTTON") {
      control.type = this.getAttribute("type") || "button";
      control.disabled = disabled;
    } else {
      control.setAttribute("href", this.getAttribute("href") || "#");
      const target = this.getAttribute("target");
      if (target) {
        control.setAttribute("target", target);
      } else {
        control.removeAttribute("target");
      }
      const rel = this.getAttribute("rel");
      if (rel) {
        control.setAttribute("rel", rel);
      } else {
        control.removeAttribute("rel");
      }
      const download = this.getAttribute("download");
      if (download != null) {
        control.setAttribute("download", download);
      } else {
        control.removeAttribute("download");
      }
      if (disabled) {
        control.setAttribute("aria-disabled", "true");
        control.tabIndex = -1;
      } else {
        control.removeAttribute("aria-disabled");
        control.removeAttribute("tabindex");
      }
    }
    if (loading) {
      control.setAttribute("aria-busy", "true");
      this.ensureLoadingSpinner(control);
    } else {
      control.removeAttribute("aria-busy");
      this.removeLoadingSpinner(control);
    }
    this.syncIcon(control);
    const label = this.getAttribute("label");
    if (label) {
      control.setAttribute("aria-label", label);
    } else {
      control.removeAttribute("aria-label");
    }
  }
  ensureControl() {
    const desiredTag = this.hasAttribute("href") ? "A" : "BUTTON";
    const existing = this._control || this.querySelector(":scope > button.inc-button__control, :scope > a.inc-button__control");
    if (existing && existing.tagName === desiredTag) {
      this._control = existing;
      return existing;
    }
    const control = document.createElement(desiredTag.toLowerCase());
    if (desiredTag === "BUTTON") {
      control.type = this.getAttribute("type") || "button";
    }
    if (existing) {
      moveChildNodes(existing, control);
      existing.replaceWith(control);
    } else {
      moveChildNodes(this, control);
      this.append(control);
    }
    if (!control.childNodes.length) {
      control.textContent = this.textContent || "";
    }
    this._control = control;
    return control;
  }
  ensureLoadingSpinner(control) {
    this.removeLoadingSpinner(control);
    const spinner = document.createElement("span");
    spinner.dataset.incButtonSpinner = "true";
    spinner.className = "inc-spinner inc-spinner--border inc-spinner--border--sm";
    spinner.setAttribute("aria-hidden", "true");
    control.append(spinner);
  }
  removeLoadingSpinner(control) {
    if (!(control instanceof HTMLElement)) {
      return;
    }
    control.querySelectorAll(":scope > [data-inc-button-spinner]").forEach((node) => node.remove());
  }
  syncIcon(control) {
    if (!(control instanceof HTMLElement)) {
      return;
    }
    const explicitIcon = normalizeIconName(this.getAttribute("icon"));
    const inferredIcon = this.getAttribute("download") != null ? "download" : this.getAttribute("target") === "_blank" ? "external-link" : "";
    const iconName = explicitIcon || inferredIcon;
    let icon = control.querySelector(":scope > [data-inc-button-icon]");
    const slotted = getDirectIconSlot(control);
    if (!icon && (iconName || slotted)) {
      icon = document.createElement("span");
      icon.className = "inc-btn__icon";
      icon.setAttribute("data-inc-button-icon", "true");
      icon.setAttribute("aria-hidden", "true");
      control.prepend(icon);
    }
    if (!(icon instanceof HTMLElement)) {
      return;
    }
    if (slotted) {
      slotted.removeAttribute("slot");
      icon.replaceChildren(slotted);
      icon.hidden = false;
      return;
    }
    if (hasConsumerIcon(icon)) {
      icon.hidden = false;
      return;
    }
    if (iconName && iconName !== "none") {
      renderDecorativeIcon2(icon, iconName, { size: 16 });
      return;
    }
    icon.remove();
  }
};
var IncButtonGroupElement = class extends IncElement {
  static get observedAttributes() {
    return ["size", "label"];
  }
  connectedCallback() {
    addClass(this, "inc-button-group");
    this.sync();
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.sync();
    }
  }
  sync() {
    addClass(this, "inc-button-group");
    this.setAttribute("part", "button-group");
    removeMatchingClasses(this, (token) => token.startsWith("inc-button-group--"));
    const size = normalizeToken2(this.getAttribute("size"));
    if (BUTTON_SIZES.has(size)) {
      this.classList.add(`inc-button-group--${size}`);
    }
    this.setAttribute("role", "group");
    const label = this.getAttribute("label") || this.getAttribute("aria-label") || "";
    if (label) {
      this.setAttribute("aria-label", label);
    } else {
      this.removeAttribute("aria-label");
    }
  }
};
var IncButtonToolbarElement = class extends IncElement {
  static get observedAttributes() {
    return ["label", "orientation"];
  }
  connectedCallback() {
    addClass(this, "inc-button-toolbar");
    this.sync();
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.sync();
    }
  }
  sync() {
    addClass(this, "inc-button-toolbar");
    this.setAttribute("part", "button-toolbar");
    this.setAttribute("role", "toolbar");
    const orientation = normalizeToken2(this.getAttribute("orientation"));
    if (orientation === "vertical") {
      this.setAttribute("aria-orientation", "vertical");
    } else {
      this.removeAttribute("aria-orientation");
    }
    const label = this.getAttribute("label") || this.getAttribute("aria-label") || "";
    if (label) {
      this.setAttribute("aria-label", label);
    } else {
      this.removeAttribute("aria-label");
    }
  }
};
var IncCloseButtonElement = class extends IncElement {
  static get observedAttributes() {
    return ["label", "variant"];
  }
  connectedCallback() {
    this.sync();
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.sync();
    }
  }
  sync() {
    this.classList.remove("inc-close-button", "inc-close-button--white");
    this.setAttribute("part", "close-button");
    const control = this.ensureControl();
    const variant = normalizeToken2(this.getAttribute("variant"));
    control.className = "inc-close-button";
    control.setAttribute("part", "control");
    if (variant === "white") {
      control.classList.add("inc-close-button--white");
    }
    control.type = "button";
    control.setAttribute("aria-label", this.getAttribute("label") || "Close");
    control.textContent = "";
  }
  ensureControl() {
    const existing = this._control || this.querySelector(":scope > button.inc-close-button");
    if (existing) {
      this._control = existing;
      return existing;
    }
    const control = document.createElement("button");
    const previous = this.querySelector(":scope > a.inc-close-button");
    if (previous) {
      moveChildNodes(previous, control);
      previous.replaceWith(control);
    } else {
      moveChildNodes(this, control);
      this.append(control);
    }
    this._control = control;
    return control;
  }
};
var IncAlertElement = class extends IncElement {
  static get observedAttributes() {
    return ["tone", "variant", "dismissible", "dismiss-label", "timeout", "icon"];
  }
  connectedCallback() {
    addClass(this, "inc-alert");
    this.bindEvents();
    this.sync();
  }
  disconnectedCallback() {
    this.stopDismissTimer();
    if (this._boundClick) {
      this.removeEventListener("click", this._boundClick);
    }
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.sync();
    }
  }
  bindEvents() {
    if (this._boundClick) {
      return;
    }
    this._boundClick = (event) => {
      const dismiss = event.target.closest("[data-inc-alert-dismiss]");
      if (!dismiss || !this.contains(dismiss)) {
        return;
      }
      event.preventDefault();
      this.dismiss("manual");
    };
    this.addEventListener("click", this._boundClick);
  }
  sync() {
    addClass(this, "inc-alert");
    this.setAttribute("part", "alert");
    removeMatchingClasses(this, (token) => token.startsWith("inc-alert--"));
    const tone = normalizeToken2(this.getAttribute("tone") || this.getAttribute("variant")) || "info";
    const resolvedTone = BADGE_TONES2.has(tone) ? tone : "info";
    this.classList.add(`inc-alert--${resolvedTone}`);
    this.syncIcon(resolvedTone);
    if (toBoolean(this.getAttribute("dismissible"))) {
      this.classList.add("inc-alert--dismissible");
      this.ensureDismissButton();
    } else {
      this.removeDismissButton();
    }
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", ALERT_DEFAULT_ROLE_BY_TONE.get(resolvedTone) || "alert");
    }
    if (!this.hasAttribute("aria-live")) {
      this.setAttribute("aria-live", this.getAttribute("role") === "alert" ? "assertive" : "polite");
    }
    this.setAttribute("aria-atomic", "true");
    const timeoutMs = toPositiveInt2(this.getAttribute("timeout"));
    if (timeoutMs) {
      this.ensureProgressBar();
      if (!this.hidden && this.getAttribute("aria-hidden") !== "true") {
        this.startDismissTimer(timeoutMs);
      } else {
        this.stopDismissTimer();
      }
    } else {
      this.stopDismissTimer();
      this.removeProgressBar();
    }
  }
  ensureDismissButton() {
    let button = this.querySelector(":scope > [data-inc-alert-dismiss]");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.dataset.incAlertDismiss = "true";
      this.append(button);
    }
    button.className = "inc-close-button";
    button.setAttribute("part", "dismiss");
    button.setAttribute("aria-label", this.getAttribute("dismiss-label") || "Dismiss alert");
    button.textContent = "";
    return button;
  }
  removeDismissButton() {
    this.querySelectorAll(":scope > [data-inc-alert-dismiss]").forEach((node) => node.remove());
  }
  ensureProgressBar() {
    let progress = this.querySelector(":scope > .inc-alert__progress");
    if (!progress) {
      progress = document.createElement("div");
      progress.className = "inc-alert__progress";
      progress.setAttribute("part", "progress");
      progress.setAttribute("aria-hidden", "true");
      this.append(progress);
    }
    return progress;
  }
  removeProgressBar() {
    this.querySelectorAll(":scope > .inc-alert__progress").forEach((node) => node.remove());
  }
  syncIcon(tone) {
    const explicitIcon = normalizeIconName(this.getAttribute("icon"));
    const iconName = explicitIcon || ALERT_ICON_BY_TONE.get(tone) || "info";
    let icon = this.querySelector(":scope > .inc-alert__icon");
    const slotted = getDirectIconSlot(this);
    if (!icon && (iconName !== "none" || slotted)) {
      icon = document.createElement("span");
      icon.className = "inc-alert__icon";
      icon.setAttribute("part", "icon");
      icon.setAttribute("aria-hidden", "true");
      this.prepend(icon);
    }
    if (!(icon instanceof HTMLElement)) {
      return;
    }
    if (slotted) {
      slotted.removeAttribute("slot");
      icon.replaceChildren(slotted);
      icon.hidden = false;
      return;
    }
    if (hasConsumerIcon(icon)) {
      icon.hidden = false;
      return;
    }
    if (iconName === "none") {
      icon.remove();
      return;
    }
    renderDecorativeIcon2(icon, iconName, { size: 18 });
  }
  startDismissTimer(timeoutMs) {
    const progress = this.ensureProgressBar();
    this.stopDismissTimer();
    this._dismissTimeoutMs = timeoutMs;
    this._dismissStartedAt = performance.now();
    const tick = (now) => {
      if (this.hidden || this.getAttribute("aria-hidden") === "true") {
        this.stopDismissTimer();
        return;
      }
      const elapsed = Math.max(0, now - this._dismissStartedAt);
      const remaining = Math.max(0, timeoutMs - elapsed);
      const ratio = timeoutMs > 0 ? remaining / timeoutMs : 0;
      progress.style.transform = `scaleX(${ratio})`;
      if (remaining <= 0) {
        this.dismiss("timeout");
        return;
      }
      this._dismissFrame = window.requestAnimationFrame(tick);
    };
    progress.style.transform = "scaleX(1)";
    this._dismissFrame = window.requestAnimationFrame(tick);
  }
  stopDismissTimer() {
    if (this._dismissFrame) {
      window.cancelAnimationFrame(this._dismissFrame);
      this._dismissFrame = 0;
    }
  }
  dismiss(reason = "manual") {
    this.hide(reason);
  }
  hide(reason = "manual") {
    this.stopDismissTimer();
    this.hidden = true;
    this.setAttribute("aria-hidden", "true");
    this.emit("dismiss", { hidden: true, reason });
  }
};
var IncEmptyStateElement = class extends IncElement {
  static get observedAttributes() {
    return ["icon"];
  }
  connectedCallback() {
    addClass(this, "inc-empty-state");
    this.sync();
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.sync();
    }
  }
  sync() {
    addClass(this, "inc-empty-state");
    this.setAttribute("part", "empty-state content icon body actions");
    const content = ensureNode(this, ".inc-empty-state__content", () => {
      const node = document.createElement("div");
      node.className = "inc-empty-state__content";
      node.innerHTML = [
        '<div class="inc-empty-state__icon" part="icon"></div>',
        '<div class="inc-empty-state__body" part="body"></div>',
        '<div class="inc-empty-state__actions" part="actions"></div>'
      ].join("");
      return node;
    });
    const icon = ensureNode(content, ".inc-empty-state__icon", () => {
      const node = document.createElement("div");
      node.className = "inc-empty-state__icon";
      node.setAttribute("part", "icon");
      return node;
    });
    const body = ensureNode(content, ".inc-empty-state__body", () => {
      const node = document.createElement("div");
      node.className = "inc-empty-state__body";
      node.setAttribute("part", "body");
      return node;
    });
    const actions = ensureNode(content, ".inc-empty-state__actions", () => {
      const node = document.createElement("div");
      node.className = "inc-empty-state__actions";
      node.setAttribute("part", "actions");
      return node;
    });
    Array.from(this.childNodes).forEach((node) => {
      if (node === content) {
        return;
      }
      if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute("slot") === "icon") {
        node.removeAttribute("slot");
        icon.append(node);
        return;
      }
      if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute("slot") === "actions") {
        node.removeAttribute("slot");
        actions.append(node);
        return;
      }
      body.append(node);
    });
    if (hasConsumerIcon(icon)) {
      icon.hidden = false;
      return;
    }
    const iconName = normalizeIconName(this.getAttribute("icon")) || "empty";
    if (iconName === "none") {
      icon.replaceChildren();
      icon.hidden = true;
      return;
    }
    renderDecorativeIcon2(icon, iconName, { size: 34 });
  }
};
var actionDefinitions = [
  ["inc-button", IncButtonElement],
  ["inc-button-group", IncButtonGroupElement],
  ["inc-button-toolbar", IncButtonToolbarElement],
  ["inc-close-button", IncCloseButtonElement],
  ["inc-alert", IncAlertElement],
  ["inc-empty-state", IncEmptyStateElement]
];
var actionComponents = {
  IncButtonElement,
  IncButtonGroupElement,
  IncButtonToolbarElement,
  IncCloseButtonElement,
  IncAlertElement,
  IncEmptyStateElement
};
function defineActionComponents(registry = globalThis.customElements) {
  if (!registry || typeof registry.define !== "function" || typeof registry.get !== "function") {
    return [];
  }
  const defined = [];
  for (const [tagName, ctor] of actionDefinitions) {
    if (!registry.get(tagName)) {
      registry.define(tagName, ctor);
      defined.push(tagName);
    }
  }
  return defined;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    defineActionComponents,
    actionDefinitions,
    actionComponents,
    IncButtonElement,
    IncButtonGroupElement,
    IncButtonToolbarElement,
    IncCloseButtonElement,
    IncAlertElement,
    IncEmptyStateElement
  };
}
if (typeof globalThis !== "undefined") {
  const namespace2 = globalThis.IncWebComponents || (globalThis.IncWebComponents = {});
  namespace2.actions = Object.assign({}, namespace2.actions, {
    defineActionComponents,
    actionDefinitions,
    components: actionComponents
  });
}

// src/web-components/base-element.js
var HostElement5 = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
var metadataByConstructor = /* @__PURE__ */ new WeakMap();
function buildMetadata(constructor) {
  if (metadataByConstructor.has(constructor)) {
    return metadataByConstructor.get(constructor);
  }
  const reflectedConfig = constructor.reflectedAttributes || {};
  const propertyToConfig = /* @__PURE__ */ new Map();
  const attributeToConfig = /* @__PURE__ */ new Map();
  Object.keys(reflectedConfig).forEach((property) => {
    const normalized = normalizeAttributeConfig(property, reflectedConfig[property]);
    propertyToConfig.set(property, normalized);
    attributeToConfig.set(normalized.attribute, normalized);
    if (Object.prototype.hasOwnProperty.call(constructor.prototype, property)) {
      return;
    }
    Object.defineProperty(constructor.prototype, property, {
      configurable: true,
      enumerable: true,
      get() {
        return this._propertyValues.get(property);
      },
      set(value) {
        this._setReflectedPropertyValue(property, value, { reflect: true });
      }
    });
  });
  const metadata = {
    propertyToConfig,
    attributeToConfig
  };
  metadataByConstructor.set(constructor, metadata);
  return metadata;
}
var IncElement2 = class extends HostElement5 {
  static reflectedAttributes = {};
  static get observedAttributes() {
    const metadata = buildMetadata(this);
    return [...metadata.attributeToConfig.keys()];
  }
  constructor() {
    super();
    this._propertyValues = /* @__PURE__ */ new Map();
    this._slotListeners = /* @__PURE__ */ new Map();
    this._isReflectingAttribute = false;
    this._isConnected = false;
    const metadata = buildMetadata(this.constructor);
    metadata.propertyToConfig.forEach((config, property) => {
      if (this.hasAttribute(config.attribute)) {
        this._propertyValues.set(property, readReflectedAttribute(this, config));
        return;
      }
      this._propertyValues.set(property, config.defaultValue);
    });
  }
  connectedCallback() {
    this._isConnected = true;
    if (typeof this.onConnected === "function") {
      this.onConnected();
    }
  }
  disconnectedCallback() {
    this._isConnected = false;
    this._slotListeners.forEach((listener, slot) => {
      slot.removeEventListener("slotchange", listener);
    });
    this._slotListeners.clear();
    if (typeof this.onDisconnected === "function") {
      this.onDisconnected();
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    const metadata = buildMetadata(this.constructor);
    const config = metadata.attributeToConfig.get(name);
    if (config) {
      const parsed = parseValueFromAttribute(newValue, config);
      this._setReflectedPropertyValue(config.property, parsed, { reflect: false });
    }
    if (typeof this.onAttributeValueChanged === "function") {
      this.onAttributeValueChanged(name, oldValue, newValue);
    }
  }
  emit(type, detail = {}, options = {}) {
    return dispatchComponentEvent(this, type, detail, options);
  }
  getSlotElements(slotName = "") {
    return getAssignedSlotElements(this, slotName);
  }
  observeSlot(slotName = "", callback = null) {
    const selector = slotName ? `slot[name="${slotName}"]` : "slot:not([name])";
    const slot = this.querySelector(selector);
    if (typeof HTMLSlotElement === "undefined" || !(slot instanceof HTMLSlotElement)) {
      return () => {
      };
    }
    const listener = () => {
      if (typeof callback === "function") {
        callback(this.getSlotElements(slotName));
      }
    };
    slot.addEventListener("slotchange", listener);
    this._slotListeners.set(slot, listener);
    listener();
    return () => {
      slot.removeEventListener("slotchange", listener);
      this._slotListeners.delete(slot);
    };
  }
  reflectAllProperties() {
    const metadata = buildMetadata(this.constructor);
    metadata.propertyToConfig.forEach((config, property) => {
      const value = this._propertyValues.get(property);
      if (!config.reflect) {
        return;
      }
      const serialized = serializeValueForAttribute(value, config);
      reflectAttributeValue(this, config.attribute, serialized);
    });
  }
  _setReflectedPropertyValue(property, value, options = {}) {
    const metadata = buildMetadata(this.constructor);
    const config = metadata.propertyToConfig.get(property);
    if (!config) {
      this._propertyValues.set(property, value);
      return;
    }
    const previousValue = this._propertyValues.get(property);
    if (Object.is(previousValue, value)) {
      return;
    }
    this._propertyValues.set(property, value);
    if (options.reflect !== false && config.reflect && !this._isReflectingAttribute) {
      const serialized = serializeValueForAttribute(value, config);
      this._isReflectingAttribute = true;
      reflectAttributeValue(this, config.attribute, serialized);
      this._isReflectingAttribute = false;
    }
    if (typeof this.onPropertyValueChanged === "function") {
      this.onPropertyValueChanged(property, previousValue, value);
    }
  }
};

// src/web-components/components/collections.js
var FALSE_TOKENS2 = /* @__PURE__ */ new Set(["false", "0", "off", "no"]);
function toBoolean2(value, fallback = false) {
  if (value == null) {
    return fallback;
  }
  return !FALSE_TOKENS2.has(String(value).toLowerCase());
}
var IncListGroupElement = class extends IncElement2 {
  static get observedAttributes() {
    return ["flush", "numbered", "dense", "interactive", "label"];
  }
  connectedCallback() {
    addClass(this, "inc-list-group");
    this.sync();
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.sync();
    }
  }
  sync() {
    addClass(this, "inc-list-group");
    this.setAttribute("part", "list-group");
    removeMatchingClasses(this, (token) => token.startsWith("inc-list-group--"));
    if (toBoolean2(this.getAttribute("flush"))) {
      this.classList.add("inc-list-group--flush");
    }
    if (toBoolean2(this.getAttribute("numbered"))) {
      this.classList.add("inc-list-group--numbered");
    }
    if (toBoolean2(this.getAttribute("dense"))) {
      this.classList.add("inc-list-group--dense");
    }
    if (toBoolean2(this.getAttribute("interactive"))) {
      this.classList.add("inc-list-group--interactive");
    }
    this.setAttribute("role", "list");
    const label = this.getAttribute("label") || this.getAttribute("aria-label") || "";
    if (label) {
      this.setAttribute("aria-label", label);
    } else {
      this.removeAttribute("aria-label");
    }
    Array.from(this.children).forEach((node) => {
      if (!(node instanceof Element)) {
        return;
      }
      if (node.getAttribute("slot") === "item") {
        node.removeAttribute("slot");
      }
      node.classList.add("inc-list-group__item");
      if (toBoolean2(this.getAttribute("interactive")) || node.matches("a[href], button:not([disabled])")) {
        node.classList.add("inc-list-group__item--action");
      }
      if (!node.hasAttribute("role") && !node.matches("a[href], button")) {
        node.setAttribute("role", "listitem");
      }
    });
  }
};
var IncKeyValueGridElement = class extends IncElement2 {
  static get observedAttributes() {
    return ["columns", "dense"];
  }
  connectedCallback() {
    addClass(this, "inc-key-value-grid");
    this.sync();
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.sync();
    }
  }
  sync() {
    addClass(this, "inc-key-value-grid");
    this.setAttribute("part", "grid");
    const columns = Number.parseInt(this.getAttribute("columns") || "", 10);
    if (Number.isFinite(columns) && columns > 0) {
      this.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    } else {
      this.style.removeProperty("grid-template-columns");
    }
    if (toBoolean2(this.getAttribute("dense"))) {
      this.style.rowGap = "0.5rem";
      this.style.columnGap = "1rem";
    } else {
      this.style.removeProperty("row-gap");
      this.style.removeProperty("column-gap");
    }
  }
};
var IncKeyValueElement = class extends IncElement2 {
  static get observedAttributes() {
    return ["label", "value", "meta", "inline", "dense", "card", "variant"];
  }
  connectedCallback() {
    addClass(this, "inc-key-value");
    this.sync();
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.sync();
    }
  }
  sync() {
    addClass(this, "inc-key-value");
    this.setAttribute("part", "key-value");
    removeMatchingClasses(this, (token) => token.startsWith("inc-key-value--"));
    const variant = normalizeToken2(this.getAttribute("variant"));
    const card = toBoolean2(this.getAttribute("card")) || variant === "card";
    if (card) {
      this.classList.add("inc-key-value--card");
    }
    if (toBoolean2(this.getAttribute("inline"))) {
      this.classList.add("inc-key-value--inline");
    }
    if (toBoolean2(this.getAttribute("dense"))) {
      this.classList.add("inc-key-value--dense");
    }
    const definition = ensureNode(this, ".inc-key-value__definition", () => {
      const node = document.createElement("dl");
      node.className = "inc-key-value__definition";
      node.innerHTML = [
        '<dt class="inc-key-value__label" part="label"></dt>',
        '<dd class="inc-key-value__value" part="value"></dd>',
        '<div class="inc-key-value__meta" part="meta"></div>'
      ].join("");
      return node;
    });
    const label = ensureNode(definition, ".inc-key-value__label", () => {
      const node = document.createElement("dt");
      node.className = "inc-key-value__label";
      node.setAttribute("part", "label");
      return node;
    });
    const value = ensureNode(definition, ".inc-key-value__value", () => {
      const node = document.createElement("dd");
      node.className = "inc-key-value__value";
      node.setAttribute("part", "value");
      return node;
    });
    const meta = ensureNode(definition, ".inc-key-value__meta", () => {
      const node = document.createElement("div");
      node.className = "inc-key-value__meta";
      node.setAttribute("part", "meta");
      return node;
    });
    Array.from(this.childNodes).forEach((node) => {
      if (node === definition) {
        return;
      }
      if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute("slot") === "label") {
        node.removeAttribute("slot");
        label.append(node);
        return;
      }
      if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute("slot") === "value") {
        node.removeAttribute("slot");
        value.append(node);
        return;
      }
      if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute("slot") === "meta") {
        node.removeAttribute("slot");
        meta.append(node);
        return;
      }
      if (value.childNodes.length === 0 || node.nodeType === Node.TEXT_NODE) {
        value.append(node);
        return;
      }
      meta.append(node);
    });
    const labelText = this.getAttribute("label") || "";
    const valueText = this.getAttribute("value") || "";
    const metaText = this.getAttribute("meta") || "";
    if (!label.childNodes.length) {
      label.textContent = labelText;
    }
    if (!value.childNodes.length) {
      value.textContent = valueText;
    }
    if (!meta.childNodes.length) {
      meta.textContent = metaText;
    }
  }
};
var collectionDefinitions = [
  ["inc-list-group", IncListGroupElement],
  ["inc-key-value-grid", IncKeyValueGridElement],
  ["inc-key-value", IncKeyValueElement]
];
var collectionComponents = {
  IncListGroupElement,
  IncKeyValueGridElement,
  IncKeyValueElement
};
function defineCollectionComponents(registry = globalThis.customElements) {
  if (!registry || typeof registry.define !== "function" || typeof registry.get !== "function") {
    return [];
  }
  const defined = [];
  for (const [tagName, ctor] of collectionDefinitions) {
    if (!registry.get(tagName)) {
      registry.define(tagName, ctor);
      defined.push(tagName);
    }
  }
  return defined;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    defineCollectionComponents,
    collectionDefinitions,
    collectionComponents,
    IncListGroupElement,
    IncKeyValueGridElement,
    IncKeyValueElement
  };
}
if (typeof globalThis !== "undefined") {
  const namespace2 = globalThis.IncWebComponents || (globalThis.IncWebComponents = {});
  namespace2.collections = Object.assign({}, namespace2.collections, {
    defineCollectionComponents,
    collectionDefinitions,
    components: collectionComponents
  });
}

// src/web-components/components/overlays.js
var INTERNAL_NODE = /* @__PURE__ */ Symbol("inc-internal-overlay-node");
var HostElement6 = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
function toBooleanAttribute2(value, fallback = false) {
  if (value === null || value === void 0) {
    return fallback;
  }
  if (value === "" || value === true) {
    return true;
  }
  if (value === false) {
    return false;
  }
  const normalized = String(value).trim().toLowerCase();
  return !(normalized === "false" || normalized === "0" || normalized === "no" || normalized === "off");
}
function setBooleanAttribute(target, name, value) {
  if (value) {
    target.setAttribute(name, "");
    return;
  }
  target.removeAttribute(name);
}
function emit3(host, name, detail = {}) {
  host.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail
  }));
}
function appendProjectedChildren(host, destinationMap, fallbackDestination, ignoredNodes = /* @__PURE__ */ new Set()) {
  const nodes = Array.from(host.childNodes);
  for (const node of nodes) {
    if (ignoredNodes.has(node)) {
      continue;
    }
    if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) {
      continue;
    }
    if (!(node instanceof HTMLElement)) {
      fallbackDestination.append(node);
      continue;
    }
    const slotName = (node.getAttribute("slot") || "").trim();
    const destination = destinationMap.get(slotName) || fallbackDestination;
    destination.append(node);
  }
}
function getFocusableElements(container) {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");
  return Array.from(container.querySelectorAll(selector)).filter((element) => {
    if (!(element instanceof HTMLElement)) {
      return false;
    }
    if (element.hasAttribute("hidden") || element.getAttribute("aria-hidden") === "true") {
      return false;
    }
    return element.offsetParent !== null || element === document.activeElement;
  });
}
var IncDisclosureElement = class extends HostElement6 {
  static get observedAttributes() {
    return ["open", "summary", "toggleable"];
  }
  constructor() {
    super();
    this._isSyncing = false;
    this._observer = null;
    this._details = null;
    this._summaryTitle = null;
    this._content = null;
    this._onToggle = this._onToggle.bind(this);
  }
  connectedCallback() {
    this._ensureStructure();
    this._syncFromAttributes();
    this._projectChildren();
    this._observer = new MutationObserver((mutations) => {
      if (this._isSyncing) {
        return;
      }
      const shouldProject = mutations.some((mutation) => {
        if (mutation.type !== "childList") {
          return false;
        }
        const changedNodes = [...mutation.addedNodes, ...mutation.removedNodes];
        return changedNodes.some((node) => node !== this._details);
      });
      if (shouldProject) {
        this._projectChildren();
      }
    });
    this._observer.observe(this, { childList: true });
  }
  disconnectedCallback() {
    this._observer?.disconnect();
    this._observer = null;
    this._details?.removeEventListener("toggle", this._onToggle);
  }
  attributeChangedCallback() {
    this._syncFromAttributes();
  }
  open() {
    this.setAttribute("open", "");
  }
  close() {
    this.removeAttribute("open");
  }
  toggle(force) {
    if (typeof force === "boolean") {
      setBooleanAttribute(this, "open", force);
      return;
    }
    setBooleanAttribute(this, "open", !this.hasAttribute("open"));
  }
  _ensureStructure() {
    if (this._details?.isConnected) {
      return;
    }
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const summaryTitle = document.createElement("span");
    const content = document.createElement("div");
    details.className = "inc-disclosure";
    details.setAttribute("part", "surface");
    details[INTERNAL_NODE] = true;
    summary.className = "inc-disclosure__summary";
    summary.setAttribute("part", "summary");
    summaryTitle.className = "inc-disclosure__title";
    summaryTitle.setAttribute("part", "title");
    summary.append(summaryTitle);
    content.className = "inc-disclosure__content";
    content.setAttribute("part", "content");
    details.append(summary, content);
    this.append(details);
    this._details = details;
    this._summaryTitle = summaryTitle;
    this._content = content;
    details.addEventListener("toggle", this._onToggle);
  }
  _syncFromAttributes() {
    if (!this._details) {
      return;
    }
    const summaryText = this.getAttribute("summary");
    if (summaryText) {
      this._summaryTitle.textContent = summaryText;
    } else if (!this._summaryTitle.querySelector(":scope > *")) {
      this._summaryTitle.textContent = "";
    }
    const open = this.hasAttribute("open");
    this._details.open = open;
    const toggleable = toBooleanAttribute2(this.getAttribute("toggleable"), true);
    this._details.dataset.incToggleable = toggleable ? "true" : "false";
  }
  _projectChildren() {
    if (!this._details || !this._summaryTitle || !this._content) {
      return;
    }
    this._isSyncing = true;
    this._summaryTitle.replaceChildren();
    this._content.replaceChildren();
    const destinations = /* @__PURE__ */ new Map([
      ["summary", this._summaryTitle],
      ["content", this._content],
      ["default", this._content]
    ]);
    appendProjectedChildren(this, destinations, this._content, /* @__PURE__ */ new Set([this._details]));
    this._isSyncing = false;
  }
  _onToggle() {
    const open = this._details?.open === true;
    setBooleanAttribute(this, "open", open);
    emit3(this, "toggle", { open });
    emit3(this, open ? "open" : "close", { open });
  }
};
var IncDialogBaseElement = class extends HostElement6 {
  static get observedAttributes() {
    return ["open", "modal", "dismissible", "size", "label", "placement"];
  }
  constructor() {
    super();
    this._dialog = null;
    this._surface = null;
    this._header = null;
    this._title = null;
    this._body = null;
    this._footer = null;
    this._closeButton = null;
    this._observer = null;
    this._syncing = false;
    this._lastTrigger = null;
    this._tagType = "dialog";
    this._onDialogClose = this._onDialogClose.bind(this);
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this._onDialogPointerDown = this._onDialogPointerDown.bind(this);
  }
  connectedCallback() {
    this._ensureStructure();
    this._syncFromAttributes();
    this._projectChildren();
    this._observer = new MutationObserver((mutations) => {
      if (this._syncing) {
        return;
      }
      const shouldProject = mutations.some((mutation) => {
        const changedNodes = [...mutation.addedNodes, ...mutation.removedNodes];
        return changedNodes.some((node) => node !== this._dialog);
      });
      if (shouldProject) {
        this._projectChildren();
      }
    });
    this._observer.observe(this, { childList: true });
  }
  disconnectedCallback() {
    this._observer?.disconnect();
    this._observer = null;
    if (this._dialog) {
      this._dialog.removeEventListener("close", this._onDialogClose);
      this._dialog.removeEventListener("cancel", this._onDialogCancel);
      this._dialog.removeEventListener("click", this._onDialogPointerDown);
    }
  }
  attributeChangedCallback() {
    this._syncFromAttributes();
  }
  get open() {
    return this.hasAttribute("open");
  }
  set open(value) {
    setBooleanAttribute(this, "open", Boolean(value));
  }
  get modal() {
    return toBooleanAttribute2(this.getAttribute("modal"), true);
  }
  set modal(value) {
    setBooleanAttribute(this, "modal", Boolean(value));
  }
  get dismissible() {
    return toBooleanAttribute2(this.getAttribute("dismissible"), true);
  }
  set dismissible(value) {
    setBooleanAttribute(this, "dismissible", Boolean(value));
  }
  show() {
    this._rememberTrigger();
    this.setAttribute("open", "");
    this._openDialog(false);
  }
  showModal() {
    this._rememberTrigger();
    this.setAttribute("open", "");
    this._openDialog(true);
  }
  close(returnValue = "") {
    if (!this._dialog) {
      return;
    }
    if (this._dialog.open && typeof this._dialog.close === "function") {
      this._dialog.close(returnValue);
    } else {
      this.removeAttribute("open");
    }
  }
  dismiss(reason = "dismiss") {
    if (!this.dismissible) {
      return;
    }
    this.close(reason);
    emit3(this, "dismiss", { reason });
  }
  _ensureStructure() {
    if (this._dialog?.isConnected) {
      return;
    }
    const dialog = document.createElement("dialog");
    const surface = document.createElement("div");
    const header = document.createElement("div");
    const title = document.createElement("div");
    const body = document.createElement("div");
    const footer = document.createElement("div");
    const closeButton = document.createElement("button");
    dialog.className = "inc-native-dialog";
    dialog.setAttribute("part", "backdrop");
    dialog[INTERNAL_NODE] = true;
    surface.className = "inc-native-dialog__surface";
    surface.setAttribute("part", "surface");
    header.className = "inc-native-dialog__header";
    header.setAttribute("part", "header");
    title.className = "inc-native-dialog__title";
    title.setAttribute("part", "title");
    closeButton.type = "button";
    closeButton.className = "inc-native-dialog__close";
    closeButton.setAttribute("part", "close");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.textContent = "x";
    closeButton.addEventListener("click", () => this.dismiss("close-button"));
    header.append(title, closeButton);
    body.className = "inc-native-dialog__body";
    body.setAttribute("part", "body");
    footer.className = "inc-native-dialog__footer";
    footer.setAttribute("part", "footer");
    surface.append(header, body, footer);
    dialog.append(surface);
    this.append(dialog);
    this._dialog = dialog;
    this._surface = surface;
    this._header = header;
    this._title = title;
    this._body = body;
    this._footer = footer;
    this._closeButton = closeButton;
    dialog.addEventListener("close", this._onDialogClose);
    dialog.addEventListener("cancel", this._onDialogCancel);
    dialog.addEventListener("click", this._onDialogPointerDown);
  }
  _projectChildren() {
    if (!this._title || !this._body || !this._footer || !this._header) {
      return;
    }
    this._syncing = true;
    this._title.replaceChildren();
    this._body.replaceChildren();
    this._footer.replaceChildren();
    const destinations = /* @__PURE__ */ new Map([
      ["title", this._title],
      ["header", this._header],
      ["body", this._body],
      ["footer", this._footer],
      ["default", this._body]
    ]);
    appendProjectedChildren(this, destinations, this._body, /* @__PURE__ */ new Set([this._dialog]));
    if (!this._header.contains(this._closeButton)) {
      this._header.append(this._closeButton);
    }
    if (!this._title.textContent?.trim()) {
      const label = this.getAttribute("label");
      if (label) {
        this._title.textContent = label;
      }
    }
    this._syncing = false;
  }
  _syncFromAttributes() {
    if (!this._dialog) {
      return;
    }
    const open = this.hasAttribute("open");
    const dismissible = this.dismissible;
    this._dialog.dataset.incDismissible = dismissible ? "true" : "false";
    this._closeButton.hidden = !dismissible;
    const size = this.getAttribute("size");
    if (size) {
      this._dialog.dataset.incSize = size;
    } else {
      delete this._dialog.dataset.incSize;
    }
    const label = this.getAttribute("label");
    if (label) {
      this._dialog.setAttribute("aria-label", label);
    } else {
      this._dialog.removeAttribute("aria-label");
    }
    const placement = this.getAttribute("placement");
    if (placement) {
      this._dialog.dataset.incPlacement = placement;
    } else {
      delete this._dialog.dataset.incPlacement;
    }
    if (this._tagType === "drawer") {
      this._dialog.classList.add("inc-native-dialog--drawer");
    } else {
      this._dialog.classList.remove("inc-native-dialog--drawer");
    }
    if (open && !this._dialog.open) {
      this._openDialog(this.modal);
    }
    if (!open && this._dialog.open) {
      this._dialog.close();
    }
  }
  _openDialog(asModal) {
    if (!this._dialog || this._dialog.open) {
      return;
    }
    try {
      if (asModal && typeof this._dialog.showModal === "function") {
        this._dialog.showModal();
      } else if (typeof this._dialog.show === "function") {
        this._dialog.show();
      } else {
        this._dialog.setAttribute("open", "");
      }
    } catch {
      this._dialog.setAttribute("open", "");
    }
    const focusInitial = () => this._focusInitial();
    if (typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(focusInitial);
    } else {
      window.setTimeout(focusInitial, 0);
    }
    emit3(this, "open", { modal: asModal });
  }
  _focusInitial() {
    if (!this._dialog) {
      return;
    }
    const explicit = this._dialog.querySelector("[data-inc-initial-focus]");
    if (explicit instanceof HTMLElement) {
      explicit.focus({ preventScroll: true });
      return;
    }
    const focusables = getFocusableElements(this._dialog);
    if (focusables[0]) {
      focusables[0].focus({ preventScroll: true });
    }
  }
  _rememberTrigger() {
    const active = document.activeElement;
    this._lastTrigger = active instanceof HTMLElement ? active : null;
  }
  _restoreFocus() {
    if (!this._lastTrigger || !this._lastTrigger.isConnected) {
      return;
    }
    this._lastTrigger.focus({ preventScroll: true });
  }
  _onDialogPointerDown(event) {
    if (!this.dismissible || !this._dialog) {
      return;
    }
    if (event.target === this._dialog) {
      this.dismiss("backdrop");
    }
  }
  _onDialogCancel(event) {
    if (!this.dismissible) {
      event.preventDefault();
      return;
    }
    emit3(this, "cancel", { reason: "escape" });
  }
  _onDialogClose() {
    setBooleanAttribute(this, "open", this._dialog?.open === true);
    emit3(this, "close", { returnValue: this._dialog?.returnValue || "" });
    this._restoreFocus();
  }
};
var IncDialogElement = class extends IncDialogBaseElement {
  constructor() {
    super();
    this._tagType = "dialog";
  }
};
var IncDrawerElement = class extends IncDialogBaseElement {
  constructor() {
    super();
    this._tagType = "drawer";
  }
  show() {
    this._rememberTrigger();
    this.setAttribute("open", "");
    this._openDialog(this.modal);
  }
};
function defineOverlayComponents(registry = globalThis.customElements) {
  if (!registry) {
    return;
  }
  if (!registry.get("inc-disclosure")) {
    registry.define("inc-disclosure", IncDisclosureElement);
  }
  if (!registry.get("inc-dialog")) {
    registry.define("inc-dialog", IncDialogElement);
  }
  if (!registry.get("inc-drawer")) {
    registry.define("inc-drawer", IncDrawerElement);
  }
}
var overlayComponentsApi = {
  defineOverlayComponents,
  IncDisclosureElement,
  IncDialogElement,
  IncDrawerElement
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = overlayComponentsApi;
}
if (typeof globalThis !== "undefined") {
  globalThis.IncWebComponents = globalThis.IncWebComponents || {};
  globalThis.IncWebComponents.overlays = overlayComponentsApi;
}

// src/web-components/index.js
var namespace = globalThis.IncWebComponents || (globalThis.IncWebComponents = {});
installRegistryNamespace();
function addEntry(entryMap, tagName, constructor) {
  if (typeof tagName !== "string" || !tagName || typeof constructor !== "function") {
    return;
  }
  if (!entryMap.has(tagName)) {
    entryMap.set(tagName, constructor);
  }
}
function addEntries(entryMap, entries) {
  if (!Array.isArray(entries)) {
    return;
  }
  entries.forEach(([tagName, constructor]) => {
    addEntry(entryMap, tagName, constructor);
  });
}
function getComponentEntries() {
  const entryMap = /* @__PURE__ */ new Map();
  addEntries(entryMap, namespace.layout?.layoutComponents);
  addEntry(entryMap, "inc-navbar", namespace.navigation?.IncNavbarElement);
  addEntry(entryMap, "inc-tabs", namespace.navigation?.IncTabsElement);
  addEntry(entryMap, "inc-user-menu", namespace.navigation?.IncUserMenuElement);
  addEntry(entryMap, "inc-field", namespace.forms?.components?.IncFieldElement);
  addEntry(entryMap, "inc-input-group", namespace.forms?.components?.IncInputGroupElement);
  addEntry(entryMap, "inc-choice-group", namespace.forms?.components?.IncChoiceGroupElement);
  addEntry(entryMap, "inc-readonly-field", namespace.forms?.components?.IncReadonlyFieldElement);
  addEntry(entryMap, "inc-validation-summary", namespace.forms?.components?.IncValidationSummaryElement);
  addEntries(entryMap, namespace.feedback?.feedbackDefinitions);
  addEntries(entryMap, namespace.actions?.actionDefinitions);
  addEntries(entryMap, namespace.collections?.collectionDefinitions);
  addEntry(entryMap, "inc-disclosure", namespace.overlays?.IncDisclosureElement);
  addEntry(entryMap, "inc-dialog", namespace.overlays?.IncDialogElement);
  addEntry(entryMap, "inc-drawer", namespace.overlays?.IncDrawerElement);
  return [...entryMap.entries()];
}
function syncNamespace() {
  namespace.components = new Map(getComponentEntries());
  return namespace.components;
}
function defineAll2(options = {}) {
  const registry = options.registry || globalThis.customElements;
  if (!registry || typeof registry.define !== "function" || typeof registry.get !== "function") {
    return [];
  }
  const entries = getComponentEntries();
  const results = entries.map(([name, ctor]) => defineCustomElement(name, ctor, registry));
  syncNamespace();
  return results;
}
function registerIncWebComponents(options = {}) {
  return defineAll2(options);
}
namespace.defineAll = defineAll2;
namespace.registerIncWebComponents = registerIncWebComponents;
syncNamespace();
defineAll2();
export {
  defineAll2 as defineAll,
  registerIncWebComponents
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
