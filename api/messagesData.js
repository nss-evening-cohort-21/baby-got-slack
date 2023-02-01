import clientCredentials from '../utils/client';

const endpoint = clientCredentials.databaseUrl;

const getMessages = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages.json?orderBy="uid"&equalTo"${uid}"`, {
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

const getSingleMessage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createMessage = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages/.json`, {
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

const updateMessage = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages/${payload.firebaseKey}.json`, {
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

const deleteMessage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const starredMessages = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages.json?orderBy="uid"&equalTo="${uid}"`, {
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

export {
  getMessages,
  getSingleMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  starredMessages,
};
