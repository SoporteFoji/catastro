import React from 'react';
import ReactDOM from 'react-dom';

import ExcelUpload from './components/ExcelUpload.jsx';
import MembersUpload from './components/MembersUpload.jsx';

const excel_upload = document.getElementById('excel-upload');
if (excel_upload) {
  const orchestraId = excel_upload.dataset.orchestraId;
  ReactDOM.render(
    <ExcelUpload url={'/orquesta/' + orchestraId + '/integrantes.xlsx'} orchestra_id={orchestraId} />,
    excel_upload,
  );
}

const members_upload = document.getElementById('members-upload');
if (members_upload) {
  const orchestraId = members_upload.dataset.orchestraId;
  ReactDOM.render(
    <MembersUpload orchestra_id={orchestraId}/>,
    members_upload,
  );
}
