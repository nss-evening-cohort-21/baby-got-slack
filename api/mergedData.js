import {
  getSingleChannel, getChannelMessages, deleteSingleChannel,
} from './channelsData';
import { deleteMessage } from './messagesData';

const viewChannelMessages = (channelFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleChannel(channelFirebaseKey),
    getChannelMessages(channelFirebaseKey)])
    .then(([channelObject, channelMessagesArray]) => {
      resolve({ ...channelObject, messages: channelMessagesArray });
    }).catch((error) => reject(error));
});

const deleteChannelMessages = (channelId) => new Promise((resolve, reject) => {
  getChannelMessages(channelId).then((messagesArray) => {
    const deleteMessagePromises = messagesArray.map((message) => deleteMessage(message.firebaseKey));

    Promise.all(deleteMessagePromises).then(() => {
      deleteSingleChannel(channelId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewChannelMessages, deleteChannelMessages };
