import React, { Component } from 'react';

import TableImage from './TableImage.jsx';
import TableTitle from './TableTitle.jsx';
import TableData from './TableData.jsx';
import TableEditCustom from '../Tables/TableEditCustom.jsx';

class TableItem extends Component {
  render() {
  	return (
    <>
      <td scope="row">
        <div className="d-block w-0-space">
          <div className="d-inline-block">
            <TableImage url={this.props.image} type={this.props.type === 'user-admin' ? 'user' : 'orchestra'} />
          </div>
          <TableTitle
            name={this.props.name || (`${this.props.personal_information.first_name} ${this.props.personal_information.last_name}`)}
            url={this.props.url}
            status={this.props.status}
            current_status={this.props.current_status}
            role={this.props.role}
            type={this.props.type}
          />
        </div>
      </td>
      <TableData {...this.props} role={this.props.role} />
      {this.props.role==='administrator' ? <TableEditCustom entity="administrator" url={this.props.id} /> : null }
      {this.props.role==='coordinator' ? <TableEditCustom entity="coordinator" url={this.props.id} /> : null }
      {this.props.role==='director' ? <TableEditCustom entity="director" url={this.props.id} /> : null }
      {this.props.role==='instructor' ? <TableEditCustom entity="instructor" url={this.props.id} /> : null }
      {this.props.role==='cast_member' ? <TableEditCustom entity="cast_member" url={this.props.id} /> : null }
      {this.props.role==='area-admin' ? <TableEditCustom entity="area" url={this.props.id} />  : null }
      {this.props.role==='provincia-admin' ? <TableEditCustom entity="provincia" url={this.props.id} />  : null }
      {this.props.role==='region-admin' ? <TableEditCustom entity="region" url={this.props.id} />  : null }
    </>
    );
  }
}
export default TableItem;
