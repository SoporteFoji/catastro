import React from 'react';
import ReactDOM from 'react-dom';
import AdministratorProfile from './components/administrator/AdministratorProfile.jsx';

const administrator_profile = document.getElementById('administrator-profile');
if (administrator_profile) {
  const user_type = document.getElementById('user-type');

  const type = 'administrator';
  const administratorId = administrator_profile.dataset.administratorId;
  const canEdit = administrator_profile.dataset.canEdit === 'true';
  console.log(canEdit);
  ReactDOM.render(
    <AdministratorProfile administratorId={administratorId} userType={type} canEdit={canEdit} />,
    administrator_profile,
  );
}
