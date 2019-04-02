import React, { Component } from 'react';
import S3ImagesAPI from "../../api/S3ImagesAPI"
import FixedGoogleVisionAPI from "../../api/FixedGoogleVisionAPI"
import parseImageJSON from "../../api/parseImageJSON"


class FileUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      imageAttributes: {}
    }
  }
  
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
  }

  handleUpload_AWS_SDK = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    // let fileParts = this.uploadInput.files[0].name.split('.');
    // let fileName = fileParts[0];
    let fileName = this.props.imageName.image_name;
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
      Key: this.props.imageName.image_name,
      Expires: 1800
    });
    this.analyzeImage(url)
  }

  analyzeImage = (url) => {
    FixedGoogleVisionAPI.analyzeImage(url)
      .then((JSONresponse) => { 
        console.log(JSONresponse)
        let data = parseImageJSON.parseData(JSONresponse)
        this.setState({ 
          imageAttributes: data,
          success: true
        }) 
        console.log(this.state.imageAttributes)
      })
  }


  render() {
    console.log(this.props.imageName)
    console.log(this.state.presignedImageUrl)
    
    const SuccessMessage = () => ( 
      <div style={{padding:50}}>
        <h4>Woohoo! Successfully uploaded!</h4>
        <br/>
        Add link to homepage or upload another?
      </div>
    )

    return (
      <div className="FileUpload">
        { this.state.success  ? <SuccessMessage/> : 
          <center>
            <h3>Upload a new face!</h3>
            <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
            <br/>
            <button onClick={this.handleUpload_AWS_SDK}>UPLOAD</button>
          </center>
        }
      </div>
    );
  }
}
export default FileUpload;