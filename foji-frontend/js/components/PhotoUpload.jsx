import React, { Component } from 'react';
import axios from 'axios';
import get_csrf_token from '../utils/csrf';
import { validateImage} from '../utils/validate.js';

class PhotoUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: 'Selecciona desde tu dispositivo una imagen de portada.',
      imgUrl: this.props.photoUrl || '',
    }
    
  }

  componentDidMount(){
    if(this.props.photoUrl){
      this.icon.style.opacity = '0';
    }
  }

  uploadPhoto(file){
    let formData = new FormData();
    let imagefile = this.fileInput;
    let self = this;
    formData.append("photo", imagefile.files[0]);
    axios.patch('/api/orchestras/' + this.props.orchestra_id + '/photo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': get_csrf_token(),
        }
    }).then( function(response){
      console.log(response);
      const input = self.fileInput;
      input.photo = response.data.photo;
      if(self.props.onChange){
        self.props.onChange(input, 'photo');
      }
      
    }).catch( function(response){
      console.log(response);
    });
  }

  fileSelected(event) {
    let self = this;
    var file = event.target.files[0];
    let valid = validateImage(file);
    if(valid.validated){
      var reader = new FileReader();
      var fileUrl;
      reader.onload = (e) => {
        fileUrl = e.target.result;
        self.setState({
          text: file.name,
          imgUrl: fileUrl,
        });
      }
      reader.readAsDataURL(file);
      self.uploadBtn.style.display = 'none';
      self.icon.style.opacity = '0';

      if(this.props.photoUrl && this.props.orchestra_id){
        this.uploadPhoto(file);
      }
    } else {
      let text = <span className="text-danger">{valid.error}</span>;
      self.setState({
        text: text,
      })
    }
  }
  render() {
    var divStyle = {
      backgroundImage: 'url(' + this.state.imgUrl + ')'
    }

    return (
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group orq-photo text-center-sm" style={divStyle} >
            <div className="photo-wrapper">
              <div className="camera-icon" ref={icon => this.icon = icon}></div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 orq-photo-info pt-lg-3 pb-sm-3">
          <p ref={fileText => this.fileText = fileText} >{this.state.text}</p>
          <button className="btn btn-light" type="button" 
            onClick={
              () => this.fileInput.click()
            } 
            ref={uploadBtn => this.uploadBtn = uploadBtn} >Elegir imagen
          </button>
          <input type="file" name={this.props.name} id="photo-upload" hidden
            onChange={
              (e) => this.fileSelected(e)
            } 
            ref={fileInput => this.fileInput = fileInput} 
          />
        </div>
      </div>
    );
  }
}


export default PhotoUpload;
