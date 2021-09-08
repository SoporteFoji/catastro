import React, { Component } from 'react';
import axios from 'axios';
import get_csrf_token from '../utils/csrf';
import { cleanFunding } from '../utils/clean.js';
import FundingAdd from './AddFundingComponent/FundingAdd.jsx';

class FundingAjax extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }
  onClick(e){
    const self = this;
    let fundings = this.state.values || [];
    axios.post('/api/v1/dashboard/orchestras/' + self.props.orchestraId + '/funding/' , cleanFunding(fundings), {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        }
      })
    .then(function(response){
      location.href = '/dashboard/orquesta/' + self.props.orchestraId + '/integrantes/';
    })
    .catch(function(error){
      console.log(error.response);
    });
  }
  onAdd(values){
    this.setState({
      values: values,
    })
  }
  render() {
    return (
      <>
        <div className="box-title">
          <h4>Financiamiento de la Orquesta</h4>
        </div>
        <div className="box-content mb-3">
          <FundingAdd onAdd={this.onAdd} />
        </div>
        <div className="bottom-box">
          <div className="row">
            <div className="col-xs-6">
              <a href="/dashboard/" className="btn btn-light">Cancelar</a>
            </div>
            <div className="col-xs-6 text-right">
              <button className="btn btn-primary" type="button" onClick={this.onClick}>Siguiente</button>
            </div>
          </div>
        </div>
      </>
    );
  };
}

export default FundingAjax;
