(() => {
    let SnMessageGScope = document.createElement('div');
    SnMessageGScope.classList.add('SnMessage-gScope');

    let SnMessage = {
        transitionLength: 700,
        info({ content = '', duration = 6000 }) {
            this.message(content, duration, 'info', 'info');
        },
        success({ content = '', duration = 6000 }) {
            this.message(content, duration, 'success', 'success');
        },
        error({ content = '', duration = 6000 }) {
            this.message(content, duration, 'error', 'error');
        },
        warning({ content = '', duration = 6000 }) {
            this.message(content, duration, 'warning', 'warning');
        },
        message(message, time, addClass = 'default', type = "question") {
            if (!time || time === 'default') {
                time = 20000;
            }
            let messageEl = document.createElement('div');
            messageEl.classList.add('SnMessage', addClass);
            messageEl.innerHTML = `<span class="SnMessage-icon">${SnIcon[type]}</span>${message}`;

            SnMessageGScope.prepend(messageEl);
            setTimeout(
                () => messageEl.classList.add('open')
            );
            setTimeout(
                () => messageEl.classList.remove('open'),
                time
            );
            setTimeout(
                () => SnMessageGScope.removeChild(messageEl),
                time + this.transitionLength
            );
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(SnMessageGScope);
    });

    window.SnMessage = SnMessage
})();