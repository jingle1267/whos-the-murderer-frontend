import React, { Component } from 'react';

class PlayAgainButton extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handlePlayAgain(event)
  }

  render() {
    return (
      <div className="won-message">
        <h4 className="message">Well done!! You have found the murderer! Have you considered becoming a PI?</h4>
        <br />
        <button onClick={this.handleSubmit.bind(this)}>Play Again?</button>
      </div>
    );
  }
}

export default PlayAgainButton;
