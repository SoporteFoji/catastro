import React, { Component } from 'react';
import axios from 'axios';
import get_csrf_token from '../../utils/csrf';
import CoordinatorForm from './CoordinatorForm2.jsx';

class CoordinatorAdd extends Component {
  render() {
    return (
      <CoordinatorForm />
    );
  }
}

export default CoordinatorAdd;
