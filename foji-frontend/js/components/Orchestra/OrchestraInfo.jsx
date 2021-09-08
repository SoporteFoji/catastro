/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import CoverPhoto from './CoverPhoto.jsx';
import CoverOverlay from './CoverOverlay.jsx';
import OrchestraTitle from './OrchestraTitle.jsx';
import OrchestraType from './OrchestraType.jsx';
import OrchestraRRSS from './OrchestraRRSS.jsx';
import OrchestraLocation from './OrchestraLocation.jsx';
import OrchestraDates from './OrchestraDates.jsx';
import StatusButton from '../StatusButton.jsx';
import EditButton from './EditButton.jsx';
import DeleteButton from './DeleteButton.jsx';

class OrchestraInfo extends Component {
  // eslint-disable-next-line camelcase
  adminPanel(usertype, code, is_active, orchestra_id) {
    if (usertype === 'administrator') {
      return (
        <div id="admin-panel" className="full-box text-secondary py-3 gray-50">
          <div>
            <span>
              Código:
              {' '}
              {code}
            </span>
          </div>
          <StatusButton is_active={is_active} orchestra_id={orchestra_id} />
        </div>
      );
    }
    return null;
  }

  render() {
    console.log(this.props.canDel);
    const editButton = this.props.canEdit ? <EditButton onClick={this.props.onClick} /> : null;
    const delButton = this.props.canDel ? <DeleteButton onClick={this.props.onClick} orchestra_id={this.props.orchestra_id} /> : null;

    return (
      <div className="col-lg-4 text-center pt-4" id="orchestra-info">
        <div className="full-box">
          <div className="tmb-wrapper d-inline-block">
            <CoverPhoto url={this.props.photo} className="tmb-xl" />
            <CoverOverlay />
          </div>
          <OrchestraTitle name={this.props.name} />
          <OrchestraType type={this.props.orchestra_type} />
          <OrchestraRRSS rrss={this.props.social_networks} />
          <div className="bottom-box px-0 pt-0">
            <OrchestraLocation
              region={this.props.region.name}
              province={this.props.province.name}
              city={this.props.city}
              area={this.props.area.name}
            />
            <OrchestraDates
              creation={this.props.creation_date}
              registration={this.props.registration_date}
              updated={this.props.updated_date}
            />
            {editButton}
            {delButton}
          </div>
        </div>
        {this.adminPanel(this.props.userType, this.props.orchestra_code, this.props.is_active, this.props.orchestra_id)}
      </div>
    );
  }
}


export default OrchestraInfo;
