import React, { Component } from 'react';


class Select extends Component {
  options() {
    if (!this.props.options) {
      return null;
    }

    return this.props.options.map(
      option => <option key={option.value} value={option.value} >{option.title}</option>,
    );
  }

  render() {
    return (
      <select
        id={this.props.id} 
        name={this.props.name}
        className={this.props.className}
        onChange={this.props.onChange}
        defaultValue={this.props.value}
        required={this.props.required}
      >
        {this.options()}
      </select>
    );
  };
}


export default Select;
