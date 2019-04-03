import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class SuccessUploadMessage extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handleReload(event)
  }

  render() {
    return (

        <div style={{padding:50}}>
          <h4>Woohoo! Successfully uploaded!</h4>
          <br/>
          <button onClick={this.handleSubmit.bind(this)}> Upload another image </button>
          <Link to={`/`}>
            <button> Start a game </button>
          </Link>
        </div>
    );
  }
}

export default SuccessUploadMessage;