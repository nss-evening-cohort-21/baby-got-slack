import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MessageCard from '../../components/MessageCard';
import MessageForm from '../../components/forms/MessageForm';
import { getChannelMessages } from '../../api/channelsData';

function ViewChannel() {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getAllTheMessages = () => {
    getChannelMessages(firebaseKey).then(setMessages);
  };

  useEffect(() => {
    getChannelMessages(firebaseKey).then(setMessages);
  }, [firebaseKey]);

  return (

    <div className="text-center my-4">
      <div>
        {messages.map((message) => (
          <MessageCard key={message.firebaseKey} messageObj={message} onUpdate={getAllTheMessages} />
        ))}
      </div>

      <MessageForm onUpdate={getAllTheMessages} />

    </div>
  );
}

export default ViewChannel;
