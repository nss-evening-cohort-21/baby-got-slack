import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MessageForm from '../../components/forms/MessageForm';
import DmHeader from '../../components/DmHeader';
import MessageCard from '../../components/MessageCard';
import { viewChannelMessages } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';

function ViewChannel() {
  const router = useRouter();
  const [dmDetails, setDmDetails] = useState({});
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  const getAllTheMessages = () => {
    viewChannelMessages(firebaseKey).then(setDmDetails);
  };

  useEffect(() => {
    viewChannelMessages(firebaseKey).then(setDmDetails);
  }, [firebaseKey]);

  return (

    <div className="text-center my-4">
      <div id="channel-card">
        <DmHeader />
      </div>

      <div id="message-container">
        {dmDetails.messages?.map((message) => (
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
  );
}

export default ViewChannel;
