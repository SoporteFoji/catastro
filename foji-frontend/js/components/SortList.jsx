import React, { Component } from 'react';

import Select from './Select.jsx';

class SortList extends Component {
  render() {
    return (
      <Select options={this.props.options} value={this.props.value} name="sort" onChange={this.props.onChange} />
    );
  };
}

export default SortList;
