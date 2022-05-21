"use strict"


const loaderItem = document.getElementById("loading");


class UI{

  #header;
  #product;
  #cart;
  #gallery;
  #showGallery;
  #contacto;
  #swiper;

  constructor(){
    this.#header = null;
    this.#cart = null;
    this.#contacto = null;
    this.#gallery = null;
    this.#product = null;
    this.#showGallery = null;
    this.#swiper = null;
  }

  //set de la clase Header (desde main.js) para su uso
  setHeader(header){
    this.#header = header;
  }

  //set de la clase Product (desde main.js) para su uso
  setProduct(product){
    this.#product = product;
  }

  //set de la clase Cart (desde main.js) para su uso
  setCart(cart){
    this.#cart = cart;
  }

  //set de la clase Gallery (desde main.js) para su uso
  setGallery(gallery){
    this.#gallery = gallery;
  }

  //set de la clase ShowGallery (desde main.js) para su uso
  setShowGallery(showGallery){
    this.#showGallery = showGallery;
  }

  //set de la clase Contact (desde main.js) para su uso
  setContact(contact){
    this.#contacto = contact;
  }

  setSwiper(swiper){
    this.#swiper = swiper;
  }

  //saca el loader de inicio (llamdo desde main.js)
  fadeOutLoader(){
    setTimeout(this.#loader, 2000)
  }

  //aplica la clase que desactiva el loader;
  #loader(){
    loaderItem.classList.add("desactive");
  }

  uiLogic(){
    this.#header.headerUi();
    this.#swiper.swipersToo(); //da forma al home y reviews
    this.#cart.cartUi();
    this.#product.productUi();
    this.#gallery.galleryUi();
    this.#showGallery.showGalleryUi();
    this.#contacto.contactoUi();
    /* intObs.setMap(mapa); */
  }
}

export default UI;