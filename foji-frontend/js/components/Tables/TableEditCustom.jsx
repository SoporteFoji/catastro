import React, { Component } from 'react';

class TableEditCustom extends Component {
  render() {
    if (this.props.entity) {
      return (
        <td className="edit">
          <a href={`/${this.props.entity}/${this.props.url}`}>
            <button className="btn_tool" type="button">
              <div className="icon edit-icon" />
            </button>
          </a>
          <a href={`/${this.props.entity}/delete/${this.props.url}`}>
            <button className="btn_tool" type="button">
              <div className="icon close-icon" />
            </button>
          </a>
        </td>
      );
    }
    return (
      <>
        
      </>
    );
  }
}
export default TableEditCustom;
