"use strict"
class Storage{

  saveProducts(products){
    localStorage.setItem("prodBurger", JSON.stringify(products));
  }

  getProducts(){
    let products = JSON.parse(localStorage.getItem("prodBurger")) || [];
    return products;
  }

  getProdForId(prodId){
    let products = this.getProducts();
    if(products.length > 0){
      let prod = products.filter(prod => prod.id.toString() === prodId.toString());
      return prod;
    }
  }

  saveCart(cart){
    localStorage.setItem("cartBurger", JSON.stringify(cart));
  }

  getCart(){
    let cartItems = JSON.parse(localStorage.getItem("cartBurger")) || [];
    return cartItems;
  }

}

export default Storage;