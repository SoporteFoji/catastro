import React, { Component } from 'react';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItem from '../Tables/TableItem.jsx';
import {TableEdit, TableEditArea } from '../Tables/TableEdit.jsx';
import { getOrchestraList, getExampleOrchestraList, getUser, getAreasList, getRegionsList } from '../../utils/get.js';
import SearchList from '../Search/SearchList.jsx';
import TextFilter from '../Search/TextFilter.jsx';
import LocationFilter from '../Search/LocationFilter.jsx';
import SelectFilter from '../Search/SelectFilter.jsx';
import axios from 'axios';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';

class Entidad extends Component {
    constructor(props){
      super(props);
      console.log('entra a entidad');
      this.state = {
        showAreas: false,
        count: 0,
        page: 1,
        excel: '',
        search: false,
        areas: props.allEntidades,
        loading: true,
        filter: [],
        header: [
          {name: 'Id'},
          {name: 'Code'},
          {name: 'Name'},
        ],
      }
  
      this.searchList = this.searchList.bind(this);
      this.getList = this.getList.bind(this);
      this.onPageChange = this.onPageChange.bind(this);
      this.getListItems = this.getListItems.bind(this);
    } 
    componentDidMount(){
      this.getList();
    }
    getList(query){
      let self = this;
      let url;
      let excel;
      if(!query){
        url = '/api/v1/areas/?' + 'page=1';
        excel = '/areas/excel/';
      } else {
        url = '/api/v1/areas/' + query + '&page=' + this.state.page;
        excel = '/areas/excel/' + query;
      }
      axios.get(url)
      .then(function (response) {
        console.log(response);
        AllAreas = getAreasList(response.data);
        self.setState({
          count: response.data.count,
          excel: excel,
          areas: AllAreas,
          search: query ? true : false,
          loading: false,
        })
      })
      .catch(function(error){
        console.log(error);
       
      });
    }
    searchList(query){
      this.setState({
        page: 1,
        loading: true,
      }, function(){
        this.getList(query);
      });
    }
  
    onPageChange(page){
      this.setState({
        page: page,
        loading: true,
      }, function(){
        this.getList();
      });
    }
    getListItems(){
      let loading = this.state.loading;
      if (loading){
        return(
          <tr><td className="pt-3 pb-5" colSpan="25"><div className="relative"><Spinner /></div></td></tr>
        );
      } else {
        if(this.state.areas.length){
          return (
            this.state.areas.map((item, i) => {
              return (
                <tr key={("area-item-" + i) + ("-" + item.id)}>
                  <td>{item.id}</td><td>{item.code}</td><td>{item.name}</td>
                  </tr>
              )
            })
          );
        } else {
          return ( 
            <tr><td><span className="d-box p-3">No hay areas para mostrar.</span></td></tr> 
          );
        }
      }
    }
    render(){
      return (<div className="full-box" id="tabla-area-mantenedor">
        areas
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {
                this.state.header.map((th, i) => {
                  return <TableHeader key={("header-"+ i) + ("-" + th.name)} name={th.name} />
                })
              }
              <th scope="col"></th><th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            { this.getListItems() }
          </tbody>
        </table>
      </div>
      <div className="bottom-box text-center"></div>
    </div>);
    }
  }
  