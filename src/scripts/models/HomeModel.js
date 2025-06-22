// src/scripts/models/HomeModel.js
import { saveOfflineStory } from '../../db.js';

const HomeModel = {
  async fetchStories(token) {
    const response = await fetch('https://story-api.dicoding.dev/v1/stories?location=1', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Gagal memuat cerita dari API');
    }

    const json = await response.json();

    // Opsional: Simpan semua story ke IndexedDB jika diinginkan (massal)
    // for (const story of json.listStory) {
    //   await saveOfflineStory(story);
    // }

    return json.listStory;
  },

  async saveStoryToOffline(story) {
    try {
      await saveOfflineStory(story);
      return { success: true };
    } catch (error) {
      console.error('Gagal menyimpan ke offline:', error);
      return { success: false, error };
    }
  }
};

export default HomeModel;
