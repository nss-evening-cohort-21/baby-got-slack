import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMessages } from '../../api/messagesData';
import MessageCard from '../../components/MessageCard';
import MessageForm from '../../components/forms/MessageForm';

function ViewChannel() {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getAllTheMessages = () => {
    getMessages(firebaseKey).then(setMessages);
  };

  useEffect(() => {
    getMessages(firebaseKey).then(setMessages);
  }, [firebaseKey]);

  return (

    <div className="text-center my-4">
      <div>
        {messages.map((message) => (
          <MessageCard key={message.firebaseKey} messageObj={message} onUpdate={getAllTheMessages} />
        ))}
      </div>

      <MessageForm />

    </div>
  );
}

export default ViewChannel;
