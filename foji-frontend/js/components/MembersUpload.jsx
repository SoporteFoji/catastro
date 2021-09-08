import React, { Component } from 'react';
import axios from 'axios';
import MembersEdit from './Edit/MembersEdit.jsx';
import { getOrchestra } from '../utils/get.js';
import { cleanMembers } from '../utils/clean.js';
import get_csrf_token from '../utils/csrf';

let Orchestra;

class MembersUpload extends Component {
  constructor(props){
    super(props);

    this.state = {
      saving: true,
      director: {},
      instructors: [],
      cast_members: [],
    }

    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onMemberDelete = this.onMemberDelete.bind(this);
    this.saveData = this.saveData.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentDidMount(){
    const self = this;
    axios.get('/api/orchestras/' + this.props.orchestra_id + '/')
      .then( function (response) {
        Orchestra = getOrchestra(response.data);
        self.setState({
          saving: false,
          director: Orchestra.director,
          instructors: Orchestra.instructors,
          cast_members: Orchestra.cast_members,
        })
      })
      .catch(function (error) {
        console.log(error);
        self.setState({saving: false})
      });
  }
  onChange(e, type){

    // if e is an event, change it for the target
    if(e.target){
      e = e.target;
    }
    let id = e.form.id;
    let object = this.state[e.form.id];
    object[e.name] = e.value;   

    this.setState({
      edited: id,
    }, function(){
      Orchestra[type] = object;
    })
  }
  onMemberDelete(member, role){
    let members = this.state[role];
    let newMembers = members.filter(el => el.id !== member.id);
    Orchestra[role] = newMembers;
    this.setState({
      edited: role,
      instructors: Orchestra.instructors,
      cast_members: Orchestra.cast_members,
    })
  }
  onEdit(object, type){
    this.setState({
      edited: type,
    }, function(){
      Orchestra[type] = object;
    })
  }
  onSave(){
    let edited = this.state.edited; 
    if(edited.length){
      this.setState({
        edited: '',
        modal: false,
      }, function(){
        this.saveData(edited);
      })
    }  
  }
  saveData(data){
    let self = this;
    self.setState({
        saving: true,
    }, function(){
      let toSave;
      let apiUrl = '/api/dashboard/orchestras/' + this.props.orchestra_id + '/members/';
      let members = {};
      members.director = Orchestra.director;
      members.instructors = Orchestra.instructors;
      members.cast_members = Orchestra.cast_members;
      toSave = cleanMembers(members);
      axios.patch(apiUrl, toSave, {
          headers: {
            'X-CSRFToken': get_csrf_token(),
          }
        })
      .then(function(response){ 
        location.href = '/orquesta/' + self.props.orchestra_id + '/';
      })
      .catch(function(error){
        if(error.response){
          self.setState({
            saving: false,
            errors: error.response.data,
          })
        }
        console.log(error);
      });
    })
    
  }
  render() {
    return (
      <>
        <MembersEdit
          register
          orchestra_id={this.props.orchestra_id}
          director={this.state.director}
          instructors={this.state.instructors}
          cast_members={this.state.cast_members}
          errors_director={this.state.errors !== undefined ? this.state.errors.director : null}
          errors_instructors={this.state.errors !== undefined ? this.state.errors.instructors : null}
          errors_cast_members={this.state.errors !== undefined ? this.state.errors.cast_members : null}
          onEdit={this.onEdit}
          onDelete={this.onMemberDelete}
          onChange={this.onChange}
        />
        <div className="alert alert-info">
          <div className="row">
            <div className="col-sm-6 text-center text-sm-left mb-3 mb-sm-0">
              <a href="/dashboard/" className="btn btn-light">Cancelar</a>
            </div>
            <div className="col-sm-6 text-center text-sm-right">
              <button className="btn btn-primary" type="button" onClick={this.onSave} >Enviar</button>
            </div>
          </div>
        </div>
      </>
    );
  };
}

export default MembersUpload;
