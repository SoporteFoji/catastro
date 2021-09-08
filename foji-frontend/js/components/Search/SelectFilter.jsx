import React, { Component } from 'react';
import Select from '../Select.jsx';

class SelectFilter extends Component {
  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange(e){
    let value = e.currentTarget.value;
    if(this.props.onChange){
      this.props.onChange(this.props.name, value);
    }
  }
  render() {
    return (
      <Select options={this.props.options} onChange={this.onChange} className="form-control" />
    );
  };
}


export default SelectFilter;
