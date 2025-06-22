import HomeModel from '../models/HomeModel.js';
import { showLoadingIndicator } from './loading.js';
import { saveOfflineStory } from '../../db.js'; // ✅ Tambahkan ini

export default class HomePresenter {
  constructor() {
    this.storyListEl = document.getElementById('story-list');
  }

  async init() {
    const token = localStorage.getItem('authToken');
    const removeLoading = showLoadingIndicator();

    try {
      const stories = await HomeModel.fetchStories(token);
      this.renderStories(stories);
    } catch (error) {
      this.storyListEl.innerHTML = '<li>Gagal memuat cerita.</li>';
    } finally {
      removeLoading();
    }
  }

  renderStories(stories) {
    this.storyListEl.innerHTML = '';

    stories.forEach(story => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${story.name}</strong>: ${story.description}<br/>
        <img src="${story.photoUrl}" alt="story image" width="200"/><br/>
        <small>
          Latitude: ${story.lat ?? 'N/A'}, Longitude: ${story.lon ?? 'N/A'}<br/>
          Created At: ${new Date(story.createdAt).toLocaleString()}
        </small><br/>
        <button class="save-offline-btn">Simpan Offline</button>
      `;

      // ✅ Tambahkan listener tombol simpan offline
      li.querySelector('.save-offline-btn').addEventListener('click', async () => {
        try {
          // Pastikan story memiliki ID
          if (!story.id) {
            alert('Cerita tidak memiliki ID, tidak bisa disimpan.');
            return;
          }

          await saveOfflineStory(story);
          alert('Cerita berhasil disimpan secara offline!');
        } catch (error) {
          console.error('Gagal menyimpan offline:', error);
          alert('Gagal menyimpan cerita offline.');
        }
      });

      this.storyListEl.appendChild(li);
    });
  }
}
