import React, { Component } from 'react';

import DatePickerInput from './DatePickerInput.jsx';
import InputFeedback from './InputFeedback.jsx';
import Input from './Input.jsx';
import Rut from './Rut.jsx';

class CoordinatorRegistrationForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 pt-3 pb-3 p-sm-5">
          <div className="form-row">
            <div className="form-group col-sm-6">
              <label htmlFor="coordinator-first_name">Nombre</label>
              <Input id="coordinator-first_name" name="first_name" type="text" placeholder="Escribe tu nombre" required
                value={this.props.first_name} onChange={this.props.onChange}
               />
               <InputFeedback error={this.props.errors.personal_information ? this.props.errors.personal_information.first_name : null} />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="coordinator-last_name">Apellido</label>
              <Input id="coordinator-last_name" name="last_name" type="text" placeholder="Escribe tu apellido" required 
                value={this.props.last_name} onChange={this.props.onChange}
              />
              <InputFeedback error={this.props.errors.personal_information ? this.props.errors.personal_information.last_name : null} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="coordinator-social_id">
              RUT
            </label>
            <Rut id="coordinator-social_id" name="social_id" type="text" placeholder="Ej: 15.642.495-8" required
              value={this.props.social_id} onChange={this.props.onChange}
            />
            <InputFeedback error={this.props.errors.personal_information ? this.props.errors.personal_information.social_id : null} />
          </div>

          <div className="form-group">
            <label htmlFor="role">
              Cargo
            </label>
            <Input id="role" name="role" type="text" placeholder="Tu cargo en la orquesta"
              value={this.props.role} onChange={this.props.onChange}
            />
            <InputFeedback error={this.props.errors ? this.props.errors.role : null} />
          </div>
        </div>

        <div className="col-md-6 pt-3 pb-3 p-sm-5 border-left shadow-left">
        
          <div className="form-group">
            <label htmlFor="coordinator-email">
              Email
            </label>
            <Input id="coordinator-email" name="email" type="email" placeholder="Escribe tu email" className="form-control" required
              value={this.props.email} onChange={this.props.onChange}
            />
            <InputFeedback error={this.props.errors.personal_information ? this.props.errors.personal_information.email : null} />
          </div>

          <div className="form-group">
            <label htmlFor="coordinator-phone_number_mobile">
              Teléfono
            </label>
            <Input id="coordinator-phone_number_mobile" name="phone_number_mobile" type="text" placeholder="Ej: 962129365" required 
              value={this.props.phone_number_mobile} onChange={this.props.onChange}
            />
            <InputFeedback error={this.props.errors.personal_information ? this.props.errors.personal_information.phone_number_mobile : null} />
          </div>

          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <DatePickerInput name="born" date={this.props.birth_date} onChange={this.props.onChange} required />
            <InputFeedback error={this.props.errors.personal_information ? this.props.errors.personal_information.birth_date : null} />
          </div>
        </div>
      </div>
    );
  }
}

CoordinatorRegistrationForm.defaultProps = {
  errors: {
    role: '',
    personal_information: {
      first_name: '',
      last_name: '',
      social_id: '',
      phone_number_mobile: '',
      birth_date: '',
      email: '',
    }
  }
}

export default CoordinatorRegistrationForm;
