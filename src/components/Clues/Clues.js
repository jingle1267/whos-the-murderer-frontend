import React, { Component } from 'react';

class Clues extends Component {
  state = {
    showClues : -1,
    currentGameHints : []
  }

  createTextHints() {
    let clues = this.props.clues
    let murdererAttributes = this.props.murdererAttributes
    let currentGameHints = []
    for (let element of clues) {
      let clue_key = Object.values(element)[1]
      let clue_text = Object.values(element)[2]
      if (clue_key === murdererAttributes.mainEmotion) {
        currentGameHints.push(clue_text)
      }
      if (murdererAttributes.features.includes(clue_key)) {
        currentGameHints.push(clue_text)
      }
    }
    this.setState({
      currentGameHints: currentGameHints
    })
  }

  handleClick = () => {
    this.createTextHints()
    this.setState({
      showClues : this.state.showClues + 1
    })
  }

  render() {
    return (
      <div >
        { this.state.showClues === this.state.currentGameHints.length ? 
          <p className="hint-end" >That's all the clues you're going to get, try making a guess!</p> : 
          <h6 onClick={this.handleClick} className="hint-title" >Psst! Need a hint?</h6> 
        }

        { this.state.showClues >= 0 ? <p className="hint-text">  {this.state.currentGameHints[0 + this.state.showClues]} </p> : <div style={{ marginBottom: "40px"}} ></div>  }

      </div>
    );
  }
}

export default Clues;
