import React, { Component } from 'react';
import S3ImagesAPI from "../../api/S3ImagesAPI"
import GoogleVisionAPI from "../../api/GoogleVisionAPI"
import parseImageJSON from "../../api/parseImageJSON"
import FailMessage from "../FailMessage/FailMessage"
import SuccessUploadMessage from "../SuccessUploadMessage/SuccessUploadMessage"
import DjangoImageAPI from '../../api/djangoAPI/DjangoImageAPI';

class ImageUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      newUpload : true,
      shouldHide : false,
      imageAttributes : {},
      uploadedImageName : "",
      uniqueImageName : "",
      hideUpload : false
    }
  }

  handleSelectFile = (ev) => {
    let imageName = this.generateUniqueImageName()
    this.setState({
      uniqueImageName : imageName,
      uploadedImageName : ev.target.value.split('\\')[2],
      shouldHide : true
    });
  }

  generateUniqueImageName = () => {
    var uniqueString = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++)
      uniqueString += possible.charAt(Math.floor(Math.random() * possible.length));
    return uniqueString;
  }

  handleImageUploadtoS3 = () => {
    let file = this.uploadInput.files[0];
    let fileName = this.state.uniqueImageName;
    var params = {
      Bucket: "guess-who-images", 
      Key: fileName, 
      Body: file, 
      ContentType: 'image/jpeg'
    };
    let uploadImagePromise = S3ImagesAPI.s3.upload(params).promise()
    uploadImagePromise
      .then((data) => {
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
    this.analyzeImage(url)
  }

  analyzeImage = (url) => {
    GoogleVisionAPI.analyzeImage(url)
      .then((JSONresponse) => { 
        let data = parseImageJSON.isImageValid(JSONresponse)
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
  
  saveImageName = () => {
    let imageName = {
      image_name: this.state.uniqueImageName,
    }
    DjangoImageAPI.addImage(imageName)
      .then((response) => {
        if (response.status === 201) {
          console.log(response)
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
      .then(() => {
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
        imageAttributes : {},
        uploadedImageName : "",
        uniqueImageName : "",
        hideUpload : false
      })
    }

  render() {
    return (
      <div className="FileUpload">
        { this.state.newUpload  
          ? <center className={ this.state.hideUpload ? 'hidden' : ''}>
              <h3>Upload a new face!</h3>
              <br />
              <div style={{maxWidth : "45vw"}} className='text'>
                When you upload an image, the face will be analyzed to see if it's suitable for Who's the Murderer! <br/><br/> The face must clearly show either joy, sorrow, anger or surprise, or they could be wearing a hat!  Other features will also be discovered, such as glasses, moustaches, beards and so on! 
                <hr />
              </div>
              
              <h5>Are YOU the Murderer?</h5>
              <p style={{ margin: "8px" }}>
                { this.state.uploadedImageName }
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
              <button onClick={this.handleImageUploadtoS3}>UPLOAD</button>

              <br/><br/>
                      
              <a 
                rel="noopener noreferrer" 
                className="text-links subtitle" 
                href="https://cloud.google.com/vision/" 
                target="_blank">
                Learn more about the image analysis, that uses Google's powerful machine learning models!
              </a>
            </center> 
          : <FailMessage handleReload={this.handleReload} />
        }

        { this.state.success 
          ? <SuccessUploadMessage 
              imageAttributes={this.state.imageAttributes} 
              handleReload={this.handleReload} 
            /> 
          : null 
        }

      </div>
    );
  }
}
export default ImageUpload;