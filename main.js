"use strict"
/*test */
import Storage from "./scripts/Storage.js";
import PaintThing from "./scripts/PaintThing.js";
import UI from "./scripts/Ui.js";
import AllData from "./scripts/AllData.js"
import IntObs from "./scripts/IntObs.js";

let storage = new Storage();
let ui = new UI();
let paintThing = new PaintThing();
let allData = new AllData();
let intObs = new IntObs()

ui.fadeOutLoader();
ui.setStorage(storage);
ui.setPaintThing(paintThing);
intObs.setPaintThing(paintThing);
intObs.setUi(ui);



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
