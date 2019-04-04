import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

class AppNav extends Component {

  render() {
    return (
      <div>

        <Container   style={{ marginBottom: "10px", borderBottom: "solid 0.2em #005c99", padding: "25px 0px"}}>
          <center>
          <Link className="NavBar" style={{ textDecoration: "None",  padding: "5px 5px"}} to={"/"}>Who's the Murderer?</Link>
          
          </center>
          <button style={{ float: "right", marginTop: "-50px" }} >
            <Link className="links" to={"/upload-file"}>Upload an image</Link>
          </button>
        </Container>

      </div>
    )
  }
}

export default AppNav;
