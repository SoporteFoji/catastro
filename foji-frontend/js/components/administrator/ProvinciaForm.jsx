/* eslint-disable camelcase */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Select from '../Select.jsx';
import Input from '../Input.jsx';
import InputFeedback from '../InputFeedback.jsx';
import get_csrf_token from '../../utils/csrf';
import regeneratorRuntime from "regenerator-runtime";

const administratorGenderOptions = [
  { title: 'Selecciona el género', value: '' },
  { title: 'Femenino', value: 'F' },
  { title: 'Masculino', value: 'M' },
  { title: 'Otro', value: 'O' },
];

// eslint-disable-next-line react/prefer-stateless-function
class ProvinciaForm extends Component {
  constructor(props) {
    super(props);
    console.table(props);
    this.props = props;
    this.state = {
      provincia: this.props,
      currentTab: this.props.tab || 'orchestra',
      edited: '',
      modal: this.props.modal || false,
      error: this.props.errors ? 'error' : '',
      errors: this.props.errors || null,
      regiones: this.props.regiones,
      tabs: [
        { name: 'Orquesta', id: 'orchestra' },
        { name: 'Integrantes', id: 'members' },
        { name: 'Sostenedor', id: 'institution' },
        { name: 'Financiamiento', id: 'funds' },
      ],
    };
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
    const upUser = {
      id: this.props.user.id,
      username: this.forms.administrator.username.value,
      email: this.forms.administrator.username.value,
    };
    const upPersonaInfo = {
      id: this.props.personal_information.id,
      first_name: this.forms.administrator.firstName.value,
      last_name: this.forms.administrator.lastName.value,
      email: this.forms.administrator.username.value,
      gender: this.forms.administrator.administrator_gender.value,
      phone_number_home: this.forms.administrator.phone_number.value,
      phone_number_mobile: this.forms.administrator.cellphone_number.value,
    };
    const admin = {
      id: this.props.id,
      user: {
        username: this.forms.administrator.username.value,
        email: this.forms.administrator.username.value,
      },
      personal_information: {
        // eslint-disable-next-line react/destructuring-assignment
        // eslint-disable-next-line react/prop-types
        id: this.props.personal_information.id,
        first_name: this.forms.administrator.firstName.value,
        last_name: this.forms.administrator.lastName.value,
        email: this.forms.administrator.username.value,
        gender: this.forms.administrator.administrator_gender.value,
        phone_number_home: this.forms.administrator.phone_number.value,
        phone_number_mobile: this.forms.administrator.cellphone_number.value,
      },
    };

    // personalinformation-update

    // user-update/<str:pk>/
    console.log('personal id');
    console.log(upPersonaInfo);
    let suser = false;
    let sspersonainfo = false;

    await axios.put(`/api/personalinformation-update/${upPersonaInfo.id}/`, upPersonaInfo, {
      headers: {
        'X-CSRFToken': get_csrf_token(),
      },
    }).then((response) => {
      sspersonainfo = true;
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      });

    console.log('user id');
    await axios.put(`/api/user-update/${upUser.id}/`, upUser, {
      headers: {
        'X-CSRFToken': get_csrf_token(),
      },
    }).then((response) => {
      console.log(response);
      suser = true;
    }).catch((error) => {
      console.log(error);
      alert('Se produjo un problema');
    });
    console.log(sspersonainfo);
    console.log(suser);
    if (sspersonainfo === true && suser === true) {
      // eslint-disable-next-line no-alert
      alert('Usuario actualizado correctamente');
      window.location = '/usuarios';
    } else {
      alert('Se produjo un error');
    }
  }

  getForm(form) {
    this.forms.provincia = form;
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
      <form method="POST" action="" id="provincia" ref={(form) => { this.forms.provincia = form; }}>
        <div className="row">
          <div className="col-md-6 pt-3 pb-3 p-sm-5">
            <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="idProvincia">Id Provincia:</label>
              </div>
              <div className="col-lg-8">
                <Input
                  id="idProvincia"
                  name="idProvincia"
                  type="text"
                  value={this.state.provincia.id || ''}
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
                <label htmlFor="nombreProvincia">Nombre Provincia:</label>
              </div>
              <div className="col-lg-8">
                <Input
                  id="nombreProvincia"
                  name="nombreProvincia"
                  type="text"
                  value={this.state.provincia.name || ''}
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
                <label htmlFor="codeProvincia">Código Provincia:</label>
              </div>
              <div className="col-lg-8">
                <Input
                  id="codeProvincia"
                  name="codeProvincia"
                  type="text"
                  value={this.state.provincia.code || ''}
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
                <label htmlFor="provincia_region">Region:</label>
              </div>
              <div className="col-lg-8">
                <div className="sel-wrapper">
                  <Select
                    name="provincia_regiones"
                    options={this.state.regiones}
                    className="form-control"
                   // value={this.state.user.personal_information.gender || ''}
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

export default ProvinciaForm;
