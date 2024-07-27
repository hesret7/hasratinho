'use server';
import { cookies } from 'next/headers';

const api = process.env.API;

export async function login(identifier, password) {
  try {
    const resp = await fetch(api + '/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (resp.ok) {
      const data = await resp.json();
      const Tdays = 60 * 60 * 24 * 30;
      cookies().set('jwtToken', data.jwt, { maxAge: Tdays });
      return data;
    }

    const data = await resp.json();
    return { hasError: true, error: data.error.message };
  } catch {
    return { hasError: true, error: 'Server not working, please try again' };
  }
}

export async function register(username, email, password) {
  try {
    const resp = await fetch(api + '/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (resp.ok) {
      const data = await resp.json();
      const Tdays = 60 * 60 * 24 * 30;
      cookies().set('jwtToken', data.jwt, { maxAge: Tdays });
      return data;
    }

    const data = await resp.json();
    return { hasError: true, error: data.error.message };
  } catch {
    return { hasError: true, error: 'Server not working, please try again' };
  }
}

export async function getProfileFromMiddle(token) {
  try {
    let data = await fetch(api + '/users/me', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (!data.ok) {
      return {
        isAuth: false,
      };
    }

    data = await data.json();

    return { isAuth: true, data };
  } catch {
    return {
      backendError: 'Something went wrong with server',
    };
  }
}

export async function logout() {
  cookies().delete('jwtToken');
}
