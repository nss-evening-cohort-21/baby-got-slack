import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, FloatingLabel, Form, Stack,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createMessage, updateMessage } from '../../api/messagesData';
import { getChannels } from '../../api/channelsData';

const initialState = {
  message: '',
};

export default function MessageForm({ obj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setChannels] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

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
        .then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput, uid: user.uid, timestamp: time, name: user.displayName, channel_id: firebaseKey,
      };
      createMessage(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMessage(patchPayload).then(() => {
          onUpdate();
          setFormInput(initialState);
        });
      });
    }
  };

  return (
    <Card id="footer" style={{ height: '75px', width: '80%' }}>
      <Form onSubmit={handleSubmit}>
        <Stack direction="horizontal" gap={3}>
          <FloatingLabel style={{ width: '70%' }} className="mb-3" label="Message" controlId="message">
            <Form.Control
              type="text"
              placeholder="Write Your Message"
              name="message"
              value={formInput.message}
              style={{ height: '75px' }}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <Button variant="primary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Message
          </Button>
        </Stack>
      </Form>
    </Card>
  );
}

MessageForm.propTypes = {
  obj: PropTypes.shape({
    message: PropTypes.string,
    // channel_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

MessageForm.defaultProps = {
  obj: initialState,
  onUpdate: () => {},
};
