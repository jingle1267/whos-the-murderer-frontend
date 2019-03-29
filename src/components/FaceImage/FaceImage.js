import React, { Component } from 'react';
import { Row, Container, Image, Col } from 'react-bootstrap';

class FaceImage extends Component {

  createImageCircles() {
    let images = Object.values(this.props.imageURLs)
    return images.map(( imageURL, index ) =>
      <div key={index} >
        <Col lg={6} xl={4} >
          <Image onClick={this.handleFlip} src={imageURL} roundedCircle  style={{ maxHeight: "35vh", border: "solid 15px grey" }}/>
        </Col>
      </div>
      )
    }

  handleFlip = (ev) => {
    console.log(ev)
  }

  render() {
    return (
      <div>
        <Container>
          <Row>

          { this.createImageCircles() }

          {/* <Col lg={6} xl={4} >
              <Image src={surprised_mustache} roundedCircle  style={{ maxHeight: "40vh", border: "solid 15px grey" }}/>
            </Col>
            <Col lg={6} xl={4} >
              <Image src={sad_female_red} roundedCircle  style={{ maxHeight: "40vh", border: "solid 15px grey" }}/>
            </Col>
            <Col lg={6} xl={4} >
              <Image src={elderly_male_glasses} roundedCircle  style={{ maxHeight: "40vh", border: "solid 15px grey" }}/>
            </Col> */}
          </Row>
        </Container>
        
      </div>
    );
  }
}

export default FaceImage;
