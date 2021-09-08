import React from 'react';
import ReactDOM from 'react-dom';

import CoordinatorRegistrationForm from './components/CoordinatorRegistrationForm.jsx';
import InstitutionRegistrationForm from './components/InstitutionRegistrationForm.jsx';
import OrchestraRegistrationForm from './components/OrchestraRegistrationForm.jsx';
import AddFundingComponent from './components/AddFundingComponent/FundingAdd.jsx';
import LoginForm from './components/LoginForm.jsx';


const coordinator_form = document.getElementById('coordinator-form');
if (coordinator_form) {
  ReactDOM.render(
    <CoordinatorRegistrationForm />,
    coordinator_form,
  );
}

const institution_form = document.getElementById('institution-form');
if (institution_form) {
  ReactDOM.render(
    <InstitutionRegistrationForm />,
    institution_form,
  );
}

const orchestra_form = document.getElementById('orchestra-form');
if (orchestra_form) {
  ReactDOM.render(
    <OrchestraRegistrationForm />,
    orchestra_form,
  );
}

const funding_form = document.getElementById('funding-form');
if (funding_form) {
  ReactDOM.render(
    <AddFundingComponent />,
    funding_form,
  );
}


