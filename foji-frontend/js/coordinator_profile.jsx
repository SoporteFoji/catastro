import React from 'react';
import ReactDOM from 'react-dom';
import CoordinatorProfile from './components/Coordinator/CoordinatorProfile.jsx';

const coordinator_profile = document.getElementById('coordinator-profile');
if (coordinator_profile) {
  const user_type = document.getElementById('user-type');

  const type = 'coordinator';
  const coordinatorId = coordinator_profile.dataset.coordinatorId;
  const canEdit = coordinator_profile.dataset.canEdit === 'true';

  ReactDOM.render(
    <CoordinatorProfile coordinatorId={coordinatorId} userType={type} canEdit={canEdit} />,
    coordinator_profile,
  );
}
