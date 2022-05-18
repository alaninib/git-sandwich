"use strict"

const reviewSlider = document.querySelector(".review-slider");
const gallerySlider = document.querySelector(".gallery-container");
const homeSlider = document.querySelector(".home-slider");

class SetSwiper{

  swipersToo(){
    const swiperHome = new Swiper(homeSlider,{
      /*las tres primeras necesarias para que este tipo de slider (de swiper) arranque al instante de visualizarce*/
      observer:true,
      observerParents: true,
      parallax: true,
      /* slidesPerView: 1, */
      /* loop:true, */
      grabCursor: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".home-slider .swiper-button-next",
        prevEl: ".home-slider .swiper-button-prev",
      },
    });

    const swiperReviews = new Swiper(reviewSlider,{
      spaceBetween: 10,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination:{
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        450: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
        1000: {
          slidesPerView: 4,
        },
      },
    });

    const swiperGallery = new Swiper(gallerySlider,{
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        450: {
          slidesPerView: 1,
        },
        800: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 4,
        },
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      
    });
  }
}

export default SetSwiper;