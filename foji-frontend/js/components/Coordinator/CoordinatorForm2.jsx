/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import Select from '../Select.jsx';
import Input from '../Input.jsx';
import InputFeedback from '../InputFeedback.jsx';
import get_csrf_token from '../../utils/csrf';
import ApiService from '../../services/api.jsx';

const administratorGenderOptions = [
  { title: 'Selecciona el género', value: '' },
  { title: 'Femenino', value: 'F' },
  { title: 'Masculino', value: 'M' },
  { title: 'Otro', value: 'O' },
];

// eslint-disable-next-line react/prefer-stateless-function
class CoordinatorForm extends Component {
  constructor(props) {
    super(props);
    console.table(props);

    this.props = props;
    this.servicio = new ApiService();
    if (this.props.user) {
      this.state = {
        user: this.props,
        currentTab: this.props.tab || 'orchestra',
        edited: '',
        modal: this.props.modal || false,
        error: this.props.errors ? 'error' : '',
        errors: this.props.errors || null,
        nuevo: false,
      };
    } else {
      const upPersonaInfo = {

        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        phone_number_home: '',
        phone_number_mobile: '',
      };
      const upUser = {
        personal_information: upPersonaInfo,
        username: '',
        user: { username: '' },
        email: '',
        password: '',
      };
      this.state = {
        user: upUser,
        currentTab: this.props.tab || 'orchestra',
        edited: '',
        modal: this.props.modal || false,
        error: this.props.errors ? 'error' : '',
        errors: this.props.errors || null,
        nuevo: true,
      };
    }

    this.forms = new Map();
    this.getForm = this.getForm.bind(this);
  }

  showSave(edited) {
    if (edited) {
      return (
        <button className="btn btn-primary" type="button" onClick={this.onSave}>
          Guardar Cambios
        </button>
      );
    }
    return null;
  }

  async onSave() {
    console.log(this.forms);
    console.log(this.props);
    let suser = false;
    let suadmin = false;
    let sspersonainfo = false;
    if (this.state.nuevo === true) {
      const upPersonaInfo = {
        first_name: this.forms.coordinator.firstName.value,
        last_name: this.forms.coordinator.lastName.value,
        email: this.forms.coordinator.username.value,
        gender: this.forms.coordinator.administrator_gender.value,
        phone_number_home: this.forms.coordinator.phone_number.value,
        phone_number_mobile: this.forms.coordinator.cellphone_number.value,
      };
      const upUser = {
        username: this.forms.coordinator.username.value,
        email: this.forms.coordinator.username.value,
        password: this.forms.coordinator.pass.value,
      };
      const coordinator = {
        user: upUser,
        personal_information: upPersonaInfo,
      };
      this.servicio.createCoordinador(coordinator);

      sspersonainfo = true;
      suser = true;
      suadmin = true;
    }
    if (sspersonainfo === true && suser === true) {
      // eslint-disable-next-line no-alert
      alert('Usuario actualizado correctamente');
      window.location = '/';
    } else {
      alert('Se produjo un error');
    }
  }

  getForm(form) {
    this.forms.coordinator = form;
  }

  cancelEdit() {
    location.hash = '';
    location.reload();
  }

  handleChange(e) {
    console.log(this);
    let { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }
    const user = { ...this.state.user, [name]: value };
    this.setState({ user });
  }

  render() {
    return (
      <form method="POST" action="" id="coordinator" ref={(form) => { this.forms.coordinator = form; }}>
        <div className="row">
          <div className="col-md-6 pt-3 pb-3 p-sm-5">
            <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="firstName">Nombre del coordinador:</label>
              </div>
              <div className="col-lg-8">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={this.state.user.personal_information.first_name || ''}
                />
                <InputFeedback
                  error={
                  this.props.errors
                    ? this.props.errors.personal_information.first_name
                    : null
                }
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="lastName">Apellido del coordinador:</label>
              </div>
              <div className="col-lg-8">
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={this.state.user.personal_information.last_name || ''}
                />
                <InputFeedback
                  error={
                  this.props.errors
                    ? this.props.errors.personal_information.last_name
                    : null
                }
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="administrator_gender">Genero:</label>
              </div>
              <div className="col-lg-8">
                <div className="sel-wrapper">
                  <Select
                    name="administrator_gender"
                    options={administratorGenderOptions}
                    className="form-control"
                    value={this.state.user.personal_information.gender || ''}
                  />
                </div>
                <InputFeedback
                  error={
                  this.props.errors
                    ? this.props.errors.administrator_gender
                    : null
                }
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="name">Número de teléfono:</label>
              </div>
              <div className="col-lg-8">
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  value={this.state.user.personal_information.phone_number || ''}
                />
                <InputFeedback
                  error={this.props.errors ? this.props.errors.name : null}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="name">Número de teléfono móvil:</label>
              </div>
              <div className="col-lg-8">
                <Input
                  id="cellphone_number"
                  name="cellphone_number"
                  type="text"
                  value={
                  this.state.user.personal_information.phone_number_mobile || ''
                }
                />
                <InputFeedback
                  error={
                  this.props.errors
                    ? this.props.errors.personal_information.phone_number_mobile
                    : null
                }
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="username">
                  Correo electronico (usuario de inicio sesion):
                </label>
              </div>
              <div className="col-lg-8">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={this.state.user.user.username || ''}
                />
                <InputFeedback
                  error={this.props.errors ? this.props.errors.name : null}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="pass">Contraseña:</label>
              </div>
              <div className="col-lg-8">
                <Input
                  id="pass"
                  name="pass"
                  type="password"
                  value={this.state.user.user.password || ''}
                />
                <InputFeedback
                  error={this.props.errors ? this.props.errors.name : null}
                />
              </div>
              <div className="row">
                <div className="col-sm-6 text-center text-sm-left mb-3 mb-sm-0">
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={
                    // Toggles edit mode this.props.onClick
                    e => this.cancelEdit()
                  }
                  >
                    Cancelar
                  </button>
                </div>
                <div className="col-sm-6 text-center text-sm-right">
                  <button className="btn btn-primary" type="button" onClick={() => this.onSave()}>
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default CoordinatorForm;
