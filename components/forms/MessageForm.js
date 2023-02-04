import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form, Stack,
} from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMessage, updateMessage } from '../../api/messagesData';
import { getChannels } from '../../api/channelsData';

const initialState = {
  message: '',
};

export default function MessageForm({ obj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const [channels, setChannels] = useState([]);
  const { user } = useAuth();
  const time = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  });

  useEffect(() => {
    getChannels().then(setChannels);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMessage(formInput)
        .then(onUpdate);
    } else {
      const payload = {
        ...formInput, uid: user.uid, timestamp: time, name: user.displayName,
      };
      createMessage(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMessage(patchPayload).then(() => {
          onUpdate();
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack direction="horizontal" gap={3}>
        <FloatingLabel className="mb-3" label="Message" controlId="message">
          <Form.Control
            type="text"
            placeholder="Write Your Message"
            name="message"
            value={formInput.message}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel label="Channel" controlId="channel_id">
          <Form.Select
            aria-label="Channel Id"
            name="channel_id"
            onChange={handleChange}
            className="mb-3"
            value={obj.channel_id}
            required
          >
            <option value="">Select A Channel</option>
            {
            channels.map((channel) => (
              <option
                key={channel.firebaseKey}
                value={channel.firebaseKey}
              >
                {channel.name}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>

        <Button variant="primary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Message
        </Button>
      </Stack>
    </Form>
  );
}

MessageForm.propTypes = {
  obj: PropTypes.shape({
    message: PropTypes.string,
    channel_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

MessageForm.defaultProps = {
  obj: initialState,
  onUpdate: () => {},
};
