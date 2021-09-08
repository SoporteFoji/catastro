import React, { Component } from 'react';

import Select from './Select.jsx';


class MultiSelect extends Component {
  constructor(props) {
    super(props);

    let initialValue;

    try {
      this.initialValue = this.props.options[0].value;
    } catch(e) {
      this.initialValue = '';
    }

    this.state = {
      selectedValue: this.initialValue,
    };

    this.onChange = this.onChange.bind(this);
    this.onChildChange = this.onChildChange.bind(this);
  }

  componentDidMount() {
    if (this.props.onChange) {
      this.props.onChange(this.props.name, this.state.value);
    }
  }

  getSelectedOption() {
    const { options } = this.props;
    const { selectedValue } = this.state;
    let result = {};

    for (let i = 0; i < options.length; i += 1) {
      if (options[i].value === selectedValue) {
        result = options[i];
        break;
      }
    }

    return result;
  }
  hasChild() {
    const { options } = this.props;
    const { selectedValue } = this.state;
    let result = {};

    for (let i = 0; i < options.length; i++) {
      if(options[i].value === selectedValue){
        result = options[i].options;
      }
    }

    return result !== undefined;
  }
  childComponent() {
    const selectedOption = this.getSelectedOption();
    let childOptions;
    try {
      childOptions = selectedOption.options;
    } catch (e) {
      childOptions = [];
    }

    if(selectedOption.value === 'otros'){
      return (
        <div className="col-md-4">
          <div className="form-group">
            <input type="text" className="form-control" tabIndex="-1" placeholder="Especificar" 
              name={selectedOption.value}
              onBlur={event => this.onChildChange(event.target.name, event.target.value) } 
              onChange={this.props.reportchange} />
          </div>
        </div>
      );
    }

    const options = childOptions;
    if (typeof options === 'undefined' || options.length === 0) {
      return '';
    }
    return (
      <MultiSelect id="child" name={selectedOption.value} options={options} 
      onChange={this.onChildChange} reportchange={this.props.reportchange} />
    );
  }

  onChange(e) {
    const { name, value, id } = e.target;
    this.setState({
      selectedValue: value,
      value: value,
    }, function () {
      if(this.props.reportchange){
        if(id === "parent-main"){
          this.props.reportchange(value, "parent");
        } else {
          this.props.reportchange(value, "child", this.hasChild());
        }       
      }
    });
  }

  onChildChange(name, value) {
    if(value !== undefined){
      this.setState(
        function (state, props) {
          let newValue = '';
          newValue = (state.value + '/' + value);
          return {
            value: newValue,
          }; 
        }, function(){
          if(this.props.reportchange){
            this.props.reportchange(value, "child", this.hasChild());
          }
        }
      );
    }
  }

  render() {
    const { options } = this.props;

    if (typeof options === 'undefined' || options.length === 0) {
      return <Select />
    }

    const childComponent = this.childComponent();

    return (
      <>
        <div className="col-md-4">
          <div className="form-group">
            <Select id={(this.props.id + "-" + this.props.name)} name={this.props.name} options={options} onChange={this.onChange} className="form-control" />
          </div>
        </div>
        {childComponent}
      </>
    );
  }
}


MultiSelect.defaultProps = {
  options: [],
};


export default MultiSelect;
