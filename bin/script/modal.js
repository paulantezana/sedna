(() => {
    const SnUniqueId = (length = 6) => {
        let timestamp = +new Date;

        let _getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        let ts = timestamp.toString();
        let parts = ts.split("").reverse();
        let id = "";
        for (let i = 0; i < length; ++i) {
            let index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }
        return id;
    };

    let SnModalWrapper = document.createElement('div');
    SnModalWrapper.classList.add('SnModal-gScope');

    let closeModal = (m) => {
        m.classList.remove('visible');
        // Re-enable parent scrolling
        document.body.style.overflow = 'auto';
    };

    let SnModal = {
        dataModals: null,
        openModals: [],

        /**
         * Start modal
         */
        init() {
            // Find all modals
            this.dataModals = document.querySelectorAll('[data-modal]')
            for (let i = 0; i < this.dataModals.length; i++) {
                this.dataModals[i].addEventListener('click', (event) => {

                    let modalName = this.dataModals[i].dataset.modal
                    this.close(modalName)
                })
            }

            // Modal button trigger open
            let triggers = document.querySelectorAll('[data-modaltrigger]')
            for (let i = 0; i < triggers.length; i++) {
                triggers[i].addEventListener('click', (event) => {
                    let modalName = triggers[i].dataset.modaltrigger
                    this.open(modalName)
                })
            }

            // Modal button close
            let closes = document.querySelectorAll('[data-modalclose]')
            for (let i = 0; i < closes.length; i++) {
                closes[i].addEventListener('click', (event) => {
                    let modalName = closes[i].dataset.modalclose
                    this.close(modalName)
                })
            }

            // Listen keyboart close las open modal
            closeModalsOnEsc()
        },

        /**
         * Open modal by name
         * @param {string} modalName modal name
         * @param {function} cb callback function
         */
        open(modalName, cb) {
            let modal = document.querySelector(`[data-modal="${modalName}"]`)

            // If modal is already open, don't do anything
            if (this.openModals.indexOf(modal) >= 0) return

            if (modal) {
                modal.classList.add('visible')

                // Modal prevent events
                let modalContent = modal.querySelector('.SnModal');
                if (modalContent) {
                    modalContent.addEventListener('click', (event) => {
                        event.stopPropagation()
                    })
                }

                // Disable parent scrolling when modal is open
                document.body.style.overflow = 'hidden'

                this.openModals.push(modal)
            } else {
                console.warning('Could not find modal with name "%s"', modalName)
            }

            typeof cb === 'function' && cb()
        },

        /**
         * Close modal by name
         * @param {string} modalName modal name
         * @param {function} cb callback function
         */
        close(modalName, cb) {
            let modal = document.querySelector(`[data-modal="${modalName}"]`)

            // If modal is already open, don't do anything
            // if (this.openModals.indexOf(modal) >= 0) return

            if (modal) {
                closeModal(modal)

                this.openModals.pop(modal)
            } else {
                console.warning('Could not find modal with name "%s"', modalName)
            }

            typeof cb === 'function' && cb()
        },

        /**
         * close last modal
         * @param {function} cb callback function
         */
        closeLastModal(cb) {
            let modal = this.openModals.pop()
            closeModal(modal)
            typeof cb === 'function' && cb()
        },

        /**
         * open especial modal
         * @param {object} param0 modal open whit options
         */
        confirm({
            confirm = true,
            title = '',
            type = 'question',
            content = '',
            okType = 'primary',
            cancelType = '',
            cancelText = 'Cancelar',
            okText = 'OK',
            onOk = () => { },
            onCancel = () => { }
        }) {
            let uniqueIdName = 'Sn' + SnUniqueId();
            let divEl = document.createElement('div');

            let cancelTemp = confirm
                ? `<div class="SnBtn ${cancelType}" id="cancel${uniqueIdName}">${cancelText}</div>`
                : '';

            // let showIcon = confirm()

            divEl.innerHTML = `
                <div class="SnModal-wrapper" data-modal="${uniqueIdName}" >
                    <div class="SnModal confirm">
                        <div class="SnModal-body confirm">
                            <div class="SnModal-confirmIcon ${type}">${SnIcon[type]}</div>
                            <div class="SnModal-confirmTile">${title}</div>
                            <div class="SnModal-confirmContent">${content}</div>
                            <div class="SnModal-confirmBtns">
                                ${cancelTemp}
                                <div class="SnBtn ${okType}" id="ok${uniqueIdName}">${okText}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            SnModalWrapper.appendChild(divEl);
            this.open(uniqueIdName);

            let btnCancel = document.getElementById(`cancel${uniqueIdName}`);
            if (btnCancel) {
                btnCancel.addEventListener('click', e => {
                    e.preventDefault();
                    this.close(uniqueIdName);
                    SnModalWrapper.removeChild(divEl);
                    onCancel();
                });
            }

            let btnOk = document.getElementById(`ok${uniqueIdName}`);
            if (btnOk) {
                btnOk.addEventListener('click', e => {
                    e.preventDefault();
                    this.close(uniqueIdName);
                    SnModalWrapper.removeChild(divEl);
                    onOk();
                });
            }
        },

        /**
         * modal info
         * @param {object} param0 modal info whit options
         */
        info({
            title = '',
            content = '',
            okText = 'OK',
            onOk = () => { },
        }) {
            this.confirm({
                confirm: false,
                type: 'info',
                title,
                content,
                okText,
                onOk,
            });
        },

        /**
         * modal success
         * @param {object} param0 modal success whit options
         */
        success({
            title = '',
            content = '',
            okText = 'OK',
            onOk = () => { },
        }) {
            this.confirm({
                confirm: false,
                type: 'success',
                title,
                content,
                okText,
                onOk,
            });
        },

        /**
         * modal error
         * @param {object} param0 modal open whit options
         */
        error({
            title = '',
            content = '',
            okText = 'OK',
            onOk = () => { },
        }) {
            this.confirm({
                confirm: false,
                type: 'error',
                title,
                content,
                okText,
                onOk,
            });
        },

        /**
         * modal warning
         * @param {object} param0 modal open whit options
         */
        warning({
            title = '',
            content = '',
            okText = 'OK',
            onOk = () => { },
        }) {
            this.confirm({
                confirm: false,
                type: 'warning',
                title,
                content,
                okText,
                onOk,
            });
        }
    };

    let closeModalsOnEsc = () => {
        window.addEventListener('keyup', (event) => {
            if (SnModal.openModals.length && event.keyCode === 27) {
                SnModal.closeLastModal()
            }
        })
    };

    document.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(SnModalWrapper);
        SnModal.init();
    });

    window.SnModal = SnModal
})();