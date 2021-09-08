import React from 'react';
import ReactDOM from 'react-dom';
import OrchestraList from './components/administrator/OrchestraList.jsx';

const orchestra_list = document.getElementById('admin-orchestra-list');
if (orchestra_list) {
  const canAdd = orchestra_list.dataset.canAdd === 'true';
  ReactDOM.render(
    <OrchestraList canAdd={canAdd} />,
    orchestra_list,
  );
}
