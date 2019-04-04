import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class SuccessUploadMessage extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handleReload(event)
  }

  render() {
    console.log(this.props.imageAttributes)
    return (

        <div style={{padding:50}}>
          <h4>Woohoo! Successfully uploaded!</h4>
          <hr/>
          <p> Your image shows the following:</p>
          <h5>{this.props.imageAttributes.mainEmotion}</h5>

          <p>And it looks like the person has the following features:</p>
          <h5>{this.props.imageAttributes.features[0]}</h5>
          <h5>{this.props.imageAttributes.features[1]}</h5>


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