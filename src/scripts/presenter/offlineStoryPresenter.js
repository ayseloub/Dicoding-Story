import OfflineStoryView from '../views/offlineStoryView.js';
import { getAllOfflineStories, deleteOfflineStory } from '../../db.js';

export default class OfflineStoryPresenter {
  constructor() {
    this.view = new OfflineStoryView();
    this.view.render(document.getElementById('main-content'));
    this.loadStories();

    this.view.bindDeleteHandler(async (id) => {
      await deleteOfflineStory(id);
      this.loadStories();
    });
  }

  async loadStories() {
    const stories = await getAllOfflineStories();
    console.log('[Offline] Stories from IndexedDB:', stories);
    this.view.displayStories(stories);
  }
}
