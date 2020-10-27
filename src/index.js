// import '@babel/polyfill';
import 'bootstrap/js/src/modal';
import Inputmask from "inputmask";
import AOS from 'aos';

// Styles
import './styles/main.scss';
// import Slider from './components/slider/slider';

// Components
import './components/s-work-slider/s-work-slider';
import './components/s-partners-slider/s-partners-slider';
// import './components/partners-slider/partners-slider;
// import './components/works-slider/works-slider;

document.addEventListener('DOMContentLoaded', () => {
    const selector = document.querySelector('[type=tel]');

    // console.log(111 , Swiper);

    Inputmask('+7 (999) 999-99-99', {showMaskOnHover: false}).mask(selector);

    AOS.init({
        once: true
    });
});

