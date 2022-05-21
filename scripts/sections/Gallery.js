"use strict"

const gallery = document.getElementById("gallery");
const galleryContainer = gallery.querySelector(".gallery-container");

class Gallery{

  #showGallery;

  constructor(){
    this.#showGallery = null;
  }

  setShowGallery(showGallery){
    this.#showGallery = showGallery;
  }

  #listenerGlaleria(){
    galleryContainer.addEventListener("click", e => {
      if(e.target.classList.contains("fa-magnifying-glass")){
        let imgData = this.#getImgData((e.target.dataset.id));
        this.#showGallery.paintImgtoShow(imgData);
      }
    });
  }

  #getImgData(idImg){
    let imgData = {};
    [...galleryContainer.children].forEach(item => {
      if(item.dataset.id.toString() === idImg.toString()){
        const imgItem = item.querySelector(".gallery-item__image");
        imgData.img = imgItem.src;
        imgData.alt = imgItem.alt;
      }
    });
    return imgData;
  }

  galleryUi(){
    this.#listenerGlaleria();
  }

}

export default Gallery;