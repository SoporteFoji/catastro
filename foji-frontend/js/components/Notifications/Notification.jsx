import React, { Component } from 'react';

import NotificationMessage from './NotificationMessage.jsx';

class Notification extends Component {
  
  render() {
    return (
      <div className={'message '+ (this.props.type || 'text')} >
        <NotificationMessage type={this.props.type || 'text'} text={this.props.text} />
      </div>
    );
  };
}


export default Notification;
