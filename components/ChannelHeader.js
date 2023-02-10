import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { deleteChannel, getSingleChannel } from '../api/channelsData';
import { useAuth } from '../utils/context/authContext';
import ChannelForm from './forms/ChannelForm';

function ChannelHeader() {
  const [channelObject, setChannelObject] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const deleteThisChannel = () => {
    if (window.confirm('Are you sure you want to delete this Channel?')) {
      deleteChannel(firebaseKey).then(() => router.push('/'));
    }
  };

  const getChannelDetails = () => {
    getSingleChannel(firebaseKey).then(setChannelObject);
  };

  useEffect(() => {
    getChannelDetails();
  }, [firebaseKey, user]);

  return (
    <div id="channel-header">
      <div className="card">
        <div className="card-body" style={{ display: 'flex', flex: 'flex-wrap' }}>
          <h5 className="card-title"># {channelObject?.name}</h5>
          <ChannelForm buttonTitle="╲╱" obj={channelObject} onUpdate={getChannelDetails} />
          <Button className="position-absolute top-0 end-0" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={deleteThisChannel}> 🗑️ </Button>
        </div>
      </div>
    </div>
  );
}

export default ChannelHeader;
