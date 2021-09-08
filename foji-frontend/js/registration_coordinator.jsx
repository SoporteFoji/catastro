import React from 'react';
import ReactDOM from 'react-dom';
import DatePickerInput from './components/DatePickerInput.jsx';
import Fn from './utils/validateRut.js';
import FormatDate from './utils/FormatDate.js';

const registration_coordinator = document.getElementById('datepicker-input');
var coordinator_birth;
if(registration_coordinator){
  coordinator_birth = registration_coordinator.dataset.date;
}


if(coordinator_birth){
  coordinator_birth = FormatDate(coordinator_birth);
  console.log(coordinator_birth);
}


if(registration_coordinator){
  ReactDOM.render(
    <DatePickerInput name="coordinator-birth_date" date={coordinator_birth || ''} />,
    registration_coordinator,
  );
}

const form = document.querySelector("#coordinator-form");
if(form){
  form.addEventListener("submit", validateForm, false);
}

function validateForm(e){
  e.preventDefault();
  console.log("submiting");
  if(Fn.validaRut(form["coordinator-social_id"].value)){
    form.submit();
  } else {
    console.log("rut inválido");
    document.getElementById("rutFeedback").innerHTML = "Rut inválido";
  }
}
