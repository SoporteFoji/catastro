import React, { Component } from 'react';
import { getStats } from '../../utils/get.js'; 
import axios from 'axios';

function getExampleStats(){
  const stats = {
    orchestras: {count: 15, title: 'Orquestas'},
    administrators: {count: 2, title: 'Administradores'},
    coordinators: {count: 8, title: 'Coordinadores'},
    directors: {count: 15, title: 'Directores'},
    instructors: {count: 33, title: 'Instructores'},
    cast_members: {count: 108, title: 'Elenco'},
  }
  return stats;
}

class AdministratorStats extends Component {
  constructor(props){
    super(props);

    this.state = {
      stats: {},
    }

    this.getStats = this.getStats.bind(this);
  }
  componentDidMount(){
    const self = this;
    axios.get('/api/v1/statistics/')
    .then(function(response){
      self.setState({ stats: getStats(response.data) })
    })
    .catch(function(error){
      const stats = getExampleStats();
      self.setState({ stats: stats })
    });
  }
  getStats(){
    const stats = this.state.stats;

    if(Object.keys(stats).length){
      return Object.keys(this.state.stats).map((stat) => {
        return(
          <div key={stat} className="col-sm-6 col-md-4 col-lg-3 text-left mb-2">
            <div className={'badge badge-pill badge-primary d-block ' + ( stat + '-stat')}>
             <div className={'user-type-icon ' + ( stat + '-icon')}></div>
             <div className="d-inline-block ml-1">
              <h2>{stats[stat].count}</h2>
              <h4>{stats[stat].title}</h4>
             </div>
            </div>
          </div>
        )
      });
    }
    return null;
  }
  render() {
    return (
      <div id="admin-stats" className="row my-4">
        { this.getStats() }
      </div>
    );
  };
}

export default AdministratorStats;
