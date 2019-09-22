import './scss/app.scss';
import './prism/prism';

import { SnModal } from '../bin/script/modal';
import { SnMenu, SnActiveMenu } from '../bin/script/menu';
import { Theme } from './script/theme';

// Modal
SnModal();
window.onload = () => {
    modal.init();
}

// Primary Menu
SnMenu({
    menuId: 'PrimaryMenu',
    toggleButtonID: 'PrimaryMenu-toggle',
    toggleClass: 'PrimaryMenu-is-show',
    parentClose: true,
    menuCloseID: 'PrimaryMenu-close',
});

// Aside menu
SnMenu({
    menuId: 'AsideMenu',
    toggleButtonID: 'AsideMenu-toggle',
    toggleClass: 'AsideMenu-is-show',
    parentClose: true,
    menuCloseID: 'AsideMenu-close',
});

// Active AdmissionMenu 
SnActiveMenu([...document.querySelectorAll('#PrimaryMenu a')]);

// Active AdmissionMenu 
SnActiveMenu([...document.querySelectorAll('#AsideMenu a')]);


new Theme();