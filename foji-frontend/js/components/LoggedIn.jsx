import React, { Component } from 'react';
import NotificationBadge from './Notifications/NotificationBadge.jsx';
import Notification from './Notifications/Notification.jsx';
import axios from 'axios';

class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.state = {
      expanded: false,
      notifications: [],
    }
  }
  componentDidMount(){
    let self = this;
    if(this.props.type === 'administrator'){
      axios.get('/api/v0/notifications/me/')
      .then(function(response){
        self.setState({
          notifications: response.data,
        })
      })
      .catch(function(response){
        console.log(response);
      });
    }
  }
  toggleDropdown(e){
    this.setState(prevState => ({ expanded: !prevState.expanded }))
    if(e){
      e.preventDefault();
    }
  }
  blurHandler(e){
    if(e.relatedTarget){
      if(!e.relatedTarget.classList.contains('user-link')){
        if(this.state.expanded){
          this.toggleDropdown();
        }
      }
    } else {
      if(this.state.expanded){
        this.toggleDropdown();
      } 
    }
  }
  getNotifications(){
    let max = 2;
    let maxed = false;

    return this.state.notifications.map((note, i) => { 
      if(i < max && !maxed){
        return (
          <a key={note.text} href={note.action} tabIndex="0" className="user-link">
            <Notification type={'warning'} text={note.text} /> 
          </a>
        )
      } else if(!maxed){
        maxed = true;
        return(
          <a key="all-notifications" href="/notificaciones/" tabIndex="0" className="user-link">
            <Notification type={'warning'} text={"Ver todas (" + this.state.notifications.length + ")"} /> 
          </a>
        )
      } else {
        return false;
      }
    })
  }

  getProfileUrl(url){
    if(url){
      let leyenda='Editar Perfil';
      if(this.props.type==='administrator'){
        leyenda = 'Cambiar Clave';
      }
      let link = <a href={this.props.url} className="user-link"><div className="message">{leyenda}</div></a>
      return link;
    }
    return false;
  }

  render() {
    return(
      <div className={'logged-in ' + (this.state.expanded ? ' expanded' : '')} 
        onBlur={this.blurHandler} tabIndex="0" >

        <a className="nav-link dropdown-toggle text-center text-md-left" href="#" id="navbarDropdown"
          onClick={this.toggleDropdown} >

          <div className="noti-count d-inline-block align-middle mr-3">
            <div className="icon bell-icon"></div>
            <NotificationBadge notifications={this.state.notifications || null} />
          </div>
          <div className="icon user-icon align-middle"></div>
          <span className="navbar-text mx-2">
            {this.props.name}
          </span>
          <div className="icon next-icon align-middle"></div>
        </a>

        <div className={'dropdown-menu text-md-right text-center p-0' + (this.state.expanded ? ' show' : '') } tabIndex="0">
          { this.getNotifications() }
          { this.getProfileUrl(this.props.url) }
          <a href={"/cerrar-sesion/"} className="user-link">
            <div className="message border-bottom-0">Cerrar Sesión</div>
          </a>
        </div>
      </div>
    )
  }
}

export default LoggedIn;
