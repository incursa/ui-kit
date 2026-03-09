(function () {
    "use strict";

    const selectors = {
        menuToggle: '[data-inc-toggle="menu"]',
        collapseToggle: '[data-inc-toggle="collapse"]',
        tabToggle: '[data-inc-toggle="tab"]',
        userMenu: ".inc-user-menu",
        tabPane: ".inc-tab-pane",
    };

    function getTarget(trigger) {
        const rawTarget = trigger.getAttribute("data-inc-target") || trigger.getAttribute("href");

        if (!rawTarget || rawTarget === "#") {
            return null;
        }

        try {
            return document.querySelector(rawTarget);
        } catch {
            return null;
        }
    }

    function closeMenu(toggle) {
        const menu = getTarget(toggle);

        if (!menu) {
            return;
        }

        menu.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
    }

    function openMenu(toggle) {
        const menu = getTarget(toggle);

        if (!menu) {
            return;
        }

        menu.classList.add("show");
        toggle.setAttribute("aria-expanded", "true");
    }

    function closeAllMenus(exceptToggle) {
        document.querySelectorAll(selectors.menuToggle).forEach((toggle) => {
            if (exceptToggle && toggle === exceptToggle) {
                return;
            }

            closeMenu(toggle);
        });
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

    function activateTab(trigger) {
        const listRoot = trigger.closest('[role="tablist"], .inc-tabs-nav');

        if (!listRoot) {
            return;
        }

        const tabs = Array.from(listRoot.querySelectorAll(selectors.tabToggle));
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
    }

    function initializeMenus() {
        document.querySelectorAll(selectors.menuToggle).forEach((toggle) => {
            toggle.setAttribute("aria-expanded", "false");
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
        document.querySelectorAll(selectors.tabToggle).forEach((tab) => {
            const pane = getTarget(tab);
            const isActive = tab.classList.contains("active");

            tab.setAttribute("aria-selected", isActive ? "true" : "false");
            tab.tabIndex = isActive ? 0 : -1;

            if (pane) {
                pane.hidden = !isActive;
                pane.classList.toggle("show", isActive);
                pane.classList.toggle("active", isActive);
            }
        });

        document.querySelectorAll(selectors.tabPane).forEach((pane) => {
            const hasActiveTab = document.querySelector(`${selectors.tabToggle}[href="#${pane.id}"].active, ${selectors.tabToggle}[data-inc-target="#${pane.id}"].active`);
            pane.hidden = !hasActiveTab;
        });
    }

    function attachEventHandlers() {
        document.addEventListener("click", (event) => {
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
                event.preventDefault();
                activateTab(tabToggle);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeAllMenus();
            }
        });
    }

    function initialize() {
        initializeMenus();
        initializeCollapses();
        initializeTabs();
        attachEventHandlers();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }
})();
