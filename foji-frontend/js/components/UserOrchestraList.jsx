import React, { Component } from 'react';

import TableHeader from './Tables/TableHeader.jsx';
import TableItem from './Tables/TableItem.jsx';
import TableEdit from './Tables/TableEdit.jsx';
import Notification from './Notifications/Notification.jsx';
import Modal from './Modal.jsx';
import { getOrchestraList } from '../utils/get.js';
import { getExampleOrchestraList } from '../utils/get.js';
import axios from 'axios';

let orchestras = [];

class UserOrchestraList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orchestras: [],
      header: [
        {name: 'Lista de orquestas'},
        {name: 'Fecha'},
        {name: 'Integrantes'},
        {name: 'Locación'},
        {name: 'Sostenedor'},
      ],
    }

    this.showAlert = this.showAlert.bind(this);
  }
  showAlert(){
    if(!this.state.orchestras.length){
      return(
        <div className="alert alert-secondary mt-5 mb-3 text-center">
          <Notification type={'warning'} text={'No tienes orquestas registradas, presiona "Agregar orquesta".'} />
        </div>
      );
    }
  }
  showDisclaimer(){
    if(this.state.disclaimer){
      return (
        <Modal title='Aviso Importante' 
          onCloseModal={() => this.setState({ disclaimer: false })} 
          onSubmit={() => location.href = '/dashboard/orquesta/'} size="md" buttonTitle="Aceptar" center>
          <div className="p-3">
            <div className="alert alert-danger">La Fundación considera orquestas juveniles o infantiles, a aquellas agrupaciones musicales que:</div>
            <ul>
              <li>Tienen un número mínimo de 12 instrumentistas</li>
              <li>Están integradas por niños o jóvenes de hasta 24 años de edad</li>
              <li>Tocan instrumentos de cuerda (con presencia predominante de violines y violoncellos)</li>
              <li>Incorporan idealmente instrumentos de viento y percusión</li>
            </ul>
            <p><b>La fundación se reserva el derecho de aceptar o declinar conjuntos intrumentales que no cumplan con los requisitos mencionados.</b></p>
            <p>Para cualquier consulta, no dudes en contactarnos a <a href="mailto:catastro@foji.cl">catastro@foji.cl</a></p>
          </div>
        </Modal>
      )
    }
  }
  componentDidMount(){
    let self = this;
    axios.get('/api/me/orchestras/')
    .then(function (response) {
      //console.log(response.data);
      orchestras = getOrchestraList(response.data);
      self.setState({ orchestras: orchestras })
    })
    .catch(function (error) {
      console.log(error);
      if(error.response.status === 404){
        orchestras = getOrchestraList(getExampleOrchestraList());
        self.setState({ orchestras: orchestras })
      }
    });
  }
  render() {
    return (
      <div>
        {
          this.showAlert(),
          this.showDisclaimer()
        }
        <div className="full-box">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  {
                    this.state.header.map((th) => {
                      return <TableHeader name={th.name} key={th.name} />
                    })
                  }
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.orchestras.length ?
                    this.state.orchestras.map((item) => {
                        return (
                          <tr key={item.url}>
                            <TableItem {...item} type={'orchestra-coordinator'} />
                            <TableEdit url={item.url}  />
                          </tr>
                        )
                    })
                  : <tr><td><div className="p-3"><span>No hay orquestas registradas.</span></div></td></tr>
                }
              </tbody>
            </table>
          </div>
          <div className="bottom-box text-center">
            <button className="btn btn-primary" type="button" onClick={() => this.setState({ disclaimer: true })}>Agregar orquesta</button>
          </div>
        </div>
      </div>
    ) 
  };
}

export default UserOrchestraList;
