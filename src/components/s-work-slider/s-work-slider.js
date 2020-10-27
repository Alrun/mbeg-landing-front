import Slider from '../slider/slider';

const options = {
    lazy: true,
    loop: true,
    slidesPerView: 1,

    breakpoints: {
        // when window width is >= 576px
        576: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // when window width is >= 960px
        992: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    },
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-work-slider').forEach((item) => {
        new Slider(item, options);
    });
});

