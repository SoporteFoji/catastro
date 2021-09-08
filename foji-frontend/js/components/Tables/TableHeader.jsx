import React, { Component } from 'react';

class TableHeader extends Component {
  render(){
  	return(
      <th scope="col" className="font-weight-normal">{this.props.name}:</th>
    )
  } 
}
export default TableHeader;
