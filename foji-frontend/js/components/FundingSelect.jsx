import React, { Component } from 'react';

import Select from './Select.jsx';


class SocialSelect extends Component {
  constructor(props) {
    super(props);

    this.options = [
      { title: 'FNDR', value: 'fndr' },
    ];

    this.state = {
      value: this.options[0].value,
    };
  }

  render() {
    return (
      <Select
        name="social"
        value={this.state.value}
        options={this.options}
        onChange={this.props.onChange}
      />
    );
  }
}


class EducationalSelect extends Component {
  constructor(props) {
    super(props);

    this.options = [
      { title: 'SEP', value: 'sep' },
      { title: 'FAEP', value: 'faep' },
      { title: 'Apoderados', value: 'parents' },
      { title: 'Universitario', value: 'university' },
    ];

    this.state = {
      value: this.options[0],
    };
  }

  render() {
    return (
      <Select
        name="educational"
        value={this.state.selectedOption}
        options={this.options}
        onChange={this.props.onChange}
      />
    );
  }
}


class DonationsSelect extends Component {
  constructor(props) {
    super(props);

    this.options = [
      { title: 'Corporación', value: 'corporation' },
      { title: 'Fundación', value: 'foundation' },
      { title: 'Empresaas', value: 'business' },
    ];

    this.state = {
      value: this.options[0].value,
    };
  }

  render() {
    return (
      <Select
        name="donations"
        value={this.state.selectedOption}
        options={this.options}
        onChange={this.props.onChange}
      />
    );
  }
}


class MunicipalSelect extends Component {
  constructor(props) {
    super(props);

    this.options = [
      { title: 'Social', value: 'social' },
      { title: 'Educacional', value: 'educational' },
    ];

    this.state = {
      selectedOption: this.options[0].value,
    };

    this.onChange = this.onChange.bind(this);
  }

  getComponent(value) {
    if (value === 'social') {
      return <SocialSelect />;
    }

    return <EducationalSelect />;
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      selectedOption: value,
    });
  }

  render() {
    const nextComponent = this.getComponent(this.state.selectedOption);

    return (
      <div>
        <Select
          name="municipal"
          value={this.state.selectedOption}
          options={this.options}
          onChange={this.onChange}
        />
        {nextComponent}
      </div>
    );
  }
}


class OtherInput extends Component {
  render() {
    console.log("render other");
    return (
      <input name='other' type='text' />
    );
  }
}


class FundingSelect extends Component {
  constructor(props) {
    super(props);

    this.options = [
      { title: 'Permanente/Ocasional', value: 'permanent-ocassional' },
      { title: 'Municipal', value: 'municipal' },
      { title: 'Donaciones', value: 'donations' },
      { title: 'Otros', value: 'others' },
      { title: 'Sin financiamiento', value: 'no-funding' },
    ];

    this.state = {
      selectedOption: this.options[0].value,
    };

    this.onChange = this.onChange.bind(this);
  }

  getComponent(value) {
    if (value === 'permanent-ocassional') {
      return '';
    }

    if (value === 'municipal') {
      return <MunicipalSelect />
    }

    if (value === 'donations') {
      return <DonationsSelect />
    }

    if (value === 'others') {
      return <OtherInput />;
    }

    return '';
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      selectedOption: value,
    });
  }

  render() {
    const nextComponent = this.getComponent(this.state.selectedOption);

    return (
      <>
        <Select
          name="municipal"
          value={this.state.selectedOption}
          options={this.options}
          onChange={this.onChange}
        />
        {nextComponent}
      </>
    );
  }
}


export default FundingSelect;
