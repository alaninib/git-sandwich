"use strict"
import ManageCart from "./ManageCart.js"
import SetSwiper from "./Swiper.js";
import Form from "./form.js";

const barBtn = document.getElementById("menu-btn-bars");
const gallery = document.getElementById("gallery");
const productos = document.getElementById("productos")
const showGallery = document.getElementById("show-gallery");
const navbar = document.querySelector(".navbar");
const inputSeachProd = document.getElementById("input_group__input");
const cart = document.getElementById("cart");
const btnCart = document.getElementById("btn-carrito");
const filterOptionsBtn = document.querySelector(".fa-elementor");
const switchBtn = document.getElementById("switch");
const loaderItem = document.getElementById("loading");
const formCont = document.getElementById("formulario");
let allProd,filterProd;


class UI{

  #manageCart;
  #formulario;

  constructor(){
    this.paintThing = null;
    this.storage = null;
    this.#formulario = new Form();
    this.#manageCart = new ManageCart();
  }
  
  setPaintThing(paintThing){
    this.paintThing = paintThing;
    this.setPaintThingFormManageCart(paintThing);
  }

  setStorage(storage){
    this.storage = storage;
    this.setStorageForManageCart(storage);
  }

  setStorageForManageCart(storage){
    this.#manageCart.setStorage(storage);
  }

  setPaintThingFormManageCart(paintThing){
    this.#manageCart.setPaintThing(paintThing);
  }

  fadeOutLoader(){
    setTimeout(this.#loader, 2000)
  }

  #setSwiper(){
    let swiperObj = new SetSwiper();
    return swiperObj;
  }

