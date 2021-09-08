import React, { Component } from 'react';
import axios from 'axios';

import Select from './Select.jsx';
import Input from './Input.jsx';
import Spinner from './Spinner.jsx';


class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regionOptions: [],
      areaOptions: [],
      region: '',
      area: '',
      city: '',
    };

    this.responseOptions = [];

    this.createOptions = this.createOptions.bind(this);
    this.onChangeRegion = this.onChangeRegion.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);
  }

  get pickerValue() {
    const value = {
      region: this.state.region,
      city: this.state.city,
      area: this.state.area,
      loaded: false,
    };

    return value;
  }

  componentDidMount() {
    const self = this;
    axios.get(
      '/api/util/location-options/',
    )
      .then(function responseHandler(response) {
        self.responseOptions = response.data;
        self.createOptions();
        if(self.props.region && self.props.area){
          const areaOptions = self.responseOptions[Number(self.props.region) - 1].options;
          self.setState({
            loaded: true,
            region: self.props.region,
            area: self.props.area,
            areaOptions,
          });
        } else {
          self.setState({ loaded: true });
        }
      })
      .catch(function(error){
        console.log(error);
        self.responseOptions = [
          {title: 'Option 1', value: 1},
          {title: 'Option 2', value: 2},
          {title: 'Option 3', value: 3},
        ];
        self.createOptions();
        self.setState({ loaded: true });
      });
  }

  createOptions() {
    const regionOptions = this.responseOptions.map(
      option => ({
        title: option.title,
        value: option.value,
      }),
    );

    const areaOptions = this.responseOptions[0].options;

    this.setState({
      regionOptions,
      areaOptions,
    });
  }

  onChangeRegion(e) {
    const target = e.target;
    const { value } = target;
    const self = this;
    // data come with "id" and arrays are indexed starting from 0 
    const areaOptions = this.responseOptions[Number(value) - 1].options;
    
    this.setState({
      region: value,
      areaOptions,
    }, function () {
      if(self.props.onChange){
        self.props.onChange(target, 'region');
      }
    });
  }

  onChangeCity(target) {
    const { value } = target;
    const self = this;
    this.setState({
      city: value,
    }, function () {
      if(self.props.onChange){
        self.props.onChange(target);
      }
    });
  }

  onChangeArea(e) {
    const target = e.target;
    const { value } = target;
    const self = this;

    this.setState({
      area: value,
    }, function () {
      if(self.props.onChange){
        self.props.onChange(target, 'area');
      }
    });
  }

  render() {
    if(!this.state.loaded){
      return(
        <div className="relative">
          <Spinner />
        </div>
      )
    } else {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="region">
              Región:
            </label>
            <Select 
              id="region" 
              name="region"
              className="form-control" 
              options={this.state.regionOptions} 
              onChange={this.onChangeRegion} 
              value={this.state.region} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">
              Comuna:
            </label>
            <Select 
              id="area" 
              name="area" 
              className="form-control"
              options={this.state.areaOptions} 
              onChange={this.onChangeArea} 
              value={this.state.area} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">
              Ciudad:
            </label>
            <Input  
              id="city" 
              name="city" 
              placeholder="Escribe la ciudad" 
              value={this.props.city || (this.state.city ? this.state.city : '')}  
              onChange={this.onChangeCity} 
              required 
            />
          </div>
        </div>
      )
    }
  }   
}



LocationPicker.defaultProps = {
  region: '',
  area: '',
  name: '',
  onChange: () => {},
};


export default LocationPicker;
