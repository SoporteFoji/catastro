import React, { Component } from 'react';

import AgeFromDate from '../AgeFromDate.jsx';
import ListEdit from '../Edit/ListEdit.jsx';

function DataType(props) {
  if(props.role === 'instructors'){
    return(
      <>
        <td><span>{props.data.name ? props.data.name : (props.data.first_name + ' ' + props.data.last_name)}</span></td>
        <td><a href={'mailto:' + props.data.email}>{props.data.email}</a></td>
        <td><span>{props.data.instrument}</span></td>
        <td><span>{props.data.students}</span></td>
        <td><a href={'tel:' + props.data.phone_number_mobile}>{props.data.phone_number_mobile}</a></td>
        <td><span>{props.data.social_id}</span></td>
        <td><span>{props.data.birth_date ? <AgeFromDate date={props.data.birth_date} /> : ''}</span></td>
      </>
    );
  } else if(props.role === 'cast_members'){
    return(
      <>
        <td><span>{props.data.name ? props.data.name : (props.data.first_name + ' ' + props.data.last_name)}</span></td>
        <td><span>{props.data.instrument}</span></td>
        <td><span>{(props.data.gender === 'M' ? 'Hombre' : '') || (props.data.gender === 'F' ? 'Mujer' : '')}</span></td>
        <td><span>{props.data.birth_date ? <AgeFromDate date={props.data.birth_date} /> : ''}</span></td>
        <td><a href={'mailto:' + props.data.email}>{props.data.email}</a></td>
        <td><a href={'tel:' + props.data.phone_number_mobile}>{props.data.phone_number_mobile}</a></td>
        <td><span>{props.data.social_id}</span></td>
      </>
    );
  }

  return props.data.name + ', ' + props.role;

}

class TableSingle extends Component {
  constructor(props){
    super(props);
    this.toDelete = this.toDelete.bind(this);
    this.toEdit = this.toEdit.bind(this);
  }
  toDelete(){
    let member = this.props.data;
    this.props.onDelete(member, this.props.role);
  }
  toEdit(){
    let member = this.props.data;
    this.props.onEdit(member, this.props.role);
  }
  render(){
    let self = this;
    let data = this.props.data;
  	return(
  	  <tr key={data.id}>
        { // if editing, render edit controls
          this.props.edit ? <ListEdit key={data.id} onDelete={this.toDelete} onEdit={this.toEdit} /> : null
        }
        {
          <DataType data={data} role={this.props.role} />
        }
      </tr>
    )
  } 
}

TableSingle.defaultProps = {
  edit: false,
}

export default TableSingle;
