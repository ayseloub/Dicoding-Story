// src/scripts/views/homeView.js
import HomePresenter from '../presenter/HomePresenter.js';
import notificationPresenter from '../presenter/notificationPresenter.js';

const HomeView = {
  render(container) {
    container.innerHTML = `
      <button id="subscribe-btn">Aktifkan Notifikasi</button> |
      <button id="unsubscribe-btn">Nonaktifkan Notifikasi</button>
      <h2>Daftar Cerita</h2>
      <ul id="story-list"></ul>
    `;

    const presenter = new HomePresenter();
    presenter.init();

    notificationPresenter.init(); 
  }
};

export default HomeView;
