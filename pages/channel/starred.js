import React, { useEffect, useState } from 'react';
import { Link } from 'next/link';
import { Nav } from 'react-bootstrap';
import { starredChannels } from '../../api/channelsData';
import { useAuth } from '../../utils/context/authContext';

export default function StarredChannels() {
  const { user } = useAuth();
  const [starredChans, setStarredChans] = useState([]);

  const getAllStarredChannels = () => {
    starredChannels(user.uid).then(setStarredChans);
  };
  useEffect(() => {
    getAllStarredChannels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {starredChans.map((channel) => (
        <Link key={channel.firebaseKey} passHref href={`/channel/${channel.firebaseKey}`}>
          <Nav.Link># {channel.name}</Nav.Link>
        </Link>
      ))}
    </div>
  );
}
