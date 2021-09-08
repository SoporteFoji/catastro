import React, { Component } from 'react';
import Input from './Input.jsx';
import Fn from '../utils/validateRut.js';
import InputFeedback from './InputFeedback.jsx';

class Rut extends Component {
  constructor(props){
    super(props);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      valid: true,
    }
  }
  onBlur(e){
    if(Fn.validaRut(e.target.value)){
      this.setState({ valid: true })
       e.target.setCustomValidity('');
    } else {
      this.setState({ valid: false })
      e.target.setCustomValidity('Rut Inválido');
    }
  }
  componentDidMount(){
    let val = this.props.value;
    if(val!==undefined){
      if(Fn.validaRut(val)){
        this.setState({ valid: true })
      } else if(val.length !== 0){
        this.setState({ valid: false })
      }  
    }
  }
  render() {
    return (
      <>
        <Input 
          id={this.props.id} 
          name={this.props.name} 
          type={this.props.type} 
          placeholder={this.props.placeholder} 
          required={this.props.required}
          onBlur={this.onBlur}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <InputFeedback error={this.state.valid ? "" : "Rut inválido"} />
      </>
    );
  };
}

export default Rut;
