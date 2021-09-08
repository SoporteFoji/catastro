import React, { Component } from 'react';
import FormatDate from '../../utils/FormatDate.js';


class OrchestraCard extends Component {
  constructor(props){
    super(props);
    this.socialNetworks = this.socialNetworks.bind(this);
    this.getImage = this.getImage.bind(this);
  }
  socialNetworks(){
    if(this.props.socialNetworks){
      return Object.keys(this.props.socialNetworks).map((socialNetwork) => {
        if(this.props.socialNetworks[socialNetwork]){
          return <a key={this.props.socialNetworks[socialNetwork]} href={this.props.socialNetworks[socialNetwork]} target="_blank"><div className={'social-icon ' + socialNetwork + '-icon'}></div></a>
        }
      })
    }
    return null;
  }
  getImage(){
    if(this.props.photoUrl){
      return <img className="card-img-top" src={this.props.photoUrl} alt={this.props.name} />
    } else {
      return <div className="card-no-img text-center"><div className="icon camera-icon"></div></div>
    }
  }
  render() {
    return (
      <div className="col-12 col-lg-3 col-md-4 col-sm-6 mb-4 d-flex">
        <div className="card text-center w-100">
          {this.getImage()}
          <div className="card-body pb-2">
            <h5 className="card-title mb-1">{this.props.name}</h5>
            <div className="card-text text-muted">
              <span className="d-block mb-2">{this.props.region.name || ''}</span>
              <small className="d-block">{'Actualizada el: ' + FormatDate(this.props.updated)}</small>
              <div className="text-center mt-2">
                {this.socialNetworks()}
              </div>
            </div>
          </div>
          <div className="card-footer p-0 text-center">
            <a href={'/orquesta/' + this.props.id + '/'} className="px-4 py-3">
              <span>Ver detalle</span>
              <div className="icon next-icon"></div>
            </a>
          </div>
        </div>
      </div>
    )
  };
}

export default OrchestraCard;
