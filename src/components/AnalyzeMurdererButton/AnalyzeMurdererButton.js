import React, { Component } from 'react';
// import { Form, Button } from 'react-bootstrap';

class AnalyzeMurdererButton extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handleAnalyzeImage(event)
  }

  render() {
    return (
      <div>
        Step 3 - 
        <button onClick={this.handleSubmit.bind(this)}>Analyze murderer</button>

        
      </div>
    );
  }
}

export default AnalyzeMurdererButton;
