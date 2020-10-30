export default class Form {
    constructor(el) {
        this.el = el;

        this.nodes = {
            input: this.el.querySelector('input'),
            file: this.el.querySelector('.input-file__selected')
        }

        this.init();
    }

    init() {
        this.setListeners();

    }

    setListeners() {
        this.nodes.input.addEventListener('change', (e) => {
            if (e.currentTarget.type === 'file' && this.nodes.file) {
                this.nodes.file.innerHTML = this.setFileText(e.currentTarget.files[0]);
            }

            this.changeHandler(e.target)
        });
    }

    changeHandler(input) {
        this.toggleFilled(input.closest('.js-form-input'), input.value.trim().length)
    }

    toggleFilled(item, bool) {
        bool ? item.classList.add('is-filled') : item.classList.remove('is-filled')
    }

    setFileText(file) {
        if (!file) return '';

        let val;
        let size = file.size + '';

        if (file.size < 1000) {
            val = 'Б';
        } else if (file.size > 1000 && file.size < 1000000) {
            size = size.slice(0, -3);
            val = 'КБ'
        } else {
            size = size.slice(0, -6);
            val = 'MБ'
        }

        return `<div>${file.name}</div><span>(${size}${val})</span>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-form-input').forEach((item) => {
        new Form(item);
    });
});
