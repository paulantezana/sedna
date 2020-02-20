import { SnAutocomplete } from './script/autocomplete';
import { SnCollapse } from './script/collapse';
import { SnIcon } from './script/conmon';
import { SnInput } from './script/form';
import { SnFreeze } from './script/freeze';
import { SnMenu, SnActiveMenu } from './script/menu';
import { SnMessage } from './script/message';
import { SnModal } from './script/modal';
import { SnVideoOverlay } from './script/overlay';
import { SnTab } from './script/tab';
import { SnTooltip } from './script/tooltip';
import { SnTree } from './script/tree';

window.SnAutocomplete = SnAutocomplete;
window.SnCollapse = SnCollapse;
window.SnIcon = SnIcon;
window.SnInput = SnInput;
window.SnFreeze = SnFreeze;
window.SnMenu = SnMenu;
window.SnActiveMenu = SnActiveMenu;
window.SnMessage = SnMessage;
window.SnModal = SnModal;
window.SnVideoOverlay = SnVideoOverlay;
window.SnTab = SnTab;
window.SnTooltip = SnTooltip;
window.SnTree = SnTree;

// Init Components
document.addEventListener("DOMContentLoaded", () => {
    SnInput();
    SnModal.init();
    SnTab.init();
    SnTooltip({});
});