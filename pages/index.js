import React, { useEffect, useState } from 'react';
import { getMessages } from '../api/messagesData';
import { useAuth } from '../utils/context/authContext';
import MessageCard from '../components/MessageCard';
import MessageForm from '../components/forms/MessageForm';
import ChannelHeader from '../components/ChannelHeader';

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
      <div id="channel-card">
        <ChannelHeader />
      </div>

      <div id="message-container">
        {messages.map((message) => (
          <MessageCard key={message.firebaseKey} messageObj={message} onUpdate={getAllTheMessages} isMine={message.uid === user.uid} />
        ))}
      </div><MessageForm onUpdate={getAllTheMessages} />
    </div>
  );
}

export default MainPage;
