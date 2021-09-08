import React, { Component } from 'react';

import NavLink from './NavLink.jsx';

class Navigation extends Component {
  constructor(props){
    super(props);
    if(this.props.type == 'administrator') {
      //console.log("is admin");
      this.state = {
        links: [
          {id: 'dashboard', name: 'Inicio', url: '/dashboard/'},
          {id: 'admin-orchestra-list', name: 'Lista de Orquestas', url: '/orquestas/'},
          {id: 'admin-user-list', name: 'Usuarios', url: '/usuarios/'},
          {id: 'home_public', name: 'Índice Público', url: '/home/'},
          {id: 'mantenedores_front', name: 'Mantenedores', url: '/mantenedores/'},
        ]
      }
    } else if (this.props.type == 'coordinator') {
      //console.log("is coordinator");
      this.state = {
        links: [
          {id: 'dashboard', name: 'Inicio', url: '/dashboard/'},
          {id: 'home_public', name: 'Índice Público', url: '/home/'},
        ]
      }
    }
  }

  render() {
    return(
      <ul className="nav-links list-unstyled m-0 p-0">
        {this.state.links.map((link) => {
          return <NavLink key={link.id} id={link.id} name={link.name} url={link.url} current={this.props.current} />
        })}
      </ul>
    );
  }
}


export default Navigation;