  #loader(){
    loaderItem.classList.add("desactive");
  }

  #getAllProductos(){
    allProd = this.storage.getProducts();
    return allProd;
  }
  
  #setAllCategories(){
    let allCategories = ["todos", ...new Set(allProd.map(prod => prod.category))];
    this.paintThing.setFilterProdBtn(allCategories);
  }

  #moveShowGallery(parentNode, to){
    let lastImage = document.querySelectorAll(".gallery .gallery-item").length;
    let alt = parentNode.querySelector(".container-image__image").alt;
    let posicionImage = parseInt(alt.substring(2, alt.length));
    switch (to){
      case "l":{
        if(posicionImage > 1){
          parentNode.querySelector(".container-image__image").alt = `g-${posicionImage - 1}`
          parentNode.querySelector(".container-image__image").src = `./assets/images/galeria/g-${posicionImage - 1}.jpg`
        } else if(posicionImage === 1){
          parentNode.querySelector(".container-image__image").alt = `g-${lastImage}`
          parentNode.querySelector(".container-image__image").src = `./assets/images/galeria/g-${lastImage}.jpg`
        }
        break;
      }
      case "r":{
        if(posicionImage < lastImage){
          parentNode.querySelector(".container-image__image").alt = `g-${posicionImage + 1}`
          parentNode.querySelector(".container-image__image").src = `./assets/images/galeria/g-${posicionImage + 1}.jpg`
        } else if(posicionImage === lastImage){
          parentNode.querySelector(".container-image__image").alt = `g-1`
          parentNode.querySelector(".container-image__image").src = `./assets/images/galeria/g-${1 + (lastImage - lastImage)}.jpg`
        }
        break;
      }
    }
  }

  setMenuItemSelected(menuItem){
    navbar.querySelectorAll(".navbar__item").forEach(item => item.classList.remove("active"));
    menuItem.classList.add("active");
    navbar.classList.remove("active");
    barBtn.classList.remove("fa-times");
  }

  #listeners(){
    addEventListener("scroll", e => {
      productos.querySelector(".opciones .container-opciones").classList.remove("active");
      filterOptionsBtn.classList.remove("desactivar");
    });

    switchBtn.addEventListener("click", e => {
      switchBtn.classList.toggle("active");
      document.body.classList.toggle("dark");
    })

    btnCart.addEventListener("click", (e) => {
      cart.classList.add("active");
    })

    navbar.querySelectorAll(".navbar__item").forEach(item => {
      item.addEventListener("click", e => {this.setMenuItemSelected(e.target)})
    });

    productos.addEventListener("click", e => {
      inputSeachProd.value = "";

      if(e.target.classList.contains("fa-arrow-up-wide-short") || 
        e.target.classList.contains("fa-arrow-down-short-wide")){
        document.querySelectorAll(".productos .upDown i").forEach(item => item.classList.remove("active"));
        document.querySelector(".select").value = document.querySelector(".select").children[0].value;
        e.target.classList.add("active");
        this.paintThing.products(allProd.reverse(), "filter");
      }else{
        document.querySelectorAll(".productos .upDown i").forEach(item => item.classList.remove("active"));
      };

      if(e.target.classList.contains("fa-cart-shopping")){
        cart.classList.add("active");
        btnCart.classList.add("active")
        this.#manageCart.itemToCart(e.target.dataset.id);
      }

      if(e.target.classList.contains("input_group__input")){
        inputSeachProd.focus();
      }

      document.querySelector(".select").addEventListener("click", e => {
      })
    });

    inputSeachProd.addEventListener("input", e => {
      filterProd = allProd.filter(prod => (
        prod.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        prod.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        prod.ingredientes.join("").toLowerCase().includes(e.target.value.toLowerCase())
        ));
      filterProd ? this.paintThing.products(filterProd, "filter") : this.paintThing.products([],"filter");
    })

    document.querySelector(".select").addEventListener("change", e => {
      if(e.target.value === "todos"){
        this.paintThing.products(allProd, "filter")
      }else{
        filterProd = allProd.filter( prod => prod.category === e.target.value);
        this.paintThing.products(filterProd, "filter");
      }
    })

    barBtn.addEventListener("click", e => {
      barBtn.classList.toggle("fa-times")
      navbar.classList.toggle("active")
    })

    filterOptionsBtn.addEventListener("click", e => {
      navbar.querySelector(".productRef").click();
      setTimeout(() =>{
        filterOptionsBtn.classList.add("desactivar");
        productos.querySelector(".opciones .container-opciones").classList.add("active")
      } ,800)
    })
    
    showGallery.addEventListener("click", e => {

      if(e.target.classList.contains("fa-times")){
        showGallery.classList.remove("active");
      } 
      
      if(e.target.classList.contains("fa-chevron-right")){
        this.#moveShowGallery(e.target.parentNode, "r");
      }

      if(e.target.classList.contains("fa-chevron-left")){
        this.#moveShowGallery(e.target.parentNode, "l");
      }
      
    });

    gallery.querySelector(".gallery-container").addEventListener("click", e => {
      if(e.target.classList.contains("fa-magnifying-glass")){
        showGallery.querySelector(".container-image__image").src = e.target.previousElementSibling.src;
        showGallery.querySelector(".container-image__image").alt = e.target.previousElementSibling.alt;
        showGallery.classList.add("active");
      }
    });

    cart.addEventListener("click", (e)=> {
      if(e.target.classList.contains("fa-times")) cart.classList.remove("active");
      if(e.target.classList.contains("fa-plus")) this.#manageCart.sumItemCart(e.target.dataset.id);
      if(e.target.classList.contains("fa-minus")) this.#manageCart.restItemCart(e.target.dataset.id);
      if(e.target.classList.contains("fa-trash-can")) this.#manageCart.removeItemFromCart(e.target.dataset.id);
      if(e.target.classList.contains("btn")) this.#manageCart.solicitudProdCart();
    })

    formCont.addEventListener("submit", e => {
      e.preventDefault();
      this.#formulario.validaInput();
      if(this.#formulario.isFormValid()){
        formCont.reset();
        alert("Muchas gracias!!, lo contactaremos en breve..")
      };
    })
  }

  uiLogic(){
    this.#getAllProductos();
    this.#manageCart.setinitialCart();
    this.#setAllCategories();
    this.#listeners();
    this.#setSwiper().swipersToo();
  }
}

export default UI;
