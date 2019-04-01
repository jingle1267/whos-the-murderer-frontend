import React, { Component } from 'react';
import { Row, Container, Image, Col } from 'react-bootstrap';
import FaceImage from '../FaceImage/FaceImage'



class ImagesList extends Component {

  createImageCircles() {
    let images = Object.values(this.props.imageURLs)
    return images.map(( imageURL, index ) =>
      <div key={index} >
        <FaceImage imageURL={imageURL} handleClickedImage={this.handleClickedImage}/>
      </div>
      )
    }

    handleClickedImage = (event) => {
    this.props.handleClickedImage(event)
  }

  // handleClickedImage = (ev) => {
  //   let clickedImgUrl = ev.target.src
  //   if (clickedImgUrl === this.state.murderer) {
  //     this.setState({
  //       isWon: true
  //     })
  //   } else {
  //     // flip
  //   }
  // }


  render() {
    console.log(this.props.murderer)
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
