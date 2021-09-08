import React, { Component } from 'react';

class OrchestraDates extends Component {

  render() {
    return (
      <div className="p-3 border-bottom">
        <div className="icon marker-icon d-inline-block align-top"></div>
        <div className="d-inline-block text-secondary location text-left">
          <span className="d-block">{this.props.region + '.'}</span>
          <span className="d-block">{this.props.province + '.'}</span>
          <span className="d-block">{this.props.city + ' - ' + this.props.area}</span>
        </div>
      </div>
    );
  };
}


export default OrchestraDates;
