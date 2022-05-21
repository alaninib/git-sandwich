"use strict"

const productos = document.getElementById("productos");
const inputSeachProd = document.getElementById("search_prod");
const btnCart = document.getElementById("btn-carrito"); //header;
const navbar = document.querySelector(".navbar");//header;
const filterOptionsBtn = document.querySelector(".fa-elementor");
let allProd,filterProd;


class Product{

  #paintThing;
  #cart;
  #storage;

  constructor(){
    this.#paintThing = null;
    this.#cart = null;
    this.#storage = null;
  }
  
  //setea la clase Cart (desde main.js) para su uso;
  setCart(cart){
    this.#cart = cart;
  }

  //setea la clase PaintThing (desde main.js) para su uso
  setPaintThing(paintThing){
    this.#paintThing = paintThing;
  }

  //setea la clase Storage (desde main.js) para su uso
  setStorage(storage){
    this.#storage = storage;
  }

  //toma los productos y los guarda en la variable global "allProd" para usar la informacion;
  #getAllProductos(){
    allProd = this.#storage.getProducts();
    return allProd;
  }
  
  /*a partir de allProd se tomarán las categorias de cada producto*/
  #setAllCategories(){
    let allCategories = ["todos", ...new Set(allProd.map(prod => prod.category))];
    this.#paintThing.setFilterProdBtn(allCategories);
  }

  //setea filtros marcados segun accion en panel de filtros de products;
  #setFiltersUpDown(){
    document.querySelectorAll(".productos .upDown i").forEach(item => item.classList.remove("active"));
  }

  //escuchadores de eventos de Products;
  #listenerProduct(){

    addEventListener("scroll", e => {
      productos.querySelector(".opciones .container-opciones").classList.remove("active");
      filterOptionsBtn.classList.remove("desactivar");
    });

    productos.addEventListener("click", e => {
      inputSeachProd.value = "";
      let elem = e.target;

      if(elem.classList.contains("fa-arrow-up-wide-short") || elem.classList.contains("fa-arrow-down-short-wide")){
        this.#setFiltersUpDown(elem);
        elem.classList.add("active");
        document.querySelector(".select").value = document.querySelector(".select").children[0].value;
        this.#paintThing.products(allProd.reverse(), "filter");
      }else{
        this.#setFiltersUpDown();
      };

      if(elem.classList.contains("fa-cart-shopping")){
        cart.classList.add("active");
        btnCart.classList.add("active")
        this.#cart.itemToCart(elem.dataset.id);
      }

      if(elem.classList.contains("input_group__input")){
        inputSeachProd.focus();
      }
    });

    document.querySelector(".select").addEventListener("change", e => {
      if(e.target.value === "todos"){
        this.#paintThing.products(allProd, "filter")
      }else{
        filterProd = allProd.filter( prod => prod.category === e.target.value);
        this.#paintThing.products(filterProd, "filter");
      }
    })

    filterOptionsBtn.addEventListener("click", e => {
      setTimeout(() =>{
        filterOptionsBtn.classList.add("desactivar");
        productos.querySelector(".opciones .container-opciones").classList.add("active")
      }, 800)
      navbar.querySelector(".productRef").click();//lleva la pagina a esa section;
    })


    inputSeachProd.addEventListener("input", e => {
      filterProd = allProd.filter(prod => (
        prod.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        prod.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        prod.ingredientes.join("").toLowerCase().includes(e.target.value.toLowerCase())
        ));
      filterProd ? this.#paintThing.products(filterProd, "filter") : this.#paintThing.products([],"filter");
    })
  }

  productUi(){
    this.#getAllProductos();
    this.#setAllCategories();
    this.#listenerProduct();
  }
}

export default Product;