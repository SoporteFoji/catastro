import React, { Component } from 'react';

import FormatDate from '../../utils/FormatDate.js';

class TableData extends Component {
  constructor(props) {
    super(props);
    this.getCoordinator = this.getCoordinator.bind(this);
    this.getUserContent = this.getUserContent.bind(this);
    this.getRegionContent = this.getRegionContent.bind(this);
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

  getRegionContent() {
    if (this.props.role === 'region-admin') {
      return (
        <td>
          <span className="d-block">
            {
              `${this.props.code ? this.props.code : ''} `
            }
          </span>
        </td>
      );
    }
    return null;
  }
  getProvinciaContent() {
    if (this.props.role === 'provincia-admin') {
      return (
        <td>
          <span className="d-block">
            {
              `${this.props.code ? this.props.code : ''} `
            }
          </span>
        </td>
      );
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
        break;
      case 'administrator':
        return (
          <>
            {this.getDate()}
            {this.getContact()}
          </>
        );
        break;
      case 'director':
        return (
          <>
            {this.getOrchestra()}
            {this.getContact()}
            {this.getSocialId()}
          </>
        );
        break;
      case 'instructor':
        return (
          <>
            {this.getOrchestra()}
            {this.getContact()}
            {this.getInstructor()}
            {this.getSocialId()}
          </>
        );
        break;
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
        break;
        case 'region-admin':
          return ( <>
            {this.getRegionContent()}
          </>
          );
          break;
          case 'provincia-admin':
            return ( <>
              {this.getProvinciaContent()}
            </>
            );
            break;
            
    }
  }

  render() {
    // render a user
    if (this.props.role) {
      return (
        <>
          {this.getUserContent()}
        </>
      );
    // render an orchestra
    }
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
        {this.getCoordinator()}
        <td>
          <span className="d-block">{this.props.members_count ? this.props.members_count : 0}</span>
        </td>
        <td>
          <span className="d-block">
            {this.props.region ? this.props.region.name : ''}
            ,
            {' '}
            {this.props.province ? this.props.province.name : ''}
          </span>
          <span className="d-block">
            {this.props.city || ''}
            ,
            {' '}
            {this.props.area ? this.props.area.name : ''}
          </span>
        </td>
        <td>
          <span className="warp-pre">{this.props.institution ? this.props.institution.name : ''}</span>
        </td>
      </>
    );
  }
}
export default TableData;
