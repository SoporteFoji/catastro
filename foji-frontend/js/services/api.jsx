/* eslint-disable camelcase */
import React, { Component } from 'react';

import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import get_csrf_token from '../utils/csrf';

class ApiService extends Component {
  constructor(props) {
    super(props);
    console.table(props);
    this.props = props;
  }

  async buscarUser(email) {
    return await axios.get(`/api/user-list?username=${email}`, {
      headers: {
        'X-CSRFToken': get_csrf_token(),
      },
    });
  }

  async actualizarCoordinadorOrquesta(idCoordinador, idOrquesta) {
    const data = {
      pk:idCoordinador,
      pkOrquesta:idOrquesta
    };
    return axios
      .post('/api/coordinator-orchesta-update/', data, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      });
  }
  async buscarCoordinador(email) {
    return await axios.get(`/api/coordinator-list?email=${email}`, {
      headers: {
        'X-CSRFToken': get_csrf_token(),
      },
    });
  }
  async buscarInformarionPersonal(email) {
    return await axios.get(`/api/personalinformation-list?email=${email}`, {
      headers: {
        'X-CSRFToken': get_csrf_token(),
      },
    });
  }

  createInformacionPersonal(inper) {
    return axios
      .post('/api/personalinformation-create/', inper, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      });
  }

  borrarCoordinador(id) {
    return axios
      .delete(`/api/coordinator-delete/${id}`, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      });
  }

  reasignarCoordinadorOrquesta(idOrchestra,idCoordinador) {

  }
  borrarAdministrator(id) {
    return axios
      .delete(`/api/administrator-delete/${id}`, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      });
  }
  borrarOrquesta(id) {
    return axios
      .delete(`/api/orquesta-delete/${id}`, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      });
  }
  async createAdministrator(inper) {
    let ssadmin = 0;
    await axios
      .post('/api/administrator-create/', inper, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      })
      .then((response) => {
        ssadmin = true;
        console.log('crea al admin');
        console.log(response);
        ssadmin = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });
    return ssadmin;
  }

  async createCoordinador(inper) {
    let ssadmin = 0;
    await axios
      .post('/api/coordinator-create/', inper, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      })
      .then((response) => {
        ssadmin = true;
        console.log('crea al admin');
        console.log(response);
        ssadmin = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });
    return ssadmin;
  }

  async createAdministrador(inper) {
    let ssadmin = 0;
    await axios
      .post('/api/administrator-create/', inper, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      })
      .then((response) => {
        ssadmin = true;
        console.log('crea al admin');
        console.log(response);
        ssadmin = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });
    return ssadmin;
  }

  async createUser(user) {
    let userinfo = 0;
    await axios
      .post('/api/user-create/', user, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      })
      .then((response) => {
        userinfo = true;
        console.log(response);
        userinfo = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });
    return userinfo;
  }
}

export default ApiService;
