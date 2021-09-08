import React, { Component } from 'react';

import TabsNavigation from '../Tabs/TabsNavigation.jsx';
import TabContent from '../Tabs/TabContent.jsx';
import OrchestraRegistrationForm from '../OrchestraRegistrationForm.jsx';
import MembersEdit from './MembersEdit.jsx';
import InstitutionRegistrationForm from '../InstitutionRegistrationForm.jsx';
import AddFundingComponent from '../AddFundingComponent/FundingAdd.jsx';
import Modal from '../Modal.jsx';
import { validateOrchestra, validateMembers, validateInstitution } from '../../utils/validate.js';

class OrchestraEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    if (props.orchestra.orchestra_id > 0) {
      this.state = {
        currentTab: this.props.tab || 'orchestra',
      edited: '',
      modal: this.props.modal || false,
      error: this.props.errors ? 'error' : '',
      errors: this.props.errors || null,
        tabs: [
          { name: 'Orquesta', id: 'orchestra' },
          { name: 'Integrantes', id: 'members' },
          { name: 'Sostenedor', id: 'institution' },
          { name: 'Financiamiento', id: 'funds' },
        ],
      };
    } else {
      this.state = {
        currentTab: this.props.tab || 'orchestra',
      edited: '',
      modal: this.props.modal || false,
      error: this.props.errors ? 'error' : '',
      errors: this.props.errors || null,
        tabs: [
          { name: 'Orquesta', id: 'orchestra' }
        ],
  
      };
    }
    // Stores all forms on a map
    this.forms = new Map();
    this.changeTab = this.changeTab.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onMemberDelete = this.onMemberDelete.bind(this);
    this.onFundAdd = this.onFundAdd.bind(this);
    this.onFundDelete = this.onFundDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.getForm = this.getForm.bind(this);
  }

  onChange(e, type) {
    // if e is an event, change it for the target
    if (e.target) {
      e = e.target;
    }
    let { id } = e.form;
    let object = this.props[e.form.id];
    // type is for special inputs
    if (type) {
      switch (type) {
        case 'social_networks':
          const targetSN = e.name.substring(e.name.indexOf('-') + 1);
          object[type][targetSN] = e.value;
          break;
        case 'region':
          object[type].id = e.value;
          object.area.id = e.form.elements.area.value;
          break;
        case 'area':
          object[type].id = e.value;
          break;
        case 'legal_representation':
          object = this.props[type];
          id = type;
          object[e.name] = e.value;
          break;
        case 'photo':
          object.photo = e.photo;
          break;
      }
    } else {
      object[e.name] = e.value;
    }

    this.setState({
      edited: id,
    }, function () {
      this.props.onEdit(object, id);
    });
  }

  onFundAdd(values) {
    const funding = [];
    values.map((fund) => {
      funding.push(fund);
    });
    this.setState({
      edited: 'funding',
    }, function () {
      this.props.onEdit(funding, 'funding');
    });
  }

  onFundDelete(values) {
    this.setState({
      edited: 'funding',
    }, function () {
      this.props.onEdit(values, 'funding');
    });
  }

  onMemberDelete(member, role) {
    this.setState({
      edited: role,
    }, function () {
      this.props.onDelete(member, role);
    });
  }

  onEdit(object, type) {
    this.setState({
      edited: type,
    }, function () {
      this.props.onEdit(object, type);
    });
  }

  onCrear() {
    //console.log(this.props.orchestra);
   
  }

  onSave() {
    if (this.props.orchestra.orchestra_id > 0) {
      if (this.validateForms(this.state.currentTab)) {
        const { edited } = this.state;
        if (edited.length) {
          this.setState({
            edited: '',
            modal: false,
          }, function () {
            this.props.onSave(edited, this.state.currentTab);
          });
        }
      } else {
        this.setState({
          modal: true,
          error: 'error',
        });
      }
    } else {
      this.setState(function () {
        this.props.onCrear(this.props.orchestra);
      });
    }
    
  }

  validateForms(tab) {
    let valid = [];
    if (this.forms[tab] && this.forms[tab] !== undefined) {
      const inputs = this.forms[tab].querySelectorAll('input, select');
      switch (tab) {
        case 'orchestra':
          valid = validateOrchestra(inputs);
          break;
        case 'members':
          valid = validateMembers(inputs);
          break;
        case 'institution':
          valid = validateInstitution(inputs);
          break;
        default:
          valid.validated = true;
      }
    } else if (tab === 'funds') {
      valid.validated = true;
    }


    if (valid.validated) {
      return true;
    }
    this.setState({
      errors: valid.errors,
    }, () => false);
  }

  getForm(form) {
    this.forms.members = form;
  }

  changeTab(e) {
    // This'll trigger on a tab link click
    e.preventDefault();
    if (e.currentTarget.id !== this.state.currentTab) {
      if (this.state.edited) {
        this.setState({
          modal: true,
          error: 'save needed',
        });
      } else {
        this.setState({ currentTab: e.currentTarget.id });
      }
    }
  }

  showModal() {
    if (this.state.modal) {
      if (this.state.error === 'save needed') {
        return (
          <Modal
            title="Cambios no aplicados"
            onCloseModal={() => this.setState({ modal: false })}
            onSubmit={this.onSave}
            size="sm"
            center
          >
            <div className="p-3">
              Hay cambios que no estan guardados.
              <br />
              ¿Deseas guardarlos ahora?
            </div>
          </Modal>
        );
      } if (this.state.error === 'error') {
        return (
          <Modal
            title="Errores en Formulario"
            onCloseModal={() => this.setState({ modal: false })}
            onSubmit={() => this.setState({ modal: false })}
            buttonTitle="Aceptar"
            size="md"
            center
          >
            <div className="p-3">
              <p>Hay uno o más errores en la información enviada.</p>
              <p>Revisa los campos con errores e intenta guardar nuevamente.</p>
            </div>
          </Modal>
        );
      }
    } else {
      return null;
    }
  }

  showSave(edited) {
    if (edited.length) {
      return (
        <button className="btn btn-primary" type="button" onClick={this.onSave}>Guardar Cambios</button>
      );
    }
    return null;
  }

  cancelEdit() {
    location.hash = '';
    location.reload();
  }

  enviarFormulario() {
    console.log(this.forms.orchestra.value);
    console.table(this.state);
  }
  render() {
    return (
      <>
        { this.showModal(this.state.error) }
        <div className="orchestra-tabs">
          <div className="alert alert-info">
            <div className="row">
              <div className="col-sm-6 text-center text-sm-left mb-3 mb-sm-0">
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={
                  // Toggles edit mode this.props.onClick
                  e => this.cancelEdit()}
                >
                  Cancelar
                </button>
              </div>
              <div className="col-sm-6 text-center text-sm-right">
                {this.showSave(this.state.edited)}

              </div>
            </div>
          </div>

          <TabsNavigation tabs={this.state.tabs} current={this.state.currentTab} onClick={this.changeTab} />

          {/* Orchestra form */}
          <TabContent name="orchestra" current={this.state.currentTab}>
            <div className="full-box rounded-top-0 mt-0">
              <div className="box-content">
                <form method="POST" action="" id="orchestra" ref={(form) => { this.forms.orchestra = form; }}>
                  <OrchestraRegistrationForm
                    orchestra_id={this.props.orchestra.orchestra_id}
                    name={this.props.orchestra.name}
                    orchestra_type={this.props.orchestra.orchestra_type}
                    orchestra_status={this.props.orchestra.orchestra_status}
                    region={this.props.orchestra.region}
                    area={this.props.orchestra.area}
                    city={this.props.orchestra.city}
                    creation_date={this.props.orchestra.creation_date}
                    photo={this.props.orchestra.photo}
                    rrss={this.props.orchestra.social_networks}
                    website={this.props.orchestra.website}
                    errors={this.state.errors ? this.state.errors : null}
                    onChange={this.onChange}
                  />
                </form>
              </div>
            </div>
          </TabContent>

          <TabContent name="coordinator" current={this.state.currentTab}>
            <MembersEdit
              coordinator={this.props.coordinator}
              director={this.props.director}
              instructors={this.props.instructors}
              cast_members={this.props.cast_members}
              orchestra_id={this.props.orchestra.orchestra_id}
              errors_coordinator={this.props.errors !== undefined ? this.props.errors.coordinator : null}
              errors_director={this.props.errors !== undefined ? this.props.errors.director : null}
              errors_instructors={this.props.errors !== undefined ? this.props.errors.instructors : null}
              errors_cast_members={this.props.errors !== undefined ? this.props.errors.cast_members : null}
              errors={this.state.errors || null}
              onEdit={this.onEdit}
              onDelete={this.onMemberDelete}
              onChange={this.onChange}
              getForm={this.getForm}
            />
          </TabContent>



          {/* Members form */}
          <TabContent name="members" current={this.state.currentTab}>
            <MembersEdit
              coordinator={this.props.coordinator}
              director={this.props.director}
              instructors={this.props.instructors}
              cast_members={this.props.cast_members}
              orchestra_id={this.props.orchestra.orchestra_id}
              errors_coordinator={this.props.errors !== undefined ? this.props.errors.coordinator : null}
              errors_director={this.props.errors !== undefined ? this.props.errors.director : null}
              errors_instructors={this.props.errors !== undefined ? this.props.errors.instructors : null}
              errors_cast_members={this.props.errors !== undefined ? this.props.errors.cast_members : null}
              errors={this.state.errors || null}
              onEdit={this.onEdit}
              onDelete={this.onMemberDelete}
              onChange={this.onChange}
              getForm={this.getForm}
            />
          </TabContent>

          {/* Institution form */}
          <TabContent name="institution" current={this.state.currentTab}>
            <div className="full-box rounded-top-0 mt-0">
              <div className="box-content">
                <form method="POST" action="" id="institution" ref={(form) => { this.forms.institution = form; }}>
                  <InstitutionRegistrationForm
                    institution={this.props.institution}
                    legal_rep={this.props.legal_representation}
                    errors={this.props.errors !== undefined ? this.props.errors.institution : (this.state.errors ? this.state.errors : '')}
                    onChange={this.onChange}
                  />
                </form>
              </div>
            </div>
          </TabContent>

          {/* Funds form */}
          <TabContent name="funds" current={this.state.currentTab}>
            <div className="full-box box-form container my-0 rounded-top-0">
              <div className="box-title">
                <h4>Financiamiento de la Orquesta</h4>
              </div>
              <div className="box-content mt-4 mb-4">
                <AddFundingComponent
                  funds={this.props.funding}
                  errors={this.props.errors !== undefined ? this.props.errors.funding : null}
                  onAdd={this.onFundAdd}
                  onDelete={this.onFundDelete}
                />
              </div>
            </div>
          </TabContent>
          <div className="alert alert-info">
            <div className="row">
              <div className="col-sm-6 text-center text-sm-left mb-3 mb-sm-0">
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={
                  // Toggles edit mode this.props.onClick
                  e => this.cancelEdit()}
                >
                  Cancelar
                </button>
              </div>
              <div className="col-sm-6 text-center text-sm-right">
                {this.showSave(this.state.edited)}

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default OrchestraEdit;
