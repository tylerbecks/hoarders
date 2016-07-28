import React from 'react';
import Navbar from 'react-bootstrap/lib/NavBar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export default class MyNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar className="navvy">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
