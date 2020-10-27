import Slider from '../slider/slider';

const options = {
    loop: true,
    slidesPerView: 1,

    breakpoints: {
        // when window width is >= 576px
        576: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        // when window width is >= 960px
        960: {
            slidesPerView: 5,
            spaceBetween: 30
        }
    },
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-partners-slider').forEach((item) => {
        new Slider(item, options);
    });
});


