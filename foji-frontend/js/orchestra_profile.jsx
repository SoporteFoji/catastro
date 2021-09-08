import React from 'react';
import ReactDOM from 'react-dom';
import OrchestraProfile from './components/Orchestra/OrchestraProfile.jsx';

const orchestraProfile = document.getElementById('orchestra-profile');
if (orchestraProfile) {
  const userType = document.getElementById('user-type');

  const type = userType.dataset.usertype;
  const { orchestraId } = orchestraProfile.dataset;
  const canEdit = orchestraProfile.dataset.canEdit === 'true';
  const isStaff = orchestraProfile.dataset.isStaff === 'true';
  ReactDOM.render(
    <OrchestraProfile orchestraId={orchestraId} userType={type} canEdit={canEdit} isStaff={isStaff} />,
    orchestraProfile,
  );
}
