import React from 'react';
import { Card } from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { deleteChannelMessages } from '../api/mergedData';

function ChannelCard({ channelObj, onUpdate }) {
  const deleteThisChannel = () => {
    if (window.confirm(`Delete ${channelObj.name}?`)) {
      deleteChannelMessages(channelObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card>
      <Card.Header>#{channelObj.name}</Card.Header>
      <Card.Body>
        <Card.Title>{channelObj.starred}</Card.Title>
        <Card.Text>{channelObj.description}</Card.Text>
        <Button variant="danger" onClick={deleteThisChannel} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ChannelCard.propTypes = {
  channelObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    starred: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ChannelCard;
