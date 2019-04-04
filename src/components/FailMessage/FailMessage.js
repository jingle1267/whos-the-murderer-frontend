import React, { Component } from 'react';

class FailMessage extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handleReload(event)
  }

  render() {
    return (
      <div style={{padding:50}}>
        <h4>Unfortunately that image could not be properly analyzed. </h4>
        <p>Try showing one of the 4 following emotions or maybe a hat?</p>
        <h2>JOY   SORROW   SURPRISE   ANGER</h2>
        <br/>
          <button onClick={this.handleSubmit.bind(this)}> Upload a different image </button>
      </div>
    );
  }
}

export default FailMessage;