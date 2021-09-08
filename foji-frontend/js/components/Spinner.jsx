import React, { Component } from 'react';

class Spinner extends Component {
  render() {
    return (
      <div className="lds-css ng-scope">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };
}


export default Spinner;
