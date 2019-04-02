import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import S3ImagesAPI from "../api/S3ImagesAPI"
// import FixedGoogleVisionAPI from '../api/FixedGoogleVisionAPI';
// import ImagesList from '../components/ImagesList/ImagesList';
// import ImageNamesAPI from '../api/djangoAPI/ImageNamesAPI';
// import NewGameForm from '../components/NewGameForm/NewGameForm';
// import PlayGameButton from '../components/PlayGameButton/PlayGameButton';
// import parseImageJSON from '../api/parseImageJSON';
// import CluesAPI from '../api/djangoAPI/CluesAPI';
// import Clues from '../components/Clues/Clues'
// import PlayAgainButton from '../components/PlayAgainButton/PlayAgainButton';
// import { Button } from 'react-bootstrap';
import FileUpload from '../components/FileUpload/FileUpload';
import ImageNameForm from '../components/ImageNameForm/ImageNameForm';


class UploadImagePage extends Component {
  state = {
    imageName : null
  }

  handleSaveImageName = (imageName) => {
    this.setState({ 
      imageName: imageName 
    })
  }
  
  render() {
    // console.log(this.state.imageName)
    return (
      <div>
      
      { this.state.imageName ? null : <ImageNameForm handleSaveImageName={this.handleSaveImageName}/> }
      { this.state.imageName ? <FileUpload imageName={this.state.imageName} /> : null }

      </div>
    );
  }
}

export default UploadImagePage;
