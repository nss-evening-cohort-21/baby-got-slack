import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';

function MessageCard({ messageObj }) {
  const { user } = useAuth();
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{user.displayName}</Card.Title>
        <Card.Subtitle>{messageObj.timestamp}</Card.Subtitle>
        <p className="card-text bold">{messageObj.message}</p>
      </Card.Body>
    </Card>
  );
}

MessageCard.propTypes = {
  messageObj: PropTypes.shape({
    channel_id: PropTypes.string,
    timestamp: PropTypes.string,
    message: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default MessageCard;
