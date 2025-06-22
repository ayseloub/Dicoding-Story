import '../../styles/navbar.css';

export default {
  render(container) {
    const token = localStorage.getItem('authToken');
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#/home">Beranda</a> |
      <a href="#/addstory">Tambah Cerita</a> |
      <a href="#/offline">Offline Story</a> |
      ${token ? '<button id="logout-button">Logout</button>' : ''}
    `;
    container.prepend(nav);

    if (token) {
      const logoutBtn = nav.querySelector('#logout-button');
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.hash = '#/login';
      });
    }
  },

  remove() {
    const nav = document.querySelector('nav');
    if (nav) nav.remove();
  }
};
