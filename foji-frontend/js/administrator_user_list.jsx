import React from 'react';
import ReactDOM from 'react-dom';

import UserList from './components/administrator/UserList.jsx';

const user_list = document.getElementById('admin-user-list');
if(user_list) {
  const canAdd = user_list.dataset.canAdd === 'true';
  ReactDOM.render(
    <UserList canAdd={canAdd} />,
    user_list,
  );
}
