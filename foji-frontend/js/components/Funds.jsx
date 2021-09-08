import React, { Component } from 'react';

class Input extends Component {
  getFunds(funds){

    if(funds && funds.length){
      return funds.map((fund) => { 
        return <span key={fund.join('-')} className="badge badge-pill badge-secondary mb-2 mr-2">{fund.join(' / ')}</span>
      })
    } else {
      let canEdit = this.props.canEdit;
      let buttonMissing = '';
      if(canEdit){
        buttonMissing = <a href={'#'} className="btn btn-warning btn-sm mt-2" onClick={(e) => this.props.onClick(e, 'funds')}>Registrar</a>;
      }
      return (
        <div>
          <span className="mr-3">No hay financiamientos registrados.</span>
          { buttonMissing }
        </div>
      )
    }
  }
  render() {
    let defaultText = this.props.defaultText;
    return (
      <>
        <div className="box-title">
          <h4>Financiamientos de la Orquesta:</h4>
        </div>
        <div className="box-content">
          <div className="badges-items mt-4 mb-4">
            {this.getFunds(this.props.funds)}          
          </div>
        </div>
      </>
    );
  };
}

Input.defaultProps = {
  defaultText: 'No hay financiamientos registrados',
  funds: [],
}

export default Input;
