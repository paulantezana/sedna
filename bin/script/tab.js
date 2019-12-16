(()=>{
    const SnTab = {
        storage: [],
        init() {
            let tabs = document.querySelectorAll('.SnTab');
            for (let i = 0; i < tabs.length; i++) {
                let exist = this.storage.find(item => item === tabs[i]);
                if(!exist){
                    let snTabHeader = tabs[i].querySelector('.SnTab-header');
                    let snTabContents = tabs[i].querySelectorAll('.SnTab-content');
                    let snTabTitles = snTabHeader.children;
                    
                    for (let t = 0; t < snTabTitles.length; t++) {
                        snTabTitles[t].addEventListener('click', e => {
                            openTab(t);
                        });
                    }
        
                    const openTab = n => {
                        for (let t = 0; t < snTabTitles.length; t++) {
                            snTabTitles[t].classList.remove('is-active');
                        }
                        for (let c = 0; c < snTabContents.length; c++) {
                            snTabContents[c].classList.remove('is-active');
                        }
                        snTabContents[n].classList.add('is-active');
                        snTabTitles[n].classList.add('is-active');
                    }

                    openTab(0);

                    this.storage.push(tabs[i]);
                }
            }
        },
        reload(){
            this.init();
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        SnTab.init();
    });
    window.SnTab = SnTab
})();