import React, { Component } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import ImageNamesAPI from '../../api/djangoAPI/ImageNamesAPI';


class ImageNameForm extends Component {

  handleSaveImageName = (ev) => {
    ev.preventDefault()
    const imageName = {
      image_name: ev.target.elements[0].value,
    }
    ev.target.reset()
    ImageNamesAPI.addImage(imageName)
      .then((response) => {
        if (response.status === 201) {
          this.props.handleSaveImageName(imageName)
        } else {
          alert("Name must be unique please try again.")
        }
      })
  }

  render() {
    return (
      <div className="FileUpload">
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Label>Please choose a name for the image.</Form.Label>    
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
            <Form  onSubmit={this.handleSaveImageName.bind(this)}>
              <Form.Group>
                <small>Must be unique!</small>
                <Form.Control defaultValue={ null } />
              </Form.Group>
                <button type="submit">
                  Next
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
        
      </div>
    );
  }
}

export default ImageNameForm;
