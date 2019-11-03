import './scss/app.scss';
import './prism/prism';

import { Theme } from './script/theme';

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