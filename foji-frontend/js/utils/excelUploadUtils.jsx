import React from 'react';


export function valid_error_object(data){
  /*
  ** Returns true only if 'error' and 'row' are present in 'data'.
  ** *data*: represent and object that contains errors in the format { 'row': ..., 'error': ... }.
  */
  if(data[0]){
    return ('row' in data[0]) && ('error' in data[0]);
  }
  return false;
  
}

export function translate_field_name(field) {

  const translations = {
    'first_name': 'Nombre',
    'last_name': 'Apellido',
    'instrument': 'Instrumento',
    'gender': 'Género',
    'birth_date': 'Fecha de nacimiento',
    'email': 'Email',
    'phone_number_mobile': 'Teléfono',
    'phone_number_home': 'Teléfono fijo',
    'social_id': 'RUT',
    'director': 'Director',
    'instructors': 'Instructores',
    'cast_members': 'Elenco',
  }

  if (field in translations) {
    return translations[field];
  } else {
    const capitalized = field.charAt(0).toUpperCase() + field.slice(1);
    const result = capitalized.replace(/_/g, ' ');
    return result;
  }

}

function errorItem(item){
  return <li>{item}</li>;
}

export default { valid_error_object, translate_field_name, errorItem };
