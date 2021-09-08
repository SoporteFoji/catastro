import React, { Component } from 'react';

class LoginForm extends Component {

  render() {
    
    return(
      <>
        <div className="form-group">
          <input name="username" type="email" className="form-control" placeholder="Escribe tu email" />
        </div>
        <div className="form-group">
          <input name="password" type="password" className="form-control" placeholder="Contraseña" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Iniciar sesión</button> 
        </div>
      </>
    );
  }
}


export default LoginForm;
