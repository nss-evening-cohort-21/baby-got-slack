import React, { useEffect, useState } from 'react';
import { getMessages } from '../api/messagesData';
import { useAuth } from '../utils/context/authContext';
import MessageCard from '../components/MessageCard';

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
      <div>
        {messages.map((message) => (
          <MessageCard key={message.channel_id} messageObj={message} onUpdate={getAllTheMessages} />
        ))}
      </div>

    </div>
  );
}

export default MainPage;
