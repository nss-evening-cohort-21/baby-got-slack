import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleChannel } from '../../../api/channelsData';
import ChannelForm from '../../../components/forms/ChannelForm';

export default function EditTeam() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [editChannel, setEditChannel] = useState({});

  // TODO: make a call to the API to get the Team data
  useEffect(() => {
    getSingleChannel(firebaseKey).then(setEditChannel);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<ChannelForm obj={editChannel} key={firebaseKey} />);
}
