import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MessageForm from '../../components/forms/MessageForm';
import ChannelHeader from '../../components/ChannelHeader';
import MessageCard from '../../components/MessageCard';
import { viewChannelMessages } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';

function ViewChannel() {
  const router = useRouter();
  const [channelDetails, setChannelDetails] = useState({});
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  const getAllTheMessages = () => {
    viewChannelMessages(firebaseKey).then(setChannelDetails);
  };

  useEffect(() => {
    viewChannelMessages(firebaseKey).then(setChannelDetails);
  }, [firebaseKey]);

  return (

    <>
      <Head>
        <title>{channelDetails.name}</title>
      </Head>
      <div className="text-center my-4">
        <div id="channel-card">
          <ChannelHeader />
        </div>

        <div id="message-container">
          {channelDetails.messages?.map((message) => (
            <MessageCard key={message.firebaseKey} messageObj={message} onUpdate={getAllTheMessages} isMine={message.uid === user.uid} />
          ))}
        </div>

        <div style={{
          backgroundColor: '#F8F8F8',
        }}
        >
          <MessageForm onUpdate={getAllTheMessages} />
        </div>

      </div>
    </>
  );
}

export default ViewChannel;
