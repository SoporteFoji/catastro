import React from 'react';
import ReactDOM from 'react-dom';
import AllNotifications from './components/Notifications/AllNotifications.jsx';

const notifications_list = document.getElementById('admin-notifications-list');
if (notifications_list) {
  
  ReactDOM.render(
    <AllNotifications />,
    notifications_list,
  );
}
