import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function MessageCard({ messageObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{messageObj.timestamp}</Card.Title>
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
