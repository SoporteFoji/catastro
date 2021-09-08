import React, { Component } from 'react';


class Area extends Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
    return (
      <area 
        title={this.props.options.title} 
        coords={this.props.options.coords} 
        shape={this.props.options.shape} 
        href="#" 
        onClick={e => this.props.onClick(e, this.props.options.value)}
        onMouseEnter={e => this.props.onMouseEnter(true, this.props.options.title, this.props.options.count)}
        onMouseLeave={e => this.props.onMouseLeave(false, this.props.options.title, this.props.options.count)}
      /> 
    )
  };
}

export default Area;
