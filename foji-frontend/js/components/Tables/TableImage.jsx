import React, { Component } from 'react';

const noImage = <div className="icon camera-icon"></div>;

class TableImage extends Component {
  constructor(props){
  	super(props);

  	this.state = {
  	  backgroundImage: '',
  	}
  }
  componentWillMount(){
    if(this.props.url){
      this.setState({ backgroundImage: `url(${this.props.url})`, })
    }
  }
  render(){
    if(this.props.type === 'user'){
      return(
        <div className="orchestra-tmb align-middle d-inline-block mr-2">
          <div className="icon user-icon"></div>
        </div>
      )
    } else {
    	return(
    	  <div className="orchestra-tmb align-middle d-inline-block mr-2">
    	    <div className="tmb-image rounded-circle text-center" style={this.state} >
            {((this.props.url === undefined) || (this.props.url === null)) ? noImage : ''}
          </div>
    	  </div>
      )
    }
  } 
}
export default TableImage;
