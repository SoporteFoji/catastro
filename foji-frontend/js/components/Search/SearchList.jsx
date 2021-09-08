import React, { Component } from 'react';
import Input from '../Input.jsx';
import Select from '../Select.jsx';

class SearchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      total: [],
      query: '',
    };

    this.onOptionsChange = this.onOptionsChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onNew = this.onNew.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  getSearchInput() {
    if (this.state.total.length) {
      // At least one filter selected
      return this.state.total.map((filter) => {
        const index = this.props.options.findIndex(component => component.value === filter.name);
        if (index !== -1) {
          const ComponentSelected = this.props.options[index].component;
          return (
            <div className="row form-group" key={filter.name}>
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-2 con-sm-1 col-md-2 col-lg-1 filter-delete">
                    <button className="btn btn-danger btn-sm" type="button" onClick={e => this.removeFilter(filter.name)}>
                      <div className="icon close-icon" />
                    </button>
                  </div>
                  <div className="col-10 con-sm-11 col-md-10 col-lg-11">
                    <Select
                      className="form-control"
                      value={filter.name}
                      options={this.props.options}
                      onChange={e => this.onOptionsChange(e, filter.name)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <ComponentSelected
                  options={this.props.options[index].options ? this.props.options[index].options : null}
                  onChange={this.onInputChange}
                  name={filter.name}
                />
              </div>
            </div>
          );
        // new filter (unasigned value)
        } if (filter.name === 'new') {
          return (
            <div className="row form-group" key={filter.name}>
              <div className="col-sm-6">
                <Select className="form-control" options={this.props.options} onChange={e => this.onOptionsChange(e, 'new')} />
              </div>
            </div>
          );
        }
        return `error, value: ${filter.name} not found`;
      });
    }
    // Initial state
    return (
      <div className="row form-group">
        <div className="col-sm-6">
          <Select options={this.props.options} className="form-control" onChange={this.onOptionsChange} />
        </div>
      </div>
    );
  }

  onInputChange(name, value) {
    const totalFilters = this.state.total;
    const index = totalFilters.findIndex(filter => filter.name === name);
    totalFilters[index].value = value;
    this.setState({ total: totalFilters });
  }

  onOptionsChange(e, newFilter) {
    console.log(e.currentTarget.value);
    console.log(newFilter);
    if(e.currentTarget.value !=='') {
      const totalFilters = this.state.total;

      // Check if filter not already used
      if (totalFilters.findIndex(filter => filter.name === e.currentTarget.value) === -1) {
        if (newFilter) {
          const indexNew = totalFilters.findIndex(filter => filter.name === newFilter);
          totalFilters[indexNew].name = e.currentTarget.value;
          totalFilters[indexNew].value = '';
        } else {
          totalFilters.push({ name: e.currentTarget.value, value: '' });
        }
  
        this.setState({
          selected: e.currentTarget.value,
          total: totalFilters,
          error: '',
        });
      } else {
        this.setState({ error: 'Ese filtro ya esta siendo usado' });
      }
  
    }
  }

  onSearch() {
    console.log(this);
    const totalFilters = this.state.total;
    console.table(totalFilters);
    let query = '';
    totalFilters.map((filter) => {
      const separator = query ? '&' : '?';
      query += (`${separator + filter.name}=${encodeURIComponent(filter.value)}`);
    });
    this.setState({
      query,
    }, function () {
      if (this.props.onSearch) {
        this.props.onSearch(query);
      }
    });
  }

  onNew(e) {
    const totalFilters = this.state.total;
    if (totalFilters.findIndex(filter => filter.name === 'new') === -1) {
      totalFilters.push({ name: 'new', value: '' });
      this.setState({
        selected: 'new',
        total: totalFilters,
        error: '',
      });
    } else {
      this.setState({ error: 'Hay filtros no especificados' });
    }
  }

  removeFilter(filter) {
    const totalFilters = this.state.total;
    const index = totalFilters.findIndex(obj => obj.name === filter);
    totalFilters.splice(index, 1);
    this.setState({
      total: totalFilters,
    });
  }

  getResults() {
    if (this.props.search && this.props.excel) {
      return (
        <div id="search-results" className="row mt-4 mb-2">
          <div className="col-12 text-center">
            <h1><div className="badge badge-info">{this.props.count}</div></h1>
            <h5 className="text-secondary">Resultados por tu búsqueda</h5>
            <a href={this.props.excel} className="btn btn-primary">Descargar Excel</a>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <>
        <div className="alert alert-info my-3 text-center">
          <p>
            Elige un filtro para personalizar tu búsqueda.
            <br />
            Haz click en
            {' '}
            <b>"Agregar filtro"</b>
            {' '}
            para personalizarla aun más.
          </p>
        </div>
        {this.getSearchInput()}
        <div className="row">
          <div className="col-sm-6 d-block d-sm-inline-block text-center text-sm-left mb-3 mb-sm-0">
            <button className="btn btn-secondary btn-new" type="button" onClick={this.onNew}>
              <div className="icon new-icon mr-2" />
              Agregar filtro
            </button>
          </div>
          <div className="col-sm-6 d-block d-sm-inline-block text-center text-sm-right">
            <button className="btn btn-primary btn-seacrh" type="button" onClick={this.onSearch}>
              <div className="icon search-icon mr-2" />
              Buscar
            </button>
          </div>
          <div className="text-warning my-2">
            {this.state.error}
          </div>
        </div>
        {this.getResults()}
      </>
    );
  }
}


export default SearchList;
