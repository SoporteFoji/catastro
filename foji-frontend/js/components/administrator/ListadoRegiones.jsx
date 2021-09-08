/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import axios from 'axios';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItem from '../Tables/TableItem.jsx';
import { TableEdit, TableEditArea } from '../Tables/TableEdit.jsx';
import { getRegionsList } from '../../utils/get';
import SearchList from '../Search/SearchList.jsx';
import TextFilter from '../Search/TextFilter.jsx';
import LocationFilter from '../Search/LocationFilter.jsx';
import SelectFilter from '../Search/SelectFilter.jsx';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';

let AllRegions = [];

class ListadoRegiones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegiones: false,
      count: 0,
      page: 1,
      excel: '',
      search: false,
      regions: AllRegions,
      loading: true,
      filter: [],
      header: [
        { name: 'Id' },
        { name: 'Code' },
        { name: 'Name' },
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

  // eslint-disable-next-line react/sort-comp
  getList(query) {
    const self = this;
    let url;
    let excel;
    if (!query) {
      url = `${'http://localhost:8000/api/v1/regions/?' + 'page='}${this.state.page}`;
      excel = '/regions/excel/';
    } else {
      url = `/api/v1/regions/${query}&page=${this.state.page}`;
      excel = `/regions/excel/${query}`;
    }
    axios.get(url)
      .then((response) => {
        AllRegions = getRegionsList(response.data);
        console.log(AllRegions.count);
        self.setState({
          count: response.data.count,
          excel,
          regions: AllRegions,
          search: !!query,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
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
        this.state.regions.map((item, i) => (
          <tr key={`region-item-${i}-${item.id}`}>
            <TableItem {...item} type="region-admin" />
          </tr>
        ))
      );
    }
    return (
      <tr><td><span className="d-box p-3">No hay regiones para mostrar.</span></td></tr>
    );
  }

  render() {
    return (
      <div className="full-box" id="tabla-region-mantenedor">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                {
                this.state.header.map((th, i) => <TableHeader key={`header-${i}-${th.name}`} name={th.name} />)
              }
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              { this.getListItems() }
            </tbody>
          </table>
        </div>
        <div className="bottom-box text-center" />
      </div>
    );
  }
}

export default ListadoRegiones;
