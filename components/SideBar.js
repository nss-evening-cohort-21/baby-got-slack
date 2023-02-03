import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function Sidebar() {
  const users = [
    { id: 1, name: 'Channel 1' },
    { id: 2, name: 'Channel 2' },
    { id: 3, name: 'Channel 3' },
    { id: 4, name: 'Channel 4' },
  ];

  return (
    <Navbar className="sidebar d-flex flex-column left-sidebar" bg="light" expand="lg">
      <Navbar.Brand href="/">Baby Got Slack</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <NavDropdown title="Channels" id="basic-nav-dropdown">
            {users.map((user) => (
              <NavDropdown.Item key={user.id} href={`#action/${user.id}`}>
                {user.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
