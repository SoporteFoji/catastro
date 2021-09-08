import React, { Component } from 'react';
import axios from 'axios';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItem from '../Tables/TableItem.jsx';
import TableEdit from '../Tables/TableEdit.jsx';
import { getUserList } from '../../utils/get.js';
import SearchList from '../Search/SearchList.jsx';
import TextFilter from '../Search/TextFilter.jsx';
import LocationFilter from '../Search/LocationFilter.jsx';
import SelectFilter from '../Search/SelectFilter.jsx';
import Select from '../Select.jsx';
import Pagination from '../Pagination.jsx';
import Spinner from '../Spinner.jsx';

let AllUsers = [];

const SearchOptions = {
  coordinator: [
    { value: '', title: 'Selecciona un filtro' },
    { value: 'first_name', title: 'Nombre', component: TextFilter },
    { value: 'last_name', title: 'Apellido', component: TextFilter },
    { value: 'email', title: 'Email', component: TextFilter },
    { value: 'phone_number_mobile', title: 'Teléfono', component: TextFilter },
    { value: 'area', title: 'Comuna', component: LocationFilter },
    { value: 'region', title: 'Región', component: LocationFilter },
    { value: 'social_id', title: 'Rut', component: TextFilter },
    { value: 'code', title: 'Código Orquesta', component: TextFilter },
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
  ],
  administrator: [
    { value: '', title: 'Selecciona un filtro' },
    { value: 'first_name', title: 'Nombre', component: TextFilter },
    { value: 'last_name', title: 'Apellido', component: TextFilter },
    { value: 'email', title: 'Email', component: TextFilter },
  ],
  director: [
    { value: '', title: 'Selecciona un filtro' },
    { value: 'first_name', title: 'Nombre', component: TextFilter },
    { value: 'last_name', title: 'Apellido', component: TextFilter },
    { value: 'email', title: 'Email', component: TextFilter },
    { value: 'area', title: 'Comuna', component: LocationFilter },
    { value: 'region', title: 'Región', component: LocationFilter },
    { value: 'phone_number_mobile', title: 'Teléfono', component: TextFilter },
    { value: 'code', title: 'Código Orquesta', component: TextFilter },

  ],
  instructor: [
    { value: '', title: 'Selecciona un filtro' },
    { value: 'first_name', title: 'Nombre', component: TextFilter },
    { value: 'last_name', title: 'Apellido', component: TextFilter },
    { value: 'instrument', title: 'Instrumento', component: TextFilter },
    { value: 'email', title: 'Email', component: TextFilter },
    { value: 'area', title: 'Comuna', component: LocationFilter },
    { value: 'region', title: 'Región', component: LocationFilter },
    { value: 'phone_number_mobile', title: 'Teléfono', component: TextFilter },
    { value: 'students', title: 'Número alumnos', component: TextFilter },
    { value: 'social_id', title: 'Rut', component: TextFilter },
    { value: 'code', title: 'Código Orquesta', component: TextFilter },
  ],
  cast_member: [
    { value: '', title: 'Selecciona un filtro' },
    { value: 'first_name', title: 'Nombre', component: TextFilter },
    { value: 'last_name', title: 'Apellido', component: TextFilter },
    { value: 'instrument', title: 'Instrumento', component: TextFilter },
    { value: 'email', title: 'Email', component: TextFilter },
    { value: 'area', title: 'Comuna', component: LocationFilter },
    { value: 'region', title: 'Región', component: LocationFilter },
    { value: 'phone_number_mobile', title: 'Teléfono', component: TextFilter },
    { value: 'social_id', title: 'Rut', component: TextFilter },
    { value: 'code', title: 'Código Orquesta', component: TextFilter },
    {
      value: 'orchestra_type',
      title: 'Tipo de orquesta',
      component: SelectFilter,
      options: [
        { title: 'Selecciona el tipo', value: '' },
        { title: 'Infantil', value: 'infantil' },
        { title: 'Juvenil', value: 'juvenil' },
        { title: 'Infantil-Juvenil', value: 'infantil-juvenil' },
      ],
    },
    {
      value: 'gender',
      title: 'Género',
      component: SelectFilter,
      options: [
        { title: 'Selecciona el género', value: '' },
        { title: 'M', value: 'Hombre' },
        { title: 'F', value: 'Mujer' },
      ],
    },
  ],

};

const UserOptions = [
  { value: 'coordinator', title: 'Coordinador' },
  { value: 'administrator', title: 'Administrador' },
  { value: 'director', title: 'Director' },
  { value: 'instructor', title: 'Instructor' },
  { value: 'cast_member', title: 'Elenco' },
];

const HeaderOptions = {
  coordinator: [
    { name: 'Lista de coordinadores' },
    { name: 'Orquestas' },
    { name: 'Fecha' },
    { name: 'Contacto' },
    { name: 'Rut' },
    { name: 'Acciones' },
  ],
  administrator: [
    { name: 'Lista de administradores' },
    { name: 'Fecha' },
    { name: 'Contacto' },
    { name: 'Acciones' },
  ],
  director: [
    { name: 'Lista de directores' },
    { name: 'Orquesta' },
    { name: 'Contacto' },
    { name: 'Rut' },
    { name: 'Acciones' },
  ],
  instructor: [
    { name: 'Lista de instructores' },
    { name: 'Orquesta' },
    { name: 'Contacto' },
    { name: 'Cargo' },
    { name: 'Rut' },
    { name: 'Acciones' },
  ],
  cast_member: [
    { name: 'Miembros del elenco' },
    { name: 'Orquesta' },
    { name: 'instrumento' },
    { name: 'Contacto' },
    { name: 'Género' },
    { name: 'Rut' },
    { name: 'Acciones' },
  ],
};

