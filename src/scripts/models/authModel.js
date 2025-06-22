export default {
  login(email, password) {
    return fetch('https://story-api.dicoding.dev/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json());
  },

  signUp(name, email, password) {
    return fetch('https://story-api.dicoding.dev/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }).then(async res => ({
      status: res.status,
      data: await res.json(),
    }));
  },

  getToken() {
    return localStorage.getItem('authToken');
  }
};
