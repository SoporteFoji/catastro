import React, { Component } from 'react';
import axios from 'axios';
import Notification from './Notification.jsx';

class AllNotifications extends Component {
  constructor(props){
    super(props);

    this.state = {
      notifications: [],
    }
  }
  componentDidMount(){
    let self = this;
    axios.get('/api/v0/notifications/me/')
    .then(function(response){
      console.log(response.data);
      self.setState({
        notifications: response.data,
      })
    })
    .catch(function(response){
      console.log(response);
    });
    
  }
  render() {
    return (
      <div>
        <ul className="list-group mt-2">
          {
            this.state.notifications.map((note) => { 
              return (
                <li className="list-group-item">
                  <a href={note.action} tabIndex="0" className="user-link text-muted">
                    <Notification type={'warning'} text={note.text} /> 
                  </a>
                </li>
                )
              }
            )
          }
        </ul>
      </div>
    );
  };
}


export default AllNotifications;
