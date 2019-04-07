import React, { Component } from 'react';
import S3ImagesAPI from "../../api/S3ImagesAPI"
import FixedGoogleVisionAPI from "../../api/FixedGoogleVisionAPI"
import parseImageJSON from "../../api/parseImageJSON"
import FailMessage from "../FailMessage/FailMessage"
import SuccessUploadMessage from "../SuccessUploadMessage/SuccessUploadMessage"
import ImageNamesAPI from '../../api/djangoAPI/ImageNamesAPI';


class ImageUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      newUpload : true,
      shouldHide : false,
      imageAttributes : null,
      uploadedImageName : "",
      uniqueImageName : "",
      hideUpload : false
    }
  }

  componentDidMount() {
    this.setState({
      success : false,
      newUpload : true,
      shouldHide : false,
      imageAttributes : null,
      uploadedImageName : "",
      uniqueImageName : "",
      hideUpload : false
    })
  }

  generateUniqueImageName = () => {
    var uniqueString = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++)
      uniqueString += possible.charAt(Math.floor(Math.random() * possible.length));
    return uniqueString;
  }

  handleSelectFile = (ev) => {
    let imageName = this.generateUniqueImageName()
    console.log(imageName)
    this.setState({
      uniqueImageName : imageName,
      uploadedImageName : ev.target.value.split('\\')[2],
      shouldHide : true
      
    });
  }

  handleUpload_AWS_SDK = (ev) => {
    let file = this.uploadInput.files[0];
    console.log(file);

    let fileName = this.state.uniqueImageName;
    console.log("Preparing the upload");
    var params = {
      Bucket: "guess-who-images", 
      Key: fileName, 
      Body: file, 
      ContentType: 'image/jpeg'
    };

    let uploadImagePromise = S3ImagesAPI.s3.upload(params).promise()
    uploadImagePromise
      .then((data) => {
        console.log(data.Key);
        // throw new Error("ERROR!")
        this.getImageURL()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getImageURL = () => {
    let url = S3ImagesAPI.s3.getSignedUrl('getObject', {
      Bucket: "guess-who-images",
      Key: this.state.uniqueImageName,
      Expires: 1800
    });
    this.analyzeImagewithResponse(url)
  }

  analyzeImagewithResponse = (url) => {
    FixedGoogleVisionAPI.analyzeImage(url)
      .then((JSONresponse) => { 
        // console.log(JSONresponse)
        let data = parseImageJSON.isImageValidwithJson(JSONresponse)
        // console.log(data)
        if (data) {
          this.saveImageName()
          this.setState({ 
            success: true,
            hideUpload : true,
            imageAttributes : data
          })
        } else {
          this.deleteImagefromBucket()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  deleteImagefromBucket = () => {
    var params = {
      Bucket: "guess-who-images",
      Key: this.state.uniqueImageName,
    };
    let deleteImagePromise = S3ImagesAPI.s3.deleteObject(params).promise()
    deleteImagePromise
      .then((data) => {
          console.log(data)
          console.log("Image not good enough!")
          this.setState({ 
            newUpload: false
          }) 
        })
        .catch((error) => {
          console.log(error)
        })             
    }

    handleReload = () => {
      this.setState({
        success : false,
        newUpload : true,
        shouldHide : false,
        imageAttributes : null,
        uploadedImageName : "",
        uniqueImageName : "",
        hideUpload : false
      })
    }

    saveImageName = () => {
      const imageName = {
        image_name: this.state.uniqueImageName,
      }
      ImageNamesAPI.addImage(imageName)
        .then((response) => {
          if (response.status === 201) {
            console.log(response)
          } else {
            console.log(response)
          }
        })
        .catch((error) => {
          console.log(error)
        })      
    }

  render() {
    return (
      <div className="FileUpload">
      { this.state.newUpload  ? 
          <center className={ this.state.hideUpload ? 'hidden' : ''} >

            <h3>Upload a new face!</h3>
            <br />
            <div style={{maxWidth : "45vw"}} className='text'>When you upload an image, the face will be analyzed to see if it's suitable for Who's the Murderer! <br/><br/> The face must clearly show either joy, sorrow, anger or surprise, or they could be wearing a hat!  Other features will also be discovered, such as glasses, moustaches, beards and so on! <hr /></div>
            
            <h5>Are YOU the Murderer?</h5>
            <p style={{ margin: "8px"}}>
                  {this.state.uploadedImageName}
                </p>
                <div className={ this.state.shouldHide ? 'hidden' : ''}>
                  <label className="button" htmlFor="file">Choose a file</label>
                  <input 
                    onChange={this.handleSelectFile} 
                    ref={(ref) => { this.uploadInput = ref; }} 
                    name="file" 
                    id="file" 
                    className="inputfile" 
                    type="file"
                  />
                  </div>
            <button onClick={this.handleUpload_AWS_SDK}>UPLOAD</button>
            <br/><br/>            
            <a rel="noopener noreferrer" className="text-links subtitle" href="https://cloud.google.com/vision/" target="_blank">Learn more about the image analysis, that uses Google's powerful machine learning models!</a>


          </center> : <FailMessage handleReload={this.handleReload} />
        }
      { this.state.success ? <SuccessUploadMessage imageAttributes={this.state.imageAttributes} handleReload={this.handleReload} /> : null }
        
      </div>
    );
  }
}
export default ImageUpload;