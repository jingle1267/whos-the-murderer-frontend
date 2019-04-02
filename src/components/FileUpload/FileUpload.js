import React, { Component } from 'react';
import S3ImagesAPI from "../../api/S3ImagesAPI"
import ImageNameForm from "../ImageNameForm/ImageNameForm"

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
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    console.log("Preparing the upload");
    console.log(fileName);
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
  // })
  // .catch(err => console.error(err))
  }


  render() {
    const SuccessMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFULLY UPLOADED!</h3>
        <br/>
      </div>
    )
    return (
      <div className="FileUpload">

      <ImageNameForm />
        <center>
          <h3>Submit a face</h3>
          {this.state.success ? <SuccessMessage/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload_AWS_SDK}>UPLOAD</button>
        </center>
      </div>

    );
  }
}
export default FileUpload;