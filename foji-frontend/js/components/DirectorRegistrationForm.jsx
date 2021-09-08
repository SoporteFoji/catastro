import React, { Component } from 'react';

import DatePickerInput from './DatePickerInput.jsx';
import InputFeedback from './InputFeedback.jsx';
import Input from './Input.jsx';
import Rut from './Rut.jsx';

class DirectorRegistrationForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 pt-3 pb-3 p-sm-5">
          <div className="form-row">
            <div className="form-group col-sm-6">
              <label htmlFor="director-first_name">
                Nombre
              </label>
              <Input id="director-first_name" name="first_name" type="text" placeholder="Nombre del director" required 
                value={this.props.first_name || ''} onChange={this.props.onChange}
              />
              <InputFeedback 
                error={this.props.errors.personal_information ? this.props.errors.personal_information.first_name : (this.props.errors ? this.props.errors.first_name : null)} 
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="director-last_name">
                Apellido
              </label>
              <Input id="director-last_name" name="last_name" type="text" placeholder="Apellido del director" required
                value={this.props.last_name || ''} onChange={this.props.onChange}
              />
              <InputFeedback 
                error={this.props.errors.personal_information ? this.props.errors.personal_information.last_name : (this.props.errors ? this.props.errors.last_name : null)} 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="director-social_id">
              RUT
            </label>
            <Rut id="director-social_id" name="social_id" type="text" placeholder="Ej: 15.642.495-8" required
              value={this.props.social_id || ''} onChange={this.props.onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="director-phone_number_mobile">
              Teléfono
            </label>
            <Input id="director-phone_number_mobile" name="phone_number_mobile" type="phone" placeholder="Ej: 962129365" required
              value={this.props.phone_number_mobile || ''} onChange={this.props.onChange}
            />
            <InputFeedback 
              error={this.props.errors.personal_information ? this.props.errors.personal_information.phone_number_mobile : null} 
            />
          </div>
        </div>
        <div className="col-md-6 pt-3 pb-3 p-sm-5 border-left shadow-left">
          <div className="form-group">
            <label htmlFor="director-email">
              Email
            </label>
            <Input id="director-email" name="email" type="email" placeholder="Email del director" required
              value={this.props.email || ''} onChange={this.props.onChange}
            />
            <InputFeedback 
              error={this.props.errors.personal_information ? this.props.errors.personal_information.email : (this.props.errors ? this.props.errors.email : null)} 
            />
          </div>

          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <DatePickerInput date={this.props.birth_date || ''} name="birth_date" onChange={this.props.onChange} />
            <InputFeedback 
              error={this.props.errors.personal_information ? this.props.errors.personal_information.birth_date : (this.props.errors ? this.props.errors.birth_date : null)} 
            />
          </div>
        </div>
      </div>
    );
  }
}

DirectorRegistrationForm.defaultProps = {
  first_name: '',
  last_name: '',
  social_id: '',
  phone_number_mobile: '',
  email: '',
  birth_date: '',
  errors: {
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

export default DirectorRegistrationForm;
