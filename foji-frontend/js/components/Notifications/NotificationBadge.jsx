import React, { Component } from 'react';

class NotificationBadge extends Component {

  render() {
    if(this.props.notifications.length){
      return(
        <span className="badge badge-warning">{this.props.notifications.length}</span>
      )
    }
    return null;
  }
}

export default NotificationBadge;
