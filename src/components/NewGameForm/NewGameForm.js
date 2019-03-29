import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class NewGameForm extends Component {

  handleSubmit(event){
    event.preventDefault();
    this.props.handleGameDifficulty(event)
  }

  render() {
    return (
      <div>
        <Form  onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group controlId="num_faces">
        Step 1 -  
            <Form.Label>How many faces?</Form.Label>
            <small> Enter a number</small>
            <Form.Control style={{ width: "5%" }} />
          </Form.Group>

          <Button type="submit">
            Set difficulty
          </Button>
        </Form>
        
      </div>
    );
  }
}

export default NewGameForm;
