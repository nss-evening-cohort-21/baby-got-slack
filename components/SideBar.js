import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { getChannels } from '../api/channelsData';
import ChannelForm from './forms/ChannelForm';

function Sidebar() {
  const [channels, setChannels] = useState([]); // creating 2 state variables channels is an empty array

  // state variables used in React components to store data that affects components' behavior/render
  // channels and showForm manage data and state of component

  // channels stores an array of channel objects used to populate list of channels shown on sidebar
  // channels starts out as empty array then useEffect is called to getChannels when component is mounted
  // getChannels retrieves list of channels from API
  // returned data used to update channels state variable, component is re-rendered with new channel list

  // showForm controls visibility of ChannelForm component (CF adds new channels to list)
  // showForm is boolean initially set to false which means the form is hidden
  // When user clicks add channels handleShow function is called, showForm becomes true, revealing CF

  // in conclusion, channels and showForm state variables are necessary
  // because they manage data/behavior of sidebar component
  // they allow user to interact with component and add new channels to list

  const getAllChannels = () => {
    getChannels().then(setChannels); // calls getChannels function, sets returned result to channels state variable
  };

  useEffect(() => {
    getAllChannels(); // calls getAllChannels function whenever channels state variable changes, if there is no change there will be no re-render
  }, [channels]); // useEffect depends the values of state variable channels, dependency array helps to avoid unnecessary re-renders
  // retrieves an updated list of channels whenever the state variable changes

  // returns a Bootstrap navbar with various components & elements i.e. brand, toggle, collapse
  // Link component used for navigation
  // Button component used to toggle form visibility

  // ChannelForm component inside the navbar
  // SideBar component exported as default export
  return (
    <Navbar className="sidebar d-flex flex-column left-sidebar" expand="lg">
      <div>
        <Navbar.Brand href="/" style={{ fontSize: '20px', color: '#E2EAF3' }}>
          Baby Got Slack
        </Navbar.Brand>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ color: '#E2EAF3' }}>Channels
            </div>
          </div>
          {channels.map((channel) => (
            <Link key={channel.firebaseKey} passHref href={`/channel/${channel.firebaseKey}`}>
              <Nav.Link># {channel.name}</Nav.Link>
            </Link>
          ))}

          {/* using map method to iterate over array of channels
          Link component returned for each channel in the array
          key prop is set to channel.firebaseKey to uniquely id each channel item
          passHref prop set to true to pass href prop to DOM element
          href prop is /channel/{channel.firebaseKey} */}

          <ChannelForm onUpdate={getAllChannels} />

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
