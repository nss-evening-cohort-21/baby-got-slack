import { getSingleChannel, getChannelMessages } from './channelsData';

const viewChannelMessages = (channelFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleChannel(channelFirebaseKey),
    getChannelMessages(channelFirebaseKey)])
    .then(([channelObject, channelMessagesArray]) => {
      resolve({ ...channelObject, messages: channelMessagesArray });
    }).catch((error) => reject(error));
});

export default viewChannelMessages;
