import React, { Component } from 'react';

class NotificationMessage extends Component {

  render() {
    if(this.props.type !== 'text'){
      return ( 
      	<>
          <div className={'icon '+ this.props.type +'-icon'} ></div>
          <span className="note">{this.props.text}</span>
        </>
      );
    }
    return ( <span>{this.props.text}</span> );
  };
}


export default NotificationMessage;
