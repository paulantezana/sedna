export const SnActiveMenu = (links = []) => {
    if (links) {
        links.map(link => {
            const url = document.location.href;
            if (url.indexOf(link.href) != -1)
                link.parentNode.classList.add('is-active');
        });
    }
    return links;
};

export const SnMenu = ({
    menuId = "Menu",
    toggleButtonID = "Menu-toggle",
    contextId = "Site",
    toggleClass = "Menu-is-show",
    menuCloseID = '',
}) => {

    let SnMenuApi = {
        menu: null,
        context: null,
        toggleAction: null,
        closeAction: null,
        init() {
            this.menu = document.getElementById(menuId);
            if (!this.menu) {
                console.warn(`Not found ${menuId}`);
                return;
            }

            // Get all sub menu
            let items = this.menu.querySelectorAll("li"); // select all items
            for (let ele of items) {
                if (ele.childElementCount === 2) { // if submenu
                    let toggle = ele.firstElementChild; // First element
                    let content = ele.lastElementChild; // Second element

                    // Creando un nuevo elemento e insertando justo despues del enlace
                    let iconToggleEle = document.createElement("i");
                    iconToggleEle.classList.add("icon-down");
                    iconToggleEle.classList.add("toggle");
                    toggle.appendChild(iconToggleEle);
                    toggle.classList.add('is-toggle')

                    iconToggleEle.addEventListener("click", e => {
                        e.preventDefault();
                        iconToggleEle.classList.toggle("icon-up"); // add Icon up
                        content.classList.toggle("is-show"); // add class show menu
                    });
                }
            }

            // get context
            this.context = document.getElementById(contextId);

            // Toggle menu
            this.toggleAction = document.getElementById(toggleButtonID);
            if (this.toggleAction) {
                this.toggleAction.addEventListener("click", () => {
                    this.toggle();
                });
            }

            // Menu close remove class
            if (menuCloseID !== '') {
                this.closeAction = document.getElementById(menuCloseID);
                if (this.closeAction) {
                    this.closeAction.addEventListener("click", () => {
                        this.close();
                    });

                    // Set stop propagation
                    if (this.closeAction.hasChildNodes()) {
                        [...this.closeAction.children].forEach(item => {
                            item.addEventListener('click', e => {
                                e.stopPropagation();
                            });
                        });
                    }

                    // Set Stop propagation
                    this.menu.addEventListener('click', e => {
                        e.stopPropagation();
                    });
                }
            }

            // actives
            this.setActive();
        },
        open() {
            if (this.context)
                this.context.classList.add(toggleClass);
        },
        close() {
            if (this.context)
                this.context.classList.remove(toggleClass);
        },
        toggle() {
            if (this.context)
                this.context.classList.toggle(toggleClass);
        },
        setActive() {
            if (this.menu)
                SnActiveMenu([...this.menu.querySelectorAll('a')]);
        }
    }

    SnMenuApi.init();
    return SnMenuApi;
};