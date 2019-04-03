import React, { Component } from 'react';
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

  handleReload = () => {
    this.setState({
      imageName : null
    })
  }
  
  render() {
    return (
      <div>
      
      { this.state.imageName ? null : <ImageNameForm handleSaveImageName={this.handleSaveImageName}/> }
      { this.state.imageName ? <FileUpload imageName={this.state.imageName} handleReload={this.handleReload} /> : null }

      </div>
    );
  }
}

export default UploadImagePage;
