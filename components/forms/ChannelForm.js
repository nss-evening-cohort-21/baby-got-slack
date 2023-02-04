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
  description: '',
  private: false,
};

function ChannelForm({ obj }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const [channelList, setChannelList] = useState([]);

  const channelArray = (e) => {
    e.preventDefault();
    setChannelList([...channelList, e.target[0].value]);
    e.target[0].value = '';
  };

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
        .then(() => router.push(`/channels/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createChannel(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateChannel(patchPayload).then(() => {
          router.push(`/channels/${obj.firebaseKey}`);
        });
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        style={{
          backgroundColor: '#7D2B61', fontSize: '20px', color: '#959CA4', borderColor: '#7D2B61',
        }}
      >+ Add channels
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        onSubmit={handleSubmit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4 text-gray-700">Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
          </div>

          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="w-full px-3">
                <FloatingLabel
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                >
                  Name
                </FloatingLabel>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full max-w-xs"
                  name="name"
                  value={formInput.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="# e.g. plan-budget"
                />
              </div>
              <div className="w-full px-3">
                <FloatingLabel className="block text-gray-700 text-sm font-bold mb-2" for="description">
                  Description (optional)
                </FloatingLabel>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full max-w-xs"
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
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onSubmit={channelArray}
          >{obj.firebaseKey ? 'Update' : 'Create'} Create
            {/* style={{
            backgroundColor: '#DDDDDD',
            borderColor: '#DDDDDD',
          }} */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ChannelForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    private: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

ChannelForm.defaultProps = {
  obj: initialState,
};

export default ChannelForm;
