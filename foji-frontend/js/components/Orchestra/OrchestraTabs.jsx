import React, { Component } from 'react';

import TabsNavigation from '../Tabs/TabsNavigation.jsx';
import TabContent from '../Tabs/TabContent.jsx';
import MemberCard from '../User/MemberCard.jsx';
import Instructors from './Instructors.jsx';
import Cast from './Cast.jsx';
import TableSingle from '../Tables/TableSingle.jsx';
import Funds from '../Funds.jsx';

class OrchestraTabs extends Component {
  constructor(props){
    super(props);
    this.props = props;
    console.log(this.props.idOrchestra);
    console.table(this.props);
    this.state = {
      currentTab: 'members',
      tabs: [
        {name: 'Integrantes', id: 'members'},
        {name: 'Sostenedor', id: 'institution'},
        {name: 'Financiamiento', id: 'funds'},
      ],
    }
    this.changeTab = this.changeTab.bind(this);
  } 
  changeTab(e){
    // This'll trigger on a tab link click
    e.preventDefault();
    if(e.currentTarget.id !== this.state.currentTab){
      this.setState({currentTab: e.currentTarget.id})
    }
    
  } 
  render() {
    return (
      <div className="col-lg-8 orchestra-tabs"> 
        <TabsNavigation tabs={this.state.tabs} current={this.state.currentTab} onClick={this.changeTab} />
        <TabContent name={'members'} current={this.state.currentTab} > 

          {/* COORDINATOR & DIRECTOR */}
          <div className="full-box mt-0 rounded-top-0">
            <div className="row members-row">
              <MemberCard 
                details={this.props.coordinator} 
                right={'Coordinador'} 
                type={'coordinator'} 
                onClick={this.props.onClick} 
                canEdit={this.props.canEdit} 
                isStaff={this.props.isStaff} 
                orchestraId={this.props.idOrchestra}
              />
              <MemberCard 
                details={this.props.director} 
                right={'Director'} 
                type={'director'} 
                onClick={this.props.onClick} 
                canEdit={this.props.canEdit} 
              />
            </div>
          </div>

          {/* INSTRUCTORS */}
          <Instructors edit={this.props.canEdit}>
            {this.props.instructors.map((instructor, i) => {
                return  <TableSingle key={"instructor-" + i} data={instructor} role="instructors" />
              }
            )}
          </Instructors>

          {/* CAST */}
          <Cast edit={this.props.canEdit}>
            {this.props.cast_members.map((member, i) => {
                return  <TableSingle key={"cast-member-" + i} data={member} role="cast_members" />
              }
            )}
          </Cast>
        </TabContent>

        {/* INSTITUTION & LEGAL REP */}
        <TabContent name={'institution'} current={this.state.currentTab} > 
          <div className="full-box mt-0 rounded-top-0">
            <div className="row members-row">
              <MemberCard 
                details={this.props.institution} 
                icon={'institution'} 
                role={'Institución Sostenedora'} 
                type={'institution'} 
                onClick={this.props.onClick} 
                canEdit={this.props.canEdit}
              />
              <MemberCard 
                details={this.props.legal_rep} 
                role={'Representante Legal'} 
                type={'legal_rep'} 
                onClick={this.props.onClick} 
                canEdit={this.props.canEdit}
              />
            </div>
          </div>
        </TabContent>

        {/* FUNDS */}
        <TabContent name={'funds'} current={this.state.currentTab} > 
          <div className="full-box mt-0 rounded-top-0">
            <Funds funds={this.props.funding}  onClick={this.props.onClick} canEdit={this.props.canEdit} />
          </div>
        </TabContent>
      </div>
    );
  };
}

export default OrchestraTabs;
