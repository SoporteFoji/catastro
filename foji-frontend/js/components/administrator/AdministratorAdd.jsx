import React, { Component } from 'react';
import axios from 'axios';
import get_csrf_token from '../../utils/csrf';
import AdministratorForm2 from './AdministratorForm2.jsx';

class AdministratorAdd extends Component {
  render() {
    return (
      <AdministratorForm2 />
    );
  }
}

export default AdministratorAdd;
