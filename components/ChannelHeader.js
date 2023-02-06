import React from 'react';
import PropTypes from 'prop-types';
import ChannelHeaderForm from './forms/ChannelHeaderForm';

function ChannelHeader() {
  // const [channelName, setChannelName] = useState({});
  // const router = useRouter();

  // useEffect(() => {
  //   setChannelName(channelObj);
  // }, [channelObj]);

  return (
    <div id="channel-header">
      <div className="card">
        <div className="card-body" style={{ display: 'flex', flex: 'flex-wrap' }}>
          <h5 className="card-title">Channel Name</h5>
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
    firebaseKey: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default ChannelHeader;
