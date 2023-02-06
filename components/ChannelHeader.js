import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ChannelHeaderForm from './forms/ChannelHeaderForm';
import { getSingleChannel } from '../api/channelsData';
// import { useAuth } from '../utils/context/authContext';

// const initialState = {
//   name: '',
// };

function ChannelHeader({ obj, onUpdate }) {
  // const [channelName, setChannelName] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  // const { user } = useAuth();

  const getChannelDetails = () => {
    getSingleChannel(firebaseKey).then(() => onUpdate());
  };

  useEffect(() => {
    getChannelDetails();
    // onUpdate();
  }, []);

  return (
    <div id="channel-header">
      <div className="card">
        <div className="card-body" style={{ display: 'flex', flex: 'flex-wrap' }}>
          <h5 className="card-title"># {obj.name}</h5>
          <ChannelHeaderForm onUpdate={getChannelDetails} />
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ChannelHeader;
