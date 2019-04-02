import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import S3ImagesAPI from "../api/S3ImagesAPI"
// import GoogleVisionAPI from '../api/GoogleVisionAPI';
import FixedGoogleVisionAPI from '../api/FixedGoogleVisionAPI';

import ImagesList from '../components/ImagesList/ImagesList';
import ImageNamesAPI from '../api/djangoAPI/ImageNamesAPI';
import NewGameForm from '../components/NewGameForm/NewGameForm';
import PlayGameButton from '../components/PlayGameButton/PlayGameButton';
import parseImageJSON from '../api/parseImageJSON';
import CluesAPI from '../api/djangoAPI/CluesAPI';
import Clues from '../components/Clues/Clues'
import PlayAgainButton from '../components/PlayAgainButton/PlayAgainButton';
import { Button } from 'react-bootstrap';


class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      // presignedImageUrls : ["https://guess-who-images.s3.us-east-2.amazonaws.com/creepy_smile_guy?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJYMH6IJIYMY6RJVA%2F20190401%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20190401T155015Z&X-Amz-Expires=1800&X-Amz-Signature=c8ebd2c5ee41d26bbc971a406e1eb7afafbe2a025999c5919223d4a5eaa02c4c&X-Amz-SignedHeaders=host", "https://guess-who-images.s3.us-east-2.amazonaws.com/male_sunglasses?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJYMH6IJIYMY6RJVA%2F20190401%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20190401T155015Z&X-Amz-Expires=1800&X-Amz-Signature=cd003a73a24ca315bb227b3e5af624f9cd64ece62f0328811775dc6398b3eab2&X-Amz-SignedHeaders=host"],      
      // murderer: "https://guess-who-images.s3.us-east-2.amazonaws.com/creepy_smile_guy?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJYMH6IJIYMY6RJVA%2F20190401%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20190401T155015Z&X-Amz-Expires=1800&X-Amz-Signature=c8ebd2c5ee41d26bbc971a406e1eb7afafbe2a025999c5919223d4a5eaa02c4c&X-Amz-SignedHeaders=host",
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
    CluesAPI.fetchClues()
      .then((apiResponseJSON) => {
        clues.push(apiResponseJSON)
        this.setState({
          clues: clues[0]
        })
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
      console.log(url)
      imageURLs.push(url)
    }
    this.setState({
      presignedImageUrls: imageURLs
    })
  }

  handleAnalyzeImage = () => {
    FixedGoogleVisionAPI.analyzeImage(this.state.murderer)
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
  }
  
  // handleAnalyzeMurderer = (murdererURL) => {
  //   FixedGoogleVisionAPI.analyzeImage(murdererURL)
  //   // GoogleVisionAPI.analyzeImage(murdererURL)

  //     .then((JSONresponse) => { 
  //       console.log(JSONresponse)
  //     let data = parseImageJSON.parseData(JSONresponse)
  //       this.setState({ 
  //         murdererAttributes: data
  //       }) 
  //       console.log(this.state.murdererAttributes)
  //     })
  // }
  
  handleGameDifficulty = (event) => {
    const num_faces = event.target.elements[0].value
    console.log(num_faces)
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
      murderer: murderer,
    })
    // this.handleAnalyzeMurderer(murderer) //ADD BACK IN FOR INSTANTANIOUS ANALYZING
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
      clues : [],
      // imageNames : [],
      murderer: "",
      gameDifficulty: 0,
      murdererAttributes : {},
      isWon: false,
      gameStarted: false,
      guessAgain: false,
      shouldHide : false
    })
  }


  render() {
    return (
      <div>
        <div>

          {/* <button onClick={this.getImageURLs}>Show ALL Images</button> 
          <p style={{ fontSize: "8pt"}}>(Gets Presigned URLS for all imagesnames in state)</p> */}

          { this.state.gameDifficulty ? null : <NewGameForm handleGameDifficulty={this.handleGameDifficulty}/> }
          {/* { this.state.imageNames ? <div className={ this.state.gameDifficulty ? 'hidden' : '' } > <NewGameForm handleGameDifficulty={this.handleGameDifficulty}/> </div> : null } */}

          <br/>



          { this.state.gameDifficulty ?           
            <div className={ this.state.murderer ? 'hidden' : ''} >
              <Button onClick={this.selectImagesForCurrentGame}>Analyze Murderer</Button> 
            </div> : null
          }

          { this.state.murderer ? <div className={ this.state.shouldHide ? 'hidden' : ''} ><PlayGameButton handleAnalyzeImage={this.handleAnalyzeImage}/></div>  : null }

          { this.state.murderer ? console.log(`The murderer is ${this.state.murderer}`)  : null }
          
          { this.state.gameStarted ? <Clues clues={this.state.clues} murdererAttributes={this.state.murdererAttributes}/> : null }

          { this.state.guessAgain ? <p className="guess-again">Nope - guess again!</p> : null }

          { this.state.gameStarted ? <ImagesList imageURLs={this.state.presignedImageUrls} handleClickedImage={this.handleClickedImage} isWon={this.state.isWon} murderer={this.state.murderer} /> : null }          

          { this.state.isWon ? <div><PlayAgainButton handlePlayAgain={this.handlePlayAgain} /></div>  : null }
          
        </div>
      </div>
    );
  }
}

export default HomePage;

          
    /* <button onClick={this.listBucketContents}>List All Objects in Bucket</button> */
  // listBucketContents = () => {
  //   let imageNames = []
  //   let response = {}
  //   var params = {
  //     Bucket: "guess-who-images", 
  //     MaxKeys: 9
  //   };
  //   S3ImagesAPI.s3.listObjects(params, function(err, data) {
  //     if (err) {
  //       console.log(err, err.stack)
  //     } else  {
  //       console.log(data);
  //       response = data
  //       for (let element of response.Contents){
  //         imageNames.push(element["Key"])
  //       }}
  //       console.log(imageNames);
  //     })
  //   this.setState({
  //     imageNames: imageNames
  //   })
  // }