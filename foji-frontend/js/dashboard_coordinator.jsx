import React from 'react';
import ReactDOM from 'react-dom';

import Notification from './components/Notifications/Notification.jsx';
import UserOrchestraList from './components/UserOrchestraList.jsx';
import AdministratorStats from './components/administrator/AdministratorStats.jsx';
import LatestOrchestras from './components/administrator/LatestOrchestras.jsx';
import LatestUsers from './components/administrator/LatestUsers.jsx';

const orchestra_list = document.getElementById('orchestra-list');
if (orchestra_list) {
  ReactDOM.render(
    <UserOrchestraList />,
    orchestra_list,
  );
}

const admin_stats = document.getElementById('admin-stats');
if (admin_stats) {
  ReactDOM.render(
    <AdministratorStats />,
    admin_stats,
  );
}

const latest_orchestras = document.getElementById('latest-orchestras');
if (latest_orchestras) {
  ReactDOM.render(
    <LatestOrchestras />,
    latest_orchestras,
  );
}

const latest_users = document.getElementById('latest-users');
if (latest_users) {
  ReactDOM.render(
    <LatestUsers />,
    latest_users,
  );
}

/*
const notifications = document.getElementById('notification');
if (notifications) {
  
  ReactDOM.render(
    <Notification type={'warning'} text={'Tienes orquestas incompletas'} />,
    notifications,
  );
  
}
*/

