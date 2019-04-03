import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import {
//   Navbar,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink 
//   } from 'reactstrap';


class AppNav extends Component {

  render() {
    return (
      <div>
        <h2>
        <Nav >
          <Nav.Item>
            <Nav.Link href="/">Who's the Murderer?</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/upload-file">Upload an image</Nav.Link>
          </Nav.Item>
        </Nav>
        </h2>
      </div>
    )
  }
}

export default AppNav;
