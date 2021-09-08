import React, { Component } from 'react';
import axios from 'axios';
import { getExampleUserList, getUserList } from '../../utils/get.js';
import FormatDate from '../../utils/FormatDate.js';

let Users;

class LatestUsers extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: [],
    }

    this.getUsers = this.getUsers.bind(this);
  }
  componentDidMount(){
    const self = this;
    axios.get('/api/v1/coordinators/latest/')
    .then(function(response){
      Users = getUserList(response.data);
        self.setState({
          users: Users,
        })

    })
    .catch(function(error){
      console.log(error);
    });
  }
  getUsers(){
    let users = this.state.users;
    return users.map((user) => {
      return(
        <li key={"user-" + user.id} className="px-3 py-2">
          <div className="icon user-icon"></div>
          <div className="d-inline-block ml-3">
            <span className="text-dark" >
              {
                (user.personal_information ? user.personal_information.first_name : '') + ' ' +
                (user.personal_information ? user.personal_information.last_name : '')
              }
            </span>
            <span className="text-secondary">{' - ' + (user.type === 'coordinator' ? 'Coordinador' : 'Administrador')}</span>
            <a className="text-secondary d-block" href={'mailto:' + (user.personal_information ? user.personal_information.email : '')} >
              <i>{user.personal_information ? user.personal_information.email : ''}</i>
            </a>
            <span className="d-block text-secondary">Registrado: <i>{user.registered ? FormatDate(user.registered) : ''}</i></span>
          </div>
        </li>
      )
    });
  }
  render() {
    return (
      <div id="latest-users-widget" className="">
        <div className="full-box">
          <div className="box-title py-3">
            <span className="text-secondary">Últimos Coordinadores Registrados</span>
          </div>
          <ul className="mx-0 px-0">
            { this.getUsers() }
          </ul>
          <div className="bottom-box text-center">
            <a href="/usuarios/" className="btn btn-info">
              Ver Todos
            </a>
          </div>
        </div>
      </div>
    );
  };
}


export default LatestUsers;
