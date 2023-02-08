import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleChannel } from '../api/channelsData';
import { useAuth } from '../utils/context/authContext';
import ChannelForm from './forms/ChannelForm';

function ChannelHeader() {
  const [channelObject, setChannelObject] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

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
        </div>
      </div>
    </div>
  );
}

export default ChannelHeader;
