import Link from 'next/link';
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function Sidebar() {
  return (
    <Navbar className="sidebar d-flex flex-column left-sidebar" bg="light" expand="lg">
      <Navbar.Brand href="/">Baby Got Slack</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <NavDropdown title="Channels" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          <Link passHref href="/messages/new">
            <Nav.Link>New Message</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
