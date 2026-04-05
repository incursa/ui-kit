import { defineCustomElement } from "./shared.js";
import { installRegistryNamespace } from "./registry.js";

import "./components/layout.js";
import "./components/navigation.js";
import "./components/forms.js";
import "./components/feedback.js";
import "./components/actions.js";
import "./components/collections.js";
import "./components/overlays.js";

const namespace = globalThis.IncWebComponents || (globalThis.IncWebComponents = {});

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
    const entryMap = new Map();

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

function defineAll(options = {}) {
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
    return defineAll(options);
}

namespace.defineAll = defineAll;
namespace.registerIncWebComponents = registerIncWebComponents;
syncNamespace();

defineAll();

export {
    defineAll,
    registerIncWebComponents,
};
