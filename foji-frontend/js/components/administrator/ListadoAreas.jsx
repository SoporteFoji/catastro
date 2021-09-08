/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import axios from 'axios';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItem from '../Tables/TableItem.jsx';
import { TableEdit, TableEditArea } from '../Tables/TableEdit.jsx';
import {
  getAreaList,
} from '../../utils/get.js';
import SearchList from '../Search/SearchList.jsx';
import TextFilter from '../Search/TextFilter.jsx';
import LocationFilter from '../Search/LocationFilter.jsx';
import SelectFilter from '../Search/SelectFilter.jsx';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';

let AllAreas = [];
class ListadoAreas extends Component {
  constructor(props) {
    super(props);
    console.log('entra a areas');
    this.state = {
      showAreas: false,
      count: 0,
      page: 1,
      excel: '',
      search: false,
      areas: AllAreas,
      loading: true,
      filter: [],
      header: [
        { name: 'Id' },
        { name: 'Code' },
        { name: 'Name' },
        { name: 'Editar' },
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

  UpdateFoodItem(event) {
    event.preventDefault();
    /*    const updatedFood = this.state.food;
      const updatedCost = this.state.cost;
      const updatedFoodItem = Object.assign({}, this.state.foodItem, { food: updatedFood, cost: updatedCost })
      const foodItems = this.state.foodItems.map((foodItem) => (foodItem.id === this.state.foodItem.id ? updatedFoodItem : foodItem));
      this.setState({ food:'', cost: '', foodItems: foodItems});
      */
  }

  // export default EditFoodItemForm;

  getList(query) {
    const self = this;
    let url;
    let excel;
    if (!query) {
      url = '/api/v1/areas/?' + 'page=1';
      excel = '/areas/excel/';
    } else {
      url = `/api/v1/areas/${query}&page=${this.state.page}`;
      excel = `/areas/excel/${query}`;
    }
    axios.get(url)
      .then((response) => {
        console.log(response);
        AllAreas = getAreaList(response.data);
        self.setState({
          count: response.data.count,
          excel,
          areas: AllAreas,
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
    if (this.state.areas.length) {
      return (
        this.state.areas.map((item, i) => (
          <tr key={`area-item-${i}-${item.id}`}>
            <td>{item.id}</td>
            <td>{item.code}</td>
            <td>{item.name}</td>
            <td>
              <button className="btn btn-primary ml-2">Edit</button>
            </td>
          </tr>
        ))
      );
    }
    return (
      <tr><td><span className="d-box p-3">No hay areas para mostrar.</span></td></tr>
    );
  }

  render() {
    return (
      <div className="full-box" id="tabla-area-mantenedor">
        areas
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

export default ListadoAreas;
