import React, { Component } from 'react';

import axios from 'axios';
import AdministratorInfo from './AdministratorInfo.jsx';
import AdministratorTabs from './AdministratorTabs.jsx';
import AdministratorForm from './AdministratorForm.jsx';
import Spinner from '../Spinner.jsx';
import { getUser, getAdministrator } from '../../utils/get.js';
import {
  cleanOrchestra, cleanMembers, cleanInstitution, cleanFunding,
} from '../../utils/clean.js';
import get_csrf_token from '../../utils/csrf';

let Administrator = {};

class AdministratorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: true,
      saving: true,
      tab: null,
      canEdit: this.props.canEdit,
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.saveData = this.saveData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.checkTab = this.checkTab.bind(this);
    this.checkEmptyValues = this.checkEmptyValues.bind(this);
  }

  checkEmptyValues(data) {
    const emptyValues = [];
    for (const key in data) {
      if (Object.keys(data[key]).length === 0 || !Object.keys(data[key]).length) {
        emptyValues.push(key);
      }
    }
    this.setState({ emptyValues });
  }

  checkTab() {
    const { hash } = window.location;
    let newTab;
    if (hash && this.props.canEdit) {
      switch (hash) {
        case '#integrantes':
          newTab = 'members';
          break;
        case '#sostenedor':
          newTab = 'institution';
          break;
        case '#financiamiento':
          newTab = 'funds';
          break;
        default:
          newTab = 'orchestra';
      }
      this.setState({
        editMode: true,
        tab: newTab,
      });
    }
  }

  componentDidMount() {
    const self = this;
    console.table(this.props);
    axios.get(`/api/administrator/${this.props.administratorId}/`)
      .then((response) => {
        console.table(response);
        Administrator = getAdministrator(response.data);
        self.checkEmptyValues(Administrator);
        self.setState({
          saving: false,
          data: Administrator,
        }, self.checkTab);
      })
      .catch((error) => {
        console.log(error);
        self.setState({ saving: false });
      });
  }

  onDelete(member, role) {
    const members = this.state.data;
    const newMembers = members[role].filter(el => el.id !== member.id);
    members[role] = newMembers;
    this.setState({
      members,
    });
  }

  saveData(data, tab) {
    const self = this;
    self.setState({
      saving: true,
    }, function () {
      let toSave;
      let apiUrl;
      const id = this.state.data.orchestra.orchestra_id;
      switch (data) {
        case 'orchestra':
          toSave = cleanOrchestra(Orchestra[data]);
          apiUrl = `/api/dashboard/administrator/${id}/`;
          break;
        case 'institution':
          toSave = cleanInstitution(Orchestra.institution, Orchestra.legal_representation);
          apiUrl = `/api/v1/dashboard/administrator/${id}/institution/`;
          break;
        case 'legal_representation':
          toSave = cleanInstitution(Orchestra.institution, Orchestra.legal_representation);
          apiUrl = `/api/v1/dashboard/administrator/${id}/institution/`;
          break;
        case 'funding':
          toSave = cleanFunding(Orchestra[data]);
          apiUrl = `/api/v1/dashboard/administrator/${id}/funding/`;
          break;
        default:
          if (data === 'director' || data === 'instructors' || data === 'cast_members') {
            apiUrl = `/api/dashboard/administrator/${id}/members/`;
            const members = {};
            members.director = Orchestra.director;
            members.instructors = Orchestra.instructors;
            members.cast_members = Orchestra.cast_members;
            toSave = cleanMembers(members);
          }
          break;
      }

      /* Choose appropiate method to use depending upon institution and
       * legal_representation */
      let method = function (a, b, c) {
        console.log('patch');
        return axios.patch(a, b, c);
      };

      const { emptyValues } = self.state;
      if (emptyValues.includes(data) && (data === 'institution' || data === 'legal_representation')) {
        method = function (a, b, c) {
          console.log('post');
          return axios.patch(a, b, c);
        };
      }

      method(apiUrl, toSave, {
        headers: {
          'X-CSRFToken': get_csrf_token(),
        },
      })
        .then((response) => {
          location.reload();
        })
        .catch((error) => {
          self.setState({
            saving: false,
            errors: error.response.data,
            tab,
          });
          console.log(error.respose.data);
        });
    });
  }

  onEdit(object, type) {
    Orchestra[type] = object;
  }

  toggleEditMode(e, tab) {
    // toggles edit mode
    // also set saving state to true if there is no event and its called by a function
    if (!tab) {
      tab = 'orchestra';
    }
    if (tab === 'coordinator' || tab === 'director') {
      tab = 'members';
    } else if (tab === 'legal_rep') {
      tab = 'institution';
    }
    this.setState({
      editMode: !this.state.editMode,
      saving: !e ? !this.state.editMode : false,
      tab,
    });
  }

  onSubmit(form, tab) {
    // console.log("submiting form: " + form.id + ", on tab: " + tab);
    if (form) {
      form.submit();
    } else {
      this.saveData();
    }
  }

  render() {
    const edit = this.state.editMode;
    const { saving } = this.state;
    if (saving) {
      return (
        <Spinner />
      );
    // View mode: render Orchestra Info & Tabs
    } if (!edit) {
      return (
        <div className="container mt-3">
          <div className="row" />
        </div>
      );

    // Edit mode: render Orchestra Edit
    } if (edit) {
      return (
        <div className="container mt-3">
          {
            this.state.canEdit ?
            <AdministratorForm
            {...this.state.data}
            tab={this.state.tab ? this.state.tab : ''}
            errors={this.state.errors}
            modal={!!this.state.errors}
            onClick={this.toggleEditMode}
            onSubmit={this.onSubmit}
            onSave={this.saveData}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
          />
            : null
          }
        </div>
      );
    }
  }
}
export default AdministratorProfile;
