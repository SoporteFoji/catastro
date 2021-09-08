import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LoginForm from './components/LoginForm.jsx';
import LoggedIn from './components/LoggedIn.jsx';
import Navigation from './components/Navigation/Navigation.jsx';

// Email validation login
const login_form_validation = document.getElementById('login-form');
if (login_form_validation) {
  ReactDOM.render(
    <LoginForm />,
    login_form_validation,
  );
}
// User not logged in
const login_form = document.getElementById('nav-login-form');
if (login_form && !login_form_validation) {
  ReactDOM.render(
    <LoginForm />,
    login_form,
  );
}
// User logged in
let urls = new Map();
urls.set("coordinator", '/perfil/');
urls.set("administrator", '/cambiar-clave/');
const logged_in = document.getElementById('nav-logged-in');
if (logged_in) {
  // test user
  const first_name = logged_in.dataset.username;
  const user_type = logged_in.dataset.usertype;

  const user = {
    first_name: first_name,
    url: urls.get(user_type),
    role: user_type,
  };

  // render navbar user
  ReactDOM.render(
    <LoggedIn name={user.first_name} url={user.url} type={user.role} />,
    logged_in,
  );

  // navigation links
  const navigation = document.getElementById('navigation');
  if(navigation){
    const currentPage = document.getElementsByClassName('wrapper');
    ReactDOM.render(
      <Navigation type={user.role} current={currentPage[0].getAttribute('aria-page')} />,
      navigation,
    );
  }
}

/* --- MOBILE MENU TOGGLER --- */
function toggleMenu(e){
  const content = document.getElementById('navbarContent');
  content.classList.toggle('show');
  if(e){
    e.preventDefault();
  }
}

const toggle = document.getElementById('mobile-toggler');
toggle.addEventListener('click', toggleMenu);
