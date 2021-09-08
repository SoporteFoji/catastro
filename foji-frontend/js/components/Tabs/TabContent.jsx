import React, { Component } from 'react';

class TabContent extends Component {
  render() {
    return (  
      <div className="content-tab">
        <div className={'tab-pane' + (this.props.name === this.props.current ? ' active' : '')} >
        {this.props.children}
        </div>
      </div>
    );
  };
}


export default TabContent;
