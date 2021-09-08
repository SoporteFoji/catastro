import React, { Component } from 'react';
import axios from 'axios';
import { getExampleOrchestraList, getOrchestraList } from '../../utils/get.js';
import CoverPhoto from '../Orchestra/CoverPhoto.jsx';
import FormatDate from '../../utils/FormatDate.js';

let orchestras = [];

class LatestOrchestras extends Component {
  constructor(props){
    super(props);

    this.state = {
      orchestras: [],
    }

    this.getOrchestras = this.getOrchestras.bind(this);
  }

  getStatusClass(orchestra){
    let status = orchestra.current_status;
    switch(status){
      case "active":
        status = "primary"; 
        break;
      case "inactive":
        status = "danger";
        break;
      case "paused":
        status = "warning";
        break;
      default:
        status = "error";
        break;
    }
    return status;
  }

  getStatusText(orchestra){
    let status = orchestra.current_status;
    switch(status){
      case "active":
        status = "Activa"; 
        break;
      case "inactive":
        status = "Inactiva";
        break;
      case "paused":
        status = "En pausa";
        break;
      default:
        status = "error";
        break;
    }
    return status;
  }

  getOrchestras(){
    const orchestraList = this.state.orchestras;
    return orchestraList.map((orchestra) => {
      return(
        <li key={orchestra.url} className="px-3">
          <div className="d-block w-0-space tmb-big relative py-4">
            <CoverPhoto url={orchestra.image} className="tmb-image" />
            <div className="d-inline-block ml-3">
              <a href={'/orquesta/' + orchestra.url + '/'} className="warp-link d-block text-dark"><h5>{orchestra.name}</h5></a>
              <span className="d-block text-secondary">Fecha de registro: <i>{orchestra.registered ? FormatDate(orchestra.registered) : ''}</i></span>
              <span className="d-block text-secondary">Actualizado: <i>{orchestra.updated ? FormatDate(orchestra.updated) : ''}</i></span>
              <span className="d-block text-secondary">Estado: 
                <a href={'/orquesta/' + orchestra.url + '/'} className={'text-' + (orchestra.status ? 'primary' : 'warning') } >
                  {orchestra.status ? ' Validada' : ' No validada'}
                </a>
              </span>
              <span className="d-block text-secondary">Actividad: 
                <a href={'/orquesta/' + orchestra.url + '/'} className={ 'text-' + this.getStatusClass(orchestra)} >
                  {" "+this.getStatusText(orchestra)}
                </a>
              </span>
            </div>
          </div>
        </li>
      )
    });
  }
  componentDidMount(){
    const self = this;
    axios.get('/api/v1/orchestras/latest/')
    .then(function(response){
      orchestras = getOrchestraList(response.data);
        self.setState({
          orchestras: orchestras,
        })

    })
    .catch(function(error){
      console.log(error);
      orchestras = getExampleOrchestraList();
      console.log(orchestras);
      self.setState({
        orchestras: orchestras,
      })
    });
  }
  render() {
    return (
      <div id="latest-orchestras-widget" className="">
        <div className="full-box">
          <div className="box-title py-3">
            <span className="text-secondary">Últimas Orquestas Registradas</span>
          </div>
          <ul className="mx-0 px-0">
            { this.getOrchestras() }
          </ul>
          <div className="bottom-box text-center">
            <a href="/orquestas/" className="btn btn-info">
              Ver Todas
            </a>
          </div>
        </div>
      </div>
    );
  };
}

export default LatestOrchestras;
