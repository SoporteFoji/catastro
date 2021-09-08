import React, { Component } from 'react';

import MemberDetail from './MemberDetail.jsx';
import AgeFromDate from '../AgeFromDate.jsx';
import { checkEmpty, getAdministrator } from '../../utils/get.js';
import Modal from '../Modal.jsx';
import ApiService from '../../services/api.jsx';

class MemberCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.props = props;
    const coordinatorFoundInit = {
      id: null,
      userName: null,
    };
    this.servicio = new ApiService();
    this.state = {
      modal: false,
      emailbuscar: '',
      nombreCoordinador: '',
      idCoordinador: 0,
      idOrchestra: this.props.orchestraId,
      coordinadorEncontrado: { ...coordinatorFoundInit },
    };
    this.openModal = this.openModal.bind(this);
    this.buscarCoordinador = this.buscarCoordinador.bind(this);
    this.contentPermision = this.contentPermision.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cambiarCoordinadorApi = this.cambiarCoordinadorApi.bind(this);
  }

  openModal() {
    this.setState({
      modal: true,
    });
  }
  cambiarCoordinadorApi() {
    if(confirm("Desea Cambiar el coordinador de esta orquesta")){
      this.servicio.actualizarCoordinadorOrquesta(this.state.idCoordinador, this.state.idOrchestra).then(
        (response) => {
          console.log(response);
          if(response.data ==='0'){
            window.location = "/orquesta/"+this.state.idOrchestra;
          } else {
            alert('Ocurrio un error');
          }
        }
      );
    }
  }
  handleInputChange(e) {
    console.log(e.target.value);
    this.setState({
      emailbuscar: e.target.value,
    });
  }

  buscarCoordinador() {
    const currentComponent = this;
    console.log(this.state.emailbuscar);
    this.servicio
      .buscarCoordinador(this.state.emailbuscar)
      .then((response) => {
        if (response.data.count > 0) {
          const idCoordinador = response.data.results[0].id;
          const nombre = `${response.data.results[0].personal_information.first_name} ${response.data.results[0].personal_information.last_name}`;
          const coordinatorFound = {
            id: idCoordinador,
            userName: nombre,
          };
          console.log(currentComponent.state.idOrchestra);
          currentComponent.setState({
            nombreCoordinador: nombre,
            idCoordinador,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
 }

  cambiarCoordinador() {
    if (this.state.modal) {
      return (
        <Modal
          title="Cambiar coordinador"
          onCloseModal={() => this.setState({ modal: false })}
          onSubmit={() => this.setState({ modal: false })}
          buttonTitle="Cerrar"
          size="lg"
          center
          scrollable
        >
          <div className="p-3">
            <div className="m-2">
              Buscar por email:
              <input
                type="email"
                id="filter"
                placeholder="Buscar coordinador"
                onChange={this.handleInputChange}
              />
              {' '}
              <button onClick={this.buscarCoordinador}>Buscar</button>
            </div>
            {this.state.nombreCoordinador}
            <button onClick={this.cambiarCoordinadorApi}>Cambiar Coordinador</button>
            <div />
          </div>
        </Modal>
      );
    }
  }

  contentPermision(content) {
    if (this.props.canEdit) {
      switch (content) {
        case 'contact':
          return (
            <>
              <MemberDetail
                type="email"
                info={this.props.details.email || ''}
              />
              <MemberDetail
                type="phone"
                info={
                  this.props.details.phone_number_mobile
                  || ''
                  || this.props.details.phone_number_home
                  || ''
                }
              />
              <MemberDetail
                type="marker"
                info={this.props.details.address || ''}
              />
              {this.props.type === 'coordinator' && this.props.isStaff === false ? (
                <button onClick={this.openModal}>Cambiar Coordinador</button>
                ) : null}
            </>
          );
          break;
        case 'personal':
          return (
            <>
              <MemberDetail
                info={this.props.details.social_id || ''}
                name="Rut"
              />
              <MemberDetail
                info={
                  (this.props.details.birth_date ? (
                    <AgeFromDate date={this.props.details.birth_date} />
                  ) : (
                    ''
                  )) || ''
                }
                name="Edad"
              />
            </>
          );
          break;
      }
    }

    return null;
  }

  render() {
    let buttonIncomplete = '';
    let buttonMissing = '';
    const { canEdit } = this.props;
    if (canEdit) {
      buttonIncomplete = (
        <a
          href="#"
          className="btn btn-primary btn-sm mt-2"
          onClick={e => this.props.onClick(e, this.props.type)}
        >
          Editar
        </a>
      );
      buttonMissing = (
        <a
          href="#"
          className="btn btn-warning btn-sm mt-2"
          onClick={e => this.props.onClick(e, this.props.type)}
        >
          Registrar
        </a>
      );
    }
    // Basic credentians required to render
    if (
      (this.props.details.first_name && this.props.details.last_name)
      || this.props.details.name
    ) {
      return (
        <>
          {this.cambiarCoordinador()}
          <div className="user-info col-lg-6 py-2 px-0">
            <div className="user-main py-2 px-3">
              <div
                className={`icon ${
                  this.props.icon ? `${this.props.icon}-icon ` : 'user-icon '
                }d-inline-block`}
              />
              <div className="d-inline-block ml-2">
                <div>
                  <span className="text-secondary">
                    <b>
                      {
                        // has full name or name + last name, and adds - if role
                        this.props.details.name
                          || `${this.props.details.first_name} ${this.props.details.last_name}`
                      }
                    </b>
                  </span>
                  <span className="text-muted d-block">
                    {this.props.right || ''}
                  </span>
                </div>
                <span className="text-muted d-block">
                  {
                    // prints role if exists or instrument if exist
                    (this.props.role ? this.props.role : '')
                      || (this.props.details.instrument
                        ? `Instrumento: ${this.props.details.instrument}`
                        : '')
                  }
                </span>
              </div>
            </div>
            <div className="user-details">
              <div className="container-fluid">
                <div className="row py-2">
                  {this.contentPermision('contact')}
                </div>
                <div className="row py-2">
                  {this.contentPermision('personal')}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    if (Object.keys(this.props.details).length) {
      checkEmpty(this.props.details);
      return (
        <div className="user-info empty col-lg-6 py-5 px-0">
          <div className="text-muted text-center">
            <span className="d-block">
              {`${
                this.props.role ? this.props.role : this.props.right
              } incompleto`}
            </span>
            {buttonIncomplete}
          </div>
        </div>
      );
    }
    return (
      <div className="user-info empty col-lg-6 py-5 px-0">
        <div className="text-muted text-center">
          <span className="d-block">
            {`${
              this.props.role ? this.props.role : this.props.right
            } no registrado`}
          </span>
          {buttonMissing}
        </div>
      </div>
    );
  }
}
MemberCard.defaultProps = {
  details: {
    name: '',
    first_name: '',
    last_name: '',
  },
};

export default MemberCard;
