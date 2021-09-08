import React, { Component } from 'react';

class OrchestraRRSS extends Component {
  getSocials(props){
    if(props.rrss){
      return Object.keys(props.rrss).map((social) => {
        if(props.rrss[social]){
          return (
            <li key={props.rrss[social]} className="d-inline-block my-2 mx-1">
              <a href={props.rrss[social]} target="_blank">
                <div className={'social-icon ' + social + '-icon'} ></div>
              </a>
            </li>
          )
        }
      })
    }
  }
  render() {
    return (
      <ul className="list-unstyled mb-0">
        {this.getSocials(this.props)}
      </ul>
    );
  };
}


export default OrchestraRRSS;
