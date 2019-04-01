import React, { Component } from 'react';
import { Row, Container, Image, Col } from 'react-bootstrap';

class FaceImage extends Component {

  createImageCircles() {
    let images = Object.values(this.props.imageURLs)
    return images.map(( imageURL, index ) =>
      <div key={index} >
        <Col lg={6} xl={4} >
          <Image onClick={this.handleSubmit} src={imageURL} roundedCircle  style={{ maxHeight: "35vh", border: "solid 15px grey" }}/>
        </Col>
      </div>
      )
    }

  handleFlip = (ev) => {
    

  }

  handleSubmit = (event) => {
    this.props.handleClickedImage(event)
  }


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

export default FaceImage;
