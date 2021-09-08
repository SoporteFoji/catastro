import React, { Component } from 'react';
import axios from 'axios';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItem from '../Tables/TableItem.jsx';
import TableEdit from '../Tables/TableEdit.jsx';
import TableDelete from '../Tables/TableDelete.jsx';
import { getOrchestraList, getExampleOrchestraList, getUser } from '../../utils/get.js';
import SearchList from '../Search/SearchList.jsx';
import TextFilter from '../Search/TextFilter.jsx';
import LocationFilter from '../Search/LocationFilter.jsx';
import SelectFilter from '../Search/SelectFilter.jsx';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';

let AllOrchestras = [];

const SearchOptions = [
  { value: '', title: 'Selecciona un filtro' },
  { value: 'code', title: 'Código Único', component: TextFilter },
  {
    value: 'name', title: 'Nombre', component: TextFilter,
  },
  { value: 'region', title: 'Región', component: LocationFilter },
  { value: 'province', title: 'Provincia', component: LocationFilter },
  { value: 'area', title: 'Comuna', component: LocationFilter },
  { value: 'city', title: 'Ciudad', component: TextFilter },
  {
    value: 'orchestra_type',
    title: 'Tipo',
    component: SelectFilter,
    options: [
      { title: 'Selecciona el tipo', value: '' },
      { title: 'Infantil', value: 'infantil' },
      { title: 'Juvenil', value: 'juvenil' },
      { title: 'Infantil-Juvenil', value: 'infantil-juvenil' },
    ],
  },
];

class OrchestraList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      page: 1,
      excel: '',
      canAdd: props.canAdd,
      search: false,
      orchestras: AllOrchestras,
      loading: true,
      query: '',
      // eslint-disable-next-line react/no-unused-state
      filter: [],
      header: [
        { name: 'Lista de orquestas' },
        { name: 'Fecha' },
        { name: 'Coordinador' },
        { name: 'Integrantes' },
        { name: 'Locación' },
        { name: 'Sostenedor' },
      ],
    };

    this.searchList = this.searchList.bind(this);
    this.getList = this.getList.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.getListItems = this.getListItems.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  getList(query) {
    const self = this;
    let url;
    console.log('querryyyyyyyyyyyyyyy');
    console.log(query);
    this.setState({
      query: query
    });
    let excel;
    if (!query) {
      url = `${'/api/v1/orchestras/?' + 'page='}${this.state.page}`;
      excel = '/orchestras/excel/';
    } else {
      url = `/api/v1/orchestras/${query}&page=${this.state.page}`;
      excel = `/orchestras/excel/${query}`;
    }
    axios.get(url)
      .then((response) => {
        AllOrchestras = getOrchestraList(response.data.results);
        self.setState({
          count: response.data.count,
          excel,
          orchestras: AllOrchestras,
          search: !!query,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 404) {
          console.log('404');
          AllOrchestras = getOrchestraList(getExampleOrchestraList());
          console.log(AllOrchestras);
          self.setState({ orchestras: AllOrchestras });
        }
      });
  }

  searchList(query) {
    this.setState({
      page: 1,
      loading: true,
    }, function () {
      this.getList(query);
    });
  }

  onPageChange(page) {
    this.setState({
      page,
      loading: true,
    }, function () {
      if(this.state.query){
        this.getList(this.state.query);
      } else {
        this.getList();
      }
    });
  }

  getListItems() {
    const { loading } = this.state;
    if (loading) {
      return (
        <tr><td className="pt-3 pb-5" colSpan="25"><div className="relative"><Spinner /></div></td></tr>
      );
    }
    if (this.state.orchestras.length) {
      return (
        this.state.orchestras.map((item, i) => {
          if (item.coordinator && Object.keys(item.coordinator).length) {
            item.coordinator = getUser(item.coordinator);
          }
          if (this.state.canAdd) {
            return (
              <tr key={`orchestra-item-${i}-${item.url}`}>
                <TableItem {...item} type="orchestra-admin" />
                <TableEdit url={item.url} />
                <TableDelete url={item.url} />
              </tr>
            );
          } else {
            return (
              <tr key={`orchestra-item-${i}-${item.url}`}>
                <TableItem {...item} type="orchestra-admin" />
              </tr>
            );  
          }
        })
      );
    }
    return (
      <tr><td><span className="d-box p-3">No hay orquestas para mostrar.</span></td></tr>
    );
  }

  render() {
    let boton = '';
    let colextra = '';
    console.log(this.state.canAdd);
    if (this.state.canAdd === true) {
      boton = (
        <a href="/orquesta/">
          <button className="btn_tool" type="button">
            Agregar Orquesta
          </button>
        </a>
      );
      colextra = (      
        <>  
      <th scope="col" />
      <th scope="col" />
      </>
      );
    }
    return (
      <>
        {boton}
        <div className="tools">
          <SearchList
            options={SearchOptions}
            count={this.state.count}
            excel={this.state.excel}
            search={this.state.search}
            onSearch={this.searchList}
          />
        </div>
        <div className="row">
          <div className="col-12 text-sm-right">
            <a className="btn btn-light mt-5 d-block d-sm-inline-block text-secondary" href="/orchestras/excel/">Descargar todo</a>
          </div>
        </div>
        <div className="full-box">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  {
                    this.state.header.map((th, i) => <TableHeader key={`header-${i}-${th.name}`} name={th.name} />)
                  }
                  { colextra }
                </tr>
              </thead>
              <tbody>
                { this.getListItems() }
              </tbody>
            </table>
          </div>
          <div className="bottom-box text-center" />
        </div>
        <div className="container">
          <Pagination key={this.state.count} count={this.state.count} perPage={16} onChange={this.onPageChange} page={this.state.page} />
        </div>
      </>
    );
  }
}


export default OrchestraList;
