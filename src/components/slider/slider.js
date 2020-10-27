import Swiper, { Navigation, Pagination, Lazy } from 'swiper';

export default class Slider {
    constructor(el, options) {
        this.el = el;
        this.options = options;

        this.nodes = {
            container: this.el.querySelector('.swiper-container'),
            next: this.el.querySelector('.swiper-button-next'),
            prev: this.el.querySelector('.swiper-button-prev'),
            pagination: this.el.querySelector('.swiper-pagination')
        }

        this.sliderSpeed = parseInt(this.el.getAttribute('data-speed'), 10);
        this.slider = null;
        this.Swiper = Swiper;

        this.init();
    }

    init() {
        this.initSlider();
    }

    initSlider() {
            const options = {
                lazy: true,
                // lazy: {
                //     loadPrevNext: true,
                // },
                // Optional parameters
                // direction: 'vertical',
                // loop: true,
                // slidesPerView: 1,

                // breakpoints: {
                //     // when window width is >= 576px
                //     576: {
                //         slidesPerView: 2,
                //         spaceBetween: 30
                //     },
                //     // when window width is >= 960px
                //     960: {
                //         slidesPerView: 3,
                //         spaceBetween: 30
                //     }
                // },

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


        Swiper.use([Navigation, Pagination, Lazy]);

        this.slider = new Swiper(this.nodes.container, {...options, ...this.options});
    }
}

