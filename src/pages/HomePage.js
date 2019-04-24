import React, { Component } from 'react';
import S3ImagesAPI from "../api/S3ImagesAPI"
import GoogleVisionAPI from '../api/GoogleVisionAPI';
import ImagesList from '../components/ImagesList/ImagesList';
import DjangoImageAPI from '../api/djangoAPI/DjangoImageAPI';
import NewGameForm from '../components/NewGameForm/NewGameForm';
import parseImageJSON from '../api/parseImageJSON';
import CluesAPI from '../api/djangoAPI/CluesAPI';
import Clues from '../components/Clues/Clues'
import PlayAgainButton from '../components/PlayAgainButton/PlayAgainButton';


class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
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
      }
  }

  componentDidMount() {
    let imageNames = []
    let clues = []
    DjangoImageAPI.fetchImages()
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
  }

  getImageURLs = () => {
    let imageURLs = []
    for (let imageName of this.state.imageNames) {
      let url = S3ImagesAPI.s3.getSignedUrl('getObject', {
        Bucket: "guess-who-images",
        Key: imageName,
        Expires: 1800
      });
      imageURLs.push(url)
    }
    this.setState({
      presignedImageUrls: imageURLs
    })
  }
  
  handleGameDifficulty = (event) => {
    let num_faces = event.target.elements[0].value
    this.setState({ 
      gameDifficulty: num_faces 
    })
  }

  selectImagesForCurrentGame = () => {
    let shuffledImages = this.state.imageNames.sort(() => 0.5 - Math.random());
    let currentGameImages = shuffledImages.slice(0, this.state.gameDifficulty);
    this.getCurrentGameImageURLs(currentGameImages)
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
    let murderer = currentGameImages[Math.floor(Math.random()*currentGameImages.length)];
    this.setState({
      murderer: murderer
    })
    setTimeout(function() { 
      this.handleAnalyzeMurderer(murderer)
    }.bind(this), 800)
  }

  handleAnalyzeMurderer = (murdererURL) => {
    GoogleVisionAPI.analyzeImage(murdererURL)
      .then((JSONresponse) => { 
        let data = parseImageJSON.parseData(JSONresponse)
        this.setState({ 
          murdererAttributes: data,
          gameStarted : true,
        }) 
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleClickedImage = (ev) => {
    let clickedImgUrl = ev.target.id
    if (clickedImgUrl === this.state.murderer) {
      this.setState({
        isWon: true,
        guessAgain: false,
        murdererAttributes: {}
      })
    } else {
      this.setState({
        guessAgain: true
      })
    }
  }

  handlePlayAgain = () => {
    this.setState({
      presignedImageUrls : [],
      murderer: "",
      gameDifficulty: 0,
      murdererAttributes : {},
      isWon: false,
      gameStarted: false,
      guessAgain: false,
      hidden : false,
    })
  }

  render() {
    return (
      <div>

        { this.state.isWon 
          ? <div>
              <PlayAgainButton handlePlayAgain={this.handlePlayAgain} />
            </div> 
          : null 
        }

        { this.state.gameDifficulty 
          ? null 
          : <NewGameForm handleGameDifficulty={this.handleGameDifficulty} /> 
        }
        
        <br/>

        { this.state.gameDifficulty 
          ? <div className={ this.state.murderer ? 'hidden' : ''}>
              <button onClick={this.selectImagesForCurrentGame}>PLAY GAME!</button> 
            </div> 
          : null
        }
        
        { this.state.gameStarted 
          ? <Clues 
              clues={this.state.clues} 
              murdererAttributes={this.state.murdererAttributes} 
            /> 
          : null 
        }

        { this.state.guessAgain 
          ? <p className="guess-again">Nope - guess again!</p> 
          : <div style={{ marginBottom: "32px"}} ></div> 
        }

        { this.state.gameStarted 
          ? <ImagesList 
              imageURLs={this.state.presignedImageUrls} 
              handleClickedImage={this.handleClickedImage} 
              isWon={this.state.isWon} 
              murderer={this.state.murderer} 
            /> 
          : null
        }       

      </div>
    );
  }
}

export default HomePage;
