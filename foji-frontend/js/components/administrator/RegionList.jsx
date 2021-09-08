import React, { Component } from 'react';
import axios from 'axios';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItemCustom from '../Tables/TableItemCustom.jsx';
import { getAreaList, getArea, getUser } from '../../utils/get.js';
import SearchList from '../Search/SearchList.jsx';
import TextFilter from '../Search/TextFilter.jsx';
import LocationFilter from '../Search/LocationFilter.jsx';
import SelectFilter from '../Search/SelectFilter.jsx';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';

let AllRegion = [];

const SearchOptions = [
  { value: '', title: 'Selecciona un filtro' },
  { value: 'code', title: 'Código Único', options: { value: 'region' }, component: TextFilter },
  { value: 'name', title: 'Nombre', options: { value: 'region' }, component: TextFilter },
];

class RegionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      page: 1,
      excel: '',
      search: false,
      regions: AllRegion,
      loading: true,
      // eslint-disable-next-line react/no-unused-state
      filter: [],
      header: [
        { name: 'Nombre' },
        { name: 'Codigo' },
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
      url = `${'/api/region-list/?' + 'page='}${this.state.page}`;
      excel = '/region/excel/';
    } else {
      url = `/api/region-list/${query}&page=${this.state.page}`;
      excel = `/region/excel/${query}`;
    }
    console.log(url);

    axios.get(url)
      .then((response) => {
        AllRegion = getAreaList(response.data.results);
        self.setState({
          count: response.data.count,
          excel,
          regions: AllRegion,
          search: !!query,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 404) {
          console.log('404');
          AllRegion = getAreaList();
          console.log(AllRegion);
          self.setState({ regions: AllRegion });
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
    if (this.state.regions.length) {
      return (
        this.state.regions.map((item, i) => {
          if (item.coordinator && Object.keys(item.coordinator).length) {
            item.coordinator = getArea(item.coordinator);
          }
          return (
            <tr key={`region-item-${i}-${item.id}`}>
              <TableItemCustom {...item} type="region-admin"  role="region-admin"/>
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
            <a className="btn btn-light mt-5 d-block d-sm-inline-block text-secondary" href="/regions/excel/">Descargar todo</a>
          </div>
        </div>
        <div className="full-box">
          <div className="table-wrapper">
          <a href={'/region/'}>
          <button className="btn_tool" type="button">
            Agregar Región
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


export default RegionList;
