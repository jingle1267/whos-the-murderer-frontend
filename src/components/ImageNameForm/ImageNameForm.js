import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
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
        <Form  onSubmit={this.handleSaveImageName.bind(this)}>
        <Form.Group>
            <Form.Label>Please choose a name for the image.</Form.Label>
            <br/>
            <small>Must be unique!</small>
            <Form.Control defaultValue={ null } />
          </Form.Group>

          <Button type="submit">
            Save Image Name
          </Button>
        </Form>
        
      </div>
    );
  }
}

export default ImageNameForm;
