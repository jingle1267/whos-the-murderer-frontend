import React, { Component } from 'react';
import S3ImagesAPI from "../../api/S3ImagesAPI"

class FileUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      // url : "",
      presignedImageUrl: null,
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
    S3ImagesAPI.s3.upload(params, function(err, data) {
      console.log(err, data);
      // console.log(data.Location);
      console.log(data.Key);
    })
    this.setState({
      success: true,
    })
    this.getImageURL()
  // .catch(err => console.error(err))
  }

  getImageURL = () => {
    let url = S3ImagesAPI.s3.getSignedUrl('getObject', {
      Bucket: "guess-who-images",
      // Key: imageName,
      Key: this.props.imageName.image_name,
      Expires: 1800
    });
    this.setState({
      presignedImageUrl: url,
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