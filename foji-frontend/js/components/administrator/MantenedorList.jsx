/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import axios from 'axios';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItem from '../Tables/TableItem.jsx';
import { TableEdit, TableEditArea } from '../Tables/TableEdit.jsx';
import {
  getOrchestraList, getExampleOrchestraList, getUser, getAreasList, getRegionsList,
} from '../../utils/get.js';
import SearchList from '../Search/SearchList.jsx';
import TextFilter from '../Search/TextFilter.jsx';
import LocationFilter from '../Search/LocationFilter.jsx';
import SelectFilter from '../Search/SelectFilter.jsx';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';
import ListadoRegiones from './ListadoRegiones.jsx';
import ListadoAreas from './ListadoAreas.jsx';
import ListadoUsuarios from './ListadoUsuarios.jsx';
import AreaList from './AreaList.jsx';
import ProvinciaList from './ProvinciaList.jsx';
import RegionList from './RegionList.jsx';

const AllOrchestras = [];
const AllAreas = [];

const AllUsuarios = [];
const AllRegions = [];
const AllProvincias = [];

const SearchOptions = [
  { value: '', title: 'Selecciona un filtro' },
  { value: 'code', title: 'Código Único', component: TextFilter },
  { value: 'name', title: 'Nombre', component: TextFilter },
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

class MantenedorList extends Component {
  constructor(props) {
    super(props);
    console.log(props.canAdd);
    this.state = {
      showMantenedor: props.canAdd,
      showRegiones: false,
      showAreas: false,
      showUsuarios: false,
      showProvincia: false,
      count: 0,
      page: 1,
      excel: '',
      search: false,
      orchestras: AllOrchestras,
      areas: AllAreas,
      provincias: AllProvincias,
      usuarios: AllUsuarios,
      loading: true,
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

    // this.searchList = this.searchList.bind(this);
    // this.getList = this.getList.bind(this);
    // this.onPageChange = this.onPageChange.bind(this);
    // this.getListItems = this.getListItems.bind(this);
  }

  showMantenedor(valor, e) {
    e.preventDefault();
    this.resetViews();
    console.log(valor);
    if (valor === 'region') {
      this.setState({ showRegiones: true });
    }
    if (valor === 'area') {
      this.setState({ showAreas: true });
      console.log('estamos probando');
    }
    if (valor === 'provincia') {
      this.setState({ showProvincia: true });
      console.log('estamos probando');
    }
    if (valor === 'usuarios') {
      this.setState({ showUsuarios: true });
      console.log('estamos probando');
    }
  }

  resetViews() {
    this.setState({ showRegiones: false });
    this.setState({ showAreas: false });
    this.setState({ showUsuarios: false });
    this.setState({ showProvincia: false });
  }


  render() {
    const display = { display: 'none' };
    return (
      <>
        <div className="tools" style={{ display: 'none' }}>
          <SearchList
            options={SearchOptions}
            count={this.state.count}
            excel={this.state.excel}
            search={this.state.search}
            onSearch={this.searchList}
          />
        </div>
        { this.state.showMantenedor ? 
        <div className="row">
        <button onClick={e => this.showMantenedor('area', e)} id="area-mantenedor" className="btn btn-primary">Area</button>
        <button onClick={e => this.showMantenedor('provincia', e)} id="area-provincia" className="btn btn-primary">Provincia</button>
        <button onClick={e => this.showMantenedor('region', e)} id="area-regiones" className="btn btn-primary">Regiones</button>
      </div>
        : null 
        }
        
        <div className="row" style={{ display: 'none' }}>
          <div className="col-12 text-sm-right">
            <a className="btn btn-light mt-5 d-block d-sm-inline-block text-secondary" href="/orchestras/excel/">Descargar todo</a>
          </div>
        </div>
        { this.state.showAreas ? <AreaList /> : null }
        { this.state.showRegiones ? <RegionList /> : null }
        { this.state.showProvincia ? <ProvinciaList /> : null }
        <div className="container" style={{ display: 'none' }}>
          <Pagination key={this.state.count} count={this.state.count} perPage={16} onChange={this.onPageChange} page={this.state.page} />
        </div>
      </>
    );
  }
}


export default MantenedorList;
