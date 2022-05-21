"use strict"

const itemsNavbar = document.querySelectorAll(".navbar a");

class IntObs{

  #initialData;
  #paintThing;
  #header;
  /* #map */

  constructor(){
    this.#initialData = null;
    this.#paintThing = null;
    this.#header = null;
    /* this.#map = null; */
  }

  //setea la clase Header (desde main.js) para su uso
  setHeader(header){
    this.#header = header;
  }

  //setea la clase PaintThing (desde main.js) para su uso
  setPaintThing(paintThing){
    this.#paintThing = paintThing
  }

  //trae la data (desde main.js) para su uso
  setInitialData(initialData){
    this.#initialData = initialData;
  }


  //setea mapa
/*   setMap(map){
    this.#map = map;
  }
 */

  //activa la opción del menu navbar segun la posicion que tengo en la página
  #setItemMenu(id){
    itemsNavbar.forEach(item => {
      if(item.dataset.id === id) this.#header.setMenuItemSelected(item);
    })
  }

  interseptionObserver(){
    const section = document.querySelectorAll("section");

    const callback = (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          if(entry.target.id === "home"){
            this.#setItemMenu(entry.target.id);
            this.#paintThing.homeSlider(this.#initialData.home)
          }
          if(entry.target.id === "reviews"){
            this.#setItemMenu(entry.target.id);
            this.#paintThing.reviewsItemSlider(this.#initialData.reviews)
          }
          if(entry.target.id === "gallery"){
            this.#setItemMenu(entry.target.id);
            this.#paintThing.imagensGallery(this.#initialData.gallery)
          }
          if(entry.target.id === "productos"){
            this.#setItemMenu(entry.target.id);
            this.#paintThing.products(this.#initialData.products)
          }
          if(entry.target.id === "contact"){
            this.#setItemMenu(entry.target.id);
            /* this.#map.setInitalMapa(); */
          }
        }
      })
    }
    const observer = new IntersectionObserver(callback, {threshold:0.1})
    section.forEach(sec => observer.observe(sec))
  }
}

export default IntObs;