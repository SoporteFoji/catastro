import React, { Component } from 'react';
import axios from 'axios';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItem from '../Tables/TableItem.jsx';
import TableEdit from '../Tables/TableEdit.jsx';
import { getAreaList, getArea, getUser } from '../../utils/get.js';
import SearchList from '../Search/SearchList.jsx';
import TextFilter from '../Search/TextFilter.jsx';
import LocationFilter from '../Search/LocationFilter.jsx';
import SelectFilter from '../Search/SelectFilter.jsx';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';

let AllAreas = [];

const SearchOptions = [
  { value: '', title: 'Selecciona un filtro' },
  { value: 'code', title: 'Código Único', component: TextFilter },
  { value: 'name', title: 'Nombre', component: TextFilter },
  { value: 'region', title: 'Región', component: LocationFilter },
  { value: 'province', title: 'Provincia', component: LocationFilter },
  { value: 'area', title: 'Comuna', component: LocationFilter },
  { value: 'city', title: 'Ciudad', component: TextFilter },
  {
    value: 'area_type',
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

class AreaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      page: 1,
      excel: '',
      search: false,
      areas: AllAreas,
      loading: true,
      // eslint-disable-next-line react/no-unused-state
      filter: [],
      header: [
        { name: 'Nombre Area' },

        { name: 'Acciones' },
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
    let excel;
    if (!query) {
      url = `${'/api/area-list/?' + 'page='}${this.state.page}`;
      excel = '/areas/excel/';
    } else {
      url = `/api/area-list/${query}&page=${this.state.page}`;
      excel = `/areas/excel/${query}`;
    }
    console.log(url);

    axios.get(url)
      .then((response) => {
        AllAreas = getAreaList(response.data.results);
        self.setState({
          count: response.data.count,
          excel,
          areas: AllAreas,
          search: !!query,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 404) {
          console.log('404');
          AllAreas = getAreaList();
          console.log(AllAreas);
          self.setState({ areas: AllAreas });
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
      this.getList();
    });
  }

  getListItems() {
    const { loading } = this.state;
    if (loading) {
      return (
        <tr><td className="pt-3 pb-5" colSpan="25"><div className="relative"><Spinner /></div></td></tr>
      );
    }
    if (this.state.areas.length) {
      return (
        this.state.areas.map((item, i) => {
          if (item.coordinator && Object.keys(item.coordinator).length) {
            item.coordinator = getUser(item.coordinator);
          }
          return (
            <tr key={`area-item-${i}-${item.id}`}>
              <TableItem {...item} type="area-admin" role="area-admin"/>
            </tr>
          );
        })
      );
    }
    return (
      <tr><td><span className="d-box p-3">No hay orquestas para mostrar.</span></td></tr>
    );
  }

  render() {
    return (
      <>
        <div className="tools">Area
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
            <a className="btn btn-light mt-5 d-block d-sm-inline-block text-secondary" href="/areas/excel/">Descargar todo</a>
          </div>
        </div>
        <div className="full-box">
          <div className="table-wrapper">
          <a href={'/area/'}>
          <button className="btn_tool" type="button">
            Agregar Area
          </button>
        </a>
            <table className="table">
              <thead>
                <tr>
                  {
                    this.state.header.map((th, i) => <TableHeader key={`header-${i}-${th.name}`} name={th.name} />)
                  }
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


export default AreaList;
