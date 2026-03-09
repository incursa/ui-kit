(function () {
    "use strict";

    const selectors = {
        menuToggle: '[data-inc-toggle="menu"]',
        menu: ".inc-dropdown__menu",
        collapseToggle: '[data-inc-toggle="collapse"]',
        tabToggle: '[data-inc-toggle="tab"]',
        modalToggle: '[data-inc-toggle="modal"]',
        modalDismiss: '[data-inc-dismiss="modal"]',
        offcanvasToggle: '[data-inc-toggle="offcanvas"]',
        offcanvasDismiss: '[data-inc-dismiss="offcanvas"]',
        userMenu: ".inc-user-menu",
        tabPane: ".inc-tab-pane",
        modal: ".inc-modal",
        offcanvas: ".inc-offcanvas",
    };

    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    function getTarget(trigger) {
        const rawTarget = trigger.getAttribute("data-inc-target")
            || trigger.getAttribute("href")
            || (trigger.getAttribute("aria-controls") ? `#${trigger.getAttribute("aria-controls")}` : "");

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
        const startIndex = activeIndex === -1 ? (delta > 0 ? 0 : items.length - 1) : activeIndex;
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

        document.addEventListener("keydown", (event) => {
            const menuToggle = event.target.closest(selectors.menuToggle);
            const menu = event.target.closest(selectors.menu);
            const tabToggle = event.target.closest(selectors.tabToggle);
            const openOverlay = getTopOpenOverlay();

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
                const openModal = document.querySelector(`${selectors.modal}.is-open`);
                const openPanel = document.querySelector(`${selectors.offcanvas}.is-open`);

                if (openModal) {
                    closeModal(openModal);
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
