import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MessageForm from '../../components/forms/MessageForm';
import ChannelHeader from '../../components/ChannelHeader';
import MessageCard from '../../components/MessageCard';
import { viewChannelMessages } from '../../api/mergedData';

function ViewChannel() {
  // const [messages, setMessages] = useState([]);
  const router = useRouter();
  const [channelDetails, setChannelDetails] = useState({});

  const { firebaseKey } = router.query;

  const getAllTheMessages = () => {
    viewChannelMessages(firebaseKey).then(setChannelDetails);
  };

  useEffect(() => {
    viewChannelMessages(firebaseKey).then(setChannelDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (

    <div className="text-center my-4">
      <div id="channel-card">
        <ChannelHeader />
      </div>

      <div id="message-container">
        {channelDetails.messages?.map((message) => (
          <MessageCard key={message.firebaseKey} messageObj={message} onUpdate={getAllTheMessages} />
        ))}
      </div>

      <div style={{
        backgroundColor: '#F8F8F8',
      }}
      >
        <MessageForm onUpdate={getAllTheMessages} />
      </div>

    </div>
  );
}

export default ViewChannel;
