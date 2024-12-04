import { redirect } from 'react-router-dom'

const API_URL = 'http://localhost:4000';

export async function fetchPost(endpoint, data) {
  const body = JSON.stringify(data) || {};

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body
    })
    return response.json();

  }
  catch (err) {
    return err.json()
  }
}


export async function fetchGet(endpoint) {

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    console.log(response)
    return response;

  }
  catch (err) {
    return err;
  }
}

export async function fetchDelete(endpoint, data) {
  const body = JSON.stringify(data) || {};

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    })
    return response.json();

  }
  catch (err) {
    return err
  }
}

export async function fetchPut(endpoint, data) {
  const body = JSON.stringify(data) || {};

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    })
    return response.json();

  }
  catch (err) {
    return err
  }
}


/*
export async function getRecipes() {
    const res = await fetch("/api/recipe")
    if (!res.ok) {
        return {
            message: "Failed to fetch recipes",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
}
*/