import React, { Component } from 'react';

import DatePickerInput from './DatePickerInput.jsx';
import Select from './Select.jsx';
import Input from './Input.jsx';
import InputFeedback from './InputFeedback.jsx';
import PhotoUpload from './PhotoUpload.jsx';
import SocialNetwork from './SocialNetwork.jsx';
import LocationPicker from './LocationPicker.jsx';


const orchestraTypeOptions = [
  { title: 'Selecciona el tipo', value: '' },
  { title: 'Infantil', value: 'infantil' },
  { title: 'Juvenil', value: 'juvenil' },
  { title: 'Infantil-Juvenil', value: 'infantil-juvenil' }
];

const orchestraStatusOptions = [
  { title: 'Selecciona el estado', value: ''},
  { title: 'Activa', value: 'active'},
  { title: 'En pausa', value: 'paused'},
  { title: 'Inactiva', value: 'inactive'},
];

class OrchestraRegistrationForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 pt-3 pb-3 p-sm-5">

          <div className="row form-group">
            <div className="col-lg-4">
              <label htmlFor="orchestra_type">
                Estado de orquesta:
              </label>
            </div>
            <div className="col-lg-8">
              <div className="sel-wrapper">
                <Select name="orchestra_status" options={orchestraStatusOptions} required
                  onChange={this.props.onChange} className="form-control" value={this.props.orchestra_status || ''} />
              </div>
              <InputFeedback error={this.props.errors ? this.props.errors.orchestra_status : null} />
            </div>
          </div>

          <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="name">
                  Nombre de la Orquesta:
                </label>
              </div>
              <div className="col-lg-8">
                <Input id="name" name="name" type="text" value={this.props.name || ''} onChange={this.props.onChange} required />
                <InputFeedback error={this.props.errors ? this.props.errors.name : null} />
              </div>
          </div>

          <div className="row form-group">
            <div className="col-lg-4">
              <label htmlFor="orchestra_type">
                Tipo de orquesta:
              </label>
            </div>
            <div className="col-lg-8">
              <div className="sel-wrapper">
                <Select name="orchestra_type" options={orchestraTypeOptions} required
                  onChange={this.props.onChange} className="form-control" value={this.props.orchestra_type || ''} />
              </div>
              <InputFeedback error={this.props.errors ? this.props.errors.orchestra_type : null} />
            </div>
          </div>
         
          <LocationPicker 
            onChange={this.props.onChange} 
            region={this.props.region.id || ''} 
            province={this.props.province.id || ''}
            area={this.props.area.id || ''} 
            city={this.props.city || ''} 
            required
          />

          <div className="form-group">

            <label htmlFor="area">
              Fecha de creación:
            </label>
            <DatePickerInput name="creation_date" date={this.props.creation_date || ''} onChange={this.props.onChange} required />
            <InputFeedback error={this.props.errors ? this.props.errors.creation_date : null} />
          </div>

        </div>

        <div className="col-md-6 pt-3 pb-3 p-sm-5 border-left shadow-left">
          <div className="form-group text-center text-md-left">
            <PhotoUpload name="photo" orchestra_id={this.props.orchestra_id || ''} photoUrl={this.props.photo || ''} onChange={this.props.onChange}/>
            <InputFeedback error={this.props.errors ? this.props.errors.photo : null} />
          </div>
          <div className="form-group">
            <SocialNetwork currents={this.props.rrss || ''} onChange={this.props.onChange} />
            <InputFeedback error={this.props.errors ? this.props.errors.social_networks : null} />
          </div>
          <div className="form-group">
            <label htmlFor="web">
              Sitio web:
            </label>
            <Input id="web" name="website" type="text" value={this.props.website || ''} placeholder="Ej: www.miorquesta.cl" onChange={this.props.onChange} />
            <InputFeedback error={this.props.errors ? this.props.errors.website : null} />
          </div>

        </div>
      </div>
    );
  }
}

// Set default props
OrchestraRegistrationForm.defaultProps = {
  name: "",
  orchestra_type: "",
  creation_date: "",
  photo: "",
  rrss: {},
  website: "",
  region: "",
  province: "",
  city: "",
  area: "",

};

export default OrchestraRegistrationForm;
