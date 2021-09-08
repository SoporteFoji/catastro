import React, { Component } from 'react';

import FundingSelect from './FundingSelect.jsx';
import ItemDisplay from './ItemDisplay.jsx';


class FundingAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fundingOptions: [],
    };

    this.onChangeFunding = this.onChangeFunding.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
  }

  onChangeFunding(name, value) {
  }

  onClick(e) {
  }

  render() {
    return (
      <div>
        <ItemDisplay items={this.state.fundingOptions} />
        <FundingSelect onChange={this.onChangeFunding} />
        <button className="btn btn-primary" onClick={this.onClick} />
      </div>
    );
  }
}


export default FundingAdd;

