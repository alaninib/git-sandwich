"use strict"

const btnCart = document.getElementById("btn-carrito");
const cart = document.getElementById("cart");
let cartItems = [];

class Cart{

  #storage;
  #paintThing;

  constructor(){
    this.#storage = null;
    this.#paintThing = null;
  }

  //setea la intancia de la clase Storage(desde main.js) para ser usada
  setStorage(storage){
    this.#storage = storage;
  }

  //setea la intancia de la clase paintThing(desde main.js) para ser usada
  setPaintThing(paintThing){
    this.#paintThing = paintThing;
  }
  
  //setea el carrito al iniciar la pagina;
  #setinitialCart(){
    let cartItemFromLocal = this.#storage.getCart();
    if(cartItemFromLocal.length > 0){
      btnCart.classList.add("active");
      cartItems = [...cartItems, ...cartItemFromLocal];
      this.#paintThing.paintCart(cartItems);
      this.#setTotalsCart();
    }
  }

  //Agrega un item al carrito, en el caso de que ya exista, se le suma una cantidad;
  itemToCart(idItem){
    let isInCart = cartItems.find(item => item.id.toString() === idItem.toString());
    if(isInCart){
      isInCart.cantidad = isInCart.cantidad + 1;
    }else{
      let itemData = this.#storage.getProdForId(idItem);
      let indexItem = itemData.findIndex(producto => producto.id.toString() === idItem.toString());
      cartItems = [...cartItems, {...itemData[indexItem], cantidad: 1}];
    }
    this.#paintThing.paintCart(cartItems);
    this.#storage.saveCart(cartItems);
    this.#setTotalsCart();
  }

  //setea los totales de todos los item existentes en el carrito y pinta los valores promedio;
  #setTotalsCart(){
    let result = cartItems.reduce((total, cartItem) => {
      total.totalPriceAllProd += cartItem.price * cartItem.cantidad;
      total.totalCantidadAllProd += cartItem.cantidad;
      this.#setTotalItemCart(cartItem)
      return total;
    },{
      totalPriceAllProd: 0,
      totalCantidadAllProd: 0,
    })
    document.querySelector(".carrito-cantidad").textContent = result.totalCantidadAllProd;
    document.querySelector(".cart .total span").textContent = result.totalPriceAllProd.toFixed(3);
    document.querySelector(".cart .total-items span").textContent = result.totalCantidadAllProd;
  }

  //setea los totales de forma individual y los pinta al costado de cada item;
  #setTotalItemCart(cartItem){
    document.querySelectorAll(".itemCart").forEach(cartI => {
      if(cartItem.id.toString() === cartI.children[1].children[0].dataset.id.toString()){
        cartI.querySelector(".itemCart__price").textContent = (cartItem.price * cartItem.cantidad).toFixed(3);
        cartI.querySelector(".itemCart__cantidadItem").textContent = cartItem.cantidad;
      }
    })
  }

  //suma una cantidad al item en el carrito
  #sumItemCart(idItemCart){
    let findItem = cartItems.findIndex(cartItem => cartItem.id.toString() === idItemCart.toString());
    if(findItem >= 0) cartItems[findItem].cantidad = cartItems[findItem].cantidad + 1;
    this.#storage.saveCart(cartItems);
    this.#setTotalsCart();
  }

  //resta una cantidad al item en el carrito
  #restItemCart(idItemCart){
    let findItem = cartItems.find(cartItem => cartItem.id.toString() === idItemCart.toString());
    if(findItem !== undefined){
      if(findItem.cantidad > 1){
        findItem.cantidad = findItem.cantidad - 1;
      }else{
        this.#removeItemFromCart(findItem.id)
      }
      this.#storage.saveCart(cartItems);
      this.#setTotalsCart();
    }
  }

   //setea la eliminacion de un item en el carrito
   #removeItemFromCart(idItemCart){
    cartItems = cartItems.filter(cartItem => cartItem.id.toString() !== idItemCart.toString());
    this.#storage.saveCart(cartItems);
    this.#setTotalsCart();
    this.#removeNodeFromCart(idItemCart)
    this.#desactivaCart();
  }


  //elimina item del carrito;
  #removeNodeFromCart(idItemCart){
    document.querySelectorAll(".cart .content-itemCart .itemCart").forEach(itemCart => {
      if(itemCart.children[1].children[0].dataset.id.toString() === idItemCart.toString()){
        itemCart.remove();
      }
    })
  }

  //en el caso de que no existan items en el carrito se desactiva icono de header y la section para el carrito
  #desactivaCart(){
    if(cartItems.length === 0) {
      cart.classList.remove("active");
      btnCart.classList.remove("active");
    };
  }

  //mensaje final al seleccionar boton solicitar del carrito;
  #solicitudProdCart(){
    alert("La solicitud fue ingresada...");
    cart.classList.remove("active");
    btnCart.classList.remove("active");
    cartItems.forEach(itemCart => this.#removeItemFromCart(itemCart.id));
  }

  //eventos de cart
  #listenerCart(){
    cart.addEventListener("click", (e)=> {
      if(e.target.classList.contains("fa-times")) cart.classList.remove("active");
      if(e.target.classList.contains("fa-plus")) this.#sumItemCart(e.target.dataset.id);
      if(e.target.classList.contains("fa-minus")) this.#restItemCart(e.target.dataset.id);
      if(e.target.classList.contains("fa-trash-can")) this.#removeItemFromCart(e.target.dataset.id);
      if(e.target.classList.contains("btn")) this.#solicitudProdCart();
    })
  }

  cartUi(){
    this.#setinitialCart();
    this.#listenerCart();
  }
}

export default Cart;