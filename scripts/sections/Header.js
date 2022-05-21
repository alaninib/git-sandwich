"use strict"

const barBtn = document.getElementById("menu-btn-bars");
const navbar = document.querySelector(".navbar");
const cart = document.getElementById("cart");
const btnCart = document.getElementById("btn-carrito"); //header
const switchBtn = document.getElementById("switch");

class Header{

  //add-remove clases segun item seleccionado del menu navbar
  setMenuItemSelected(menuItem){
    navbar.querySelectorAll(".navbar__item").forEach(item => item.classList.remove("active"));
    menuItem.classList.add("active");
    //en responsivo:
    navbar.classList.remove("active");
    barBtn.classList.remove("fa-times");
  }

  #listenerHeader(){
    switchBtn.addEventListener("click", e => {
      switchBtn.classList.toggle("active");
      document.body.classList.toggle("dark");
    })

    btnCart.addEventListener("click", (e) => {
      cart.classList.add("active");
    })

    navbar.querySelectorAll(".navbar__item").forEach(item => {
      item.addEventListener("click", e => ()=>this.setMenuItemSelected(e.target))
    });

    barBtn.addEventListener("click", e => {
      barBtn.classList.toggle("fa-times")
      navbar.classList.toggle("active")
    })
  }

  headerUi(){
    this.#listenerHeader();
  }
}

export default Header;