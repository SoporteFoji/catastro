/* eslint-disable camelcase */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import { data } from 'autoprefixer';
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
class AdministratorForm2 extends Component {
  constructor(props) {
    super(props);
    this.servicio = new ApiService();
    console.table(props);
    this.props = props;
    if (this.props.user) {
      this.state = {
        user: this.props,

        currentTab: this.props.tab || 'orchestra',
        edited: '',
        modal: this.props.modal || false,
        error: this.props.errors ? 'error' : '',
        errors: this.props.errors || null,
        nuevo: false,
        existe: true,
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
        nuevo: true,
      };
      this.state = {
        user: upUser,
        idInforp: 0,
        currentTab: this.props.tab || 'orchestra',
        edited: '',
        modal: this.props.modal || false,
        error: this.props.errors ? 'error' : '',
        errors: this.props.errors || null,
        nuevo: true,
        existe: false,
      };
    }

    this.forms = new Map();
    this.getForm = this.getForm.bind(this);
    this.buscarUsuario = this.buscarUsuario.bind(this);
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
    console.log(this.forms.administrator.pass.value);

    // personalinformation-update

    // user-update/<str:pk>/
    console.log('personal id');

    let suser = false;
    let suadmin = false;
    let sspersonainfo = false;
    if (this.state.nuevo === true) {
      const upPersonaInfo = {
        first_name: this.forms.administrator.firstName.value,
        last_name: this.forms.administrator.lastName.value,
        email: this.forms.administrator.username.value,
        gender: this.forms.administrator.administrator_gender.value,
        phone_number_home: this.forms.administrator.phone_number.value,
        phone_number_mobile: this.forms.administrator.cellphone_number.value,
      };
      const upUser = {
        username: this.forms.administrator.username.value,
        email: this.forms.administrator.username.value,
        password: this.forms.administrator.pass.value,
      };
      const admin = {
        user: upUser,
        personal_information: upPersonaInfo,
      };
      this.servicio.createAdministrador(admin);

      console.log(this.state.idInforp);
      sspersonainfo = true;
      suser = true;
      suadmin = true;  

   
    } else {
      const upUser = {
        id: this.props.user.id,
        username: this.forms.administrator.username.value,
        email: this.forms.administrator.username.value,
        password: this.forms.administrator.pass.value,
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
      console.log(this.props.id);
      const admin = {
        id: this.props.id,
        userid: this.props.user.id,
        password: this.forms.administrator.pass.value,
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
      sspersonainfo = this.updateInformacionPersonal(upPersonaInfo);
      suser = this.updateUser(upUser);
      suadmin = this.updateAdministrator(admin);  
    }
    if (sspersonainfo === true && suser === true) {
      // eslint-disable-next-line no-alert
      alert('Usuario actualizado correctamente');
      window.location = '/';
    } else {
      alert('Se produjo un error');
    }
  }

  async updateInformacionPersonal(upPersonaInfo) {
    let sspersonainfo = true;
    await axios
      .put(
        `/api/personalinformation-update/${upPersonaInfo.id}/`,
        upPersonaInfo,
        {
          headers: {
            'X-CSRFToken': get_csrf_token(),
          },
        },
      )
      .then((response) => {
        sspersonainfo = true;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    return sspersonainfo;
  }

  createUser(user) {}

  async updateUser(upUser) {
    let suser = false;
    await axios
      .put(`/api/user-update/${upUser.id}/`, upUser, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      })
      .then((response) => {
        console.log(response);
        suser = true;
      })
      .catch((error) => {
        console.log(error);
        alert('Se produjo un problema');
      });
    return suser;
  }

  async updateAdministrator(admin) {
    let suadmin = false;
    await axios
      .put(`/api/administrator-update/${admin.id}/`, admin, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      })
      .then((response) => {
        console.log(response);
        suadmin = true;
      })
      .catch((error) => {
        console.log(error);
        alert('Se produjo un problema');
      });
    return suadmin;
  }

  getForm(form) {
    this.forms.administrator = form;
  }

  cancelEdit() {
    location.hash = '';
    location.reload();
  }

  buscarUsuario() {
    const idAdmin = 0;
    let idInfop = 0;
    axios
      .get(
        `/api/v1/administrators/?username=${this.forms.administrator.username.value}`,
        {
          headers: {
            'X-CSRFToken': get_csrf_token(),
          },
        },
      )
      .then((response) => {
        console.log(response.data.count);
        if (response.data.count > 0) {
          this.setState({
            existe: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.servicio
      .buscarInformarionPersonal(this.forms.administrator.username.value)
      .then((response) => {
        console.log(response.data.results);// .data.results
        return response.data.results;
      })
      .then((results) => {
        if (results[0] !== undefined) {
          console.log(results[0].id);
          idInfop = results[0].id;
          console.log(idInfop);
          this.setState({
            idInforp: idInfop,
          });
        } else {

        }
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(results[0].id);


    console.log('hola:', this.state.idInforp, idInfop);
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
      <form
        method="POST"
        action=""
        id="administrator"
        ref={(form) => {
          this.forms.administrator = form;
        }}
      >
        <div className="row">
          <div className="col-md-6 pt-3 pb-3 p-sm-5">
            <div className="row form-group">
              <div className="col-lg-4">
                <label htmlFor="firstName">Nombre del administrador:</label>
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
                <label htmlFor="lastName">Apellido del administrador:</label>
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
                  value={
                    this.state.user.personal_information.phone_number || ''
                  }
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
                    this.state.user.personal_information.phone_number_mobile
                    || ''
                  }
                />
                <InputFeedback
                  error={
                    this.props.errors
                      ? this.props.errors.personal_information
                        .phone_number_mobile
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
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => this.onSave()}
                  >
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

export default AdministratorForm2;
