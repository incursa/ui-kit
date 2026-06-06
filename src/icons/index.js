import createLucideElement from "lucide/dist/esm/createElement.mjs";
import CircleCheck from "lucide/dist/esm/icons/circle-check.mjs";
import CircleHelp from "lucide/dist/esm/icons/circle-question-mark.mjs";
import CircleX from "lucide/dist/esm/icons/circle-x.mjs";
import Download from "lucide/dist/esm/icons/download.mjs";
import ExternalLink from "lucide/dist/esm/icons/external-link.mjs";
import FileText from "lucide/dist/esm/icons/file-text.mjs";
import FolderPlus from "lucide/dist/esm/icons/folder-plus.mjs";
import Info from "lucide/dist/esm/icons/info.mjs";
import Lock from "lucide/dist/esm/icons/lock.mjs";
import Pause from "lucide/dist/esm/icons/pause.mjs";
import Play from "lucide/dist/esm/icons/play.mjs";
import RefreshCw from "lucide/dist/esm/icons/refresh-cw.mjs";
import SearchX from "lucide/dist/esm/icons/search-x.mjs";
import Settings from "lucide/dist/esm/icons/settings.mjs";
import ShieldCheck from "lucide/dist/esm/icons/shield-check.mjs";
import TriangleAlert from "lucide/dist/esm/icons/triangle-alert.mjs";
import Upload from "lucide/dist/esm/icons/upload.mjs";

const ICON_NODES = Object.freeze({
    info: Info,
    help: CircleHelp,
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
    permission: ShieldCheck,
});

const ICON_NAMES = Object.freeze(Object.keys(ICON_NODES));
const DEFAULT_SIZE = 16;

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
    return String(name || "")
        .trim()
        .toLowerCase()
        .replace(/[_\s]+/g, "-");
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
        focusable: "false",
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

    return createLucideElement(iconNode, buildIconAttributes(normalizedName, options));
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
    return typeof namespace?.renderer === "function"
        ? namespace.renderer
        : renderDefaultIcon;
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
            label: node.getAttribute("aria-label") || undefined,
            size: node.getAttribute("data-inc-icon-size") || undefined,
        });
        node.setAttribute("data-inc-icon-upgraded", "true");
        upgraded.push(node);
    });

    return upgraded;
}

getNamespace();

export {
    ICON_NAMES as incIconNames,
    getIconRenderer,
    normalizeIconName,
    renderDefaultIcon,
    renderIncIcon,
    replaceIconContents,
    setIconRenderer,
    upgradeIconPlaceholders,
};
