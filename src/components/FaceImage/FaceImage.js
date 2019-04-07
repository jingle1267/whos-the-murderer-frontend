import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';

class FaceImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClickedImage(event)
    // console.log(event.target)
    console.log(event.target.id)
    this.setState({ 
      isFlipped: true 
    })
  }

  handleWinningGuess = () => {
    if (this.props.imageURL === this.props.murderer) {
      return <Col lg={6} xl={4} >
        <div id={this.props.imageURL}
          style={{ 
            height: "30vh",
            width: "30vh",
            borderRadius: "50%",
            border: "solid 15px black",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${this.props.imageURL})`
          }}>
        </div>
        {/* <Image src={this.props.imageURL} roundedCircle  id="murderer" className="enlarge" style={{ maxHeight: "30vh", border: "solid 15px black" }}/>  */}
      </Col> 
    } else {
      return <Col lg={6} xl={4} >
        <div id={this.props.imageURL}
          style={{ 
            height: "30vh",
            width: "30vh",
            borderRadius: "50%",
            border: "solid 15px grey",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${this.props.imageURL})`,
            opacity: "0.5"
          }}>
        </div>
          {/* <Image src={this.props.imageURL} roundedCircle  style={{ maxHeight: "30vh", border: "solid 15px grey", opacity: "0.5" }}/>  */}
        </Col> 
    }
  }

  render() {
    return (
      <div>
        { this.props.isWon ? this.handleWinningGuess() :
          <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
            <Col lg={6} xl={4} key="front" >
              {/* <Image onClick={this.handleClick} src={this.props.imageURL} roundedCircle style={{ maxHeight: "30vh", border: "solid 15px grey" }}/> */}

              <div onClick={this.handleClick}
                id={this.props.imageURL}
                style={{ 
                  height: "30vh",
                  width: "30vh",
                  borderRadius: "50%",
                  border: "solid 15px grey",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${this.props.imageURL})`
                }}>
              </div>
            </Col>
            <Col lg={6} xl={4} key="back" >
              <div
                id={this.props.imageURL}
                style={{ 
                  height: "30vh",
                  width: "30vh",
                  borderRadius: "50%",
                  border: "solid 15px grey",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${this.props.imageURL})`,
                  opacity: "0.5"
                }}>
              </div>
              {/* <Image src={this.props.imageURL} roundedCircle  style={{ maxHeight: "30vh", border: "solid 15px grey", opacity: "0.5" }}/>  */}
            </Col>         
          </ReactCardFlip>
        }
      </div>
    );
  }
}

export default FaceImage;
