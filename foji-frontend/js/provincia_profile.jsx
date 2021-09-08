import React from 'react';
import ReactDOM from 'react-dom';
import ProvinciaProfile from './components/administrator/ProvinciaProfile.jsx';

const provincia_profile = document.getElementById('provincia-profile');
if (provincia_profile) {
  const user_type = document.getElementById('user-type');

  const type = user_type.dataset.usertype;
  const provinciaId = provincia_profile.dataset.provinciaId;
  const canEdit = provincia_profile.dataset.canEdit === 'true';

  ReactDOM.render(
    <ProvinciaProfile provinciaId={provinciaId} userType={type} canEdit={canEdit} />,
    provincia_profile,
  );
}
