import React, { Component } from 'react';

class Tooltip extends Component {
  render() {
    return (
      <div className="tooltip bs-tooltip-top">
        <div className="arrow"></div>
        <div className="tooltip-inner px-3">
          {this.props.text}
          <span className="badge badge-pill badge-secondary ml-2">{this.props.badge}</span>
        </div>
      </div>
    );
  };
}

Tooltip.defaultProps = {
  text: '',
}

export default Tooltip;
