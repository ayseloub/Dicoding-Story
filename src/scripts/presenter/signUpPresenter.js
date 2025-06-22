import authModel from '../models/authModel.js';
import { showLoadingIndicator } from './loading.js';
import '../../styles/login.css';

export default class SignUpPresenter {
  constructor() {
    this.form = document.getElementById('signUp-form');
    this.nameInput = document.getElementById('name');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.signInButton = document.getElementById('sign-in-button');
    this.errorMessage = document.getElementById('signup-error-message');

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.signInButton.addEventListener('click', this.navigateToLogin.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const name = this.nameInput.value.trim();
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();

    const removeLoading = showLoadingIndicator();

    try {
      const result = await authModel.signUp(name, email, password);
      if (result.status === 201) {
        alert('Akun berhasil dibuat');
        window.location.hash = '#/login';
      } else {
        this.showError(result.data.message);
      }
    } catch (error) {
      this.showError('Terjadi kesalahan saat sign up');
    } finally {
      removeLoading();
    }
  }

  showError(message) {
    this.errorMessage.style.display = 'block';
    this.errorMessage.textContent = message;
  }

  navigateToLogin() {
    window.location.hash = '#/login';
  }
}
