import React, { Component } from 'react';
// import { Row, Container } from 'react-bootstrap';

class Clues extends Component {
  state = {
    // showClues : false,
    showClues : 0,
    currentGameHints : []
  }

  createClues() {
    let clues = this.props.clues
    let murdererAttributes = this.props.murdererAttributes
    let currentGameHints = {}
    for (let element of clues) {
      let clue = Object.values(element)
      // console.log(clue_key)
      // console.log(clue_text)
      let clue_key = clue[1]
      let clue_text = clue[2]
      if (clue_key === murdererAttributes.mainEmotion) {
        // return <p> { clue[2] } </p>
        currentGameHints['mainEmotion'] = clue_text
      }
      // console.log(clue_key)
      // console.log(murdererAttributes.features)

      if (murdererAttributes.features.includes(clue_key)) {
        currentGameHints[clue_key] = clue_text
      }
    }
    this.setState({
      currentGameHints: currentGameHints
    })
    console.log(currentGameHints.Hair)
    
    // console.log(this.state.currentGameHints.mainEmotion)
  }

  handleClick = (ev) => {
    this.createClues()
    this.setState({
      showClues : this.state.showClues + 1
    })
  }

  render() {
    return (
      <div>
        <hr/>
        <h6 className="hint-text" onClick={this.handleClick}>Psst! Need a hint?</h6>
        { this.state.showClues >= 1 ? <p>  {this.state.currentGameHints.mainEmotion} </p> : null }
        <h6 className="hint-text" onClick={this.handleClick}>Psst! Need anoooooother hint?</h6>
        { this.state.showClues >= 2  ? this.state.currentGameHints.Hair : null }
        <h6 className="hint-text" onClick={this.handleClick}>More hints?</h6>
        { this.state.showClues >= 3  ? this.state.currentGameHints.Glasses : null }

      </div>
    );
  }
}

export default Clues;
