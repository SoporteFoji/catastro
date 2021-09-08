import React, { Component } from 'react';
import axios from 'axios';
import { getOrchestraList } from '../../utils/get.js';
import { getExampleOrchestraList } from '../../utils/get.js';
import OrchestraCard from './OrchestraCard.jsx';
import RegionsMap from './RegionsMap.jsx';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';

let AllOrchestras = [];

class PublicList extends Component {
  constructor(props){
    super(props);
    this.state = {
      regionId: 0,
      page: 1,
      count: 0,
      orchestras: AllOrchestras,
      loading: true,
    }

    this.onChange = this.onChange.bind(this);
    this.downloadList = this.downloadList.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.getListItems = this.getListItems.bind(this);
  }
  componentDidMount(){
    this.downloadList(false);
  }
  downloadList(region){
    self = this;
    let url = '/api/v1/home/orchestras/?' + (region ? ('region=' + region + '&') : '') + 'page=' + this.state.page;
    axios.get(url)
    .then(function(response){
      AllOrchestras = getOrchestraList(response.data.results);
      self.setState({
        count: response.data.count,
        orchestras: AllOrchestras,
        loading: false,
      })
    })
    .catch(function(error){
      console.log(error);
      console.log(error.response);
    });
  }
  onChange(value){
    this.setState({
      regionId: value,
      page: 1,
      loading: true,
    }, function(){
      this.downloadList(value);
    })
    
  }
  onPageChange(page){
    this.setState({
      page: page,
      loading: true,
    },function(){
      this.downloadList(this.state.regionId === 0 ? false : this.state.regionId);
    })
  }

  getListItems(){
    let loading = this.state.loading;
    if(loading){
      return (
        <div className="relative py-3 w-100"><Spinner /></div>
      );
    } else {
      return (
        this.state.orchestras.map((orchestra, i) => {
          if(orchestra.name){
            return ( 
              <OrchestraCard 
                key={orchestra.url}
                name={orchestra.name} 
                photoUrl={orchestra.image}
                id={orchestra.url} 
                socialNetworks={orchestra.social_networks} 
                updated={orchestra.updated}
                region={orchestra.region ? orchestra.region : {}}
              />
            )
          }
        })
      );
    }
  }

  render() {
    return (
      <>
        <RegionsMap onChange={this.onChange} />
        <div className="container">
          <div className="row d-flex my-5">
            { this.getListItems() }
          </div>
          <Pagination key={this.state.count} count={this.state.count} perPage={16} onChange={this.onPageChange} page={this.state.page} />
        </div> 
      </>
    );
  };
}

PublicList.defaultProps = {
  region: 'all',
}

export default PublicList;
