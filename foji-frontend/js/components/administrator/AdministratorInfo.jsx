/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import StatusButton from '../StatusButton.jsx';
import AdministratorEdit from './AdministratorForm.jsx';

class AdministratorInfo extends Component {
  // eslint-disable-next-line camelcase
  adminPanel(usertype, code, is_active, administrator_id) {
    if (usertype === 'administrator') {
      return (
        <div id="admin-panel" className="full-box text-secondary py-3 gray-50">
          <div>
            <span>
              Código:
              {' '}
              {code}
            </span>
          </div>
          <StatusButton is_active={is_active} administrator_id={administrator_id} />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      
      <div className="col-lg-4 text-center pt-4" id="administrator-info">
        <div className="full-box">
          <div className="tmb-wrapper d-inline-block">
          </div>
          <AdministratorEdit />
          <div className="bottom-box px-0 pt-0">
          </div>
        </div>
        {this.adminPanel(this.props.userType, this.props.administrator_code, this.props.is_active, this.props.administrator_id)}
      </div>
    );
  }
}


export default AdministratorInfo;
