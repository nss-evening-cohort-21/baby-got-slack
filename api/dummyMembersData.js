import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getDummyMembers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/dummyMembers.json`, {
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

const getSingleDummyMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/dummyMembers/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getDummyMembers,
  getSingleDummyMember,
};
