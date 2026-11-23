const normalizeText = (value) => (value?.textContent ?? "").replace(/\s+/g, " ").trim();

const accessibleName = (element, document) => {
    const labelledBy = element.getAttribute("aria-labelledby");
    if (labelledBy) {
        return labelledBy
            .split(/\s+/)
            .map((id) => normalizeText(document.getElementById(id)))
            .filter(Boolean)
            .join(" ");
    }

    return element.getAttribute("aria-label")?.trim()
        || element.getAttribute("alt")?.trim()
        || normalizeText(element);
};

export function auditShellDocument(document) {
    const violations = [];
    const mains = [...document.querySelectorAll("main")];
    const skipLinks = [...document.querySelectorAll('a[href^="#"]')]
        .filter((link) => normalizeText(link).toLowerCase().includes("skip"));

    if (mains.length !== 1) {
        violations.push({ id: "shell-single-main", message: `Expected one main landmark; found ${mains.length}.` });
    }

    if (mains.length === 1) {
        if (!mains[0].id) {
            violations.push({ id: "shell-main-id", message: "The main landmark must have a stable id." });
        } else if (!skipLinks.some((link) => link.getAttribute("href") === `#${mains[0].id}`)) {
            violations.push({ id: "shell-skip-link", message: "A visible-on-focus skip link must target the main landmark." });
        }
    }

    for (const selector of ["header", "nav", "footer"]) {
        if (!document.querySelector(selector)) {
            violations.push({ id: `shell-${selector}-landmark`, message: `The shell must contain a ${selector} landmark.` });
        }
    }

    for (const navigation of document.querySelectorAll("nav")) {
        if (!accessibleName(navigation, document)) {
            violations.push({ id: "shell-nav-name", message: "Every navigation landmark needs an accessible name." });
        }
    }

    const ids = new Map();
    for (const element of document.querySelectorAll("[id]")) {
        ids.set(element.id, (ids.get(element.id) ?? 0) + 1);
    }
    for (const [id, count] of ids) {
        if (count > 1) {
            violations.push({ id: "shell-unique-id", message: `The id '${id}' occurs ${count} times.` });
        }
    }

    for (const control of document.querySelectorAll("button, input, select, textarea, a[href]")) {
        if (!accessibleName(control, document)) {
            violations.push({ id: "shell-control-name", message: `${control.tagName.toLowerCase()} has no accessible name.` });
        }
    }

    const currentPages = document.querySelectorAll('[aria-current="page"]');
    if (currentPages.length !== 1) {
        violations.push({ id: "shell-current-page", message: `Expected one aria-current='page'; found ${currentPages.length}.` });
    }

    for (const logout of document.querySelectorAll("[data-inc-shell-logout]")) {
        const form = logout.matches("form") ? logout : logout.closest("form");
        if (!form || form.getAttribute("method")?.toLowerCase() !== "post") {
            violations.push({ id: "shell-logout-post", message: "Local logout must use a protected POST form." });
        }
        if (!form?.querySelector('input[type="hidden"]')) {
            violations.push({ id: "shell-logout-antiforgery", message: "Local logout must include an antiforgery field." });
        }
    }

    if (!normalizeText(document.querySelector("[data-inc-shell-version]"))) {
        violations.push({ id: "shell-version", message: "The shell must expose an application version as text." });
    }
    if (!normalizeText(document.querySelector("[data-inc-shell-revision]"))) {
        violations.push({ id: "shell-revision", message: "The shell must expose an immutable revision as text." });
    }

    return violations;
}

export function assertShellDocument(document) {
    const violations = auditShellDocument(document);
    if (violations.length > 0) {
        throw new Error(violations.map(({ id, message }) => `${id}: ${message}`).join("\n"));
    }
}
