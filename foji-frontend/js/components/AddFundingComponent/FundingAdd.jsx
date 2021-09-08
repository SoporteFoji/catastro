import React, { Component } from 'react';

import FundingSelect from './FundingSelect.jsx';
import ItemDisplay from '../ItemDisplay.jsx';
import InputFeedback from '../InputFeedback.jsx';

function containsArray(arr, item){
  var item_as_string = JSON.stringify(item);
  var contains = arr.some(function(el){
    return JSON.stringify(el).replace(/\s/g,'') === item_as_string;
  });
  return contains;
}

class FundingAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fundingValue: null,
      fundingOptions: [],
      values: [],
      total: this.props.funds || [],
      error: '',
      emptyValues: true,
    };

    this.reportChange = this.reportChange.bind(this);
    this.onChangeFunding = this.onChangeFunding.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChangeFunding(name, value) {
    this.setState({
      fundingValue: value,
    });
  }

  reportChange(value, source, hasChild){
    let values = this.state.values;
    if(!values.includes(value)){
      if(source === "parent"){
        values = [value];
      } else if(source === "child"){
        values.push(value);
      }

      this.setState({
        values: values,
        emptyValues: hasChild,
      }, function (){
        if(this.props.onEdit){
          this.props.onEdit(values, 'funding');
        }
      });
    }  
  }

  onDelete(item) {
    let totalValues = this.state.total;
    totalValues.splice(item.id, 1);
    this.setState({
      total: totalValues,
    }, function(){
      if(this.props.onDelete){
        this.props.onDelete(totalValues, 'funding');
      }
    })
  }

  onClick(e) {
    let values = this.state.values;
    let totalValues = this.state.total;
    let emptyValues = this.state.emptyValues
    if(emptyValues === false || values[0] === "sin-financiamiento"){
      if(!containsArray(totalValues, values)){
        totalValues.push(values);
        this.setState({
          total: totalValues,
          values: [],
          error: '',
        }, function(){
          if(this.props.onAdd){
            this.props.onAdd(totalValues);
          }
        });
      } else {
        this.setState({
          error: 'Financiamiento ya esta ingresado.',
        });
      }
    } else {
      this.setState({
        error: 'Hay valores no especificados',
      });
    }
  }

  render() {
    return (
      <div>
        <div className="alert alert-secondary my-4">
          Selecciona el tipo de financiamiento y presiona "Agregar Financiamiento".
        </div>
        <ItemDisplay items={this.state.total} onClick={this.onDelete} />
        <FundingSelect key={this.state.total} onChange={this.onChangeFunding} reportchange={this.reportChange}/>
        <button className="btn btn-info" onClick={this.onClick}>
          Agregar financiamiento +
        </button>
        <InputFeedback error={this.state.error} />
      </div>
    );
  }
}


export default FundingAdd;

