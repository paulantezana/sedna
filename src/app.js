import './scss/app.scss';
import './prism/prism';

import { Theme } from './script/theme';

SnModal.init();

// Primary Menu
SnMenu({
    menuId: 'PrimaryMenu',
    toggleButtonID: 'PrimaryMenu-toggle',
    toggleClass: 'PrimaryMenu-is-show',
    menuCloseID: 'PrimaryMenu-wrapper',
});

// Aside menu
SnMenu({
    menuId: 'AsideMenu',
    toggleButtonID: 'AsideMenu-toggle',
    toggleClass: 'AsideMenu-is-show',
    menuCloseID: 'AsideMenu-close',
});

new Theme();

let codeBox = document.querySelectorAll('.CodeBox');
if (codeBox) {
    codeBox.forEach(item => {
        let codeBoxShow = item.querySelector('.CodeBox-show');
        let codeBoxCode = item.querySelector('.CodeBox-code');
        let codeBoxCopy = item.querySelector('.CodeBox-copy');
        if (codeBoxShow && codeBoxCode) {
            codeBoxShow.addEventListener('click', () => {
                codeBoxCode.classList.toggle('is-expand');
            });

            if (codeBoxCopy) {
                codeBoxCopy.addEventListener('click', () => {
                    let range = document.createRange();
                    range.selectNode(codeBoxCode);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                    document.execCommand("copy");
                    window.getSelection().removeAllRanges();

                    SnMessage.success({ content: 'copy success' });
                });
            }
        }

    });
}