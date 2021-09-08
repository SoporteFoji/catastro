import React, { Component } from 'react';

class TableEdit extends Component {
  render(){
    let link = (this.props.entity === "" || this.props.entity === undefined) ? "orquesta" : this.props.entity;
  	return(
  	  <td className="edit">
        
        <a href={'/' + link + '/' + this.props.url} >
          <button className="btn_tool" type="button">
            <div className="icon edit-icon"></div>
          </button>
        </a>
      </td>
    )
  } 
}
export default TableEdit;
