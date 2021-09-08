import React, { Component } from 'react';

import MultiSelect from '../MultiSelect.jsx';

let other = false;
const options = [
  { title: 'Seleccionar financiamiento', value: '' },
  {
    title: 'Municipal',
    value: 'municipal',
    options: [
      { title: 'Especificar', value: '' },
      {
        title: 'Social',
        value: 'social',
        options: [
          { title: 'Especificar', value: '' },
          { title: 'FNDR', value: 'fndr' },
          { title: 'Otro', value: 'otro' },
        ],
      },
      {
        title: 'Educacional',
        value: 'educacional',
        options: [
          { title: 'Especificar', value: '' },
          { title: 'SEP', value: 'sep' },
          { title: 'FAEP', value: 'faep' },
          { title: 'Apoderados', value: 'apoderados' },
          { title: 'Universitario', value: 'universitario' },
        ],
      },
    ],
  },
  {
    title: 'Donaciones',
    value: 'donaciones',
    options: [
      { title: 'Especificar', value: '' },
      {
        title: 'Corporación',
        value: 'corporacion',
      },
      {
        title: 'Fundación',
        value: 'fundacion',
      },
      {
        title: 'Empresas',
        value: 'empresas',
      },
    ],
  },
  { title: 'Otros', value: 'otros' },
  { title: 'Sin financiamiento', value: 'sin-financiamiento'},
];

class FundingSelect extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <MultiSelect id="parent" name="main" options={options} onChange={this.props.onChange} reportchange={this.props.reportchange} />
      </div>
    );
  }
}


export default FundingSelect;
