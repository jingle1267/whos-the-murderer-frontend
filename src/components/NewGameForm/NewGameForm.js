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
            <Col md={{ span: 2, offset: 5 }}>
              <Form  onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group controlId="num_faces">
                  <Form.Label>How many faces?</Form.Label>
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
