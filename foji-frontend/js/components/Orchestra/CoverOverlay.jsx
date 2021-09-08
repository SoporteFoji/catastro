import React, { Component } from 'react';

class CoverOverlay extends Component {
  constructor(props){
    super(props);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }
  uploadPhoto(){
    console.log("upload photo request");
  }
  render() {
    return (
      <div className="tmb-overlay" onClick={this.uploadPhoto} >
        <div className="icon camera-icon"></div>
      </div>
    );
  };
}


export default CoverOverlay;
