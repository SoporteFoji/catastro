import React, { Component } from 'react';

import FormatDate from '../../utils/FormatDate.js';

class TableDataCustom extends Component {
  constructor(props) {
    super(props);
    this.getCoordinator = this.getCoordinator.bind(this);
    this.getUserContent = this.getUserContent.bind(this);
  }

  getCoordinator() {
    if (this.props.type === 'orchestra-admin') {
      if (this.props.coordinator && Object.keys(this.props.coordinator).length) {
        return (
          <td>
            <span className="d-block">
              {
                `${this.props.coordinator.first_name.length ? this.props.coordinator.first_name : ''} ${
                  this.props.coordinator.last_name.length ? this.props.coordinator.last_name : ''}`
              }
            </span>
            <a href={`mailto: ${this.props.coordinator.email}`} className="d-block">{this.props.coordinator.email}</a>
          </td>
        );
      }
      return <td />;
    }
    return null;
  }

  getDate() {
    return (
      <>
        <td>
          <span className="d-block">
            Registro:
            {this.props.registered ? FormatDate(this.props.registered) : ''}
          </span>
          <span className="d-block">
            Actualizado:
            {this.props.updated ? FormatDate(this.props.updated) : ''}
          </span>
        </td>
      </>
    );
  }

  getSocialId() {
    return (
      <>
        <td>
          <span className="d-block">{this.props.personal_information ? this.props.personal_information.social_id : ''}</span>
        </td>
      </>
    );
  }

  getDataAdmin() {
    return (
      <>
      <td>{this.props.user.username}
      </td>
      <td>{this.props.user.email}
      </td>
      </>
    );
  }

  getContact() {
    return (
      <>
        <td>
          <a href={`mailto: ${this.props.personal_information ? this.props.personal_information.email : ''}`} className="d-block">
            {(this.props.personal_information ? this.props.personal_information.email : '')}
          </a>
          <a href={`tel: ${this.props.personal_information ? this.props.personal_information.phone_number_mobile : ''}`} className="d-block">
            {(this.props.personal_information ? this.props.personal_information.phone_number_mobile : '')}
          </a>
        </td>
      </>
    );
  }

  getInstructor() {
    return (
      <>
        <td>
          <span className="d-block">{this.props.instrument ? this.props.instrument : ''}</span>
          <span className="d-block">{`Alumnos: ${this.props.students ? this.props.students : ''}`}</span>
        </td>
      </>
    );
  }

  getInstrument() {
    return (
      <>
        <td>
          <span className="d-block">{this.props.instrument ? this.props.instrument : ''}</span>
        </td>
      </>
    );
  }

  getGender() {
    return (
      <>
        <td>
          <span className="d-block">
            {(this.props.personal_information.gender === 'M' ? 'Hombre' : '') || (this.props.personal_information.gender === 'F' ? 'Mujer' : '')}
          </span>
        </td>
      </>
    );
  }

  getOrchestras() {
    return (
      <>
        <td>
          {this.props.orchestras.map((orchestra, i) => {
            if (orchestra) {
              return (
                <a
                  key={`orchestra-link-${i}-${orchestra.id}`}
                  href={(`/orquesta/${orchestra.id}/`)}
                  className="text-muted d-block"
                >
                  {orchestra.name}
                </a>
              );
            }
            return <span key={`no-orchestras-${i}`} className="text-muted">Sin orquestas</span>;
          })}
        </td>
      </>
    );
  }

  getOrchestra() {
    const { orchestra } = this.props;
    if (orchestra) {
      return (
        <>
          <td>
            <a href={(`/orquesta/${this.props.orchestra.id}/`)} className="text-muted d-block">{orchestra.name}</a>
          </td>
        </>
      );
    }


    return (
      <>
        <td>
          <span className="text-muted">Sin orquesta</span>
        </td>
      </>
    );
  }

  getUserContent() {
    console.log('hollaaa');
    console.log(this.props.role);
    switch (this.props.role) {
      case 'coordinator':
        return (
          <>
            {this.getOrchestras()}
            {this.getDate()}
            {this.getContact()}
            {this.getSocialId()}
          </>
        );
      case 'administrator':
        return (
          <>
            {this.getDate()}
            {this.getContact()}
          </>
        );
      case 'director':
        return (
          <>
            {this.getOrchestra()}
            {this.getContact()}
            {this.getSocialId()}
          </>
        );
      case 'instructor':
        return (
          <>
            {this.getOrchestra()}
            {this.getContact()}
            {this.getInstructor()}
            {this.getSocialId()}
          </>
        );
      case 'cast_member':
        return (
          <>
            {this.getOrchestra()}
            {this.getInstrument()}
            {this.getContact()}
            {this.getGender()}
            {this.getSocialId()}
          </>
        );
      case 'administrator-admin':
        console.log('entra a administrator-admin');
        return (
          <>
            {this.getDataAdmin()}
          </>
        );
      default:
        break;
    }
  }

  render() {
    // render a user

    return (
      <>
        {this.getUserContent()}
      </>
    );
  }
}
export default TableDataCustom;
