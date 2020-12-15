export const API_URL = '/api';

export function USER_REGISTER(body) {
  return {
    url: API_URL + '/register',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_LOGIN(body) {
  return {
    url: API_URL + '/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function ALL_USERS() {
  return {
    url: API_URL + '/all-users',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      cache: 'no-store',
    },
  };
}

export function DISPLAY_CHATROOM(id) {
  return {
    url: API_URL + '/chatroom/' + id,
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    },
  };
}

export function NEW_MESSAGE(id, body) {
  return {
    url: API_URL + '/message/' + id,
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
