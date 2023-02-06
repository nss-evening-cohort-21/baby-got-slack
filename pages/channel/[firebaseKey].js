import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MessageForm from '../../components/forms/MessageForm';
import { getChannelMessages } from '../../api/channelsData';
import ChannelHeader from '../../components/ChannelHeader';
import MessageCard from '../../components/MessageCard';

function ViewChannel() {
  // const [messages, setMessages] = useState([]);
  const router = useRouter();
  const [channelDetails, setChannelDetails] = useState({});

  const { firebaseKey } = router.query;

  const getAllTheMessages = () => {
    getChannelMessages(firebaseKey).then(setChannelDetails);
  };

  useEffect(() => {
    getAllTheMessages();
  }, []);

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
