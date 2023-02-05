import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteMessage } from '../api/messagesData';

function MessageCard({ messageObj, onUpdate }) {
  const deleteThisMessage = () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(messageObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{messageObj.name}</Card.Title>
        <Card.Subtitle>{messageObj.timestamp}</Card.Subtitle>
        <p className="card-text bold">{messageObj.message}</p>
        <Link href={`/messages/edit/${messageObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMessage} className="m-2">
          DELETE
        </Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MessageCard;
