import React, { Component } from 'react';
import S3ImagesAPI from "../../api/S3ImagesAPI"

class FileUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : "",
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
    let fileName = this.props.imageName;

    console.log("Preparing the upload");
    // console.log(fileName);
    var params = {
      Bucket: "guess-who-images", 
      Key: fileName, 
      Body: file, 
      ContentType: 'image/jpeg'
    };
    S3ImagesAPI.s3.upload(params, function(err, data) {
      console.log(err, data);
      console.log(data.Location);
      console.log(data.Key);
    })
    this.setState({
      success: true,
    })
  // .catch(err => console.error(err))
  }


  render() {
    console.log(this.props.imageName)
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