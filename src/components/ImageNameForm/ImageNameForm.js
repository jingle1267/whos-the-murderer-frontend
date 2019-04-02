import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import ImageNamesAPI from '../../api/djangoAPI/ImageNamesAPI';


class ImageNameForm extends Component {

  handleSaveImageName = (ev) => {
    ev.preventDefault()
    // const imageName = ev.target.elements[0].value

    const imageName = {
      image_name: ev.target.elements[0].value,
    }

    console.log(imageName)
    ImageNamesAPI.addImage(imageName)
      .then((response) => {
      console.log(response)
      })
  }


  render() {
    return (
      <div>
        <Form  onSubmit={this.handleSaveImageName.bind(this)}>
        <Form.Group>
            {/* <Form.Label>How many faces?</Form.Label> */}
            {/* <small> Enter a number</small> */}
            <Form.Control style={{ width: "50%"}} />
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
