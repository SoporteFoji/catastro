import React, { Component } from 'react';

import DatePickerInput from './DatePickerInput.jsx';
import InputFeedback from './InputFeedback.jsx';
import Input from './Input.jsx';
import Rut from './Rut.jsx';
import Select from './Select.jsx';
import { Instruments } from './Instruments.jsx';

const instrumentOptions = Instruments();

class InstructorRegistrationForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 pt-3 pb-3 p-sm-5">
          <div className="form-row">
            <div className="form-group col-sm-6">
              <label htmlFor="instructor-first_name">Nombre</label>
              <Input id="instructor-first_name" name="first_name" type="text" placeholder="Escribe tu nombre" required
                value={this.props.first_name}
               />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="instructor-last_name">Apellido</label>
              <Input id="instructor-last_name" name="last_name" type="text" placeholder="Escribe tu apellido" required 
                value={this.props.last_name}
              />
              <InputFeedback />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="instructor-social_id">
              RUT
            </label>
            <Rut id="instructor-social_id" name="social_id" type="text" placeholder="Ej: 15.642.495-8"
              value={this.props.social_id}
            />
            <InputFeedback />
          </div>

          <div className="form-group">
            <label htmlFor="instructor-phone_number_mobile">
              Teléfono
            </label>
            <Input id="instructor-phone_number_mobile" name="phone_number_mobile" type="text" placeholder="Ej: 962129365" 
              value={this.props.phone || ''}
            />
            <InputFeedback />
          </div>
        </div>

        <div className="col-md-6 pt-3 pb-3 p-sm-5 border-left shadow-left">
          <div className="form-group">
            <label htmlFor="instructor-email">
              Email
            </label>
            <Input id="instructor-email" name="email" type="email" placeholder="Escribe el email" className="form-control" required
              value={this.props.email}
            />
            <InputFeedback />
          </div>
          <div className="form-group">
            <label htmlFor="instructor-instrument">
              Instrumento 
            </label>
            <div className="sel-wrapper">
              <Select id="instructor-instrument" name="instrument" options={instrumentOptions} className="form-control" 
                value={this.props.instrument || ''} required />
            </div>
            <InputFeedback />
          </div>
          <div className="form-group">
            <label htmlFor="students">
              Alumnos 
            </label>
            <Input id="students" name="students" type="text" placeholder="Cantidad de alumnos" className="form-control" required
              value={this.props.students}
            />
            <InputFeedback />
          </div>

          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <DatePickerInput name="birth_date" date={this.props.born || ''} />
            <InputFeedback />
          </div>
        </div>
      </div>
    );
  }
}


export default InstructorRegistrationForm;
