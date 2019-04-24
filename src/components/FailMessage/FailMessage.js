import React, { Component } from 'react';

class FailMessage extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handleReload(event)
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <h4>Unfortunately that image could not be properly classified.</h4>
        <p>You need to show one of the 4 following emotions or try wearing a hat!</p>
        <h3>JOY</h3>   
        <h3>SORROW</h3>
        <h3>SURPRISE</h3>   
        <h3>ANGER</h3>
        <br/>
        <button onClick={this.handleSubmit.bind(this)}> Upload a different image </button>
      </div>
    );
  }
}

export default FailMessage;