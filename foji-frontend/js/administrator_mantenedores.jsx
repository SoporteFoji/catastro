import React from 'react';
import ReactDOM from 'react-dom';

import MantenedorList from './components/administrator/MantenedorList.jsx';
const orchestra_list = document.getElementById('mantenedores_front');

if (orchestra_list) {
  const canAdd = orchestra_list.dataset.canAdd === 'true';
  ReactDOM.render(
    <MantenedorList canAdd={canAdd} />,
    orchestra_list,
  );
}
