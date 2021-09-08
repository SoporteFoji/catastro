import React, { Component } from 'react';

class TableDelete extends Component {
  render() {
    const link = (this.props.entity === '' || this.props.entity === undefined) ? 'orquesta' : this.props.entity;
  	return (
    <td className="edit">

      <a href={`/${link}/delete/${this.props.url}`}>
        <button className="btn_tool" type="button">
          <div className="icon close-icon" />
        </button>
      </a>
    </td>
    );
  }
}
export default TableDelete;
