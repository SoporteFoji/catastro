import React, { Component } from 'react';

import DatePickerInput from './DatePickerInput.jsx';
import InputFeedback from './InputFeedback.jsx';
import Input from './Input.jsx';
import Rut from './Rut.jsx';
import Select from './Select.jsx';
import { Instruments } from './Instruments.jsx';

const genderOptions = [
  { title: 'Selecciona el género', value: '' },
  { title: 'Hombre', value: 'Hombre' },
  { title: 'Mujer', value: 'Mujer' },
];

const instrumentOptions = Instruments();

class CastRegistrationForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 pt-3 pb-3 p-sm-5">
          <div className="form-row">
            <div className="form-group col-sm-6">
              <label htmlFor="cast-first_name">Nombre</label>
              <Input id="cast-first_name" name="first_name" type="text" placeholder="Escribe el nombre" required
                value={this.props.first_name}
               />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="cast-last_name">Apellido</label>
              <Input id="cast-last_name" name="last_name" type="text" placeholder="Escribe el apellido" required 
                value={this.props.last_name}
              />
              <InputFeedback />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cast-social_id">
              RUT
            </label>
            <Rut id="cast-social_id" name="social_id" type="text" placeholder="Ej: 15.642.495-8"
              value={this.props.social_id || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cast-phone_number_mobile">
              Teléfono
            </label>
            <Input id="cast-phone_number_mobile" name="phone_number_mobile" type="text" placeholder="Ej: 962129365"
              value={this.props.phone || ''}
            />
            <InputFeedback />
          </div>
        </div>

        <div className="col-md-6 pt-3 pb-3 p-sm-5 border-left shadow-left">
          <div className="form-group">
            <label htmlFor="cast-email">
              Email
            </label>
            <Input id="cast-email" name="email" type="email" placeholder="Escribe el email" className="form-control"
              value={this.props.email || ''}
            />
            <InputFeedback />
          </div>
          <div className="form-group">
            <label htmlFor="cast-instrument">
              Instrumento 
            </label>
            <div className="sel-wrapper">
              <Select id="cast-instrument" name="instrument" options={instrumentOptions} className="form-control" 
                value={this.props.instrument || ''} required />
            </div>
            <InputFeedback />
          </div>
          <div className="form-group">
            <label htmlFor="cast-gender">
              Género 
            </label>
            <div className="sel-wrapper">
              <Select 
                id="cast-gender" 
                name="gender" 
                options={genderOptions} 
                className="form-control" 
                value={(this.props.gender === 'M' ? 'Hombre' : '') || (this.props.gender === 'F' ? 'Mujer' : '')} 
                required 
              />
            </div>
            <InputFeedback />
          </div>

          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <DatePickerInput name="birth_date" date={this.props.born || ''} required={false} />
            <InputFeedback />
          </div>
        </div>
      </div>
    );
  }
}

CastRegistrationForm.defaultProps = {
  errors: {
    
  }
}

export default CastRegistrationForm;
