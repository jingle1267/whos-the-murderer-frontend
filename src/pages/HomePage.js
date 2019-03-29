import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import S3ImagesAPI from "../api/S3ImagesAPI"
import GoogleVisionAPI from '../api/GoogleVisionAPI';
import FaceImage from '../components/FaceImage/FaceImage';
import ImageNamesAPI from '../api/djangoAPI/ImageNamesAPI';
import NewGameForm from '../components/NewGameForm/NewGameForm';
import AnalyzeMurdererButton from '../components/AnalyzeMurdererButton/AnalyzeMurdererButton';
import parseImageJSON from '../api/parseImageJSON';
import CluesAPI from '../api/djangoAPI/CluesAPI';
import Clues from '../components/Clues/Clues'


class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      presignedImageUrls : [],
      clues : [],
      imageNames : [],
      murderer: "",
      gameDifficulty: 0,
      // murdererAttributes : {},
      // murdererAttributes : { 
      //   mainEmotion : "sorrow",
      //   headwear: false,
      //   colors: [],
      //   hair: true
      // }
      murdererAttributes : { 
        mainEmotion : "sorrow",
        features: ["Glasses", "Hair"],
        colors: []
      }
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
        // console.log(this.state.imageNames)
    })
    CluesAPI.fetchClues()
      .then((apiResponseJSON) => {

        clues.push(apiResponseJSON)

        this.setState({
          clues: clues[0]
        })
        // console.log(this.state.clues)
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
    GoogleVisionAPI.analyzeImage(this.state.murderer)
      .then((JSONresponse) => { 
        console.log(JSONresponse)
      let data = parseImageJSON.parseData(JSONresponse)
        this.setState({ 
          murdererAttributes: data 
        }) 
        console.log(this.state.murdererAttributes)
      })
  }
  
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
      // console.log(url)
      imageURLs.push(url)
    }
    this.setState({
      presignedImageUrls: imageURLs
    })
    this.handleChooseMurderer(imageURLs)
  }

  handleChooseMurderer = (currentGameImages) => {
    console.log(currentGameImages)
    // var murderer = this.state.presignedImageUrls[Math.floor(Math.random()*this.state.presignedImageUrls.length)];
    var murderer = currentGameImages[Math.floor(Math.random()*currentGameImages.length)];
    this.setState({
      murderer: murderer
    })
  }

  selectImagesForCurrentGame = () => {
    const shuffledImages = this.state.imageNames.sort(() => 0.5 - Math.random());
    let currentGameImages = shuffledImages.slice(0, this.state.gameDifficulty);
    // console.log(currentGameImages)
    this.getCurrentGameImageURLs(currentGameImages)
  }

  render() {
    return (
      <div>

        <div>

          {/* <button onClick={this.getImageURLs}>Show ALL Images</button> 
          <p style={{ fontSize: "8pt"}}>(Gets Presigned URLS for all imagesnames in state)</p> */}

          { this.state.gameDifficulty ? null : <NewGameForm handleGameDifficulty={this.handleGameDifficulty}/> }
          <br/>
          Step 2 - 
          <button onClick={this.selectImagesForCurrentGame}>PLAY GAME!</button> 
          <p style={{ fontSize: "8pt"}}> Randomly selects images from the provided number</p>

          { this.state.murderer ? console.log(`The murderer is ${this.state.murderer}`)  : null }
          
          <AnalyzeMurdererButton handleAnalyzeImage={this.handleAnalyzeImage}/>

          <Clues clues={this.state.clues} murdererAttributes={this.state.murdererAttributes}/>

          {/* { this.state.murdererAttributes ? <p>{ this.state.murdererAttributes.mainEmotion }</p> : null } */}



          { this.state.presignedImageUrls ? <FaceImage imageURLs={this.state.presignedImageUrls} /> : null }

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