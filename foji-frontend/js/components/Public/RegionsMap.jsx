import React, { Component } from 'react';
import axios from 'axios';
import Area from './Area.jsx';
import Select from '../Select.jsx';
import Tooltip from '../Tooltip.jsx';
import { getRegions } from '../../utils/get.js';
let Regions;
let regionsOptions = [];

class RegionsMap extends Component {
  constructor(props){
    super(props);

    this.state = {
      regionSelected: 0,
      tooltip: '',
    }
    
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.getTooltip = this.getTooltip.bind(this);
  }
  componentDidMount(){
    const self = this;
    axios.get('/api/util/region-orchestras/')
    .then(function(response){
      regionsOptions = getRegions(response.data);
      self.setState({ loaded: true })
    })
    .catch(function(error){
      console.log(error);
    });
  }
  toggleTooltip(hovering, title, count){
    this.setState({
      tooltip: hovering ? title : '',
      count: hovering ? count : null,
    })
  }
  onClick(e, value){
    e.preventDefault();
    this.setState({
      regionSelected: value,
    }, function(){
      if(this.props.onChange){
        this.props.onChange(value);
      }
    })
  }
  onChange(e){
    const value = e.target.value;
    this.setState({
      regionSelected: value,
    }, function(){
      if(this.props.onChange){
        this.props.onChange(value);
      }
    })
  }
  getOptions(region){  
    if(region.value > 0){
      return <Area key={region.value} options={region} onClick={this.onClick} onMouseEnter={this.toggleTooltip} onMouseLeave={this.toggleTooltip}/>
    } else {
      return null;
    }   
  }
  getTooltip(){
    if(this.state.tooltip.length){
      return <Tooltip text={this.state.tooltip} badge={this.state.count} />;
    }
  }
  render() {
    return (
      <>
        <div id="regions-map" className="text-center">
          <img src="/static/foji/assets/img/mapa-colores.png" 
            alt="mapa Foji en Chile" useMap="#Map" width="1080" height="214" border="0" />

          <div className="container">
            {this.getTooltip()}
            <div className="alert alert-info text-center my-4">
              <h5 className="my-0">Pincha en una región del mapa para filtrar la lista de orquestas</h5>
            </div>
          </div>
        </div>

        <map id="Map" name="Map">

          {
            regionsOptions.map((region) => {
              return this.getOptions(region)
            })
          }

        </map>
        <div className="container">
          <div id="regions-select" className="row">
            <div className="col-md-6">
              <Select name="region" options={regionsOptions} value={this.state.regionSelected || ''} className="form-control" onChange={this.onChange} />
            </div>
          </div>
        </div>
      </>
    )
  };
}

export default RegionsMap;
