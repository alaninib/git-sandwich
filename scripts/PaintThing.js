"use strict"

let itemReviewSlider = document.getElementById("review-item__slider").content;
let imageGalleryShow = document.getElementById("show-gallery-item").content;
let productTemplate = document.getElementById("product-template").content;
let homeSlider = document.getElementById("home-slider-item").content;
let itemCart = document.getElementById("item-cart").content;
const itemContentReviewSlider = document.querySelector(".review-slider__wrapper");
const galleyShowContainer = document.querySelector(".gallery .gallery-container");
const homeSliderContainer = document.querySelector(".home .home-slider .home-wrapper");
const productsContainer = document.querySelector(".productos .container-prod");
const contFilterProdA = document.querySelector(".productos .opciones .categoria-select");
const cartItemContainer = document.querySelector(".content-itemCart");
let fragment = document.createDocumentFragment();

class PaintThing{

  reviewsItemSlider(persons){
    if(itemContentReviewSlider.children.length > 0) return;
      persons.forEach(person => {
        let template = itemReviewSlider.cloneNode(true);
        template.querySelector(".superior__img").setAttribute("src", person.avatar);
        template.querySelector(".superior__name").textContent = `${person.first_name} ${person.last_name}`;
        fragment.appendChild(template)
      })
    itemContentReviewSlider.appendChild(fragment);
  }

  imagensToShowGallery(images){
    if(galleyShowContainer.children.length > 0) return;
      images.forEach(image => {
        let template = imageGalleryShow.cloneNode(true);
        template.querySelector(".gallery-item").dataset.id = image.id;
        template.querySelector(".gallery-item__image").src = `./assets/images/galeria/${image.name}.jpg`;
        template.querySelector(".gallery-item__image").alt = image.name;
        fragment.appendChild(template);
      })
    galleyShowContainer.appendChild(fragment);
  }

  products(products, type){
    if(type === "filter"){
      productsContainer.textContent = "";
      if(!products.length) this.messaggeFilter();
      else{
        this.#addProducto(products);
      }
    }else{
      if(productsContainer.children.length > 0) return;/*Este se ejecuta desde IntObs.js (el observer) */
      this.#addProducto(products);
    }
  }

  #addProducto(products){
    products.forEach(product => {
      let template = productTemplate.cloneNode(true);
      template.querySelector(".product .title").textContent = product.title;
      template.querySelector(".img_product").src = `./assets/images/prod/${product.name}.png`
      template.querySelector(".img_product").alt = product.name;
      template.querySelector(".price").textContent = `$${product.price.toFixed(3)}`
      template.querySelector(".product .ingredientes p").textContent = product.ingredientes.join(", ");
      template.querySelector(".fa-cart-shopping").dataset.id = product.id
      fragment.appendChild(template);
    })
    productsContainer.appendChild(fragment);
  }

  messaggeFilter(){
    let noExiste = document.createElement("H2");
    noExiste.classList.add("heading");
    noExiste.textContent = "El producto ingresado no existe"
    productsContainer.appendChild(noExiste);
  }

  setFilterProdBtn(categoriesArr){
    let select = document.createElement("SELECT");
    select.classList.add("select");
    categoriesArr.forEach(category => {
      let option = document.createElement("OPTION");
      option.setAttribute("value", category);
      option.dataset.id = category;
      option.textContent = category;
      fragment.appendChild(option);
      return fragment;
    })
    select.appendChild(fragment);
    contFilterProdA.appendChild(select);
  }

  homeSlider(homeData){
    if(homeSliderContainer.children.length > 0) return;
    homeSliderContainer.classList.add("active");
    let homeImages = homeData.map(homeD => {
      let template = homeSlider.cloneNode(true);
      template.querySelector(".home-slider__item").style.setProperty("background", `url(./assets/images/home/${homeD.img}.jpg) no-repeat`);
      template.querySelector(".home-slider__item h3").textContent = homeD.h3;
      template.querySelector(".home-slider__item p").textContent = homeD.parraf;
      fragment.appendChild(template);
      return fragment;
    })
    homeSliderContainer.appendChild(...homeImages);
  }

  paintCart(itemsCart){
    cartItemContainer.textContent = "";
    let itemsCartData = itemsCart.map(itemcart => {
      let template = itemCart.cloneNode(true);
      template.querySelector(".itemCart__img").src = `./assets/images/prod/${itemcart.name}.png`;
      template.querySelector(".itemCart__img").alt = itemcart.name;
      template.querySelector(".itemCart__title").textContent = itemcart.title;
      template.querySelector(".itemCart__price span").textContent = itemcart.price;
      template.querySelector(".itemCart__more .fa-plus").dataset.id = itemcart.id;
      template.querySelector(".itemCart__more .fa-minus").dataset.id = itemcart.id;
      template.querySelector(".itemCart__more .fa-trash-can").dataset.id = itemcart.id;
      template.querySelector(".itemCart__cantidadItem").textContent = itemcart.cantidad;
      fragment.appendChild(template);
      return fragment;
    })
    cartItemContainer.appendChild(...itemsCartData);
  }
}

export default PaintThing;