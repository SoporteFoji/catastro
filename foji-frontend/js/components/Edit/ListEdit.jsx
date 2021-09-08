import React, { Component } from 'react';

class ListEdit extends Component {
  render() {
    return (
      <td className="list-edit">
        <div className="d-inline-block" onClick={this.props.onDelete}>
          <button className="btn_tool mr-2" type="button">
            <div className="icon close-icon"></div>
          </button>
        </div>
        <div className="d-inline-block" onClick={this.props.onEdit}>
          <button className="btn_tool">
            <div className="icon edit-icon" type="button"></div>
          </button>
        </div>
      </td>
    );
  }
}

export default ListEdit;
