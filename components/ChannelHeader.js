import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ChannelForm from './forms/ChannelForm';

function ChannelHeader() {
  // const [channelName, setChannelName] = useState({});

  // useEffect(() => {
  //   setChannelName(channelObj);
  // }, [channelObj]);

  return (
    <div id="channel-header">
      <div className="card">
        <div className="card-body" style={{ display: 'flex', flex: 'flex-wrap', justifyContent: 'center' }}>
          <h5 className="card-title">Channel Name</h5>
          <Button
            onClick={ChannelForm}
            style={{
              width: '50px',
              fontSize: '6px',
              marginLeft: '20px',
              borderColor: 'transparent',
            }}
          >╲╱
          </Button>
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
