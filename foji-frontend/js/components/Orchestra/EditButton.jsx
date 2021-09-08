import React, { Component } from 'react';

class Editbutton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button className="btn btn-light text-secondary mt-2 mb-2" type="button" onClick={this.props.onClick}>
        Editar
        <div className="icon edit-icon" />
      </button>
    );
  };
}


export default Editbutton;
