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
      {this.props.role==='administrator' && this.props.canAdd===true ? <TableEditCustom entity="administrator" url={this.props.id} /> : <TableEditCustom /> }
      {this.props.role==='coordinator'  && this.props.canAdd===true ? <TableEditCustom entity="coordinator" url={this.props.id} /> : <TableEditCustom /> }
      {this.props.role==='director'  && this.props.canAdd===true ? <TableEditCustom entity="director" url={this.props.id} /> : null }
      {this.props.role==='instructor'  && this.props.canAdd===true ? <TableEditCustom entity="instructor" url={this.props.id} /> : null }
      {this.props.role==='cast_member'  && this.props.canAdd===true ? <TableEditCustom entity="cast_member" url={this.props.id} /> : null }
      {this.props.role==='area-admin'  && this.props.canAdd===true ? <TableEditCustom entity="area" url={this.props.id} />  : null }
      {this.props.role==='provincia-admin'  && this.props.canAdd===true ? <TableEditCustom entity="provincia" url={this.props.id} />  : null }
      {this.props.role==='region-admin'  && this.props.canAdd===true ? <TableEditCustom entity="region" url={this.props.id} />  : null }
    </>
    );
  }
}
export default TableItem;
