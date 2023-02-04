import React, { useEffect, useState } from 'react';
import { getMessages } from '../api/messagesData';
import { useAuth } from '../utils/context/authContext';
import MessageCard from '../components/MessageCard';
import MessageForm from '../components/forms/MessageForm';

function MainPage() {
  const [messages, setMessages] = useState([]);

  const { user } = useAuth();

  const getAllTheMessages = () => {
    getMessages(user.uid).then(setMessages);
  };

  useEffect(() => {
    getAllTheMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {messages.map((message) => (
          <MessageCard key={message.firebaseKey} messageObj={message} onUpdate={getAllTheMessages} />
        ))}
      </div>

      <MessageForm onUpdate={getAllTheMessages} />

    </div>
  );
}

export default MainPage;
