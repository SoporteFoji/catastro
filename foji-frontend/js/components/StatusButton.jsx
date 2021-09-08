import React, { Component } from 'react';
import axios from 'axios';
import Spinner from './Spinner.jsx';
import get_csrf_token from '../utils/csrf';

class StatusButton extends Component {
  constructor(props){
    super(props);
    this.getButton = this.getButton.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {active: this.props.is_active, loading: false}
  }
  onClick(e){
    const self = this;
    this.setState({ loading: true }, function(){
      const id = this.props.orchestra_id
      const url = this.state.active ? ('/api/v1/orchestras/' + id + '/deactivate/') : ('/api/v1/orchestras/' + id + '/activate/');
      console.log(url);
      axios.post(url, '', {
          headers: {
            'X-CSRFToken': get_csrf_token(),
          }
        })
      .then(function(response){
        self.setState({ 
          active: response.data,
          loading: false,
        })
      })
      .catch(function(error){
        console.log(error.response);
      });
    })
    
  }
  getButton(){
    if(this.state.loading){
      return (
        <div className="relative py-4"><Spinner /></div>
      )
    } else if(this.state.active){
      return (
        <div>
          <button type="button" className="btn btn-warning mt-2" onClick={this.onClick}>Invalidar</button>
        </div>
      )
    } else {
      return (
        <div>
          <button type="button" className="btn btn-primary mt-2" onClick={this.onClick}>Validar</button>
        </div>
      )
    }
  }
  render() {
    return (
      <>
        <div><span>Estado: </span><span className={this.state.active ? 'text-primary' : 'text-warning'}><b>{this.state.active ? 'Validada' : 'No validada'}</b></span></div>
        {this.getButton()}
      </>
    );
    
  };
}


export default StatusButton;
