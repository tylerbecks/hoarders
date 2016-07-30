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
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Hoarders</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            <NavItem eventKey={1} href="#">
            Score: {this.props.bankedCoins.length}
            </NavItem>
            <NavItem eventKey={1} href="#">
            You are carrying {this.props.carriedCoins.length} coins
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem
              eventKey={1}
              href="#"
              onClick={this.props.logOutUser}
            >Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
