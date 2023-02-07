import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleChannel, updateChannel } from '../../api/channelsData';
import { deleteChannelMessages } from '../../api/mergedData';

const initialState = {
  name: '',
  topic: '',
  description: '',
  starred: false,
  private: false,
};

function ChannelHeaderForm({ obj, onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formInput, setFormInput] = useState(initialState);
  // const [description, setDescription] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  const deleteThisChannel = () => {
    if (window.confirm(`Delete ${obj.name}`)) {
      deleteChannelMessages(obj.firebaseKey).then(() => onUpdate());
    }
  };

  const getChannelDeets = () => {
    getSingleChannel(firebaseKey).then(setFormInput);
  };

  useEffect(() => {
    getChannelDeets();
    if (obj.firebaseKey) setFormInput(obj);
  }, [formInput, user]);

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
        .then(() => router.push(`/channels/${obj.firebaseKey}`));
    }
    // } else {
    // const payload = { ...formInput, uid: user.uid };
    // createChannel(payload).then(({ name }) => {
    //   const patchPayload = { firebaseKey: name };
    //   updateChannel(patchPayload).then(() => {
    onUpdate();
    handleClose();
    //     });
    //   });
    // }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        style={{
          width: '50px',
          fontSize: '6px',
          marginLeft: '20px',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: '#5A5A5A',
        }}
      >╲╱
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Channel Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4 text-gray-700">Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
          </div>

          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="w-full px-3">
                <FloatingLabel
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="topic"
                >
                  Topic
                </FloatingLabel>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full max-w-xs"
                  style={{ width: '100%' }}
                  name="topic"
                  value={formInput.topic}
                  onChange={handleChange}
                  type="text"
                  placeholder="Add a topic"
                />
              </div>
              <div className="w-full px-3">
                <FloatingLabel className="block text-gray-700 text-sm font-bold mb-2" for="description">
                  Description (optional)
                </FloatingLabel>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full max-w-xs"
                  style={{ width: '100%' }}
                  name="description"
                  value={formInput.description}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
                <p className="text-gray-600" style={{ fontSize: '12px', marginTop: '5px' }}>What is this channel about?</p>

              </div>
              <div className="mb-4">
                <Form.Check
                  className="text-grey mb-3"
                  type="switch"
                  id="private"
                  name="private"
                  label="Make private"
                  checked=""
                  onChange={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      private: e.target.checked,
                    }));
                  }}
                />
              </div>
              <div className="mb-4">
                <Form.Check
                  className="text-grey mb-3"
                  type="switch"
                  id="starred"
                  name="starred"
                  label="Move to starred"
                  checked=""
                  onChange={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      starred: e.target.checked,
                    }));
                  }}
                />
              </div>
              <Modal.Footer>
                <Button
                  type="submit"
                >
                  {obj.firebaseKey ? 'Update' : 'Update'}
                </Button>
                <Button variant="danger" onClick={deleteThisChannel} className="m-2">
                  Delete
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ChannelHeaderForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    topic: PropTypes.string,
    description: PropTypes.string,
    private: PropTypes.bool,
    starred: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

ChannelHeaderForm.defaultProps = {
  obj: initialState,
  onUpdate: () => {},
};

export default ChannelHeaderForm;
