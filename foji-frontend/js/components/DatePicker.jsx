import React, { Component } from 'react';

import Select from './Select.jsx';


const days = [...Array(31).keys()];
const dayOptions = days.map(
  (day) => {
    return {
      title: day + 1,
      value: day + 1,
    };
  }
);

dayOptions.unshift({
  title: 'Día',
  value: '',
});

const monthOptions = [
  { title: 'Mes', value: '' },
  { title: 'Enero', value: 1 },
  { title: 'Febrero', value: 2 },
  { title: 'Marzo', value: 3 },
  { title: 'Abril', value: 4 },
  { title: 'Mayo', value: 5 },
  { title: 'Junio', value: 6 },
  { title: 'Julio', value: 7 },
  { title: 'Agosto', value: 8 },
  { title: 'Septiembre', value: 9 },
  { title: 'Octubre', value: 10 },
  { title: 'Noviembre', value: 11 },
  { title: 'Diciembre', value: 12 },
];

const years = [...Array(100).keys()];
const yearGap = (new Date()).getFullYear() - years.length + 1;
const yearOptions = years.map(
  (year) => {
    return {
      title: year + yearGap,
      value: year + yearGap,
    };
  }
);

yearOptions.unshift({
  title: 'Año',
  value: '',
});


class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: '',
      month: '',
      year: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  value() {
    return this.state.day + '/' + this.state.month + '/' + this.state.year;
  }

  componentWillMount(){  
    if(this.props.date){
      let dob = new Date(this.props.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
      this.setState({
        day: dob.getDate(),
        month: dob.getMonth() + 1,
        year: dob.getFullYear(),
      })
    }
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    }, function () {
      this.props.onChange(this.props.name, this.value());
    });
  }

  render() {

    return (
      <div className="form-inline">
        <Select key="daySelect" name="day" options={dayOptions} className="form-control flex-fill" onChange={this.onChange} 
          value={this.state.day || null} required={this.props.required}
        />
        <Select key="mothSelect" name="month" options={monthOptions} className="form-control flex-fill mx-sm-2" onChange={this.onChange} 
          value={this.state.month || null} required={this.props.required}
        />
        <Select key="yearSelect" name="year" options={yearOptions} className="form-control flex-fill" onChange={this.onChange} 
          value={this.state.year || null} required={this.props.required}
        />
      </div>
    );
  }
}


export default DatePicker;
