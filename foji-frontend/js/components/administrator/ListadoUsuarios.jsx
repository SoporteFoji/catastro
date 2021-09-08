/* eslint-disable react/no-array-index-key */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import axios from 'axios';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItemCustom from '../Tables/TableItemCustom.jsx';
import TableEditCustom from '../Tables/TableEditCustom.jsx';
import {
  getAdministratorList, getAdministrator,
} from '../../utils/get.js';
import SearchList from '../Search/SearchList.jsx';
import TextFilter from '../Search/TextFilter.jsx';
import LocationFilter from '../Search/LocationFilter.jsx';
import SelectFilter from '../Search/SelectFilter.jsx';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';

let AllUsuarios = [];

class ListadoUsuarios extends Component {
  constructor(props) {
    super(props);
    console.log('entra a usuarios');
    this.state = {
      showUsuarios: false,
      count: 0,
      page: 1,
      excel: '',
      search: false,
      usuarios: AllUsuarios,
      loading: true,
      filter: [],
      header: [
        { name: 'Id' },
        { name: 'Usuario' },
        { name: 'Email' },
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

  // export default EditFoodItemForm;

  getList(query) {
    const self = this;
    let url;
    let excel;
    if (!query) {
      url = '/api/v1/administrators/?' + 'page=1';
      excel = '/administrators/excel/';
    } else {
      url = `/api/v1/administrators/${query}&page=${this.state.page}`;
      excel = `/administrators/excel/${query}`;
    }
    axios.get(url)
      .then((response) => {
        AllUsuarios = getAdministratorList(response.data.results);
        console.table(AllUsuarios);
        self.setState({
          count: response.data.count,
          excel,
          usuarios: AllUsuarios,
          search: !!query,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
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
    if (this.state.usuarios.length) {
      return (
        this.state.usuarios.map((item, i) => {
          if (item.administrator && Object.keys(item.administrator).length) {
            item.administrator = getAdministrator(item.administrator);
          }
          return (
            <tr key={`administrator-item-${i}-${item.url}`}>
              <TableItemCustom {...item} type="administrator-admin" />
              <TableEditCustom entity="administrator" url={item.id} />
            </tr>
          );
        }));
    }
    return (
      <tr><td><span className="d-box p-3">No hay usuarios para mostrar.</span></td></tr>
    );
  }

  render() {
    return (
      <div className="full-box" id="tabla-usuario-mantenedor">
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

export default ListadoUsuarios;
