import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Nav, Navbar } from 'react-bootstrap';
// import { useRouter } from 'next/router';
import { Nav, Navbar, Image } from 'react-bootstrap';
import { getChannels } from '../api/channelsData';
import ChannelForm from './forms/ChannelForm';
import { getDummyMembers } from '../api/dummyMembersData';

function Sidebar() {
  const [channels, setChannels] = useState([]); // creating 2 state variables channels is an empty array
  const [members, setMembers] = useState([]);
  // const router = useRouter();
  // const { firebaseKey } = router.query;

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

  const getAllDummyMembers = () => {
    getDummyMembers().then(setMembers);
  };

  useEffect(() => {
    getAllChannels();
    getAllDummyMembers(); // calls getAllChannels function whenever channels state variable changes, if there is no change there will be no re-render
  }, [channels]); // useEffect depends the values of state variable channels, dependency array helps to avoid unnecessary re-renders
  // retrieves an updated list of channels whenever the state variable changes

  // returns a Bootstrap navbar with various components & elements i.e. brand, toggle, collapse
  // Link component used for navigation
  // Button component used to toggle form visibility

  // ChannelForm component inside the navbar
  // SideBar component exported as default export
  return (
    <Navbar className="sidebar d-flex flex-column left-sidebar" expand="lg" id="sidebar" style={{ paddingLeft: '20px' }}>
      <div>
        <Navbar.Brand href="/" style={{ fontSize: '30px', color: '#FFFFFF', fontWeight: 'bold' }}>
          &nbsp; BABY GOT &nbsp;
          <Image src="data:image/png;base64,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" width="20%" />

        </Navbar.Brand>
      </div>
      <div>
        <Nav className="flex-column channel-names">
          <div style={{ marginTop: '50px', display: 'flex', alignItems: 'center' }}>

            <div style={{ color: '#E2EAF3', fontSize: '30px' }}>Channels <ChannelForm buttonTitle="+" width="200%" />
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

          <ChannelForm onUpdate={getAllChannels} buttonTitle="+ Add Channels" />

          <div style={{ marginTop: '50px', display: 'flex', alignItems: 'center' }}>
            <div style={{ color: '#E2EAF3' }}>Direct messages
            </div>
          </div>
          {members.map((member) => (
            <Link key={member.firebaseKey} passHref href={`/channel/${member.firebaseKey}`}>
              <Nav.Link># {member.name}</Nav.Link>
            </Link>
          ))}

        </Nav>
      </div>
    </Navbar>
  );
}

export default Sidebar;
