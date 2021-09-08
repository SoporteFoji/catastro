import React, { Component } from 'react';

import MemberCard from '../User/MemberCard.jsx';
import TableHeader from '../Tables/TableHeader.jsx';
import TableItem from '../Tables/TableItem.jsx';
import TableEdit from '../Tables/TableEdit.jsx';

class OrchestraMembers extends Component {
  constructor(props){
    super(props);
    this.state = {
      coordinator: {
        first_name: 'Carlos',
        last_name: 'Rodriguez',
        role: 'Profesor de guitarra',
        email: 'carlosrodriguez@gmail.com',
        phone: '+56 9 6254 4412',
        social_id: '7.654.878-5',
        born: '05-12-1970',
      },
      director: {
        first_name: 'Gonzalo',
        last_name: 'Salas',
        instrument: 'Piano',
        email: 'gonzalosalas@gmail.com',
        phone: '+56 9 6842 7254',
        social_id: '7.685.684-7',
        born: '21-05-1980',
      },
      instructors: [
          {name: 'Javiera García', email: 'javieragarcia@gmail.com', instrument: 'Violín', students: '4'},
          {name: 'Marcelo Aldunate', email: 'marceloaldunate@gmail.com', instrument: 'Piano', students: '1'},
      ],
      cast: [
        {name: 'Sergio Poblete', instrument: 'Violín', sex: 'Hombre'},
        {name: 'Magdalena Gutierrez', instrument: 'Piano', sex: 'Mujer'},
        {name: 'Catalina Jara', instrument: 'Violín', sex: 'Mujer'},
        {name: 'Juan Troncoso', instrument: 'Percusión', sex: 'Hombre'},
      ],
      instructor_header: [
        {name: 'Instructores'},
        {name: 'Email'},
        {name: 'Instrumento'},
        {name: 'Alumnos'},
      ],
    }
  }
  render() {
    return (
      <div>
        <div className="full-box mt-0 rounded-top-0">
          <div className="row">
            <MemberCard details={this.state.coordinator} type={'Coordinador'} id={'coordinator'} />
            <MemberCard details={this.state.director} type={'Director'} id={'director'} />
          </div>
        </div>
        <div className="full-box list" id="instructors">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  {
                    this.state.instructor_header.map((th) => {
                      return <TableHeader name={th.name} />
                    })
                  }
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.instructors.map((item) => {
                    return (
                      <tr>
                        <TableItem item={item} type={'instructor-list'} />
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
}


export default OrchestraMembers;
