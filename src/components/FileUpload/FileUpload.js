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
  // .then(response => {
  //   // var returnData = response.data.data.returnData;
  //   var url = response.location;
  //   // var signedRequest = response.signedRequest;
  //   console.log(response)
  //   console.log(url)
    this.setState({
      // url: url,
      success: true,
    })
  // })
  // .catch(err => console.error(err))
  }


  render() {
    const SuccessMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFULLY UPLOADED!</h3>
        {/* <a href={this.state.url}>Access the file here</a> */}
        <br/>
      </div>
    )

    return (
      <div className="FileUpload">
        <center>
          <h3>Submit a face</h3>
          {this.state.success ? <SuccessMessage/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload_AWS_SDK}>UPLOAD</button>
        </center>

        <div>
          {/* <img src={this.state.url} alt=""></img> */}
        </div>
      </div>

    );
  }
}
export default FileUpload;