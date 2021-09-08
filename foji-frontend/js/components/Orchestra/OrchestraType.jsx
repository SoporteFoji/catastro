import React, { Component } from 'react';

class OrchestraType extends Component {
  constructor(props){
    super(props);
    this.getType = this.getType.bind(this);
  }
  getType(){
    switch(this.props.type){
      case 'infantil' :
        return 'Orquesta Infantil';
      case 'juvenil' :
        return 'Orquesta Juvenil';
      case 'infantil-juvenil' :
        return 'Orquesta Juvenil - Infantil';
    }
  }
  render() {
    return (
      <span className="d-inline-block text-secondary mb-2">{this.getType()}</span>
    );
  };
}


export default OrchestraType;
