import React, { Component } from 'react';

class Deletebutton extends Component {
  constructor(props) {
    super(props);
    console.table(props);
    this.state = {};
  }

  render() {
    return (
      <button className="btn btn-light text-secondary mt-2 mb-2" type="button" onClick={this.props.onClick}>
        Borrar
        <div className="icon edit-icon" />
      </button>
    );
  };
}


export default Deletebutton;
