"use strict"

import galleryData from "../data/gallery.js";
import productsData from "../data/products.js";
import homeData from "../data/home.js";


class AllData{

  async #getReviews(){
    let dataStoreReview = [];
    for(let i = 1; i <= 2; i++){
      let response = await fetch(`https://reqres.in/api/users?page=${i}`);
      if(!response.ok) throw new Error(`status de errror ${response.status}`);
      else{
        let data = await response.json();
        dataStoreReview.push(data.data)
      }
    }
    return dataStoreReview;
  }

  #galleryImages(){
    return new Promise(resolve => setTimeout(() => resolve(JSON.parse(galleryData))))
  }

  #getProducts(){
    return new Promise(resolve => setTimeout(() => resolve(JSON.parse(productsData))))
  }

  #getHomeData(){
    return new Promise(resolve => setTimeout(()=>resolve(JSON.parse(homeData))))
  }

  allData(){
    return [
      this.#getHomeData(),
      this.#getReviews(),
      this.#galleryImages(),
      this.#getProducts(),
    ]
  }
}

export default AllData;