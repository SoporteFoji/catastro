import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from './components/LoginForm.jsx';
import Notification from './components/Notifications/Notification.jsx';


const notification = document.getElementById('notification');
if (notification) {
  ReactDOM.render(
    <Notification type={'warning'} text={'Debes ingresar con tu usuario para continuar.'} />,
    notification,
  );
}

const login_form = document.getElementById('login-form');
if (login_form) {
  ReactDOM.render(
    <LoginForm />,
    login_form,
  );
}
