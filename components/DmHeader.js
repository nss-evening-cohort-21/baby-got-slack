import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { deleteChannel } from '../api/channelsData';
import { useAuth } from '../utils/context/authContext';
import { getSingleDummyMember } from '../api/dummyMembersData';

function DmHeader() {
  const [dmObject, setDmObject] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const deleteThisDm = () => {
    if (window.confirm('Are you sure you want to delete this Channel?')) {
      deleteChannel(firebaseKey).then(() => router.push('/'));
    }
  };

  const getChannelDetails = () => {
    getSingleDummyMember(firebaseKey).then(setDmObject);
  };

  useEffect(() => {
    getChannelDetails();
  }, [firebaseKey, user]);

  return (
    <div id="channel-header">
      <div className="card">
        <div className="card-body" style={{ display: 'flex', flex: 'flex-wrap' }}>
          <h5 className="card-title"># {dmObject?.name}</h5>
          {/* <ChannelForm buttonTitle="╲╱" obj={dmObject} onUpdate={getChannelDetails} /> */}
          <Button className="position-absolute top-0 end-0" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onClick={deleteThisDm}> 🗑️ </Button>
        </div>
      </div>
    </div>
  );
}

export default DmHeader;