class UserList extends Component {
  constructor(props) {
    console.log("entro a user list");
    super(props);
    console.log(props.canAdd);
    this.state = {
      count: 0,
      page: 1,
      excel: "",
      search: false,
      currentUser: "coordinator",
      users: AllUsers,
      header: HeaderOptions,
      query: "",
      loading: true,
      canAdd: props.canAdd
    };

    this.searchList = this.searchList.bind(this);
    this.getList = this.getList.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.getListItems = this.getListItems.bind(this);
    this.buttonAdd = this.buttonAdd.bind(this);
    this.addEntity = this.addEntity.bind(this);
  }

  componentDidMount() {
    this.getList(this.state.currentUser);
  }

  getList(user, query) {
    const self = this;
    let url;
    let excel;
    if (!query) {
      url = `/api/v1/${this.state.currentUser}s/?` + `page=${this.state.page}`;
      excel = `/${this.state.currentUser}s/excel/`;
    } else {
      url = `/api/v1/${this.state.currentUser}s/${query}&page=${this.state.page}`;
      excel = `/${this.state.currentUser}s/excel/${query}`;
    }
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        AllUsers = getUserList(response.data.results);
        self.setState({
          count: response.data.count,
          currentUser: user,
          users: AllUsers,
          excel,
          search: !!query,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 404) {
          console.log("404");
          AllUsers = getUserList(getExampleUserList());
          console.log(AllUsers);
          self.setState({ users: AllUsers });
        }
      });
  }

  searchList(query) {
    console.table(query);
    this.setState(
      {
        query,
        page: 1,
        loading: true,
      },
      function () {
        this.getList(this.state.currentUser, query);
      }
    );
  }

  changeUser(e) {
    const user = e.currentTarget.value;
    console.table(user);
    this.setState(
      {
        currentUser: user,
        page: 1,
        loading: true,
      },
      function () {
        this.getList(user);
      }
    );
  }

  onPageChange(page) {
    this.setState(
      {
        page,
        loading: true,
      },
      function () {
        this.getList(this.state.currentUser, this.state.query);
      }
    );
  }

  getListItems() {
    /* Get users from state and list them in a table */

    const { loading } = this.state;
    if (loading) {
      return (
        <tr>
          <td className="pt-3 pb-5" colSpan="25">
            <div className="relative">
              <Spinner />
            </div>
          </td>
        </tr>
      );
    }
    if (this.state.users.length) {
      return this.state.users.map((item, i) => {
        if (
          item.personal_information.first_name &&
          item.personal_information.last_name
        ) {
          return (
            <tr key={`user-${i}-${item.personal_information.last_name}`}>
              <TableItem
                {...item}
                type="user-admin"
                role={this.state.currentUser}
                canAdd={this.state.canAdd}
              />
            </tr>
          );
        }
      });
    }
    return (
      <tr>
        <td>
          <span className="d-box p-3">No hay resultados para mostrar.</span>
        </td>
      </tr>
    );
  }

  addEntity() {
    let rel = '';
    if(this.state.currentUser==='administrator'){
      rel = 'administrador';
    }
    if(this.state.currentUser==='coordinator'){
      rel = 'coordinador';
    }
    window.location = '/' + rel;
  }

  buttonAdd(op) {
    return (
      <button className="btn btn-primary" type="button" onClick={this.addEntity}>
        Agregar {op}
      </button>
    );
  }

  render() {
    return (
      <>
        <div className="tools">
          <SearchList
            key={this.state.currentUser}
            options={SearchOptions[this.state.currentUser]}
            count={this.state.count}
            excel={this.state.excel}
            search={this.state.search}
            onSearch={this.searchList}
          />
        </div>
        {this.state.currentUser === "administrator" && this.state.canAdd === true
          ? this.buttonAdd("administrador")
          : null}
        {this.state.currentUser === "coordinator" && this.state.canAdd === true
          ? this.buttonAdd("coordinador")
          : null}
        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-3">
            <div id="user-select" className="sel-wrapper mt-5">
              <Select
                options={UserOptions}
                className="form-control bg-primary border-primary text-white"
                value={this.state.currentUser}
                onChange={this.changeUser}
              />
            </div>
          </div>
          <div className="col-sm-6 col-md-8 col-lg-9 text-sm-right">
            <a
              className="btn btn-light mt-5 d-block d-sm-inline-block text-secondary"
              href={`/${this.state.currentUser}s/excel/`}
            >
              Descargar todo
            </a>
          </div>
        </div>
        <div className="full-box my-1">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  {this.state.header[this.state.currentUser].map((th, i) => (
                    <TableHeader key={`head-${i}-${th.name}`} name={th.name} />
                  ))}
                </tr>
              </thead>
              <tbody>{this.getListItems()}</tbody>
            </table>
          </div>
          <div className="bottom-box text-center" />
        </div>
        <div className="container">
          <Pagination
            key={this.state.count}
            count={this.state.count}
            perPage={16}
            onChange={this.onPageChange}
            page={this.state.page}
          />
        </div>
      </>
    );
  }
}


export default UserList;
