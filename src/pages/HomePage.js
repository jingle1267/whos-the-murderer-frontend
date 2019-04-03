import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import S3ImagesAPI from "../api/S3ImagesAPI"
import FixedGoogleVisionAPI from '../api/FixedGoogleVisionAPI';

import ImagesList from '../components/ImagesList/ImagesList';
import ImageNamesAPI from '../api/djangoAPI/ImageNamesAPI';
import NewGameForm from '../components/NewGameForm/NewGameForm';
// import PlayGameButton from '../components/PlayGameButton/PlayGameButton';
import parseImageJSON from '../api/parseImageJSON';
import CluesAPI from '../api/djangoAPI/CluesAPI';
import Clues from '../components/Clues/Clues'
import PlayAgainButton from '../components/PlayAgainButton/PlayAgainButton';
import { Button } from 'react-bootstrap';

// import { css } from '@emotion/core';
// // First way to import
// import { PacmanLoader } from 'react-spinners';

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      // murdererAttributes : { 
      //   mainEmotion : "joy",
      //   features: ["Facial hair", "Hair", "Moustache"],
      //   colors: []
      // },
        presignedImageUrls : [],
        clues : [],
        imageNames : [],
        murderer: "",
        gameDifficulty: 0,
        murdererAttributes : {},
        isWon: false,
        gameStarted: false,
        guessAgain: false,
        hidden: false,
        // loading: true
      }
  }

  componentDidMount(){
    let imageNames = []
    let clues = []
    ImageNamesAPI.fetchImages()
      .then((apiResponseJSON) => {
        for (let element of apiResponseJSON) {
          imageNames.push(element.image_name)
        }
        this.setState({
          imageNames: imageNames
        })
    })
      .catch((error) => {
        console.log(error)
      })
    CluesAPI.fetchClues()
      .then((apiResponseJSON) => {
        clues.push(apiResponseJSON)
        this.setState({
          clues: clues[0]
        })
    })
      .catch((error) => {
        console.log(error)
      })
    //   setTimeout(function() { //Start the timer
    //     this.setState({loading: false}) //After 1 second, set render to true
    // }.bind(this), 2000)
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  }

  getImageURLs = () => {
    let imageURLs = []
    for (let imageName of this.state.imageNames) {
      let url = S3ImagesAPI.s3.getSignedUrl('getObject', {
        Bucket: "guess-who-images",
        Key: imageName,
        Expires: 1800
      });
      console.log(url)
      imageURLs.push(url)
    }
    this.setState({
      presignedImageUrls: imageURLs
    })
  }

  // handleAnalyzeImage = () => {
  //   FixedGoogleVisionAPI.analyzeImage(this.state.murderer)
  //     .then((JSONresponse) => { 
  //       console.log(JSONresponse)
  //     let data = parseImageJSON.parseData(JSONresponse)
  //       this.setState({ 
  //         murdererAttributes: data,
  //         gameStarted : true,
  //         shouldHide: true
  //       }) 
  //       console.log(this.state.murdererAttributes)
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  // }
  
  handleAnalyzeMurderer = (murdererURL) => {
    FixedGoogleVisionAPI.analyzeImage(murdererURL)
      .then((JSONresponse) => { 
        console.log(JSONresponse)
        let data = parseImageJSON.parseData(JSONresponse)
        this.setState({ 
          murdererAttributes: data,
          gameStarted : true,
          shouldHide: true
        }) 
        console.log(this.state.murdererAttributes)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  handleGameDifficulty = (event) => {
    const num_faces = event.target.elements[0].value
    this.setState({ 
      gameDifficulty: num_faces 
    })
  }
  
  getCurrentGameImageURLs = (imageNames) => {
    let imageURLs = []
    for (let imageName of imageNames) {
      let url = S3ImagesAPI.s3.getSignedUrl('getObject', {
        Bucket: "guess-who-images",
        Key: imageName,
        Expires: 1800
      });
      imageURLs.push(url)
    }
    this.setState({
      presignedImageUrls: imageURLs,
    })
    this.handleChooseMurderer(imageURLs)
  }

  handleChooseMurderer = (currentGameImages) => {
    console.log(currentGameImages)
    var murderer = currentGameImages[Math.floor(Math.random()*currentGameImages.length)];
    this.setState({
      murderer: murderer
    })
    setTimeout(function() { //Start the timer
      this.setState({loading: false}) //After 1 second, set render to true
      this.handleAnalyzeMurderer(murderer)
    }.bind(this), 1000)
  }

  selectImagesForCurrentGame = () => {
    const shuffledImages = this.state.imageNames.sort(() => 0.5 - Math.random());
    let currentGameImages = shuffledImages.slice(0, this.state.gameDifficulty);
    this.getCurrentGameImageURLs(currentGameImages)
  }

  handleClickedImage = (ev) => {
    let clickedImgUrl = ev.target.src
    if (clickedImgUrl === this.state.murderer) {
      this.setState({
        isWon: true,
        guessAgain: false
      })
    } else {
      this.setState({
        guessAgain: true
      })
    }
  }

  handlePlayAgain = (ev) => {
    this.setState({
      presignedImageUrls : [],
      murderer: "",
      gameDifficulty: 0,
      murdererAttributes : {},
      isWon: false,
      gameStarted: false,
      guessAgain: false,
      shouldHide : false,
      // loading: true
    })
  }

  render() {
    return (
      <div>
        <div>
        {/* { this.state.loading ?         
        <PacmanLoader
          css={override}
          sizeUnit={"px"}
          size={10}
          color={'#123abc'}
          loading={this.state.loading}
        /> : <div> */}


          {/* <button onClick={this.getImageURLs}>Show ALL Images</button> 
          <p style={{ fontSize: "8pt"}}>(Gets Presigned URLS for all imagesnames in state)</p> */}

          { this.state.gameDifficulty ? null : <NewGameForm handleGameDifficulty={this.handleGameDifficulty}/> }
          <br/>

          { this.state.gameDifficulty ?           
            <div className={ this.state.murderer ? 'hidden' : ''} >
              <button onClick={this.selectImagesForCurrentGame}>PLAY GAME!</button> 
            </div> : null
          }

          {/* { this.state.murderer ? <div className={ this.state.shouldHide ? 'hidden' : ''} ><PlayGameButton handleAnalyzeImage={this.handleAnalyzeImage}/></div>  : null } */}

          { this.state.murderer ? console.log(`The murderer is ${this.state.murderer}`) : null }
          
          { this.state.gameStarted ? <Clues clues={this.state.clues} murdererAttributes={this.state.murdererAttributes}/> : null }

          { this.state.guessAgain ? <p className="guess-again">Nope - guess again!</p> : <div style={{ marginBottom: "32px"}} ></div> }

          
          
          { this.state.gameStarted ? <ImagesList imageURLs={this.state.presignedImageUrls} handleClickedImage={this.handleClickedImage} isWon={this.state.isWon} murderer={this.state.murderer} /> : null }          

          { this.state.isWon ? <div><PlayAgainButton handlePlayAgain={this.handlePlayAgain} /></div> : null }
          </div>
{/* 
        }
          
        </div> */}
      </div>
    );
  }
}

export default HomePage;
