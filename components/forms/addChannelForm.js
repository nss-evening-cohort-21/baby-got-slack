import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button, { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createChannel, updateChannel } from '../../api/channelsData';

const initialState = {
  name: '',
  description: '',
};

function ChannelForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateChannel(formInput)
        .then(() => router.push(`/channel/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createChannel(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Modal onSubmit={handleSubmit}>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create a Channel</h5>
              <p>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</p>

              <FloatingLabel controlId="floatingInput1" label="Channel Name" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter a channel name"
                  name="name"
                  value={formInput.name}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingTextarea" label="Channel Description" className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Description (optional)"
                  style={{ height: '100px' }}
                  name="description"
                  value={formInput.description}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <Form.Check
                className="text-white mb-3"
                type="switch"
                id="private"
                name="sale"
                label="Make Private"
                checked={formInput.private}
                onChange={(e) => {
                  setFormInput((prevState) => ({
                    ...prevState,
                    private: e.target.checked,
                  }));
                }}
              />
            </div>

            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Book</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ChannelForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    starred: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

ChannelForm.defaultProps = {
  obj: initialState,
};

export default ChannelForm;
