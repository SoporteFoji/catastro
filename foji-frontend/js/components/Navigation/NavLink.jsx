import React, { Component } from 'react';


class NavLink extends Component {

  render() {
    return (
      <li className={'d-inline-block' + (this.props.id == this.props.current ? ' active' : '')} >
        <a className="d-block" href={this.props.url} >
          <span>{this.props.name}</span>
        </a>
      </li>
    )
  }
}


export default NavLink;
