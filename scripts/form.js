"use strict"

const inputName = document.querySelector(".inputBox__text");
const inputEmail = document.querySelector(".inputBox__email");
const inputTextA = document.querySelector(".inputBox__textarea");
const pattEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const formulario = document.getElementById("formulario");

class Form{

  validaInput(){
    if(inputName.value.trim() === "") this.#setError({inputs: inputName, msj:"Nombre inválido. "});
    else this.#setSuccess(inputName);

    if(!pattEmail.test(inputEmail.value.trim())) this.#setError({inputs: inputEmail, msj:"Email inválido. "});
    else this.#setSuccess(inputEmail);

    if(inputTextA.value.trim() === "") this.#setError({inputs: inputTextA, msj:"Mensaje inválido. "});
    else this.#setSuccess(inputTextA);
  }

  #setError(errInput){
    const {inputs, msj} = errInput;
    inputs.parentNode.classList.add("error");
    inputs.parentNode.querySelector(".msjError").classList.add("active");
    inputs.parentNode.querySelector(".msjError").textContent = msj;
    setTimeout(()=>{
      inputs.parentNode.querySelector(".msjError").classList.remove("active");
    }, 3000)
  }

  #setSuccess(sucInput){
    if(sucInput.parentNode.classList.contains("error")) sucInput.parentNode.classList.remove("error");
  }

  isFormValid(){
    let estado = true;
    formulario.querySelectorAll(".inputBox").forEach(item => {
      if(item.classList.contains("error")) estado = false;
    })
    return estado;
  }
}

export default Form;