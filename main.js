"use strict"

//imports de las clases
import Storage from "./scripts/Storage.js";
import PaintThing from "./scripts/PaintThing.js";
import UI from "./scripts/Ui.js";
import AllData from "./scripts/AllData.js"
import IntObs from "./scripts/IntObs.js";
import Form from "./scripts/form.js";
import ManageCart from "./scripts/ManageCart.js";
/* import Mapa from "./scripts/mapa.js"; */

//instancias de las clases
let storage = new Storage();
let ui = new UI();
let paintThing = new PaintThing();
let allData = new AllData();
let intObs = new IntObs()
let form = new Form();
let manageCart = new ManageCart();
/* let mapa = new Mapa(); */

//seteo y traspaso de clases instancias de clase para su uso;
ui.setStorage(storage);
ui.setPaintThing(paintThing);
ui.setForm(form);
ui.setManageCart(manageCart);
manageCart.setStorage(storage);
manageCart.setPaintThing(paintThing);
intObs.setPaintThing(paintThing);
intObs.setUi(ui);
ui.fadeOutLoader();
/* intObs.setMap(mapa); */



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