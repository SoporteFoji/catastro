import React, { Component } from 'react';

import TabLink from './TabLink.jsx';

class TabsNavigation extends Component {

  render() {
    return (  
      <ul className="nav-tabs border-bottom-0" >
        {this.props.tabs.map((item) => {
          return <TabLink key={"tablink-" + item.id} name={item.name} id={item.id} current={this.props.current} onClick={this.props.onClick} />
        })}
      </ul>
    );
  };
}


export default TabsNavigation;
