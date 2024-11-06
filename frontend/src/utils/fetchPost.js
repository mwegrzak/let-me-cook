const API_ENDPOINT = 'http://localhost:4000/api';

export default function fetchPost(endpoint, data) {
  const body = JSON.stringify(data) || {};

  return fetch(`${API_ENDPOINT}${endpoint}`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body
  }).then((response) => response.json());
}