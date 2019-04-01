import React, { Component } from 'react';
import { Row, Container, Image, Col } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';


class FaceImage extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClickedImage(event)
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }
 


  render() {
    return (
      <div>

        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
        <Col lg={6} xl={4} key="front" >
          <Image onClick={this.handleClick} src={this.props.imageURL} roundedCircle  style={{ maxHeight: "35vh", border: "solid 15px grey" }}/>
        </Col>

        <Col lg={6} xl={4} key="back" >
          <Image onClick={this.handleClick} src={this.props.imageURL} roundedCircle  style={{ maxHeight: "35vh", border: "solid 15px grey", opacity: "0.5" }}/>
        </Col>
      </ReactCardFlip>
        
      </div>
    );
  }
}

export default FaceImage;
