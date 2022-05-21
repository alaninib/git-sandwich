"use strict"

const itemReviewSlider = document.getElementById("review-item-template").content;
const galleryItem = document.getElementById("gallery-item-template").content;
const productTemplate = document.getElementById("product-item-template").content;
const homeSlider = document.getElementById("home-item-template").content;
const itemCart = document.getElementById("cart-item-template").content;
const itemContentReviewSlider = document.querySelector(".review-slider__wrapper");
const galleyContainer = document.querySelector(".gallery .gallery-container");
const homeSliderContainer = document.querySelector(".home .home-slider .home-wrapper");
const productsContainer = document.querySelector(".productos .container-prod");
const contFilterProdA = document.querySelector(".productos .opciones .categoria-select");
const cartItemContainer = document.querySelector(".content-itemCart");
const showGallery = document.getElementById("show-gallery");
let fragment = document.createDocumentFragment();

class PaintThing{

  //renderiza los reviews en panatalla
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

  //rederiza la galeria en pantalla
  imagensGallery(images){
    if(galleyContainer.children.length > 0) return;
      images.forEach(image => {
        let template = galleryItem.cloneNode(true);
        template.querySelector(".gallery-item").dataset.id = image.id;
        template.querySelector(".gallery-item__image").src = `./assets/images/galeria/${image.name}.jpg`;
        template.querySelector(".gallery-item__image").alt = image.name;
        template.querySelector(".fa-magnifying-glass").dataset.id = image.id;
        fragment.appendChild(template);
      })
      galleyContainer.appendChild(fragment);
  }

  //rederiza la imagen a mostrar en le show-gallery
  imgToShowGallery(imgData){
    let {img, alt} = imgData;
    showGallery.querySelector(".container-image__image").src = img;
    showGallery.querySelector(".container-image__image").alt = alt;
  }

  //filtra el tipo de renderizado de productos
  products(products, type){
    /*si la variable type trae valor es porque se estan filtrando los productos desde su panel 
    (posterior al primer renderizado); */
    if(type === "filter"){
      productsContainer.textContent = "";
      if(!products.length) this.messaggeFilter();
      else{
        this.#addProducto(products);
      }
    }else{
      //se renderizan los productos al llegar a esa section desde IntObs.js (el primer renderizado);
      if(productsContainer.children.length > 0) return;/*Este se ejecuta desde IntObs.js (el observer) */
      this.#addProducto(products);
    }
  }

  //agrega productos al panel
  #addProducto(products){
    products.forEach(product => {
      let template = productTemplate.cloneNode(true);
      template.querySelector(".product").dataset.id = product.id;
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

  //en caso de que al filtrar productos que no se encuentran
  messaggeFilter(){
    let noExiste = document.createElement("H2");
    noExiste.classList.add("heading");
    noExiste.textContent = "El producto ingresado no existe"
    productsContainer.appendChild(noExiste);
  }

  //renderiza las categorias de productos para poder filtrarlos
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

  //renderiza los item para el slider del home
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

  //pinta los items enviados al carrito;
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