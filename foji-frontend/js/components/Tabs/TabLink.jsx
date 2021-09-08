import React, { Component } from 'react';

class TabLink extends Component {

  render() {
    return (
      <li className={(this.props.id === this.props.current ? ' active' : '')} onClick={this.props.onClick} id={this.props.id}>
        <a href="#" className="d-block">
          <span>{this.props.name}</span>
        </a>
      </li>
    );
  };
}


export default TabLink;
