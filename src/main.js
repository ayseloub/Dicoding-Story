// src/main.js
import router from './scripts/routes/routes.js';
import { registerSW } from 'virtual:pwa-register';
import NotificationPresenter from './scripts/presenter/notificationPresenter.js';

document.addEventListener('DOMContentLoaded', () => {
  const skipBtn = document.getElementById('skip-btn');
  const mainContent = document.getElementById('main-content');

  if (skipBtn && mainContent) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mainContent.focus({ preventScroll: false });
    });
  }

  // Register Service Worker untuk PWA
  registerSW({ immediate: true });

  // Inisialisasi Push Notification
  NotificationPresenter.init(); 
});

// SPA routing + View Transition
window.addEventListener('hashchange', () => {
  if (document.startViewTransition) {
    document.startViewTransition(router);
  } else {
    router();
  }
});

window.addEventListener('load', router);
