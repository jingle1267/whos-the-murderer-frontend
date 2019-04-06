import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SuccessUploadMessage extends Component {

  handleSubmit(event){
    // event.preventDefault();
    this.props.handleReload(event)
  }

  render() {
    console.log(this.props.imageAttributes)

    return (
        <div style={{padding:50}}>

          <h4>Woohoo! Successfully uploaded!</h4>
          <hr style={{maxWidth : "45vw"}}/>
          <p> Your image shows the following:</p>
          <h5>{this.props.imageAttributes.mainEmotion.toUpperCase()}</h5>

          <p>And it looks like the person has the following features (amongst others!):</p>
          <h6>{this.props.imageAttributes.features[0].toUpperCase()}</h6>
          { this.props.imageAttributes.features.length > 1 
            ? <h6>{this.props.imageAttributes.features[1].toUpperCase()}</h6>
            : null
          }
          { this.props.imageAttributes.features.length > 2 
            ? <h6>{this.props.imageAttributes.features[2].toUpperCase()}</h6>
            : null
          }

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