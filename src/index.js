// import '@babel/polyfill';
import 'bootstrap/js/src/modal';
import Inputmask from "inputmask";
import AOS from 'aos';

// Styles
import './styles/main.scss';

// Components
import './components/s-work-slider/s-work-slider';
import './components/s-partners-slider/s-partners-slider';
import './components/s-form/s-form';

document.addEventListener('DOMContentLoaded', () => {
    const selector = document.querySelector('[type=tel]');

    Inputmask('+7 (999) 999-99-99', {showMaskOnHover: false}).mask(selector);

    AOS.init({
        once: true
    });
});

