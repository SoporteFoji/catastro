import React, {Component} from 'react';

class AgeFromDate extends Component {

  render(){
    if(this.props.date.length){
      let date = this.props.date;
      let reg = /^\d+$/;
      let dob = null;
      if(reg.test(date.substring(0, 4))){
        dob = new Date(date.split('/')[0], date.split('/')[1]-1, date.split('/')[2]);
      } else {
        dob = new Date(date.split('/')[2], date.split('/')[1]-1, date.split('/')[0]);
      }
      let today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      return <>{age}</>
    } else {
      return null
    }
  }

}


export default AgeFromDate;