import StoryView from '../views/storyView.js';
import { postStory } from '../models/storyModel.js';
import { showLoadingIndicator } from './loading.js';

export default class StoryPresenter {
  constructor(mainElement) {
    this.view = new StoryView();
    this.view.render(mainElement);
    this.view.bindSubmit(this.handleSubmit.bind(this));
  }

  async handleSubmit(formData) {
    const removeLoading = showLoadingIndicator();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token tidak tersedia');
      }
      const response = await postStory(token, formData);
      if (!response.error) {
        this.view.showSuccess();
      } else {
        this.view.showError(response.message);
      }
    } catch (error) {
      this.view.showError(error.message);
    } finally {
      removeLoading();
    }
  }
}
