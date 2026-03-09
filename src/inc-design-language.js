(function () {
    "use strict";

    const selectors = {
        menuToggle: '[data-inc-toggle="menu"]',
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

        modal.hidden = false;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        syncOverlayBodyState();
    }

    function closeModal(modal) {
        if (!modal) {
            return;
        }

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        modal.hidden = true;
        syncOverlayBodyState();
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

        panel.classList.add("is-open");
        panel.setAttribute("aria-hidden", "false");
        getOffcanvasBackdrops(panel).forEach((backdrop) => {
            backdrop.classList.add("is-open");
            backdrop.hidden = false;
        });
        syncOverlayBodyState();
    }

    function closeOffcanvas(panel) {
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
            if (event.key === "Escape") {
                document.querySelectorAll(`${selectors.modal}.is-open`).forEach((modal) => closeModal(modal));
                document.querySelectorAll(`${selectors.offcanvas}.is-open`).forEach((panel) => closeOffcanvas(panel));
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
