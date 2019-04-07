import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

class AppNav extends Component {

  render() {
    return (
      <div>

        <Container   style={{ marginBottom: "10px", borderBottom: "solid 0.2em #005c99", padding: "25px 0px 5px 0px"}}>
          <center>
          <button style={{ float: "right", marginTop: "2%", marginBottom: "10px" }} >
            <Link className="links" to={"/upload-file"}>Upload your<br/> own face!</Link>
          </button>
            <Link className="NavBar" style={{ textDecoration: "None",  padding: "5px 5px", marginRight: "-8%"}} to={"/"}>Who's the Murderer?</Link>
            <div className="subtitle">Created by
            <a rel="noopener noreferrer" className="text-link" href="https://github.com/wynspeare/" target="_blank"> Caroline Cessaro</a>
            </div>
          </center>
        </Container>

      </div>
    )
  }
}

export default AppNav;
