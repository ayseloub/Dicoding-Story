import authModel from '../models/authModel.js';
import loginView from '../views/loginView.js';
import homeView from '../views/homeView.js';
import registerView from '../views/signUpView.js';
import addStoryView from '../presenter/storyPresenter.js';
import NavbarView from '../views/navbarView.js';
import OfflineStoryPage from '../presenter/offlineStoryPresenter.js';

export default function router() {
  const main = document.getElementById('main-content');
  const hash = window.location.hash || '#/login';
  const token = authModel.getToken();

  NavbarView.remove();

  if (!token && hash !== '#/login' && hash !== '#/register') {
    window.location.hash = '#/login';
    return;
  }

  if (token) NavbarView.render(document.body);

  switch (hash) {
    case '#/login':
      loginView.render(main);
      break;
    case '#/register':
      registerView.render(main);
      break;
    case '#/home':
      homeView.render(main);
      break;
    case '#/addstory':
      new addStoryView(main);
      break;
    case '#/about':
      AboutView.render(main);
      break;
    case '#/offline': 
      new OfflineStoryPage(main);
      break;
    default:
      main.innerHTML = '<p>404 - Halaman tidak ditemukan</p>';
  }
}
