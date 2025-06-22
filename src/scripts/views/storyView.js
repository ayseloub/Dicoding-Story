import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default class StoryView {
  constructor() {
    this.container = document.createElement('section');
    this.container.innerHTML = `
      <h2>Tambah Cerita</h2>
      <form id="story-form">
        <textarea id="story-description" placeholder="Deskripsi" rows="4" required></textarea>
        <input type="file" id="story-image" accept="image/*" />
        <div>
          <button type="button" id="open-camera">Buka Kamera</button>
          <button type="button" id="close-camera" style="display: none;">Matikan Kamera</button>
          <video id="camera-preview" autoplay playsinline style="display: none; width: 100%; max-height: 300px;"></video>
          <canvas id="camera-canvas" style="display: none;"></canvas>
          <button type="button" id="take-photo" style="display: none;">Ambil Gambar</button>
        </div>
        <div id="map" style="height: 300px; margin-top: 1rem;"></div>
        <button type="submit">Kirim Cerita</button>
      </form>
    `;
  }

  render(mainElement) {
    mainElement.innerHTML = '';
    mainElement.appendChild(this.container);

    this.map = L.map('map').setView([-7.9797, 112.6304], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = null;
    this.map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      }
      this.lat = lat;
      this.lon = lng;
    });

    this.cameraStream = null;
    this.video = this.container.querySelector('#camera-preview');
    this.canvas = this.container.querySelector('#camera-canvas');
    const openBtn = this.container.querySelector('#open-camera');
    const closeBtn = this.container.querySelector('#close-camera');
    const takeBtn = this.container.querySelector('#take-photo');

    openBtn.addEventListener('click', async () => {
      try {
        this.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.video.srcObject = this.cameraStream;
        this.video.style.display = 'block';
        this.canvas.style.display = 'none';
        takeBtn.style.display = 'inline-block';
        closeBtn.style.display = 'inline-block';
      } catch (error) {
        alert('Gagal membuka kamera');
      }
    });

    closeBtn.addEventListener('click', () => {
      if (this.cameraStream) {
        this.cameraStream.getTracks().forEach(track => track.stop());
        this.cameraStream = null;
      }
      this.video.style.display = 'none';
      takeBtn.style.display = 'none';
      closeBtn.style.display = 'none';
    });

    takeBtn.addEventListener('click', () => {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      const ctx = this.canvas.getContext('2d');
      ctx.drawImage(this.video, 0, 0);
      this.canvas.toBlob(blob => {
        this.capturedBlob = blob;
        this.canvas.style.display = 'block';
        this.video.style.display = 'none';
      }, 'image/png');
    });
  }

  bindSubmit(handler) {
    const form = this.container.querySelector('#story-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const description = this.container.querySelector('#story-description').value.trim();
      const imageInput = this.container.querySelector('#story-image');
      const file = imageInput.files[0];

      if (!description || this.lat == null || this.lon == null) {
        alert('Lengkapi semua field dan pilih lokasi di peta.');
        return;
      }

      const formData = new FormData();
      formData.append('description', description);
      formData.append('lat', this.lat);
      formData.append('lon', this.lon);

      if (this.capturedBlob) {
        formData.append('photo', this.capturedBlob, 'captured.png');
      } else if (file) {
        formData.append('photo', file);
      } else {
        alert('Unggah gambar atau ambil dari kamera.');
        return;
      }

      handler(formData);
    });
  }

  showSuccess() {
    alert('Cerita berhasil diposting!');
    window.location.hash = '#/home';
  }

  showError(message) {
    alert(`Gagal memposting cerita: ${message}`);
  }
}
