import React from 'react';
import ReactDOM from 'react-dom';
import RegionProfile from './components/administrator/RegionProfile.jsx';

const region_profile = document.getElementById('region-profile');
if (region_profile) {
  const user_type = document.getElementById('user-type');

  const type = user_type.dataset.usertype;
  const regionId = region_profile.dataset.regionId;
  const canEdit = 'true';

  ReactDOM.render(
    <RegionProfile regionId={regionId} userType={type} canEdit={canEdit} />,
    region_profile,
  );
}
