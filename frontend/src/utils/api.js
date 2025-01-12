const API_URL = '/';

//export variable

export { API_URL }

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
    if (response.ok) { return response.json(); }
    else {
      return ({ error: 'Response is not ok' });
    }

  }
  catch (err) {
    return err.json();
  }
}

export async function fetchDelete(endpoint, data) {
  const body = JSON.stringify(data);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response;

  }
  catch (err) {
    return err.json()
  }
}

export async function fetchPut(endpoint, data) {
  const body = JSON.stringify(data) || {};

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    })
    return response.json();

  }
  catch (err) {
    return err.json()
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