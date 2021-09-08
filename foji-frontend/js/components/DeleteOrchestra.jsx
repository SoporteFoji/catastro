import React, { Component } from 'react';
import axios from 'axios';
import get_csrf_token from '../utils/csrf';
import Modal from './Modal.jsx';
import Notification from './Notifications/Notification.jsx';

class DeleteOrchestra extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      modalText: '',
      modalType: '',
    };

    this.deleteOrchestra = this.deleteOrchestra.bind(this);
    this.onClick = this.onClick.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  onClick(e) {
    console.log(e);
    this.setState({
      modal: true,
      modalText: '¿Seguro que quieres borrar esta orquesta?',
      modalType: 'warning',
    });
  }

  showModal() {
    const type = this.state.modalType;
    let action;
    switch (type) {
      case 'success':
        action = this.redirect;
        break;
      case 'warning':
        action = this.deleteOrchestra;
        break;
      case 'error':
        action = () => this.setState({ modal: false });
    }
    if (this.state.modal) {
      return (
        <Modal
          title="Eliminar Orquesta"
          onCloseModal={type === 'success' ? this.redirect : (() => this.setState({ modal: false }))}
          onSubmit={action}
          size="md"
          center
          buttonTitle={type === 'warning' ? 'Borrar' : 'OK'}
        >
          <div className="p-3">
            <Notification type={type} text={this.state.modalText} />
          </div>
        </Modal>
      );
    }
  }

  redirect() {
    location.href = '/dashboard/';
  }

  deleteOrchestra(id) {
    this.servicio.borrarCoordinador(id)
      .then((response) => {
        this.setState({
          modal: true,
          modalText: 'Orquesta borrada exitósamente.',
          modalType: 'success',
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          modal: true,
          modalText: 'Error al borrar orquesta',
          modalType: 'error',
        });
      });
  }

  render() {
    return (
      <>
        {this.showModal()}
        <button className="btn btn-light btn-sm mt-3" onClick={this.onClick} type="button">
          <div className="icon close-icon mr-2" />
          Eliminar orquesta
        </button>
      </>
    );
  }
}


export default DeleteOrchestra;
