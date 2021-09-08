import React, { Component } from 'react';
import FormatDate from '../../utils/FormatDate.js';


class OrchestraDates extends Component {

  render() {
    return (
      <div className="py-3">
        <div className="row text-secondary">
          <div className="col-6 text-right">
            <span className="d-block">Fundación:</span>
            <span className="d-block">Registro:</span>
            <span className="d-block">Actualizado:</span>
          </div>
          <div className="col-6 text-left">
            <span className="d-block font-italic">{this.props.creation}</span>
            <span className="d-block font-italic">{FormatDate(this.props.registration)}</span>
            <span className="d-block font-italic">{FormatDate(this.props.updated)}</span>
          </div>
        </div>
      </div>
    );
  };
}


export default OrchestraDates;
