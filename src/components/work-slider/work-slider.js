import Swiper, { Navigation, Pagination } from 'swiper';

export class Slider {
    constructor(el) {
        this.el = el;

        this.nodes = {
            container: this.el.querySelector('.swiper-container'),
            next: this.el.querySelector('.swiper-button-next'),
            prev: this.el.querySelector('.swiper-button-prev'),
            pagination: this.el.querySelector('.swiper-pagination')
        }

        this.sliderSpeed = parseInt(this.el.getAttribute('data-speed'), 10);
        this.slider = null;

        this.init();
    }

    init() {
        this.initSlider();

        setTimeout(() => {
            console.log(this.slider);
            // this.slider.navigation.nextEl
        }, 3000)
    }

    initSlider() {
        console.log(this.nodes);
        const options = {
            // Optional parameters
            // direction: 'vertical',
            loop: true,
            slidesPerView: 1,

            breakpoints: {
                // when window width is >= 576px
                576: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // when window width is >= 960px
                960: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            },

            pagination: {
                el: this.nodes.pagination,
                clickable: true
            },

            navigation: {
                nextEl: this.nodes.next,
                prevEl: this.nodes.prev,
            },

            speed: this.sliderSpeed,
            // slidesPerView: 3,
            // // spaceBetween: 0,
            // simulateTouch: false,
            // navigation: {
            //     nextEl: this.next,
            //     prevEl: this.prev,
            // },
            // breakpoints: {
            //     768: {
            //         slidesPerView: 1,
            //         simulateTouch: true,
            //     },
            // },
            // pagination: {
            //     el: this.pagination,
            //     type: 'bullets',
            //     clickable: true,
            // },
        };

        Swiper.use([Navigation, Pagination]);

        this.slider = new Swiper(this.nodes.container, options);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-work-slider').forEach((item) => {
        new Slider(item);
    });
});
