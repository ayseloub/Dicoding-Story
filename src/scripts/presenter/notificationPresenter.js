// src/scripts/presenter/notificationPresenter.js

const VAPID_PUBLIC_KEY = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

function encodeBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

const notificationPresenter = {
  async init() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Browser tidak mendukung Push Notification');
      return;
    }

    const subscribeBtn = document.getElementById('subscribe-btn');
    const unsubscribeBtn = document.getElementById('unsubscribe-btn');

    if (!subscribeBtn || !unsubscribeBtn) return;

    const registration = await navigator.serviceWorker.ready;

    // ✅ SUBSCRIBE
    subscribeBtn.addEventListener('click', async () => {
      console.log('[Notif] Subscribe button clicked');

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Izin notifikasi ditolak!');
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      const payload = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: encodeBase64(subscription.getKey('p256dh')),
          auth: encodeBase64(subscription.getKey('auth')),
        },
      };

      const token = localStorage.getItem('authToken');
      const response = await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('[Notif] Gagal subscribe:', data);
        alert('Gagal mengaktifkan notifikasi.');
        return;
      }

      alert('Notifikasi berhasil diaktifkan!');
    });

    // ✅ UNSUBSCRIBE
    unsubscribeBtn.addEventListener('click', async () => {
      console.log('[Notif] Unsubscribe button clicked');

      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        alert('Kamu belum subscribe!');
        return;
      }

      const token = localStorage.getItem('authToken');
      const response = await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('[Notif] Gagal unsubscribe:', data);
        alert('Gagal menonaktifkan notifikasi.');
        return;
      }

      await subscription.unsubscribe();
      alert('Notifikasi berhasil dinonaktifkan!');
    });
  }
};

export default notificationPresenter;
