/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { deleteMessage } from '../api/messagesData';
// import { useAuth } from '../utils/context/authContext';

function MessageCard({ messageObj, onUpdate, isMine }) {
  // const { user } = useAuth();
  const deleteThisMessage = () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(messageObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card id="message-card" className="border-0 hover-overlay ripple shadow-1-strong" style={{ width: '91%', margin: '10px' }}>
      <Card.Body id="message-body">
        <div style={{ paddingRight: '20px' }}>
          <Image src="data:image/png;base64,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" alt="userURL" width="40%" height="40%" id="navbar-profile-image" />
        </div>
        <div>
          <Card.Title style={{ fontWeight: 'bold' }}>{messageObj.name}</Card.Title>
          <Card.Subtitle style={{ fontSize: '12px' }}>{messageObj.timestamp}</Card.Subtitle>
          <p className="card-text bold" style={{ marginTop: '10px' }}>{messageObj.message}</p>
        </div>
        {isMine
          ? (
            <div>
              <DropdownButton className="position-absolute top-0 end-0" id="dropdown-basic-button" title="" size="sm" variant="light">
                <Dropdown.Item href={`/messages/edit/${messageObj.firebaseKey}`}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={deleteThisMessage}>Delete</Dropdown.Item>
              </DropdownButton>
            </div>
          )
          : ('')}
      </Card.Body>
    </Card>
  );
}

MessageCard.propTypes = {
  messageObj: PropTypes.shape({
    name: PropTypes.string,
    channel_id: PropTypes.string,
    timestamp: PropTypes.string,
    message: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  isMine: PropTypes.bool.isRequired,
};

export default MessageCard;
