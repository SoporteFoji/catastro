import React, { Component } from 'react';

import TableHeader from '../Tables/TableHeader.jsx';

class Cast extends Component {
  constructor(props){
    super(props);

    this.state = {
      header: [
        {name: 'Elenco'},
        {name: 'Instrumento'},
        {name: 'Género'},
        {name: 'Edad'},
        {name: 'Email'},
        {name: 'Teléfono'},
        {name: 'RUT'},
      ],
    }
    this.content = this.content.bind(this);
  }
  content(){
    if(!this.props.edit){
      return (
        <tr>
          {
            this.state.header.map((th) => {
              return <TableHeader key={th.name} name={th.name} edit={this.props.edit} />
            })
          }  
        </tr>
      )
    } else {
      return (
        <tr>
          <th scope="col"></th> 
          {
            this.state.header.map((th) => {
              return <TableHeader key={th.name} name={th.name} edit={this.props.edit} />
            })
          }
        </tr>
      )
    }
  }
  render() {  
    return (
      <div className="full-box list">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              {this.content()}
            </thead>
            <tbody>
              {this.props.edit ? this.props.children : null}
            </tbody>
          </table>
        </div>
        <div className="bottom-box text-center">
        {this.props.edit ? <button className="btn btn-primary" onClick={e => this.props.onEdit(false, 'cast_members')} type="button">Agregar Elenco</button> : null}
        </div>
      </div>
    );
  };
}


export default Cast;
