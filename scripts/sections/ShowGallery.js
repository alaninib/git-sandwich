"use strict"

const showGallery = document.getElementById("show-gallery");


class ShowGallery{

  constructor(){
    this.paintThing = null;
  }

  setPaintThing(paintThing){
    this.paintThing = paintThing;
  }

  paintImgtoShow(imgData){
    this.paintThing.imgToShowGallery(imgData);
    showGallery.classList.add("active");
  }

  //funcionamiento de los botones panel show-gallery
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
          parentNode.querySelector(".container-image__image").src = `./assets/images/galeria/g-1.jpg`
        }
        break;
      }
    }
  }


  #listenerShowGallery(){
    
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
  }

  showGalleryUi(){
    this.#listenerShowGallery();
  }

}

export default ShowGallery;