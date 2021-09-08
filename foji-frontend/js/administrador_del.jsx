import React from 'react';
import ReactDOM from 'react-dom';
import AdministratorDel from './components/administrator/AdministratorDel.jsx';


const administradorDel = document.getElementById('administrador-del');
const administratorId = administradorDel.dataset.administratorId;
const canDel = administradorDel.dataset.canDel === 'true';
ReactDOM.render(
  <AdministratorDel administratorId={administratorId} canDel={canDel} />,administradorDel,
);
