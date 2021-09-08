import React, { Component } from 'react';

class InputFeedback extends Component {
  feedback(error) {
  	if (error) {
  		return (
        <div className="invalidFeedback">
          {this.props.error}
        </div>
      )
  	}
  	return null;
  }
  render() {
    return this.feedback(this.props.error)
  }
}

export default InputFeedback;