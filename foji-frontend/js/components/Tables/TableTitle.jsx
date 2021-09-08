import React, { Component } from 'react';

class TableTitle extends Component {
  subtitle(){
    if(this.props.status === true || this.props.status === false){
      var satusText;
      return (
        <div className="d-inline-block">
          <div>
            <span className="d-inline">Estado: </span>
            <a className={'font-italic ' + (this.props.status ? 'active' : 'pending')} href={'/orquesta/' + this.props.url} >
              {this.props.status ? 'Validada' : 'No validada'}
            </a>
          </div>
          <div>
            <span className="d-inline">Actividad: </span>
            <a className={'font-italic ' + 
            (this.props.current_status ? (this.props.current_status === 'active' ? 'text-primary' : (this.props.current_status === 'paused' ? 'text-warning' : 'text-danger')) : '')} href={'/orquesta/' + this.props.url} >
              {this.props.current_status ? (this.props.current_status === 'active' ? 'Activa' : (this.props.current_status === 'paused' ? 'En pausa' : 'Inactiva')) : ''}
            </a>
          </div>
        </div>
      )
    } else if(this.props.type){
      return (
        <span className="d-block">{this.props.type}</span>
      )
    }

  }
  getRole(role){
    switch(role){
      case 'coordinator':
        return 'Coordinador';
        break;
      case 'administrator':
        return 'Administrador';
        break;
      case 'director':
        return 'Director';
        break;
      case 'instructor':
        return 'Instructor';
        break;
      case 'cast_member':
        return 'Elenco';
        break;
    }
    return null;
  }
  render(){
    if(this.props.type === 'user-admin'){
      return (
        <div className="d-inline-block align-middle">
          <span className="list-title d-block">{this.props.name}</span>
          <span className="text-secondary d-block">{ this.getRole(this.props.role) || '' }</span>
        </div>
      )
    } else {
    	return(
        <>
    	  <div className="d-inline-block align-middle">
          <a href={'/orquesta/' + this.props.url} className="list-title d-block">{this.props.name}</a>
          <div>
            {this.subtitle()}
          </div>
        </div>
        </>
      )
    }
  } 
}
export default TableTitle;
