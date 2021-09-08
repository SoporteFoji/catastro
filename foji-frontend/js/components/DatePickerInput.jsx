import React, { Component } from 'react';

import DatePicker from './DatePicker.jsx';


class DatePickerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(name, value) {
    this.setState({
      value,
    }, function(){
      if(this.props.onChange){
        this.props.onChange(this.input);
      }
    });
  }

  render() {
    return (
      <>
        <input 
          name={this.props.name} 
          value={this.state.value.length ? this.state.value : this.props.date} 
          ref={input => this.input = input}
          type="hidden" 
        />

        <DatePicker onChange={this.onChange} date={this.props.date} required={this.props.required} />
      </>
    );
  }
}


export default DatePickerInput;
