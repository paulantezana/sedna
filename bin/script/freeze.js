(() => {
    let SnFreezeGScope = document.createElement('div');
    SnFreezeGScope.classList.add('SnFreeze-wrapper');

    let SnFreeze = {
        unFreeze(){
            let element = document.querySelector('.SnFreeze-wrapper');
            if (element) {
                element.classList.add('is-unfreezing');
                setTimeout(() => {
                    if (element) {
                        element.classList.remove('is-unfreezing');
                        element.parentElement.removeChild(element);
                    }
                }, 250);
            }
        },
        freeze(options = {}){
            let parent = document.querySelector(options.selector) || document.body;
            SnFreezeGScope.setAttribute('data-text', options.text || 'Loading');
            if (document.querySelector(options.selector)) {
                SnFreezeGScope.style.position = 'absolute';
            }
            parent.appendChild(SnFreezeGScope);
        }
    }

    window.SnFreeze = SnFreeze;
})();