import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMessage, updateMessage } from '../../api/messagesData';

const initialState = {
  message: '',
};

export default function MessageForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [channels, setChannels] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const time = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  });

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
      const payload = { ...formInput, uid: user.uid, timestamp: time };
      createMessage(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMessage(patchPayload).then(() => router.push('/'));
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Message</h2>
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

      <Button variant="primary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Message
      </Button>

    </Form>
  );
}

MessageForm.propTypes = {
  obj: PropTypes.shape({
    message: PropTypes.string,
    channel_id: PropTypes.string,
    timestamp: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MessageForm.defaultProps = {
  obj: initialState,
};
