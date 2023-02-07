import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ChannelHeaderForm from './forms/ChannelHeaderForm';
import { getSingleChannel } from '../api/channelsData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  name: '',
  description: '',
  private: false,
  starred: false,
};
function ChannelHeader() {
  const [channelName, setChannelName] = useState({ name: '' });
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const getChannelDetails = () => {
    getSingleChannel(firebaseKey).then(setChannelName);
  };

  useEffect(() => {
    getChannelDetails();
  }, [channelName, user]);

  return (
    <div id="channel-header">
      <div className="card">
        <div className="card-body" style={{ display: 'flex', flex: 'flex-wrap' }}>
          <h5 className="card-title"># {channelName?.name}</h5>
          <ChannelHeaderForm />
        </div>
      </div>
    </div>
  );
}

ChannelHeader.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    private: PropTypes.bool,
    starred: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

ChannelHeader.defaultProps = {
  obj: initialState,
};

export default ChannelHeader;
