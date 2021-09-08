import React, { Component } from 'react';

class MemberDetail extends Component {
  render() {
    // Detail with icon
    if(this.props.type && this.props.info){
      return (
        <div className="col-12 mb-1">
          <div className={'icon ' + this.props.type + '-icon'} ></div>
          <div className="d-inline-block w-75">
            <a className="text-muted" target={this.props.type === 'marker' ? '_blank' : ''} href={
              (this.props.type === 'email' ? 'mailto:' + this.props.info : '') ||
              (this.props.type === 'phone' ? 'tel:' + this.props.info : '') || 
              (this.props.type === 'marker' ? 'https://maps.google.com/?q=' + this.props.info : '')
            }>
              {this.props.info}
            </a>
          </div>
        </div>
      );

    // Empty info
    } else if(!this.props.info){
      return <div className="col-lg-6"></div>

    // Detail without icon
    } else if(this.props.name){
      return (
        <div className="col-lg-6">
          <span className="text-muted">
            {this.props.name + ': '}<i>{this.props.info}</i>
          </span>
        </div>
      );
    }    
  }
}


export default MemberDetail;
