import authModel from '../models/authModel.js';
import { showLoadingIndicator } from './loading.js';
import '../../styles/login.css';

export default class LoginPresenter {
  constructor() {
    this.loginForm = document.getElementById('login-form');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.errorMessage = document.getElementById('error-message');
    this.signUpButton = document.getElementById('sign-up-button');

    this.loginForm.addEventListener('submit', this.handleLogin.bind(this));
    this.signUpButton.addEventListener('click', this.navigateToSignUp.bind(this));
  }

  async handleLogin(e) {
    e.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    const removeLoading = showLoadingIndicator(); // tampilkan loading

    try {
      const result = await authModel.login(email, password);

      if (result.error) {
        this.showError(result.message || 'Login failed.');
      } else {
        localStorage.setItem('authToken', result.loginResult.token);
        window.location.hash = '#/home';
      }
    } catch (error) {
      this.showError('Terjadi kesalahan jaringan');
    } finally {
      removeLoading(); // pastikan loading dihilangkan setelah selesai
    }
  }

  showError(message) {
    this.errorMessage.style.display = 'block';
    this.errorMessage.textContent = message;
  }

  navigateToSignUp() {
    window.location.hash = '#/register';
  }
}
