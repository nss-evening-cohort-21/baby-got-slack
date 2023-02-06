import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getChannels = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channels.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleChannel = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channels/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createChannel = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channels.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateChannel = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channels/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const deleteChannel = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channels/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const starredChannels = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channels.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const starChannel = Object.values(data).filter((item) => item.starred);
      resolve(starChannel);
    })
    .catch(reject);
});

const getChannelMessages = (channelFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages.json?orderBy="channel_id"&equalTo="${channelFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applications.json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleChannel = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channels/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getChannels,
  getSingleChannel,
  createChannel,
  updateChannel,
  deleteChannel,
  starredChannels,
  getChannelMessages,
  deleteSingleChannel,
};
