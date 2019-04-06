import React, { Component } from 'react';
import ImageUpload from '../components/ImageUpload/ImageUpload';

class UploadImagePage extends Component {
  state = {
    imageName : null
  }

  handleReload = () => {
    this.setState({
      imageName : null
    })
  }
  
  render() {
    return (
      <div>
      <ImageUpload handleReload={this.handleReload} />
      </div>
    );
  }
}

export default UploadImagePage;
