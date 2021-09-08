import React from 'react';
import ReactDOM from 'react-dom';
import CoordinatorDelete from './components/Coordinator/CoordinatorDelete.jsx';

const coordinator_del = document.getElementById('coordinator-del');
if (coordinator_del) {
  const user_type = document.getElementById('user-type');

  const type = 'coordinator';
  const coordinatorId = coordinator_del.dataset.coordinatorId;
  const canEdit = coordinator_del.dataset.canEdit === 'true';

  ReactDOM.render(
    <CoordinatorDelete coordinatorId={coordinatorId} userType={type} canEdit={canEdit} />,
    coordinator_del,
  );
}
