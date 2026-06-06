(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/lucide/dist/esm/defaultAttributes.mjs
  var defaultAttributes;
  var init_defaultAttributes = __esm({
    "node_modules/lucide/dist/esm/defaultAttributes.mjs"() {
      defaultAttributes = {
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
    }
  });

  // node_modules/lucide/dist/esm/createElement.mjs
  var createSVGElement, createElement;
  var init_createElement = __esm({
    "node_modules/lucide/dist/esm/createElement.mjs"() {
      init_defaultAttributes();
      createSVGElement = ([tag, attrs, children]) => {
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
      createElement = (iconNode, customAttrs = {}) => {
        const tag = "svg";
        const attrs = {
          ...defaultAttributes,
          ...customAttrs
        };
        return createSVGElement([tag, attrs, iconNode]);
      };
    }
  });

  // node_modules/lucide/dist/esm/icons/circle-check.mjs
  var CircleCheck;
  var init_circle_check = __esm({
    "node_modules/lucide/dist/esm/icons/circle-check.mjs"() {
      CircleCheck = [
        ["circle", { cx: "12", cy: "12", r: "10" }],
        ["path", { d: "m9 12 2 2 4-4" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/circle-question-mark.mjs
  var CircleQuestionMark;
  var init_circle_question_mark = __esm({
    "node_modules/lucide/dist/esm/icons/circle-question-mark.mjs"() {
      CircleQuestionMark = [
        ["circle", { cx: "12", cy: "12", r: "10" }],
        ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
        ["path", { d: "M12 17h.01" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/circle-x.mjs
  var CircleX;
  var init_circle_x = __esm({
    "node_modules/lucide/dist/esm/icons/circle-x.mjs"() {
      CircleX = [
        ["circle", { cx: "12", cy: "12", r: "10" }],
        ["path", { d: "m15 9-6 6" }],
        ["path", { d: "m9 9 6 6" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/download.mjs
  var Download;
  var init_download = __esm({
    "node_modules/lucide/dist/esm/icons/download.mjs"() {
      Download = [
        ["path", { d: "M12 15V3" }],
        ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
        ["path", { d: "m7 10 5 5 5-5" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/external-link.mjs
  var ExternalLink;
  var init_external_link = __esm({
    "node_modules/lucide/dist/esm/icons/external-link.mjs"() {
      ExternalLink = [
        ["path", { d: "M15 3h6v6" }],
        ["path", { d: "M10 14 21 3" }],
        ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/file-text.mjs
  var FileText;
  var init_file_text = __esm({
    "node_modules/lucide/dist/esm/icons/file-text.mjs"() {
      FileText = [
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
    }
  });

  // node_modules/lucide/dist/esm/icons/folder-plus.mjs
  var FolderPlus;
  var init_folder_plus = __esm({
    "node_modules/lucide/dist/esm/icons/folder-plus.mjs"() {
      FolderPlus = [
        ["path", { d: "M12 10v6" }],
        ["path", { d: "M9 13h6" }],
        [
          "path",
          {
            d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
          }
        ]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/info.mjs
  var Info;
  var init_info = __esm({
    "node_modules/lucide/dist/esm/icons/info.mjs"() {
      Info = [
        ["circle", { cx: "12", cy: "12", r: "10" }],
        ["path", { d: "M12 16v-4" }],
        ["path", { d: "M12 8h.01" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/lock.mjs
  var Lock;
  var init_lock = __esm({
    "node_modules/lucide/dist/esm/icons/lock.mjs"() {
      Lock = [
        ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }],
        ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/pause.mjs
  var Pause;
  var init_pause = __esm({
    "node_modules/lucide/dist/esm/icons/pause.mjs"() {
      Pause = [
        ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1" }],
        ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/play.mjs
  var Play;
  var init_play = __esm({
    "node_modules/lucide/dist/esm/icons/play.mjs"() {
      Play = [
        [
          "path",
          { d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" }
        ]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/refresh-cw.mjs
  var RefreshCw;
  var init_refresh_cw = __esm({
    "node_modules/lucide/dist/esm/icons/refresh-cw.mjs"() {
      RefreshCw = [
        ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }],
        ["path", { d: "M21 3v5h-5" }],
        ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }],
        ["path", { d: "M8 16H3v5" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/search-x.mjs
  var SearchX;
  var init_search_x = __esm({
    "node_modules/lucide/dist/esm/icons/search-x.mjs"() {
      SearchX = [
        ["path", { d: "m13.5 8.5-5 5" }],
        ["path", { d: "m8.5 8.5 5 5" }],
        ["circle", { cx: "11", cy: "11", r: "8" }],
        ["path", { d: "m21 21-4.3-4.3" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/settings.mjs
  var Settings;
  var init_settings = __esm({
    "node_modules/lucide/dist/esm/icons/settings.mjs"() {
      Settings = [
        [
          "path",
          {
            d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
          }
        ],
        ["circle", { cx: "12", cy: "12", r: "3" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/shield-check.mjs
  var ShieldCheck;
  var init_shield_check = __esm({
    "node_modules/lucide/dist/esm/icons/shield-check.mjs"() {
      ShieldCheck = [
        [
          "path",
          {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
          }
        ],
        ["path", { d: "m9 12 2 2 4-4" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/triangle-alert.mjs
  var TriangleAlert;
  var init_triangle_alert = __esm({
    "node_modules/lucide/dist/esm/icons/triangle-alert.mjs"() {
      TriangleAlert = [
        ["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }],
        ["path", { d: "M12 9v4" }],
        ["path", { d: "M12 17h.01" }]
      ];
    }
  });

  // node_modules/lucide/dist/esm/icons/upload.mjs
  var Upload;
  var init_upload = __esm({
    "node_modules/lucide/dist/esm/icons/upload.mjs"() {
      Upload = [
        ["path", { d: "M12 3v12" }],
        ["path", { d: "m17 8-5-5-5 5" }],
        ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }]
      ];
    }
  });

  // src/icons/index.js
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
  var ICON_NODES, ICON_NAMES, DEFAULT_SIZE;
  var init_icons = __esm({
    "src/icons/index.js"() {
      init_createElement();
      init_circle_check();
      init_circle_question_mark();
      init_circle_x();
      init_download();
      init_external_link();
      init_file_text();
      init_folder_plus();
      init_info();
      init_lock();
      init_pause();
      init_play();
      init_refresh_cw();
      init_search_x();
      init_settings();
      init_shield_check();
      init_triangle_alert();
      init_upload();
      ICON_NODES = Object.freeze({
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
      ICON_NAMES = Object.freeze(Object.keys(ICON_NODES));
      DEFAULT_SIZE = 16;
      getNamespace();
    }
  });

  // src/inc-design-language.js
  var require_inc_design_language = __commonJS({
    "src/inc-design-language.js"() {
      init_icons();
      (function() {
        "use strict";
        const selectors = {
          menuToggle: '[data-inc-toggle="menu"]',
          menu: ".inc-dropdown__menu",
          collapseToggle: '[data-inc-toggle="collapse"]',
          tabToggle: '[data-inc-toggle="tab"]',
          themeMode: "[data-inc-theme-mode]:not(html)",
          themeToggle: "[data-inc-theme-toggle]",
          themeSelect: "[data-inc-theme-select]",
          themeLabel: "[data-inc-theme-label]",
          themeSwitcher: "[data-inc-theme-switcher], details.inc-theme-switcher",
          nativeDialogOpen: "[data-inc-native-dialog-open]",
          icon: "[data-inc-icon]",
          autoRefresh: "[data-inc-auto-refresh]",
          autoRefreshToggle: '[data-inc-action="auto-refresh-toggle"]',
          fileExample: "[data-inc-file-example]",
          fileDropzone: "[data-inc-file-dropzone]",
          fileInput: "[data-inc-file-input]",
          fileBrowse: "[data-inc-file-browse]",
          fileList: "[data-inc-file-list]",
          fileRemove: '[data-inc-action="file-remove"]',
          modalToggle: '[data-inc-toggle="modal"]',
          modalDismiss: '[data-inc-dismiss="modal"]',
          offcanvasToggle: '[data-inc-toggle="offcanvas"]',
          offcanvasDismiss: '[data-inc-dismiss="offcanvas"]',
          userMenu: ".inc-user-menu",
          tabPane: ".inc-tab-pane",
          modal: ".inc-modal",
          offcanvas: ".inc-offcanvas"
        };
        const focusableSelector = [
          "a[href]",
          "button:not([disabled])",
          'input:not([disabled]):not([type="hidden"])',
          "select:not([disabled])",
          "textarea:not([disabled])",
          '[tabindex]:not([tabindex="-1"])'
        ].join(", ");
        const autoRefreshControllers = [];
        let autoRefreshReloadScheduled = false;
        const themeModes = ["light", "dark", "system"];
        const themeDescriptions = {
          light: "Use the brighter application palette.",
          dark: "Use the darker application palette.",
          system: "Match the device preference automatically."
        };
        const themeStorageKey = "inc-theme-mode";
        const themeState = {
          mode: "system",
          resolved: "light"
        };
        let themeMediaQuery = null;
        let themeMediaListenerBound = false;
        let themeStorageListenerBound = false;
        let themeInitialized = false;
        function isThemeMode(value) {
          return themeModes.includes(value);
        }
        function getThemeLabel(mode) {
          if (!isThemeMode(mode)) {
            return "System";
          }
          return mode.charAt(0).toUpperCase() + mode.slice(1);
        }
        function getThemeStatusLabel(mode = themeState.mode, resolved = themeState.resolved) {
          return mode === "system" ? `${getThemeLabel(mode)} (${getThemeLabel(resolved)})` : getThemeLabel(mode);
        }
        function getStoredThemeMode() {
          try {
            const stored = window.localStorage.getItem(themeStorageKey);
            return isThemeMode(stored) ? stored : null;
          } catch {
            return null;
          }
        }
        function getConfiguredThemeMode() {
          const root = document.documentElement;
          return root.getAttribute("data-inc-theme-mode") || root.dataset.incThemeMode || root.getAttribute("data-bs-theme") || "system";
        }
        function persistThemeMode(mode) {
          try {
            if (mode === "system") {
              window.localStorage.removeItem(themeStorageKey);
              return;
            }
            window.localStorage.setItem(themeStorageKey, mode);
          } catch {
          }
        }
        function getSystemTheme() {
          if (!window.matchMedia) {
            return "light";
          }
          return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        function resolveThemeMode(mode) {
          return mode === "system" ? getSystemTheme() : mode;
        }
        function syncThemeControls(mode, resolved) {
          document.querySelectorAll(selectors.themeMode).forEach((control) => {
            if (!(control instanceof HTMLElement)) {
              return;
            }
            const controlMode = control.getAttribute("data-inc-theme-mode");
            const isSelected = controlMode === mode;
            const role = control.getAttribute("role");
            control.classList.toggle("active", isSelected);
            control.classList.toggle("is-selected", isSelected);
            if (role === "menuitemradio" || role === "radio") {
              control.setAttribute("aria-checked", isSelected ? "true" : "false");
            } else if (control.tagName === "BUTTON" || control.tagName === "A") {
              control.setAttribute("aria-pressed", isSelected ? "true" : "false");
            }
            if (control.tagName === "INPUT" && (control.type === "radio" || control.type === "checkbox")) {
              control.checked = isSelected;
            }
            if (control.tagName === "OPTION") {
              control.selected = isSelected;
            }
          });
          document.querySelectorAll(selectors.themeSelect).forEach((control) => {
            if (control instanceof HTMLSelectElement) {
              control.value = mode;
            }
          });
          document.querySelectorAll(selectors.themeLabel).forEach((label) => {
            if (!(label instanceof HTMLElement)) {
              return;
            }
            const labelType = label.getAttribute("data-inc-theme-label") || "status";
            if (labelType === "resolved") {
              label.textContent = getThemeLabel(resolved);
              return;
            }
            if (labelType === "mode") {
              label.textContent = getThemeLabel(mode);
              return;
            }
            label.textContent = getThemeStatusLabel(mode, resolved);
          });
          document.querySelectorAll(selectors.themeSwitcher).forEach((switcher) => {
            if (!(switcher instanceof HTMLElement)) {
              return;
            }
            switcher.dataset.incThemeModeState = mode;
            switcher.dataset.incThemeResolved = resolved;
          });
        }
        function publishThemeChange() {
          document.documentElement.dispatchEvent(new CustomEvent("inc-theme-change", {
            bubbles: true,
            composed: true,
            detail: {
              mode: themeState.mode,
              resolved: themeState.resolved
            }
          }));
        }
        function applyThemeMode(mode, options = {}) {
          const nextMode = isThemeMode(mode) ? mode : "system";
          const resolved = resolveThemeMode(nextMode);
          const root = document.documentElement;
          themeState.mode = nextMode;
          themeState.resolved = resolved;
          root.setAttribute("data-inc-theme-mode", nextMode);
          root.setAttribute("data-bs-theme", resolved);
          root.style.colorScheme = resolved;
          root.dataset.incThemeModeState = nextMode;
          root.dataset.incThemeResolved = resolved;
          if (options.persist !== false) {
            persistThemeMode(nextMode);
          }
          if (options.syncControls !== false) {
            syncThemeControls(nextMode, resolved);
          }
          if (options.dispatch !== false) {
            publishThemeChange();
          }
          return themeState;
        }
        function cycleThemeMode() {
          const currentIndex = themeModes.indexOf(themeState.mode);
          const nextMode = themeModes[(currentIndex + 1) % themeModes.length];
          return applyThemeMode(nextMode);
        }
        function createThemeSwitcherOption(mode) {
          const button = document.createElement("button");
          const body = document.createElement("span");
          const label = document.createElement("span");
          const detail = document.createElement("span");
          button.type = "button";
          button.className = "inc-theme-switcher__option";
          button.setAttribute("data-inc-theme-mode", mode);
          button.setAttribute("role", "menuitemradio");
          body.className = "inc-theme-switcher__option-body";
          label.className = "inc-theme-switcher__option-label";
          label.textContent = getThemeLabel(mode);
          detail.className = "inc-theme-switcher__option-detail";
          detail.textContent = themeDescriptions[mode];
          body.append(label, detail);
          button.append(body);
          return button;
        }
        function createThemeSwitcher(options = {}) {
          const switcher = document.createElement("details");
          const summary = document.createElement("summary");
          const meta = document.createElement("span");
          const label = document.createElement("span");
          const status = document.createElement("span");
          const panel = document.createElement("div");
          const header = document.createElement("div");
          switcher.className = "inc-native-menu inc-theme-switcher";
          if (options.variant === "navbar") {
            switcher.classList.add("inc-native-menu--navbar");
          }
          if (options.block) {
            switcher.classList.add("inc-native-menu--block");
          }
          summary.className = "inc-native-menu__summary inc-theme-switcher__summary";
          meta.className = "inc-theme-switcher__meta";
          label.className = "inc-theme-switcher__label";
          label.textContent = options.label || "Theme";
          status.className = "inc-theme-switcher__status";
          status.setAttribute("data-inc-theme-label", "status");
          status.textContent = getThemeStatusLabel();
          meta.append(label, status);
          summary.append(meta);
          panel.className = "inc-native-menu__panel inc-theme-switcher__panel";
          panel.setAttribute("role", "menu");
          panel.setAttribute("aria-label", options.menuLabel || "Theme");
          header.className = "inc-native-menu__header";
          header.textContent = options.heading || "Choose appearance";
          panel.append(header);
          themeModes.forEach((mode) => {
            panel.append(createThemeSwitcherOption(mode));
          });
          switcher.append(summary, panel);
          syncThemeControls(themeState.mode, themeState.resolved);
          return switcher;
        }
        function mountThemeSwitcher(target, options = {}) {
          let host = target;
          if (typeof target === "string") {
            host = document.querySelector(target);
          }
          if (!(host instanceof HTMLElement)) {
            return null;
          }
          const switcher = createThemeSwitcher(options);
          host.replaceChildren(switcher);
          syncThemeControls(themeState.mode, themeState.resolved);
          return switcher;
        }
        function getThemeSwitcherOptions(control) {
          const panel = control.closest(".inc-theme-switcher__panel");
          if (!panel) {
            return [];
          }
          return Array.from(panel.querySelectorAll(selectors.themeMode)).filter((option) => option.closest(".inc-theme-switcher__panel") === panel);
        }
        function focusThemeSwitcherOption(control, direction) {
          const options = getThemeSwitcherOptions(control);
          if (!options.length) {
            return;
          }
          const activeIndex = options.findIndex((option) => option === control);
          if (direction === "first") {
            options[0]?.focus();
            return;
          }
          if (direction === "last") {
            options[options.length - 1]?.focus();
            return;
          }
          const delta = direction === "next" ? 1 : -1;
          const startIndex = activeIndex === -1 ? 0 : activeIndex;
          const nextIndex = (startIndex + delta + options.length) % options.length;
          options[nextIndex]?.focus();
        }
        function initializeThemeSwitchers() {
          document.querySelectorAll(selectors.themeSwitcher).forEach((switcher) => {
            if (!(switcher instanceof HTMLElement) || switcher.dataset.incThemeSwitcherInitialized === "true") {
              return;
            }
            switcher.dataset.incThemeSwitcherInitialized = "true";
            if (switcher.matches("details.inc-theme-switcher")) {
              syncThemeControls(themeState.mode, themeState.resolved);
              return;
            }
            if (switcher.querySelector(selectors.themeMode)) {
              syncThemeControls(themeState.mode, themeState.resolved);
              return;
            }
            mountThemeSwitcher(switcher, {
              variant: switcher.getAttribute("data-inc-theme-switcher-variant") || (switcher.closest(".inc-navbar, .inc-navbar__utilities") ? "navbar" : void 0),
              block: switcher.hasAttribute("data-inc-theme-switcher-block"),
              label: switcher.getAttribute("data-inc-theme-switcher-label") || "Theme",
              menuLabel: switcher.getAttribute("data-inc-theme-switcher-menu-label") || "Theme",
              heading: switcher.getAttribute("data-inc-theme-switcher-heading") || "Choose appearance"
            });
          });
        }
        function bindThemeMediaListener() {
          if (themeMediaListenerBound || !window.matchMedia) {
            return;
          }
          themeMediaListenerBound = true;
          themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
          const handleThemePreferenceChange = () => {
            if (themeState.mode === "system") {
              applyThemeMode("system", { persist: false });
            }
          };
          if (typeof themeMediaQuery.addEventListener === "function") {
            themeMediaQuery.addEventListener("change", handleThemePreferenceChange);
          } else if (typeof themeMediaQuery.addListener === "function") {
            themeMediaQuery.addListener(handleThemePreferenceChange);
          }
        }
        function bindThemeStorageListener() {
          if (themeStorageListenerBound) {
            return;
          }
          themeStorageListenerBound = true;
          window.addEventListener("storage", (event) => {
            if (event.key !== themeStorageKey) {
              return;
            }
            applyThemeMode(getStoredThemeMode() || getConfiguredThemeMode(), {
              persist: false
            });
          });
        }
        function initializeTheme() {
          if (themeInitialized) {
            syncThemeControls(themeState.mode, themeState.resolved);
            initializeThemeSwitchers();
            return themeState;
          }
          themeInitialized = true;
          applyThemeMode(getStoredThemeMode() || getConfiguredThemeMode(), {
            persist: false
          });
          bindThemeMediaListener();
          bindThemeStorageListener();
          initializeThemeSwitchers();
          syncThemeControls(themeState.mode, themeState.resolved);
          return themeState;
        }
        applyThemeMode(getStoredThemeMode() || getConfiguredThemeMode(), {
          dispatch: false,
          persist: false,
          syncControls: false
        });
        function getTarget(trigger) {
          const rawTarget = trigger.getAttribute("data-inc-target") || trigger.getAttribute("href") || (trigger.getAttribute("aria-controls") ? `#${trigger.getAttribute("aria-controls")}` : "");
          if (!rawTarget || rawTarget === "#") {
            return null;
          }
          try {
            return document.querySelector(rawTarget);
          } catch {
            return null;
          }
        }
        function getFocusableElements(container) {
          if (!container) {
            return [];
          }
          return Array.from(container.querySelectorAll(focusableSelector)).filter((element) => {
            if (!(element instanceof HTMLElement)) {
              return false;
            }
            if (element.hidden || element.getAttribute("aria-hidden") === "true") {
              return false;
            }
            return element.tabIndex >= 0;
          });
        }
        function focusWithin(container, direction = "first") {
          const explicitFocus = container.querySelector("[data-inc-initial-focus]");
          if (explicitFocus instanceof HTMLElement) {
            explicitFocus.focus();
            return true;
          }
          const focusable = getFocusableElements(container);
          if (!focusable.length) {
            if (container instanceof HTMLElement) {
              if (!container.hasAttribute("tabindex")) {
                container.tabIndex = -1;
              }
              container.focus();
              return true;
            }
            return false;
          }
          if (direction === "last") {
            focusable[focusable.length - 1].focus();
            return true;
          }
          focusable[0].focus();
          return true;
        }
        function rememberTrigger(target, trigger) {
          if (target instanceof HTMLElement && trigger instanceof HTMLElement) {
            target._incReturnFocus = trigger;
          }
        }
        function restoreTriggerFocus(target) {
          if (!(target instanceof HTMLElement)) {
            return;
          }
          const trigger = target._incReturnFocus;
          if (trigger instanceof HTMLElement && document.contains(trigger)) {
            trigger.focus();
          }
          delete target._incReturnFocus;
        }
        function closeMenu(toggle, options = {}) {
          const menu = getTarget(toggle);
          if (!menu) {
            return;
          }
          menu.classList.remove("show");
          toggle.setAttribute("aria-expanded", "false");
          if (options.restoreFocus) {
            toggle.focus();
          }
        }
        function openMenu(toggle, options = {}) {
          const menu = getTarget(toggle);
          if (!menu) {
            return;
          }
          menu.classList.add("show");
          toggle.setAttribute("aria-expanded", "true");
          if (options.focus === "first") {
            const items = getMenuItems(menu);
            items[0]?.focus();
          }
          if (options.focus === "last") {
            const items = getMenuItems(menu);
            items[items.length - 1]?.focus();
          }
        }
        function closeAllMenus(exceptToggle) {
          document.querySelectorAll(selectors.menuToggle).forEach((toggle) => {
            if (exceptToggle && toggle === exceptToggle) {
              return;
            }
            closeMenu(toggle);
          });
        }
        function getMenuItems(menu) {
          return getFocusableElements(menu).filter((item) => item.closest(selectors.menu) === menu);
        }
        function focusMenuItem(menu, direction) {
          const items = getMenuItems(menu);
          if (!items.length) {
            return;
          }
          const activeIndex = items.findIndex((item) => item === document.activeElement);
          if (direction === "first") {
            items[0].focus();
            return;
          }
          if (direction === "last") {
            items[items.length - 1].focus();
            return;
          }
          const delta = direction === "next" ? 1 : -1;
          const startIndex = activeIndex === -1 ? delta > 0 ? 0 : items.length - 1 : activeIndex;
          const nextIndex = (startIndex + delta + items.length) % items.length;
          items[nextIndex].focus();
        }
        function setCollapseState(trigger, target, expanded) {
          trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
          trigger.classList.toggle("collapsed", !expanded);
          target.classList.toggle("show", expanded);
        }
        function toggleCollapse(trigger) {
          const target = getTarget(trigger);
          if (!target) {
            return;
          }
          const shouldExpand = !target.classList.contains("show");
          const accordionRoot = trigger.closest("[data-inc-accordion]");
          if (accordionRoot && shouldExpand) {
            accordionRoot.querySelectorAll(selectors.collapseToggle).forEach((otherTrigger) => {
              if (otherTrigger === trigger) {
                return;
              }
              const otherTarget = getTarget(otherTrigger);
              if (otherTarget) {
                setCollapseState(otherTrigger, otherTarget, false);
              }
            });
          }
          setCollapseState(trigger, target, shouldExpand);
        }
        function getTabList(trigger) {
          return trigger.closest('[role="tablist"], .inc-tabs-nav');
        }
        function getTabsForList(listRoot) {
          return Array.from(listRoot.querySelectorAll(selectors.tabToggle));
        }
        function activateTab(trigger, options = {}) {
          const listRoot = getTabList(trigger);
          if (!listRoot) {
            return;
          }
          const tabs = getTabsForList(listRoot);
          const targetPane = getTarget(trigger);
          if (!targetPane) {
            return;
          }
          tabs.forEach((tab) => {
            const pane = getTarget(tab);
            const isActive = tab === trigger;
            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-selected", isActive ? "true" : "false");
            tab.tabIndex = isActive ? 0 : -1;
            if (pane) {
              pane.classList.toggle("active", isActive);
              pane.classList.toggle("show", isActive);
              pane.hidden = !isActive;
            }
          });
          if (options.focus && trigger instanceof HTMLElement) {
            trigger.focus();
          }
        }
        function focusTab(trigger, direction) {
          const listRoot = getTabList(trigger);
          if (!listRoot) {
            return;
          }
          const tabs = getTabsForList(listRoot);
          const activeIndex = tabs.findIndex((tab) => tab === trigger);
          if (activeIndex === -1 || !tabs.length) {
            return;
          }
          let nextTab = trigger;
          if (direction === "first") {
            nextTab = tabs[0];
          } else if (direction === "last") {
            nextTab = tabs[tabs.length - 1];
          } else {
            const delta = direction === "next" ? 1 : -1;
            const nextIndex = (activeIndex + delta + tabs.length) % tabs.length;
            nextTab = tabs[nextIndex];
          }
          activateTab(nextTab, { focus: true });
        }
        function syncOverlayBodyState() {
          const hasOpenModal = document.querySelector(`${selectors.modal}.is-open`);
          const hasOpenOffcanvas = document.querySelector(`${selectors.offcanvas}.is-open`);
          document.body.classList.toggle("inc-modal-open", Boolean(hasOpenModal));
          document.body.classList.toggle("inc-offcanvas-open", Boolean(hasOpenOffcanvas));
        }
        function openModal(trigger) {
          const modal = getTarget(trigger);
          if (!modal) {
            return;
          }
          rememberTrigger(modal, trigger);
          modal.hidden = false;
          modal.classList.add("is-open");
          modal.setAttribute("aria-hidden", "false");
          syncOverlayBodyState();
          focusWithin(modal);
        }
        function closeModal(modal, options = {}) {
          if (!modal) {
            return;
          }
          modal.classList.remove("is-open");
          modal.setAttribute("aria-hidden", "true");
          modal.hidden = true;
          syncOverlayBodyState();
          if (options.restoreFocus !== false) {
            restoreTriggerFocus(modal);
          }
        }
        function getOffcanvasBackdrops(target) {
          if (!target.id) {
            return [];
          }
          return Array.from(document.querySelectorAll(`[data-inc-backdrop-for="${target.id}"]`));
        }
        function openOffcanvas(trigger) {
          const panel = getTarget(trigger);
          if (!panel) {
            return;
          }
          rememberTrigger(panel, trigger);
          panel.classList.add("is-open");
          panel.setAttribute("aria-hidden", "false");
          getOffcanvasBackdrops(panel).forEach((backdrop) => {
            backdrop.classList.add("is-open");
            backdrop.hidden = false;
          });
          syncOverlayBodyState();
          focusWithin(panel);
        }
        function openNativeDialog(trigger) {
          const dialogId = trigger.getAttribute("data-inc-native-dialog-open");
          const dialog = dialogId ? document.getElementById(dialogId) : null;
          if (!(dialog instanceof HTMLElement) || dialog.tagName !== "DIALOG" || dialog.open) {
            return;
          }
          if (typeof dialog.showModal === "function") {
            dialog.showModal();
            return;
          }
          if (typeof dialog.show === "function") {
            dialog.show();
          }
        }
        function closeOffcanvas(panel, options = {}) {
          if (!panel) {
            return;
          }
          panel.classList.remove("is-open");
          panel.setAttribute("aria-hidden", "true");
          getOffcanvasBackdrops(panel).forEach((backdrop) => {
            backdrop.classList.remove("is-open");
            backdrop.hidden = true;
          });
          syncOverlayBodyState();
          if (options.restoreFocus !== false) {
            restoreTriggerFocus(panel);
          }
        }
        function getTopOpenOverlay() {
          const overlays = [
            ...document.querySelectorAll(`${selectors.modal}.is-open, ${selectors.offcanvas}.is-open`)
          ];
          return overlays[overlays.length - 1] || null;
        }
        function parsePositiveInteger(value) {
          const parsed = Number.parseInt(value || "", 10);
          if (!Number.isFinite(parsed) || parsed < 1) {
            return null;
          }
          return parsed;
        }
        function formatFileExampleSize(bytes) {
          if (!Number.isFinite(bytes) || bytes <= 0) {
            return "0 B";
          }
          if (bytes < 1024) {
            return `${bytes} B`;
          }
          const units = ["KB", "MB", "GB", "TB"];
          let value = bytes / 1024;
          let unitIndex = 0;
          while (value >= 1024 && unitIndex < units.length - 1) {
            value /= 1024;
            unitIndex += 1;
          }
          const precision = value >= 10 ? 0 : 1;
          return `${value.toFixed(precision)} ${units[unitIndex]}`;
        }
        function getFileExampleTypeLabel(file) {
          if (!(file instanceof File)) {
            return "File";
          }
          const extensionMatch = /\.([a-z0-9]+)$/i.exec(file.name || "");
          if (extensionMatch?.[1]) {
            return extensionMatch[1].toUpperCase();
          }
          if (typeof file.type === "string" && file.type.includes("/")) {
            return file.type.split("/").at(-1)?.toUpperCase() || "File";
          }
          return "File";
        }
        function createFileExampleRow(file) {
          const row = document.createElement("div");
          const meta = document.createElement("div");
          const name = document.createElement("p");
          const detail = document.createElement("p");
          const badge = document.createElement("span");
          const actions = document.createElement("div");
          const preview = document.createElement("a");
          const remove = document.createElement("button");
          const objectUrl = URL.createObjectURL(file);
          row.className = "inc-file-row";
          row._incFileExampleObjectUrl = objectUrl;
          meta.className = "inc-file-row__meta";
          name.className = "inc-file-row__name";
          name.textContent = file.name || "untitled-file";
          detail.className = "inc-file-row__detail";
          detail.textContent = `${getFileExampleTypeLabel(file)} \u2022 ${formatFileExampleSize(file.size)} \u2022 selected just now`;
          meta.append(name, detail);
          badge.className = "inc-badge inc-badge--secondary inc-badge--pill";
          badge.textContent = "Ready";
          actions.className = "inc-file-row__actions";
          preview.className = "inc-btn inc-btn--outline-secondary inc-btn--sm";
          preview.href = objectUrl;
          preview.target = "_blank";
          preview.rel = "noreferrer";
          preview.textContent = "Preview";
          remove.type = "button";
          remove.className = "inc-btn inc-btn--secondary inc-btn--sm";
          remove.textContent = "Remove";
          remove.setAttribute("data-inc-action", "file-remove");
          remove.setAttribute("aria-label", `Remove ${file.name}`);
          actions.append(preview, remove);
          row.append(meta, badge, actions);
          return row;
        }
        function revokeFileExampleRow(row) {
          if (!(row instanceof HTMLElement)) {
            return;
          }
          if (typeof row._incFileExampleObjectUrl === "string" && row._incFileExampleObjectUrl) {
            URL.revokeObjectURL(row._incFileExampleObjectUrl);
            row._incFileExampleObjectUrl = "";
          }
        }
        function updateFileExampleEmptyState(controller) {
          const { list } = controller.parts;
          if (!(list instanceof HTMLElement)) {
            return;
          }
          const rows = list.querySelectorAll(".inc-file-row");
          let empty = list.querySelector("[data-inc-file-empty]");
          if (rows.length > 0) {
            if (empty instanceof HTMLElement) {
              empty.hidden = true;
            }
            return;
          }
          if (!(empty instanceof HTMLElement)) {
            empty = document.createElement("p");
            empty.className = "inc-text inc-text--small inc-text--muted";
            empty.setAttribute("data-inc-file-empty", "");
            empty.textContent = controller.emptyText;
            list.append(empty);
          }
          empty.hidden = false;
        }
        function appendFilesToExample(controller, files) {
          const { list } = controller.parts;
          if (!(list instanceof HTMLElement)) {
            return;
          }
          const fileItems = Array.from(files || []).filter((file) => file instanceof File);
          if (!fileItems.length) {
            return;
          }
          fileItems.forEach((file) => {
            list.append(createFileExampleRow(file));
          });
          updateFileExampleEmptyState(controller);
        }
        function dataTransferIncludesFiles(dataTransfer) {
          if (!dataTransfer) {
            return false;
          }
          if (dataTransfer.files?.length) {
            return true;
          }
          return Array.from(dataTransfer.types || []).includes("Files");
        }
        function setFileDropzoneActiveState(controller, isActive) {
          const { dropzone } = controller.parts;
          if (!(dropzone instanceof HTMLElement)) {
            return;
          }
          dropzone.classList.toggle("is-drag-over", Boolean(isActive));
        }
        function openFileExamplePicker(controller) {
          const { input } = controller.parts;
          if (!(input instanceof HTMLInputElement)) {
            return;
          }
          input.click();
        }
        function initializeFileExamples() {
          document.querySelectorAll(selectors.fileExample).forEach((root) => {
            if (!(root instanceof HTMLElement) || root._incFileExampleInitialized) {
              return;
            }
            const controller = {
              root,
              parts: {
                dropzone: root.querySelector(selectors.fileDropzone),
                input: root.querySelector(selectors.fileInput),
                browse: root.querySelector(selectors.fileBrowse),
                list: root.querySelector(selectors.fileList)
              },
              emptyText: root.getAttribute("data-inc-file-empty-text") || "No files selected yet.",
              dragDepth: 0
            };
            const { dropzone, input, browse, list } = controller.parts;
            if (!(dropzone instanceof HTMLElement) || !(input instanceof HTMLInputElement) || !(list instanceof HTMLElement)) {
              return;
            }
            root._incFileExampleInitialized = true;
            root._incFileExampleController = controller;
            dropzone.setAttribute("tabindex", dropzone.getAttribute("tabindex") || "0");
            dropzone.setAttribute("role", dropzone.getAttribute("role") || "button");
            dropzone.setAttribute("aria-label", dropzone.getAttribute("aria-label") || "Drop files here or browse for files");
            const browseAction = (event) => {
              event.preventDefault();
              openFileExamplePicker(controller);
            };
            if (browse instanceof HTMLElement) {
              browse.addEventListener("click", browseAction);
            }
            dropzone.addEventListener("click", (event) => {
              if (event.target instanceof Element && event.target.closest("a, button, input, label")) {
                return;
              }
              openFileExamplePicker(controller);
            });
            dropzone.addEventListener("keydown", (event) => {
              if (event.key !== "Enter" && event.key !== " ") {
                return;
              }
              event.preventDefault();
              openFileExamplePicker(controller);
            });
            dropzone.addEventListener("dragenter", (event) => {
              if (!dataTransferIncludesFiles(event.dataTransfer)) {
                return;
              }
              event.preventDefault();
              controller.dragDepth += 1;
              setFileDropzoneActiveState(controller, true);
            });
            dropzone.addEventListener("dragover", (event) => {
              if (!dataTransferIncludesFiles(event.dataTransfer)) {
                return;
              }
              event.preventDefault();
              if (event.dataTransfer) {
                event.dataTransfer.dropEffect = "copy";
              }
              setFileDropzoneActiveState(controller, true);
            });
            dropzone.addEventListener("dragleave", (event) => {
              if (!dataTransferIncludesFiles(event.dataTransfer)) {
                return;
              }
              event.preventDefault();
              controller.dragDepth = Math.max(0, controller.dragDepth - 1);
              if (controller.dragDepth === 0 || !dropzone.contains(event.relatedTarget)) {
                setFileDropzoneActiveState(controller, false);
              }
            });
            dropzone.addEventListener("drop", (event) => {
              if (!dataTransferIncludesFiles(event.dataTransfer)) {
                return;
              }
              event.preventDefault();
              controller.dragDepth = 0;
              setFileDropzoneActiveState(controller, false);
              appendFilesToExample(controller, event.dataTransfer?.files);
            });
            input.addEventListener("change", () => {
              appendFilesToExample(controller, input.files);
              input.value = "";
            });
            list.addEventListener("click", (event) => {
              const removeButton = event.target.closest(selectors.fileRemove);
              if (!removeButton) {
                return;
              }
              event.preventDefault();
              const row = removeButton.closest(".inc-file-row");
              revokeFileExampleRow(row);
              row?.remove();
              updateFileExampleEmptyState(controller);
            });
            updateFileExampleEmptyState(controller);
          });
        }
        function formatAutoRefreshRemaining(totalSeconds) {
          if (totalSeconds < 60) {
            return `${totalSeconds}s`;
          }
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          return `${minutes}m ${seconds}s`;
        }
        function getAutoRefreshParts(root) {
          const toggle = root.querySelector(".inc-auto-refresh__toggle");
          if (toggle instanceof HTMLElement) {
            if (!toggle.querySelector(".inc-auto-refresh__toggle-icon")) {
              const icon = document.createElement("span");
              icon.className = "inc-auto-refresh__toggle-icon";
              icon.setAttribute("aria-hidden", "true");
              toggle.prepend(icon);
            }
          }
          return {
            countdown: root.querySelector(".inc-auto-refresh__countdown"),
            label: root.querySelector(".inc-auto-refresh__label"),
            value: root.querySelector(".inc-auto-refresh__value"),
            status: root.querySelector(".inc-auto-refresh__status"),
            statusText: root.querySelector(".inc-auto-refresh__status-text"),
            toggle,
            toggleIcon: root.querySelector(".inc-auto-refresh__toggle-icon"),
            toggleText: root.querySelector(".inc-auto-refresh__toggle-text")
          };
        }
        function updateAutoRefreshToggle(controller) {
          const { parts, isPaused, isLoading, pauseActionLabel, resumeActionLabel } = controller;
          if (!(parts.toggle instanceof HTMLElement)) {
            return;
          }
          const actionLabel = isPaused ? resumeActionLabel : pauseActionLabel;
          parts.toggle.disabled = Boolean(isLoading);
          parts.toggle.setAttribute("aria-pressed", isPaused ? "true" : "false");
          parts.toggle.setAttribute("aria-label", actionLabel);
          if (parts.toggleText) {
            parts.toggleText.textContent = actionLabel;
          }
          if (parts.toggleIcon instanceof HTMLElement) {
            replaceIconContents(parts.toggleIcon, isPaused ? "play" : "pause", {
              className: "inc-icon",
              decorative: true,
              size: 16
            });
          }
        }
        function renderAutoRefreshCountdown(controller, remainingSeconds) {
          const { root, parts, refreshLabel } = controller;
          if (parts.label) {
            parts.label.textContent = refreshLabel;
          }
          if (parts.value) {
            parts.value.textContent = formatAutoRefreshRemaining(remainingSeconds);
          }
          root.classList.remove("is-paused");
          root.classList.remove("is-loading");
          root.setAttribute("aria-busy", "false");
          if (parts.countdown) {
            parts.countdown.hidden = false;
          }
          if (parts.status) {
            parts.status.hidden = true;
          }
          updateAutoRefreshToggle(controller);
        }
        function renderAutoRefreshPaused(controller, remainingSeconds) {
          const { root, parts, pausedLabel } = controller;
          if (parts.label) {
            parts.label.textContent = pausedLabel;
          }
          if (parts.value) {
            parts.value.textContent = formatAutoRefreshRemaining(remainingSeconds);
          }
          root.classList.add("is-paused");
          root.classList.remove("is-loading");
          root.setAttribute("aria-busy", "false");
          if (parts.countdown) {
            parts.countdown.hidden = false;
          }
          if (parts.status) {
            parts.status.hidden = true;
          }
          updateAutoRefreshToggle(controller);
        }
        function setAutoRefreshLoadingState(controller) {
          const { root, parts, loadingLabel } = controller;
          root.classList.remove("is-paused");
          root.classList.add("is-loading");
          root.setAttribute("aria-busy", "true");
          if (parts.countdown) {
            parts.countdown.hidden = true;
          }
          if (parts.statusText) {
            parts.statusText.textContent = loadingLabel;
          }
          if (parts.status) {
            parts.status.hidden = false;
          }
          updateAutoRefreshToggle(controller);
        }
        function stopAutoRefreshController(controller) {
          if (controller.timeoutId) {
            window.clearTimeout(controller.timeoutId);
            controller.timeoutId = 0;
          }
        }
        function pauseAutoRefresh(controller) {
          if (autoRefreshReloadScheduled || controller.isLoading || controller.isPaused) {
            return;
          }
          controller.isPaused = true;
          controller.remainingMs = Math.max(controller.deadline - Date.now(), 0);
          stopAutoRefreshController(controller);
          renderAutoRefreshPaused(controller, Math.max(1, Math.ceil(controller.remainingMs / 1e3)));
        }
        function resumeAutoRefresh(controller) {
          if (autoRefreshReloadScheduled || controller.isLoading || !controller.isPaused) {
            return;
          }
          controller.isPaused = false;
          controller.deadline = Date.now() + controller.remainingMs;
          controller.remainingMs = 0;
          scheduleAutoRefreshTick(controller);
        }
        function toggleAutoRefresh(controller) {
          if (controller.isPaused) {
            resumeAutoRefresh(controller);
            return;
          }
          pauseAutoRefresh(controller);
        }
        function scheduleWindowReload() {
          if (autoRefreshReloadScheduled) {
            return;
          }
          autoRefreshReloadScheduled = true;
          autoRefreshControllers.forEach((controller) => stopAutoRefreshController(controller));
          const deferToPaint = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : (callback) => window.setTimeout(callback, 16);
          deferToPaint(() => {
            window.setTimeout(() => {
              window.location.reload();
            }, 120);
          });
        }
        function startAutoRefreshReload(controller) {
          if (autoRefreshReloadScheduled || controller.isLoading) {
            return;
          }
          controller.isLoading = true;
          stopAutoRefreshController(controller);
          setAutoRefreshLoadingState(controller);
          scheduleWindowReload();
        }
        function scheduleAutoRefreshTick(controller) {
          if (autoRefreshReloadScheduled || controller.isLoading || controller.isPaused) {
            return;
          }
          stopAutoRefreshController(controller);
          const remainingMs = controller.deadline - Date.now();
          if (remainingMs <= 0) {
            startAutoRefreshReload(controller);
            return;
          }
          const remainingSeconds = Math.ceil(remainingMs / 1e3);
          renderAutoRefreshCountdown(controller, remainingSeconds);
          const nextDelay = remainingMs % 1e3 || 1e3;
          controller.timeoutId = window.setTimeout(() => {
            scheduleAutoRefreshTick(controller);
          }, nextDelay);
        }
        function initializeAutoRefresh() {
          document.querySelectorAll(selectors.autoRefresh).forEach((root) => {
            if (!(root instanceof HTMLElement) || root._incAutoRefreshInitialized) {
              return;
            }
            root._incAutoRefreshInitialized = true;
            const refreshSeconds = parsePositiveInteger(root.getAttribute("data-inc-refresh-seconds"));
            if (!refreshSeconds) {
              return;
            }
            const controller = {
              root,
              parts: getAutoRefreshParts(root),
              refreshLabel: root.getAttribute("data-inc-refresh-label") || "Refresh in",
              loadingLabel: root.getAttribute("data-inc-refresh-loading-label") || "Refreshing",
              pausedLabel: root.getAttribute("data-inc-refresh-paused-label") || "Paused at",
              pauseActionLabel: root.getAttribute("data-inc-refresh-pause-action-label") || "Pause",
              resumeActionLabel: root.getAttribute("data-inc-refresh-resume-action-label") || "Resume",
              deadline: Date.now() + refreshSeconds * 1e3,
              remainingMs: refreshSeconds * 1e3,
              timeoutId: 0,
              isLoading: false,
              isPaused: false
            };
            root._incAutoRefreshController = controller;
            autoRefreshControllers.push(controller);
            scheduleAutoRefreshTick(controller);
          });
          if (!document._incAutoRefreshVisibilityBound && autoRefreshControllers.length) {
            document._incAutoRefreshVisibilityBound = true;
            document.addEventListener("visibilitychange", () => {
              if (document.hidden || autoRefreshReloadScheduled) {
                return;
              }
              autoRefreshControllers.forEach((controller) => {
                if (controller.isLoading || controller.isPaused) {
                  return;
                }
                if (controller.deadline - Date.now() <= 0) {
                  startAutoRefreshReload(controller);
                  return;
                }
                scheduleAutoRefreshTick(controller);
              });
            });
          }
        }
        function trapFocus(event, container) {
          if (event.key !== "Tab") {
            return false;
          }
          const focusable = getFocusableElements(container);
          if (!focusable.length) {
            event.preventDefault();
            focusWithin(container);
            return true;
          }
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const active = document.activeElement;
          if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
            return true;
          }
          if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
            return true;
          }
          return false;
        }
        function initializeMenus() {
          document.querySelectorAll(selectors.menuToggle).forEach((toggle) => {
            toggle.setAttribute("aria-expanded", "false");
            const menu = getTarget(toggle);
            if (menu?.id) {
              toggle.setAttribute("aria-controls", menu.id);
            }
          });
        }
        function initializeCollapses() {
          document.querySelectorAll(selectors.collapseToggle).forEach((trigger) => {
            const target = getTarget(trigger);
            if (!target) {
              return;
            }
            setCollapseState(trigger, target, target.classList.contains("show"));
          });
        }
        function initializeTabs() {
          document.querySelectorAll(selectors.tabToggle).forEach((tab, index) => {
            const pane = getTarget(tab);
            const isActive = tab.classList.contains("active");
            if (!tab.id) {
              tab.id = `inc-tab-${index + 1}`;
            }
            tab.setAttribute("role", "tab");
            tab.setAttribute("aria-selected", isActive ? "true" : "false");
            tab.tabIndex = isActive ? 0 : -1;
            if (pane) {
              if (pane.id) {
                tab.setAttribute("aria-controls", pane.id);
              }
              pane.setAttribute("role", "tabpanel");
              pane.setAttribute("aria-labelledby", tab.id);
              pane.hidden = !isActive;
              pane.classList.toggle("show", isActive);
              pane.classList.toggle("active", isActive);
            }
          });
          document.querySelectorAll(selectors.tabPane).forEach((pane) => {
            const hasActiveTab = document.querySelector(`${selectors.tabToggle}[href="#${pane.id}"].active, ${selectors.tabToggle}[data-inc-target="#${pane.id}"].active, ${selectors.tabToggle}[aria-controls="${pane.id}"].active`);
            pane.hidden = !hasActiveTab;
          });
        }
        function attachEventHandlers() {
          document.addEventListener("click", (event) => {
            const themeToggle = event.target.closest(selectors.themeToggle);
            if (themeToggle) {
              event.preventDefault();
              cycleThemeMode();
              return;
            }
            const themeModeControl = event.target.closest(selectors.themeMode);
            if (themeModeControl && themeModeControl.tagName !== "INPUT") {
              event.preventDefault();
              applyThemeMode(themeModeControl.getAttribute("data-inc-theme-mode"));
              const owningSwitcher = themeModeControl.closest("details.inc-theme-switcher");
              const switcherSummary = owningSwitcher?.querySelector("summary");
              if (owningSwitcher instanceof HTMLDetailsElement) {
                owningSwitcher.open = false;
              }
              if (switcherSummary instanceof HTMLElement) {
                switcherSummary.focus();
              }
              return;
            }
            const autoRefreshToggle = event.target.closest(selectors.autoRefreshToggle);
            if (autoRefreshToggle) {
              const autoRefreshRoot = autoRefreshToggle.closest(selectors.autoRefresh);
              const controller = autoRefreshRoot?._incAutoRefreshController;
              if (controller) {
                event.preventDefault();
                toggleAutoRefresh(controller);
              }
              return;
            }
            const menuToggle = event.target.closest(selectors.menuToggle);
            if (menuToggle) {
              event.preventDefault();
              const menu = getTarget(menuToggle);
              const isOpen = menu ? menu.classList.contains("show") : false;
              closeAllMenus(menuToggle);
              if (!isOpen) {
                openMenu(menuToggle);
              } else {
                closeMenu(menuToggle);
              }
              return;
            }
            if (!event.target.closest(selectors.userMenu)) {
              closeAllMenus();
            }
            const collapseToggle = event.target.closest(selectors.collapseToggle);
            if (collapseToggle) {
              event.preventDefault();
              toggleCollapse(collapseToggle);
              return;
            }
            const tabToggle = event.target.closest(selectors.tabToggle);
            if (tabToggle) {
              if (tabToggle.tagName === "A") {
                event.preventDefault();
              }
              activateTab(tabToggle);
              return;
            }
            const nativeDialogOpen = event.target.closest(selectors.nativeDialogOpen);
            if (nativeDialogOpen) {
              event.preventDefault();
              openNativeDialog(nativeDialogOpen);
              return;
            }
            const modalToggle = event.target.closest(selectors.modalToggle);
            if (modalToggle) {
              event.preventDefault();
              openModal(modalToggle);
              return;
            }
            const modalDismiss = event.target.closest(selectors.modalDismiss);
            if (modalDismiss) {
              event.preventDefault();
              const modal = modalDismiss.closest(selectors.modal) || getTarget(modalDismiss);
              closeModal(modal);
              return;
            }
            const backdropModal = event.target.closest(`${selectors.modal}.is-open`);
            if (backdropModal && event.target.classList.contains("inc-modal__backdrop")) {
              closeModal(backdropModal);
              return;
            }
            const offcanvasToggle = event.target.closest(selectors.offcanvasToggle);
            if (offcanvasToggle) {
              event.preventDefault();
              openOffcanvas(offcanvasToggle);
              return;
            }
            const offcanvasDismiss = event.target.closest(selectors.offcanvasDismiss);
            if (offcanvasDismiss) {
              event.preventDefault();
              const panel = offcanvasDismiss.closest(selectors.offcanvas) || getTarget(offcanvasDismiss);
              closeOffcanvas(panel);
              return;
            }
            const offcanvasBackdrop = event.target.closest("[data-inc-backdrop-for]");
            if (offcanvasBackdrop) {
              const targetId = offcanvasBackdrop.getAttribute("data-inc-backdrop-for");
              const panel = targetId ? document.getElementById(targetId) : null;
              closeOffcanvas(panel);
            }
          });
          document.addEventListener("change", (event) => {
            const themeModeControl = event.target.closest(selectors.themeMode);
            if (themeModeControl) {
              applyThemeMode(themeModeControl.getAttribute("data-inc-theme-mode"));
              return;
            }
            const themeSelect = event.target.closest(selectors.themeSelect);
            if (themeSelect) {
              applyThemeMode(themeSelect.value);
            }
          });
          document.addEventListener("keydown", (event) => {
            const menuToggle = event.target.closest(selectors.menuToggle);
            const menu = event.target.closest(selectors.menu);
            const tabToggle = event.target.closest(selectors.tabToggle);
            const themeModeControl = event.target.closest(selectors.themeMode);
            const openOverlay = getTopOpenOverlay();
            if (themeModeControl && themeModeControl.closest(".inc-theme-switcher__panel")) {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusThemeSwitcherOption(themeModeControl, "next");
                return;
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                focusThemeSwitcherOption(themeModeControl, "previous");
                return;
              }
              if (event.key === "Home") {
                event.preventDefault();
                focusThemeSwitcherOption(themeModeControl, "first");
                return;
              }
              if (event.key === "End") {
                event.preventDefault();
                focusThemeSwitcherOption(themeModeControl, "last");
                return;
              }
              if (event.key === "Escape") {
                const owningSwitcher = themeModeControl.closest("details.inc-theme-switcher");
                const switcherSummary = owningSwitcher?.querySelector("summary");
                if (owningSwitcher instanceof HTMLDetailsElement) {
                  owningSwitcher.open = false;
                }
                if (switcherSummary instanceof HTMLElement) {
                  switcherSummary.focus();
                }
                return;
              }
            }
            if (menuToggle) {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                closeAllMenus(menuToggle);
                openMenu(menuToggle, { focus: event.key === "ArrowDown" ? "first" : "last" });
                return;
              }
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
                if (isExpanded) {
                  closeMenu(menuToggle);
                } else {
                  closeAllMenus(menuToggle);
                  openMenu(menuToggle, { focus: "first" });
                }
                return;
              }
            }
            if (menu) {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusMenuItem(menu, "next");
                return;
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                focusMenuItem(menu, "previous");
                return;
              }
              if (event.key === "Home") {
                event.preventDefault();
                focusMenuItem(menu, "first");
                return;
              }
              if (event.key === "End") {
                event.preventDefault();
                focusMenuItem(menu, "last");
                return;
              }
              if (event.key === "Escape") {
                event.preventDefault();
                const owningToggle = document.querySelector(`${selectors.menuToggle}[aria-controls="${menu.id}"]`);
                if (owningToggle) {
                  closeMenu(owningToggle, { restoreFocus: true });
                }
                return;
              }
            }
            if (tabToggle) {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                focusTab(tabToggle, "next");
                return;
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                focusTab(tabToggle, "previous");
                return;
              }
              if (event.key === "Home") {
                event.preventDefault();
                focusTab(tabToggle, "first");
                return;
              }
              if (event.key === "End") {
                event.preventDefault();
                focusTab(tabToggle, "last");
                return;
              }
              if ((event.key === "Enter" || event.key === " ") && tabToggle.tagName !== "BUTTON") {
                event.preventDefault();
                activateTab(tabToggle, { focus: true });
                return;
              }
            }
            if (openOverlay && trapFocus(event, openOverlay)) {
              return;
            }
            if (event.key === "Escape") {
              const openModal2 = document.querySelector(`${selectors.modal}.is-open`);
              const openPanel = document.querySelector(`${selectors.offcanvas}.is-open`);
              if (openModal2) {
                closeModal(openModal2);
                return;
              }
              if (openPanel) {
                closeOffcanvas(openPanel);
                return;
              }
              closeAllMenus();
            }
          });
        }
        window.IncTheme = {
          getMode() {
            return themeState.mode;
          },
          getResolvedTheme() {
            return themeState.resolved;
          },
          setMode(mode) {
            return applyThemeMode(mode);
          },
          cycleMode() {
            return cycleThemeMode();
          },
          createSwitcher(options = {}) {
            return createThemeSwitcher(options);
          },
          mountSwitcher(target, options = {}) {
            return mountThemeSwitcher(target, options);
          },
          init() {
            return initializeTheme();
          }
        };
        function initialize() {
          initializeTheme();
          initializeMenus();
          initializeCollapses();
          initializeTabs();
          upgradeIconPlaceholders(document);
          initializeFileExamples();
          initializeAutoRefresh();
          attachEventHandlers();
        }
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", initialize, { once: true });
        } else {
          initialize();
        }
      })();
    }
  });
  require_inc_design_language();
})();
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
