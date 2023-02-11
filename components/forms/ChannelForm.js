import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createChannel, updateChannel } from '../../api/channelsData';

const initialState = {
  name: '',
  topic: '',
  description: '',
  private: false,
  starred: false,
};

function ChannelForm({
  obj, onUpdate, buttonTitle,
}) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const handleClose = () => {
    setShow(false);
    setFormInput(obj);
  };
  const handleShow = () => setShow(true);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj.firebaseKey, user]);

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
        .then(() => {
          onUpdate();
          handleClose();
        });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createChannel(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateChannel(patchPayload).then(() => {
          router.push(`/channel/${name}`);
          onUpdate();
          handleClose();
        });
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        style={{
          width: '150px',
          fontSize: '14px',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          color: '#D3D3D3',
          textAlign: 'left',
          paddingLeft: '10px',
        }}
      >{buttonTitle}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4 text-gray-700">Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
          </div>

          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="w-full px-3">
                <FloatingLabel
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                >
                  Name
                </FloatingLabel>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full max-w-xs"
                  style={{ width: '100%', marginBottom: '15px' }}
                  name="name"
                  value={formInput.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="# e.g. plan-budget"
                />
              </div>
              <div className="w-full px-3">
                <FloatingLabel className="block text-gray-700 text-sm font-bold mb-2" for="topic">
                  Topic
                </FloatingLabel>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full max-w-xs"
                  style={{ width: '100%', marginBottom: '15px' }}
                  name="topic"
                  value={formInput.topic}
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                />
              </div>

              <div className="w-full px-3">
                <FloatingLabel className="block text-gray-700 text-sm font-bold mb-2" for="description">
                  Description (optional)
                </FloatingLabel>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full max-w-xs"
                  style={{ width: '100%', marginBottom: '15px' }}
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
                  checked={formInput.private}
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
                  label="Star"
                  checked={formInput.starred}
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
                  id="create-channel"
                >{obj.firebaseKey ? 'Update' : 'Create'} Channel
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ChannelForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    topic: PropTypes.string,
    description: PropTypes.string,
    private: PropTypes.bool,
    starred: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
  buttonTitle: PropTypes.string.isRequired,
};

ChannelForm.defaultProps = {
  obj: initialState,
  onUpdate: () => {},
};

export default ChannelForm;
