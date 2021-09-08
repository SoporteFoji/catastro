import React from 'react';
import ReactDOM from 'react-dom';
import OrchestraDelete from './components/Orchestra/OrchestraDelete.jsx';

const orchestraDelete = document.getElementById('orchestra-del');
if (orchestraDelete) {
  const userType = document.getElementById('user-type');

  const type = userType.dataset.usertype;
  const { orchestraId } = orchestraDelete.dataset;
  const canEdit = orchestraDelete.dataset.canEdit === 'true';
  const canDel = orchestraDelete.dataset.canDel === 'true';

  ReactDOM.render(
    <OrchestraDelete orchestraId={orchestraId} userType={type} canEdit={canEdit} canDel={canDel} />,
    orchestraDelete,
  );
}
