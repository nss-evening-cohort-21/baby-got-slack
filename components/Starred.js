import React, { useEffect, useState } from 'react';
import { starredChannels } from '../api/channelsData';
import { useAuth } from '../utils/context/authContext';
import ChannelCard from './ChannelCard';

export default function Starred() {
  const { user } = useAuth();
  const [starred, setStarred] = useState([]);

  const getStarredChannel = () => {
    starredChannels(user.uid).then(setStarred);
  };

  useEffect(() => {
    getStarredChannel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {starred?.map((star) => (
        <ChannelCard key={star.firebaseKey} starObj={star} onUpdate={getStarredChannel} />
      ))}
    </div>
  );
}
