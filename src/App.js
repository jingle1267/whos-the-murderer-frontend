import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import GoogleVisionAPI from './api/GoogleVisionAPI';
import FileUpload from './components/FileUpload/FileUpload';
import HomePage from './pages/HomePage';

class App extends Component {

  render() {
    return (
      <div className="App">
        <center>
          <h1>Who's the Murderer?</h1>
        </center>

        <BrowserRouter>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/upload-file" component={FileUpload} />
          </div>
        </BrowserRouter>

      </div>

    );
  }
}
export default App;

//   state = {
//     imageData : {
//       mainEmotion : "",
//       headwear: false,
//       colors: [],
//       hair: false
//     },
//     murdererID : "",
//     clues: {},
//     guessCount: 0
//   }


  // handleUpload = (ev) => {
  //   let file = this.uploadInput.files[0];
  //   // Split the filename to get the name and type
  //   let fileParts = this.uploadInput.files[0].name.split('.');
  //   let fileName = fileParts[0];
  //   // let fileType = fileParts[1];
  //   console.log("Preparing the upload");
  //   // console.log(file);
  //   console.log(fileName);
  // ImageStorageAPI.S3Client.uploadFile(file, fileName)
  // .then(response => {
  //   // var returnData = response.data.data.returnData;
  //   var url = response.location;
  //   // var signedRequest = response.signedRequest;
  //   console.log(response)
  //   console.log(url)
  //   this.setState({
  //     success: true,
  //   })
  // })
  // .catch(err => console.error(err))
  // }

  /* <button onClick={this.handleClick}>Get Single Image</button> */

// Gets single image with imaegName
  // handleClick = (ev) => {
  //   let url = S3ImagesAPI.s3.getSignedUrl('getObject', {
  //     Bucket: "guess-who-images",
  //     Key: "male_sunglasses"
  //     // Expires: signedUrlExpireSeconds
  //   });
  //   console.log(url)
  //   this.setState({url: url})
  // }