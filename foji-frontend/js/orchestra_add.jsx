import React from 'react';
import ReactDOM from 'react-dom';
import OrchestraAdd from './components/Orchestra/OrchestraAdd.jsx';

const orchestraAdd = document.getElementById('orchestra-add');
const userType = document.getElementById('user-type');

const type = userType.dataset.usertype;
const orchestraId = 0;
const canEdit = true;
ReactDOM.render(
  <OrchestraAdd orchestraId={orchestraId} userType={type} canEdit={canEdit} />,
  orchestraAdd,
);
