import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Spinner.jsx';
import Select from '../Select.jsx';
import { getLocations } from '../../utils/get.js';

class LocationFilter extends Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      options: [],
    }

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    let url;
    switch(this.props.name){
      case 'region':
        url = '/api/util/region-orchestras/';
        break;
      case 'province':
        url = '/api/v1/provinces/';
        break;
      case 'area':
        url = '/api/v1/areas/';
    }
    const self = this;
    axios.get(url)
    .then(function(response){
      const locationOptions = getLocations(response.data, self.props.name);
      self.setState({ 
        loaded: true,
        options: locationOptions,
      })
    })
    .catch(function(error){
      console.log(error);
    });
  }
  onChange(e){
    let value = e.currentTarget.value;
    if(this.props.onChange){
      this.props.onChange(this.props.name, value);
    }
  }
  render() {
    if(this.state.loaded){
      return (
        <Select options={this.state.options} onChange={this.onChange} className="form-control" />
      );
    } else {
      return (
        <div className="relative py-2">
          <Spinner />
        </div>
      )
    }
    
  };
}


export default LocationFilter;
