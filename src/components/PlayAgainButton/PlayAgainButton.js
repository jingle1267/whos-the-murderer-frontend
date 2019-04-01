import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class PlayAgainButton extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handlePlayAgain(event)
  }

  render() {
    return (
      <div className="won-message">
        <h4>Well done!! You have found the murderer! Have you considered becoming a PI?</h4>
        <Button onClick={this.handleSubmit.bind(this)}>Play Again?</Button>
      </div>
    );
  }
}

export default PlayAgainButton;
