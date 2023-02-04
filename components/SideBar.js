import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { getChannels } from '../api/channelsData';
import ChannelForm from './forms/ChannelForm';

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const getAllChannels = () => {
    getChannels().then(setChannels);
  };

  useEffect(() => {
    getAllChannels();
  }, [channels]);

  const handleShow = () => {
    setShowForm(!showForm);
  };

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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>Channels</div>
            <Button
              type="button"
              onClick={handleShow}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                marginLeft: '5px',
                fontSize: '20px',
                color: '#959CA4',
                cursor: 'pointer',
              }}
            >
              +
            </Button>
          </div>
          {channels.map((channel) => (
            <Link key={channel.firebaseKey} passHref href={`channel/${channel.firebaseKey}`}>
              <Nav.Link># {channel.name}</Nav.Link>
            </Link>
          ))}

          <ChannelForm onUpdate={getAllChannels} />
          <Link passHref href="/messages/new">
            <Nav.Link>New Message</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
