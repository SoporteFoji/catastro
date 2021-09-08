import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Input from '../Input.jsx';
import Suggestions from './Suggestions.jsx';

class TextFilter extends Component {
  constructor(props) {
    super(props);
    this.filter = '';
    this.entity = '';
    if (props.name !== undefined) {
      this.filter = props.name;
    }
    if (props.options !== null) {
      this.entity = props.options.value ? props.options.value : this.entity;
    }

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: '',
      filterName: this.filter,
      entity: this.entity,
      results: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    console.log(e.value);
    if (this.state.entity === 'orquesta') {
      const { suggestions } = this.props;
      console.log(e.value);
      const userInput = e.value;

      console.log('tipofiltro:', this.state.filterName);
      if (e.value === '') {
        this.setState({
          results: [],
        });
      }
      if (e && e.value !== '') {
        const url = `/api/${
          this.state.entity
        }-list/?${
          this.state.filterName
        }=${
          e.value
        }&page=1`;
        console.log(url);
        axios
          .get(url)
          .then((response) => {
            console.log(response.data.results);
            this.setState({
              results: response.data.results,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        userInput: e.value,
      });
      const { value } = e;
      if (this.props.onChange) {
        this.props.onChange(this.props.name, value);
      }
    } else {   
      const { value } = e;
      if (this.props.onChange) {
        this.props.onChange(this.props.name, value);
      }
    }
  }

  render() {
    return (
      <>
        <Input type="text" onChange={this.onChange} className="form-control" />
        <Suggestions results={this.state.results} />
      </>
    );
  }
}

export default TextFilter;
