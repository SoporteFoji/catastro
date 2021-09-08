import React, { Component } from 'react';

import InputFeedback from './InputFeedback.jsx';
import Input from './Input.jsx';
import Rut from './Rut.jsx';

class InstitutionRegistrationForm extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(target){
    if(this.props.onChange){
      this.props.onChange(target, 'legal_representation');
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6 pt-3 pb-3 p-sm-5">

          <div className="form-group">
            <label htmlFor="institution-name">
              Nombre de la Institución:
            </label>
            <Input id="institution-name" name="name" type="text" required 
            value={this.props.institution.name || ''} onChange={this.props.onChange} />
            <InputFeedback error={this.props.errors.name || null}/>
          </div>

          <div className="form-group">
            <label htmlFor="institution-social_id">
              Rut o Rol:
            </label>
            <Rut id="institution-social_id" name="social_id" type="text" placeholder="Ej: 76.642.495-K" required 
              value={this.props.institution.social_id || ''} onChange={this.props.onChange}
            />
            <InputFeedback error={this.props.errors.social_id || null}/>
          </div>

          <div className="form-group">
            <label htmlFor="institution_phone_number">
              Teléfono fijo:
            </label>
            <Input id="institution-phone_number-home" name="phone_number_home" type="text" placeholder="Ej: 2212 9356" required 
            value={this.props.institution.phone_number_home || ''} onChange={this.props.onChange} />
            <InputFeedback error={this.props.errors.phone_number_home || null}/>
          </div>

          <div className="form-group">
            <label htmlFor="institution-address">
              Dirección:
            </label>
            <Input id="institution-address" name="address" type="text" placeholder="Cerro Altar 5698, Las Condes" required 
            value={this.props.institution.address || ''} onChange={this.props.onChange} />
            <InputFeedback error={this.props.errors.address || null}/>
          </div>

          <div className="form-group">
            <label htmlFor="institution-email">
              Email de contacto:
            </label>
            <Input id="institution-email" name="email" type="email" required 
            value={this.props.institution.email || ''} onChange={this.props.onChange} />
            <InputFeedback error={this.props.errors.email || null}/>
          </div>

        </div>

        <div className="col-md-6 pt-3 pb-3 p-sm-5 border-left shadow-left">
          <div className="form-group">
            <h4 className="mt-4">Representante Legal</h4>
          </div>

          <div className="form-group">
            <label htmlFor="legal-name">
              Nombre:
            </label>
            <Input id="legal-first_name" name="first_name" type="text" placeholder="Nombre del representante legal" required 
            value={this.props.legal_rep.first_name || ''} onChange={this.onChange} />
            <InputFeedback 
              error={this.props.errors.legal_representation ? this.props.errors.legal_representation.first_name : (this.props.errors.legal_first_name || null)}
              />
          </div>

          <div className="form-group">
            <label htmlFor="legal-last_name">
              Apellido:
            </label>
            <Input id="legal-last_name" name="last_name" type="text" placeholder="Apellido del representante legal" required 
            value={this.props.legal_rep.last_name || ''} onChange={this.onChange} />
            <InputFeedback error={this.props.errors.legal_representation ? this.props.errors.legal_representation.last_name : (this.props.errors.legal_last_name || null)}/>
          </div>

          <div className="form-group">
            <label htmlFor="legal-email">
              Email:
            </label>
            <Input id="legal-email" name="email" type="email" placeholder="Email del representante legal" required 
            value={this.props.legal_rep.email || ''} onChange={this.onChange} />
            <InputFeedback error={this.props.errors.legal_representation ? this.props.errors.legal_representation.email : (this.props.errors.legal_email || null)}/>
          </div>

          <div className="form-group">
            <label htmlFor="legal-phone_number_mobile">
              Teléfono:
            </label>
            <Input id="legal-phone_number_mobile" name="phone_number_mobile" type="text" placeholder="Ej: 962129365" required
            value={this.props.legal_rep.phone_number_mobile || ''} onChange={this.onChange} />
            <InputFeedback error={this.props.errors.legal_representation ? this.props.errors.legal_representation.phone_number_mobile : null}/>
          </div>

        </div>
      </div>
    );
  }
}

InstitutionRegistrationForm.defaultProps = {
  errors: {
    legal_representation: {},
  },
  institution: {
    name: '',
    role: '',
    email: '',
    phone_number_home: '',
    social_id: '',
    address: '',
  },
  legal_rep: {
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    phone_number_mobile: '',
  },
}

export default InstitutionRegistrationForm;
