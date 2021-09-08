import Fn from './validateRut.js';

const orchestraErrors = {
  orchestra_status: "El estado debe ser especificado",
  name: "El nombre no debe estar vacío",
  orchestra_type: "El tipo debe ser especificado",
  creation_date: "La fecha no es válida",
}

const membersErrors = {
  first_name: "El nombre no debe estar vacío",
  last_name: "El apellido no debe estar vacío",
  social_id: "Rut iválido",
  email: "Email inválido",
  birth_date: "La fecha no es válida",
}

const institutionErrors = {
  name: "El nombre no debe estar vacío",
  social_id: "Rut iválido",
  institution_email: "Email inválido",
  first_name: "El nombre no debe estar vacío",
  last_name: "El apellido no debe estar vacío",
  legal_email: "Email inválido",
}

const imageErrors = {
  characters: "El Nombre de la imagen no debe tener más de 100 caracteres",
  format: "El formato de la imagen debe ser JPG, PNG, GIF o BMP",
}

export function validateOrchestra(inputs){
  let validInputs = {};
  validInputs.errors = {};
  inputs.forEach((el) => {
    let valid;
    switch(el.name){
      case "orchestra_status":
        valid = validLength(el.value);
        validInputs.errors.orchestra_status = valid ? '' : orchestraErrors.orchestra_status;
        break;
      case "name":
        valid = validLength(el.value);
        validInputs.errors.name = valid ? '' : orchestraErrors.name;
        break;
      case "orchestra_type":
        valid = validLength(el.value);
        validInputs.errors.orchestra_type = valid ? '' : orchestraErrors.orchestra_type;
        break;
      case "creation_date":
        valid = validDate(el.value);
        validInputs.errors.creation_date = valid ? '' : orchestraErrors.creation_date;
        break;
    }
  });
  if(!validInputs.errors.orchestra_status.length && !validInputs.errors.name.length && !validInputs.errors.orchestra_type.length &&  !validInputs.errors.creation_date.length){
    validInputs.validated = true;
  }
  return validInputs;
  
}

export function validateMembers(inputs){
  let validInputs = {};
  validInputs.errors = {};
  inputs.forEach((el) => {
    let valid;
    switch(el.name){
      case "first_name":
        valid = validLength(el.value);
        validInputs.errors.first_name = valid ? '' : membersErrors.first_name;
        break;
      case "last_name":
        valid = validLength(el.value);
        validInputs.errors.last_name = valid ? '' : membersErrors.last_name;
        break;
      case "social_id":
        valid = el.value.length ? Fn.validaRut(el.value) : true;
        validInputs.errors.social_id = valid ? '' : membersErrors.social_id;
        break;
      case "email":
        valid = el.value.length ? validEmail(el.value) : true;
        validInputs.errors.email = valid ? '' : membersErrors.email;
        break;
      case "birth_date":
        valid = validDate(el.value);
        validInputs.errors.birth_date = valid ? '' : membersErrors.birth_date;
        break;
    }
  });
  if(!validInputs.errors.first_name.length 
    && !validInputs.errors.last_name.length 
    && !validInputs.errors.social_id.length 
    && !validInputs.errors.email.length
    && !validInputs.errors.birth_date.length){
      validInputs.validated = true;
  }
  return validInputs;
}

export function validateInstitution(inputs){
  let validInputs = {};
  validInputs.errors = {};
  inputs.forEach((el) => {
    let valid;
    switch(el.id){
      case "institution-name":
        valid = validLength(el.value);
        validInputs.errors.name = valid ? '' : institutionErrors.name;
        break;
      case "institution-social_id":
        valid = Fn.validaRut(el.value);
        validInputs.errors.social_id = valid ? '' : institutionErrors.social_id;
        break;
      case "institution-email":
        valid = el.value.length ? validEmail(el.value) : true;
        validInputs.errors.email = valid ? '' : institutionErrors.institution_email;
        break;
      case "legal-first_name":
        valid = validLength(el.value);
        validInputs.errors.legal_first_name = valid ? '' : institutionErrors.first_name;
        break;
      case "legal-last_name":
        valid = validLength(el.value);
        validInputs.errors.legal_last_name = valid ? '' : institutionErrors.last_name;
        break;
      case "legal-email":
        valid = el.value.length ? validEmail(el.value) : true;
        validInputs.errors.legal_email = valid ? '' : institutionErrors.legal_email;
        break;
    }
  });
  if(!validInputs.errors.name.length 
    && !validInputs.errors.social_id.length 
    && !validInputs.errors.email.length 
    && !validInputs.errors.legal_first_name.length
    && !validInputs.errors.legal_last_name.length
    && !validInputs.errors.legal_email.length){
      validInputs.validated = true;
  }
  return validInputs;
}

export function validateImage(image){
  const validExtensions = ["jpg", "jpeg", "gif", "png", "bmp"];
  const extension = image.name.substring(image.name.lastIndexOf('.') + 1).toLowerCase();
  let valid = {};
  if(!validExtensions.includes(extension)){
    valid.validated = false;
    valid.error = imageErrors.format;
    return valid;
  }
  if(image.name.length > 100){
    valid.validated = false;
    valid.error = imageErrors.characters;
    return valid;
  }
  valid.validated = true;
  return valid;
}

function validLength(value){
  if(value.length){
    return true;
  }
  return false;
}

function validDate(date) {
  let parts = date.split("/");
  let dt = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  return dt instanceof Date && !isNaN(dt);
}

function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



export default { validateOrchestra, validateMembers, validateInstitution }