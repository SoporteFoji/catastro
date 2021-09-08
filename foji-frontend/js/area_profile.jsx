import React from 'react';
import ReactDOM from 'react-dom';
import AreaProfile from './components/administrator/AreaProfile.jsx';

const area_profile = document.getElementById('area-profile');
if (area_profile) {
  const user_type = document.getElementById('user-type');

  const type = user_type.dataset.usertype;
  const areaId = area_profile.dataset.areaId;
  const canEdit = area_profile.dataset.canEdit === 'true';

  ReactDOM.render(
    <AreaProfile areaId={areaId} userType={type} canEdit={canEdit} />,
    area_profile,
  );
}
