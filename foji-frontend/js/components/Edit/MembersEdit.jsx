import React, { Component } from 'react';

import CoordinatorRegistrationFormulario from '../CoordinatorRegistrationFormulario.jsx';
import DirectorRegistrationForm from '../DirectorRegistrationForm.jsx';
import InstructorRegistrationForm from '../InstructorRegistrationForm.jsx';
import CastRegistrationForm from '../CastRegistrationForm.jsx';
import Instructors from '../Orchestra/Instructors.jsx';
import Cast from '../Orchestra/Cast.jsx';
import TableSingle from '../Tables/TableSingle.jsx';
import Modal from '../Modal.jsx';
import ExcelUpload from '../ExcelUpload.jsx';
import NewGuid from '../../utils/guid.js';

class MembersEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      editType: null,
      edited: [],
      errors: null,
    };
    this.memberForm = new Map();
    this.onEdit = this.onEdit.bind(this);
    this.getModal = this.getModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onChanges = this.onChanges.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  getModal() {
    if (this.state.editing) {
      let formType = null;
      const member = this.state.editing;
      if (this.state.editType === 'instructors') {
        formType = (
          <form onSubmit={this.onSubmit} name="instructors">
            <Modal id="instructor" title="Editando Instructor" onCloseModal={this.onCloseModal} button="Aplicar" size="lg">
              <InstructorRegistrationForm
                first_name={member.first_name || ''}
                last_name={member.last_name || ''}
                social_id={member.social_id || ''}
                email={member.email || ''}
                phone={member.phone_number_mobile || ''}
                instrument={member.instrument || ''}
                students={member.students || ''}
                born={member.birth_date || ''}
              />
            </Modal>
          </form>
        );
      } else if (this.state.editType === 'cast_members') {
        formType = (
          <form onSubmit={this.onSubmit} name="cast_members">
            <Modal id="cast" title="Editando Integrante" onCloseModal={this.onCloseModal} button="Aplicar" size="lg">
              <CastRegistrationForm
                first_name={member.first_name || ''}
                last_name={member.last_name || ''}
                social_id={member.social_id || ''}
                email={member.email || ''}
                phone={member.phone_number_mobile || ''}
                instrument={member.instrument || ''}
                gender={member.gender || ''}
                born={member.birth_date || ''}
              />
            </Modal>
          </form>
        );
      }
      return formType;
    }
    return null;
  }

  // Get form
  onSubmit(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select');
    const submited = {};
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name !== 'day' && inputs[i].name !== 'month' && inputs[i].name !== 'year') {
        if (inputs[i].name === 'gender') {
          submited[inputs[i].name] = (inputs[i].value === 'Hombre' ? 'M' : '') || (inputs[i].value === 'Mujer' ? 'F' : '');
        } else {
          submited[inputs[i].name] = inputs[i].value;
        }
      }
    }
    // submited.name = submited.first_name + ' ' + submited.last_name;
    const currentInfo = this.props[e.target.name].filter(member => member.id === this.state.editingId);
    if (currentInfo.length) {
      submited.id = currentInfo[0].id;
    } else if (this.state.editing === 'new') {
      submited.id = this.state.editingId;
    }
    this.saveData(submited, e.target.name);
  }

  // Get array of current members, add or modify and send info to parent
  saveData(member, role) {
    const currentMembers = this.props[role];
    let index = currentMembers.findIndex(info => info.id === member.id);
    if (index === -1) {
      index = currentMembers.length;
    }
    currentMembers[index] = member;
    this.props.onEdit(currentMembers, role);
    this.onCloseModal();
  }

  onEdit(member, role) {
    this.setState({
      editing: member || 'new',
      editType: role,
      editingId: member.id || NewGuid(),
    });
  }

  onCloseModal() {
    this.setState({
      editing: null,
      editType: null,
    });
  }

  onChanges() {
    const { edited } = this.state;
    const { editing } = this.state;
    const totalEdits = edited.push(editing);
    this.setState({
      edited: totalEdits,
    });
    this.onCloseModal();
  }

  componentDidMount() {

  }

  render() {
    return (
      <>
        { this.getModal() /* show modal */}

        <div className="full-box rounded-top-0 mt-0">
          <div className="box-title">
            <h4>Excel de Integrantes</h4>
          </div>
          <div className="box-content">
            <div className="alert alert-secondary mt-4 mb-2 text-center">
              Presiona
              {' '}
              <b>"Bajar plantilla Excel"</b>
              {' '}
              para descargar un archivo Excel con los integrantes actuales de la orquesta.
              <br />
              En este documento podrás llenar o modificar datos y subirlo haciendo click en
              {' '}
              <b>"Subir plantilla llenada"</b>
              .
            </div>
            <ExcelUpload url={`/orquesta/${this.props.orchestra_id}/integrantes.xlsx`} orchestra_id={this.props.orchestra_id} />
          </div>
        </div>
        <div className="full-box">
          

        </div>
        <div className="full-box">
          <div className="box-title">
            <h4>{this.props.register ? 'Registrar Director' : 'Editar Director'}</h4>
          </div>
          <div className="box-content">
            <form id="director" ref={this.props.getForm ? (form) => { this.props.getForm(form); } : null}>
              <DirectorRegistrationForm
                {...this.props.director}
                errors={this.props.errors_director ? this.props.errors_director : (this.props.errors || '')}
                onChange={this.props.onChange}
              />
            </form>
          </div>

        </div>

        <Instructors onEdit={this.onEdit} edit>
          {this.props.instructors.map((instructor, i) => (
            <TableSingle
              key={i}
              data={instructor}
              onEdit={this.onEdit}
              onDelete={this.props.onDelete}
              errors={this.props.errors_instructors || ''}
              role="instructors"
              edit
            />
          ))}
        </Instructors>

        <Cast onEdit={this.onEdit} edit>
          {this.props.cast_members.map((member, i) => (
            <TableSingle
              key={i}
              data={member}
              onEdit={this.onEdit}
              onDelete={this.props.onDelete}
              errors={this.props.errors_cast_members || ''}
              role="cast_members"
              edit
            />
          ))}
        </Cast>
      </>
    );
  }
}

export default MembersEdit;
