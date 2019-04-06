import React, { Component } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

class NewGameForm extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handleGameDifficulty(event)
  }

  render() {
    return (
      <div>
        <Container className="FileUpload">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
            <div className="text">Who's the Murderer is a guessing game built using image analysis! First choose how many faces you want to play against - a higher number means you'll be shown more faces!
            <br/><br/>
            Each time you play a game a new murderer is randomly selected and analyzed to find their features.  
            <a rel="noopener noreferrer" className="text-link" href="https://github.com/wynspeare/whos-the-murderer-frontend" target="_blank">  Check out my code here!</a>
            </div>
            </Col>
          </Row>
          <br/> <br/>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
            <Form.Label>How many faces?</Form.Label>              
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 2, offset: 5 }}>
              <Form  onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group controlId="num_faces">
                  {/* <Form.Label>How many faces?</Form.Label> */}
                  <small> Enter a number</small>
                  <Form.Control/>
                  </Form.Group>
                  <button type="submit">
                    Set difficulty
                  </button>
                </Form>
            </Col>
          </Row>
        </Container>
        
      </div>
    );
  }
}

export default NewGameForm;
