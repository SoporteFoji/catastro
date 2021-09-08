import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <input 
        id={this.props.id}
        key={this.props.id}
        name={this.props.name} 
        type={this.props.type} 
        placeholder={this.props.placeholder} 
        className="form-control" 
        required={this.props.required}
        defaultValue={this.props.value}
        onChange={this.props.onChange ? input => this.props.onChange(input.target) : null}
        onBlur={this.props.onBlur ? e => this.props.onBlur(e) : null}
      />
    );
  };
}

Input.defaultProps = {
  value: '',
}

export default Input;
