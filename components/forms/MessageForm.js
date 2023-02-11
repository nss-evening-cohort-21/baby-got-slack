import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form, Stack,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
    <footer id="footer" className="text-center">
      <Form
        id="form"
        onSubmit={handleSubmit}
        style={{
          textAlign: 'center', width: '50vw', marginLeft: '15vw', marginRight: '15vw',
        }}
      >
        <Stack direction="horizontal" gap={3}>
          <FloatingLabel id="messageBox" style={{ width: '900%', border: 'transparent' }} className="mb-3" label="Message" controlId="message">
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

          <Button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} type="submit"><Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEm0lEQVR4nNWaaagVZRjHf6OlZgu2p5Vat0zq2EZGUElFRNBGQVAQQVG3PpzqY2UEQRDVJyOEpA9FRdsxaCOKyrqVtCmYtggtlDdtN1tuVuY98cB/4OFl9nvOnLl/GO6Zmeed933eef7PNhcmNy4GPgHeYZLiNGA10NWxmUmGo4FnnQLj+vsEkwQHAyuAHVr4VuBm4EWdX0/DsYcW/LsW/I8U2h+IgB90fSENxa7AsFvoTuBp4HAn09K976RUoxABlwJfOB68CpyQINtuKj/OBtY6BT4EzsqQ7zSNH2YiLzgFvpFZTckY0yh+mL0/7lzoj8ANwLRAbhdgenCtEfzYD1gmD2SL+RO4E9grQfYIYIMC3vSm8GN34DbgNy3CYsIDwOwU+XMUL7pKQ6YOmh9m61dqV70nWpQxZtgFv7+B4wfND/NE650C7wJLMuRnAA85eTtuHCQ/TgFG3GI+U3yIctKQ9wMlXkoYUws/FioCx55os8zEPE8WTtUOd93xPXBggmxf+WG7+SDwnybZBiwFZhYYe53zYL+6lMTMMkQkN91zfoRJ3b9K6pJ2MoS9pbvdG3gY2KTfdj0JPedHmNSNy6SGSsSSVRq7XV7NgqOdr0kIij3nR1pSd2KJZ5gr/VpjR4HFwNU6/wNYkDG2J/wIk7qPpVQZXAaMafzbMsEhZ5pXZIydcPwIk7pNMisfafMwNeDDCpmnHe/p2lMF1lGJH3M14U494BcR24JWGVgO9byL0te4e/fq+pcpudaE+LGvdm+7Bo7pfBblsUDB0J6zRYEyxhnapB3B9QnzY6Z2fFtQXs6nGs5zz1qrN+y91hbdsznzEBXhR1pSd2xFBSItLjbJx4DdgvvP6d6bBbnWKsKPN5wCozlJXZEA+YxL08OEz9u6Reg5BZ/bLsKP14Mcx5S5TwpllZshhlQE2TN+As5MkFkk7lkAPb/EsztF+XEMcAewMVDqZ+AR4AK5yjQscTnQR8BhCTIzdK+rjSqKqGr8iJX6NFBqq1PKl53DyrHiWGCVYBKWS2ZDwJk8tHqRX7WkVGwy8WHe6FHgSefhbs2Y6EKZ05j6t2XQ7nX9YeZyk1r4cb3RVXpxUca4OeKMyV5bYd5OP+sP626s0wSWP6XBnMVrkltZYZ6oX/WHxxpNcHKGzC3OE1rGUBatOurzUU0yL+X+YjkBqxpPrzhHu9/1+RQtcjylCDoU+FaLWJdRKOWh0+/+1QEu8IXYW7VKXDl29UEmbHs2gh/HaQLrWXlMc+Q2Dp3kksOXBxE/8nCuW5w3t9gUvgIO0vWjXEL6Sgll2nX0r67SJNYVjLHMpTW2+LAuiTkzouQyD506+rtLNcldgZv9S822JBzpPN1bOcpEdfV379ck9j3jcpHa0pRLcsbNl9nFzYc9U+RadfV3V2qi5arDk5rNaZinGr2rdCepVm/XwQ+C/zqw456S4+e63tjqBGU6dfADt6NdZcBlCjAfND93rnqfQXz/iJtsqyoEOo9DnDL2SWFW3d8/RtRYq9IiSurkb3Rv5va6+NEPzHYV6Xhd/Ohn/rbecW/g388nAlPmA7WoSvHjfwQeuXtG9wdPAAAAAElFTkSuQmCC" width="170px" height="170px" />
          </Button>
        </Stack>
      </Form>
    </footer>
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
