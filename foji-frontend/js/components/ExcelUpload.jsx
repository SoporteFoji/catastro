import React, { Component } from 'react';
import axios from 'axios';
import { valid_error_object, translate_field_name, errorItem } from '../utils/excelUploadUtils.jsx';
import get_csrf_token from '../utils/csrf';
import Modal from './Modal.jsx';

class ExcelUpload extends Component {
  constructor(props){
    super(props);

    this.state = {
      modal: false,
      errors: [],
    }

    this.uploadInput = React.createRef();
    this.submit = React.createRef();
    this.myRef = React.createRef();

    this.fileSelected = this.fileSelected.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  uploadFile(file){
    let self = this;
    let formData = new FormData();
    formData.append("file", file);
    axios.post('/api/v1/orchestras/' + self.props.orchestra_id + '/excel/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': get_csrf_token(),
          }
        })
      .then(function(response){  
        console.log(response);
        if(valid_error_object(response.data.director) || valid_error_object(response.data.instructors) || valid_error_object(response.data.cast_members)){
          console.log("valid error detected");

            for (let key in response.data){
              if(valid_error_object(response.data[key])){
                let errorArray = [];
                const tab = translate_field_name(key);
                response.data[key].forEach((error) => {
                  const row = error.row;
                  const errors = error.error;
                  errorArray.push({ 'row': error.row, 'errors': error.error })
                  console.log(errorArray);
                })
                self.showExcelErrors(errorArray, tab);
              } 
            }


        } else {
          location.href = "/orquesta/" + self.props.orchestra_id;
        }   
      })
      .catch(function(error){
        console.log(error);
      });
  }
  showExcelErrors(errors, tab){
    let fieldName;
    let newError;
    let errorsArray = [];
    errors.forEach((error) => {
      for (let field in error.errors){
        fieldName = translate_field_name(field);
        newError = { 'field': fieldName, 'tab': tab, 'row': error.row, 'errors':  error.errors[field]}
        errorsArray.push(newError);
      }
    })    
    console.log(errorsArray);
    this.setState({
      errors: errorsArray,
      modal: true,
    })

  }
  showModal(){
    if(this.state.modal){
      return(
        <Modal title='Errores en Excel' 
          onCloseModal={() => this.setState({ modal: false })} 
          onSubmit={() => this.setState({ modal: false })}
          buttonTitle="Aceptar"
          size="lg" center scrollable>
          <div className="p-3">
            <div className="m-2">{ this.listErrors() }</div>
          </div>
        </Modal>
      );
    }
  }
  listErrors(){
    let errors = this.state.errors;
    let errorList = [];
    let index = 0;
    for(let i = 0; i < errors.length; i++){  
      let errorsItems = [];
      errors[i].errors.forEach((error) => {
        const item = <li key={"error-item-"+index}>{error}</li>;
        errorsItems.push(item);
        index++;
      });
      let errorText = ("Hay errores en la pestaña " + translate_field_name(errors[i].tab)) + (", fila: " + errors[i].row) + (" (" + errors[i].field + ").");
      let errorItem = <div key={"error-item-text-"+ i}>{errorText}<ul>{errorsItems}</ul></div>;
      errorList.push(errorItem);
    }
    return errorList;
  }
  fileSelected(event) {
    console.log("file selected");
    console.log(event.target);
    let file = event.target.files[0];
    var extension = file.name.substr((file.name.lastIndexOf('.') +1));
    const mime_types = ['xlsx'];
    if(mime_types.indexOf(extension) == -1) {
      alert('Error: Solo archivos ".xlsx" permitidos.');
      this.uploadInput.value = '';
      return;
    }
    this.uploadFile(file);
  }
  render() {
    return (
      <>
        { this.showModal() }
        <div className="row py-4 px-md-4">
          <div className="col-sm-6 text-center text-sm-right mb-3 mb-sm-0">
            <a href={this.props.url || '#'} className="btn btn-primary">Bajar plantilla Excel</a>
          </div>
          <div className="col-sm-6 text-center text-sm-left">
            <button type="button" className="btn btn-warning" onClick={() => this.uploadInput.click()} >Subir plantilla llenada</button>
            <form method="POST" action={this.props.url || ''} ref={form => this.form = form} encType="multipart/form-data">
              <input type="file" name="file" hidden
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ref={uploadInput => this.uploadInput = uploadInput} 
                onChange={this.fileSelected}
                onClick={(e) => e.target.value = null}
              />
            </form>

          </div>
        </div>
      </>
    );
  }
}


export default ExcelUpload;
