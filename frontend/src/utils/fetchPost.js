const API_ENDPOINT = 'http://localhost:4000/api';

export default async function fetchPost(endpoint, data) {
  const body = JSON.stringify(data) || {};

  const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body
  })

  return response.json();
}