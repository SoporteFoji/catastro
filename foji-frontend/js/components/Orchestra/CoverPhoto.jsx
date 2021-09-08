import React, { Component } from 'react';

class CoverPhoto extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const style = {
        backgroundImage: `url(${this.props.url})`,
    };

    if(this.props.url){
      return (
        <div className={this.props.className} style={style} ></div>
      );
    } else {
      return(
        <div className={this.props.className} >
          <div className="icon camera-icon"></div>
        </div>
      );
    }    
  };
}


export default CoverPhoto;
