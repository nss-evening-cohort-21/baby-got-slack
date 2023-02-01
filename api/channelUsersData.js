import clientCredentials from '../utils/client';

const endpoint = clientCredentials.databaseUrl;

const getChannelUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channelUsers.json`, {
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

const getSingleChannelUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channelUsers/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createChannelUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channelUsers/.json`, {
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

const updateChannelUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channelUsers/${payload.firebaseKey}.json`, {
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

const deleteChannelUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/channelUsers/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getChannelUsers,
  getSingleChannelUser,
  createChannelUser,
  updateChannelUser,
  deleteChannelUser,
};
