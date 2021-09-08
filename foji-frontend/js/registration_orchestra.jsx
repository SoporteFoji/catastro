import React from 'react';
import ReactDOM from 'react-dom';

import DatePickerInput from './components/DatePickerInput.jsx';
import Select from './components/Select.jsx';
import InputFeedback from './components/InputFeedback.jsx';
import PhotoUpload from './components/PhotoUpload.jsx';
import SocialNetwork from './components/SocialNetwork.jsx';
import LocationPicker from './components/LocationPicker.jsx';

const orchestraTypeOptions = [
  { title: 'Selecciona el tipo', value: '' },
  { title: 'Infantil', value: 'infantil' },
  { title: 'Juvenil', value: 'juvenil' },
  { title: 'Infantil-Juvenil', value: 'infantil-juvenil' }
];

const orchestra_type = document.getElementById('orchestra-type');
if(orchestra_type){
  ReactDOM.render(
    <Select name="orchestra_type" options={orchestraTypeOptions} className="form-control" required />,
    orchestra_type,
  );
}

const location_picker = document.getElementById('location-picker');
if(location_picker){
  ReactDOM.render(
    <LocationPicker />,
    location_picker,
  );
}

const date_picker = document.getElementById('date-picker');
if(date_picker){
  ReactDOM.render(
    <DatePickerInput name="creation_date" required />,
    date_picker,
  );
}

const photo_upload = document.getElementById('photo-upload');
if(photo_upload){
  ReactDOM.render(
    <PhotoUpload name="photo" />,
    photo_upload,
  );
}

const social_networks = document.getElementById('social-networks');
if(social_networks){
  ReactDOM.render(
    <SocialNetwork />,
    social_networks,
  );
}