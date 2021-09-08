import React, { Component } from 'react';
import axios from 'axios';
import get_csrf_token from '../../utils/csrf';
import ApiService from '../../services/api.jsx';
import { getAdministrator } from "../../utils/get.js";


class AdministratorDel extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.servicio = new ApiService();
    this.props = props;
    this.state = {
      props: props,
      editMode: true,
      saving: true,
      tab: null,
      canDel: this.props.canDel,
    };

    this.borrar = this.borrar.bind(this);
    this.checkEmptyValues = this.checkEmptyValues.bind(this);
  }

  componentDidMount() {
    const self = this;
    console.log('entra');
    if (this.props.administratorId > 0) {
    
      axios
        .get(`/api/administrator/${this.props.administratorId}/`)
        .then((response) => {
          console.table(response);
          this.Administrator = getAdministrator(response.data);
          self.checkEmptyValues(this.Administrator);
          self.setState(
            {
              saving: false,
              data: this.Administrator,
            },
            self.checkTab
          );
        })
        .catch((error) => {
          console.log(error);
          self.setState({ saving: false });
        });
    }
  }
  checkEmptyValues(data) {
    const emptyValues = [];
    for (const key in data) {
      if (
        Object.keys(data[key]).length === 0 ||
        !Object.keys(data[key]).length
      ) {
        emptyValues.push(key);
      }
    }
    this.setState({ emptyValues });
  }
  delete(id) {
    this.servicio.borrarAdministrator(id);
    //console.log(id);
    window.location = "/";
  }
  borrar() {
    return (
      <div>
        Desea borrar el Administrador: {this.props.administratorId}
        <button
          className="btn_tool"
          type="button"
          onClick={() => this.delete(this.state.data.id)}
        >
          Confirmar
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="container mt-3">
        {this.state.canDel ? this.borrar() : null}
      </div>
    );
  }
}

export default AdministratorDel;
