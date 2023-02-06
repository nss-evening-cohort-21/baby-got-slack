import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { deleteMessage } from '../api/messagesData';

function MessageCard({ messageObj, onUpdate }) {
  const deleteThisMessage = () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(messageObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card id="message-card" className="border-0 hover-overlay ripple shadow-1-strong" style={{ width: '91%', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{messageObj.name}</Card.Title>
        <Card.Subtitle>{messageObj.timestamp}</Card.Subtitle>
        <p className="card-text bold">{messageObj.message}</p>
        <DropdownButton className="position-absolute top-0 end-0" id="dropdown-basic-button" title="" size="sm" variant="light">
          <Dropdown.Item href={`/messages/edit/${messageObj.firebaseKey}`}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={deleteThisMessage}>Delete</Dropdown.Item>
        </DropdownButton>
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
};

export default MessageCard;
