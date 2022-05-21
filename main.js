"use strict"

//imports de las clases
import Storage from "./scripts/helpers/Storage.js";
import PaintThing from "./scripts/helpers/PaintThing.js";
import UI from "./scripts/Ui.js";
import AllData from "./scripts/helpers/AllData.js"
import IntObs from "./scripts/IntObs.js";
import Contacto from "./scripts/sections/Contacto.js";
import Cart from "./scripts/sections/Cart.js";
import SetSwiper from "./scripts/sections/Swiper.js";// Forma el home slider y el reviews slider
import Gallery from "./scripts/sections/Gallery.js";
import ShowGallery from "./scripts/sections/ShowGallery.js";
import Product from "./scripts/sections/Product.js";
import Header from "./scripts/sections/Header.js";
/* import Mapa from "./scripts/mapa.js"; */

//instancias de las clases
let storage = new Storage();
let ui = new UI();
let paintThing = new PaintThing();
let allData = new AllData();
let intObs = new IntObs()
let contacto = new Contacto();
let cart = new Cart();
let swiper = new SetSwiper();
let gallery = new Gallery();
let showGallery = new ShowGallery();
let product = new Product();
let header = new Header();
/* let mapa = new Mapa(); */

console.log(product)
//set y traspaso de instancias de clase para su uso;
product.setPaintThing(paintThing);
product.setCart(cart);
product.setStorage(storage);

gallery.setShowGallery(showGallery);
showGallery.setPaintThing(paintThing);

cart.setStorage(storage);
cart.setPaintThing(paintThing);

intObs.setPaintThing(paintThing);
intObs.setHeader(header);

ui.setCart(cart);
ui.setProduct(product);
ui.setGallery(gallery);
ui.setShowGallery(showGallery)
ui.setContact(contacto);
ui.setSwiper(swiper)


//Se llama la funcion que activa el loading de inicio
ui.fadeOutLoader();

document.addEventListener("DOMContentLoaded", e => {
  Promise.all([...allData.allData()])
  .then(items => {
    let objData = {
      home:[...items[0]],
      reviews:[...items[1][0],...items[1][1]],
      gallery:[...items[2]],
      products:[...items[3]],
    }
    return objData
  })
  .then((objData)=> {
    intObs.setInitialData(objData);
    intObs.interseptionObserver();
  })
  .then(() => {
    ui.uiLogic();
  })
  .catch(err => console.log(err));
})

/* hay que probar con el metodo de la clase desde IntObs.js
const mapaContact = document.getElementById("map");
const setInitalMapa = (() => {
  let coord = {lat:-33.4179935, lng: -70.6063901}
  const mapa = new google.maps.Map(mapaContact,{
    zoom: 10,
    center: coord
  })
})() */