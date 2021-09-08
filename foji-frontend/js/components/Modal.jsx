import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="modal fade show d-block" tabIndex="-1" onClick={this.props.onCloseModal}>
      <div className={'modal-dialog modal-' + (this.props.size || 'sm') + (this.props.center ? ' modal-dialog-centered' : '' )} onClick={(event) => {event.stopPropagation() }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{this.props.title}</h5>
            <button type="button" className="close" onClick={this.props.onCloseModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body py-0">
            <div className={this.props.scrollable ? "scrollbox": ""}>
              {this.props.children}
            </div>
          </div>
          <div className="modal-footer">
            {
              this.props.onSubmit ?
              <button type="submit" onClick={this.props.onSubmit} className="btn btn-primary">{this.props.buttonTitle || 'Guardar'}</button>
              :
              <button type="submit" className="btn btn-primary">{this.props.button}</button>           
            }
          </div>
        </div>
      </div>
    </div>
    );
  };
}

Modal.defaultProps = {
  title: '',
}

export default Modal;
