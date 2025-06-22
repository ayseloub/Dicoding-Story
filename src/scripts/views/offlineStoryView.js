export default class OfflineStoryView {
  constructor() {
    this.container = document.createElement('section');
    this.container.innerHTML = `
      <h2>Cerita Tersimpan Offline</h2>
      <ul id="offline-story-list"></ul>
    `;
  }

  render(mainElement) {
    mainElement.innerHTML = '';
    mainElement.appendChild(this.container);
  }

  displayStories(stories) {
    const list = this.container.querySelector('#offline-story-list');
    list.innerHTML = '';
    stories.forEach(story => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${story.name}</strong>: ${story.description}<br/>
        <img src="${story.photoUrl}" width="200"><br/>
        <button data-id="${story.id}">Hapus</button>
      `;
      list.appendChild(li);
    });
  }

  bindDeleteHandler(handler) {
    this.container.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
        handler(e.target.dataset.id);
      }
    });
  }
}
