"use strict"

let btnCart = document.getElementById("btn-carrito");
let cartItems = [];

class ManageCart{

  constructor(){
    this.storage = null;
    this.paintThing = null;
  }

  setStorage(storage){
    this.storage = storage;
  }

  setPaintThing(paintThing){
    this.paintThing = paintThing;
  }
  
  setinitialCart(){
    let cartItemFromLocal = this.storage.getCart();
    if(cartItemFromLocal.length > 0){
      btnCart.classList.add("active");
      cartItems = [...cartItems, ...cartItemFromLocal];
      this.paintThing.paintCart(cartItems);
      this.setTotalsCart();
    }
  }

  itemToCart(idItem){
    let isInCart = cartItems.find(item => item.id.toString() === idItem.toString());
    if(isInCart){
      isInCart.cantidad = isInCart.cantidad + 1;
    }else{
      let itemData = this.storage.getProdForId(idItem);
      let indexItem = itemData.findIndex(producto => producto.id.toString() === idItem.toString());
      cartItems = [...cartItems, {...itemData[indexItem], cantidad: 1}];
    }
    this.paintThing.paintCart(cartItems);
    this.storage.saveCart(cartItems);
    this.setTotalsCart();
  }

  setTotalsCart(){
    let result = cartItems.reduce((total, cartItem) => {
      total.totalPriceAllProd += cartItem.price * cartItem.cantidad;
      total.totalCantidadAllProd += cartItem.cantidad;
      this.setTotalItemCart(cartItem)
      return total;
    },{
      totalPriceAllProd: 0,
      totalCantidadAllProd: 0,
    })
    document.querySelector(".carrito-cantidad").textContent = result.totalCantidadAllProd;
    document.querySelector(".cart .total span").textContent = result.totalPriceAllProd.toFixed(3);
    document.querySelector(".cart .total-items span").textContent = result.totalCantidadAllProd;
  }

  setTotalItemCart(cartItem){
    document.querySelectorAll(".itemCart").forEach(cartI => {
      if(cartItem.id.toString() === cartI.children[1].children[0].dataset.id.toString()){
        cartI.querySelector(".itemCart__price").textContent = (cartItem.price * cartItem.cantidad).toFixed(3);
        cartI.querySelector(".itemCart__cantidadItem").textContent = cartItem.cantidad;
      }
    })
  }

  sumItemCart(idItemCart){
    let findItem = cartItems.findIndex(cartItem => cartItem.id.toString() === idItemCart.toString());
    if(findItem >= 0) cartItems[findItem].cantidad = cartItems[findItem].cantidad + 1;
    this.storage.saveCart(cartItems);
    this.setTotalsCart();
  }

  restItemCart(idItemCart){
    let findItem = cartItems.find(cartItem => cartItem.id.toString() === idItemCart.toString());
    if(findItem !== undefined){
      if(findItem.cantidad > 1){
        findItem.cantidad = findItem.cantidad - 1;
      }else{
        this.removeItemFromCart(findItem.id)
      }
      this.storage.saveCart(cartItems);
      this.setTotalsCart();
    }
  }

  removeItemFromCart(idItemCart){
    cartItems = cartItems.filter(cartItem => cartItem.id.toString() !== idItemCart.toString());
    this.storage.saveCart(cartItems);
    this.setTotalsCart();

    document.querySelectorAll(".cart .content-itemCart .itemCart").forEach(itemCart => {
      if(itemCart.children[1].children[0].dataset.id.toString() === idItemCart.toString()){
        itemCart.remove();
      }
    })
    this.desactivaCart();
  }

  desactivaCart(){
    if(cartItems.length === 0) {
      cart.classList.remove("active");
      btnCart.classList.remove("active");
    };
  }

  solicitudProdCart(){
    alert("La solicitud fue ingresada...");
    cart.classList.remove("active");
    btnCart.classList.remove("active");
    cartItems.forEach(itemCart => this.removeItemFromCart(itemCart.id));
  }
}

export default ManageCart;