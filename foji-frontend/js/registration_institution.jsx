import React from 'react';
import ReactDOM from 'react-dom';
import Fn from './utils/validateRut.js';

// FORM VALIDATION
const form = document.querySelector("#institution-form");
if(form){
  form.addEventListener("submit", validateForm, false);
}

function validateForm(e){
  e.preventDefault();
  if(Fn.validaRut(form["institution-social_id"].value)){
    form.submit();
  } else {
    document.getElementById("institutionRutFeedback").innerHTML = "Rut inválido";
  }
}
