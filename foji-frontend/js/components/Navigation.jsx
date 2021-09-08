import React, { Component } from 'react';

import NavLink from '.NavLink.jsx';

class Navigation extends Component {
  constructor(props){
    super(props);
    if(this.props.type === 'administrator'){
      this.state = {
        links: [
          {id: 'dashboard_administrator', name: 'Home', url: '/dashboard/'},
          {id: 'orchestra-list', name: 'Lista de Orquestas', url: '/orchestras/'},
          {id: 'user-list', name: 'Usuarios', url: '/users/'},
          {id: 'public', name: 'Índice Público', url: '/home/'},
          {id: 'mantenedores_front', name: 'Mantenedores', url: '/mantenedores/'},
        ]
      }
    } else if(this.props.type === 'coordinator'){
      this.state = {
        links: [
          {id: 'dashboard_coordinator', name: 'Home', url: '/dashboard/'},
          {id: 'public', name: 'Índice Público', url: '/home/'},
        ]
      }
    }
    
  }
  render() {
    
    return(
      <ul className="nav-links">
        {this.state.links.map((link) => { 
          return <NavLink key={link.id} id={link.id} name={link.name} url={link.url} current={this.props.current} /> 
        })}
      </ul>
    );
  }
}


export default Navigation;