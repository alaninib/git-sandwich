"use strict"

const itemsNavbar = document.querySelectorAll(".navbar a");

class IntObs{

  #initialData
  #paintThing
  #ui

  constructor(){
    this.#initialData = null;
    this.#paintThing = null;
    this.#ui = null;
  }

  setUi(ui){
    this.#ui = ui;
  }

  setInitialData(initialData){
    this.#initialData = initialData;
  }

  setPaintThing(paintThing){
    this.#paintThing = paintThing
  }

  #setItemMenu(id){
    itemsNavbar.forEach(item => {
      if(item.dataset.id === id) this.#ui.setMenuItemSelected(item);
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
            this.#paintThing.imagensToShowGallery(this.#initialData.gallery)
          }
          if(entry.target.id === "productos"){
            this.#setItemMenu(entry.target.id);
            this.#paintThing.products(this.#initialData.products)
          }
          if(entry.target.id === "contact"){
            this.#setItemMenu(entry.target.id);
          }
        }
      })
    }
    const observer = new IntersectionObserver(callback, {threshold:0.1})
    section.forEach(sec => observer.observe(sec))
  }
}

export default IntObs;