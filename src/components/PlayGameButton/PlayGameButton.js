import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class PlayGameButton extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handleAnalyzeImage(event)
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleSubmit.bind(this)}>PLAY GAME!</Button>
      </div>
    );
  }
}

export default PlayGameButton;
