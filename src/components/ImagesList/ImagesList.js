import React, { Component } from 'react';
import { Row, Container } from 'react-bootstrap';
import FaceImage from '../FaceImage/FaceImage'



class ImagesList extends Component {
  // state = {
  //   isFlipped: false
  // };

  createImageCircles() {
    let images = Object.values(this.props.imageURLs)
    return images.map(( imageURL, index ) =>
      <div key={index} >
        <FaceImage imageURL={imageURL} handleClickedImage={this.handleClickedImage} isWon={this.props.isWon} murderer={this.props.murderer}/>
      </div>
      )
    }

  handleClickedImage = (event) => {
    this.props.handleClickedImage(event)
  }

  // componentDidUpdate = () => {
  //   if (this.props.isWon) {
  //     this.setState({ 
  //       isFlipped: true 
  //     })
  //   }
  // }



  render() {

    return (
      <div>
        <Container>
        <Row>

        { this.createImageCircles() }

          </Row>
        </Container>
        
      </div>
    );
  }
}

export default ImagesList;
