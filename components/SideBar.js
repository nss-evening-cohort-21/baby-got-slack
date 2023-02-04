import Link from 'next/link';
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ChannelForm from './forms/ChannelForm';

function Sidebar() {
  const users = [
    { id: 1, name: 'Channel 1' },
    { id: 2, name: 'Channel 2' },
    { id: 3, name: 'Channel 3' },
    { id: 4, name: 'Channel 4' },
  ];

  return (
    <Navbar className="sidebar d-flex flex-column left-sidebar" expand="lg">
      <div>
        <Navbar.Brand href="/" style={{ fontSize: '20px', color: '#959CA4' }}>
          Baby Got Slack
        </Navbar.Brand>
        <Link passHref href="/messages/new">
          Icon
        </Link>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <NavDropdown title="Channels" id="basic-nav-dropdown">
            {users.map((user) => (
              <NavDropdown.Item key={user.id} href={`#action/${user.id}`}>
                # {user.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <ChannelForm />

          <Link passHref href="/messages/new">
            <Nav.Link>New Message</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
