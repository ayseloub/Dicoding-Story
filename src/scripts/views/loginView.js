import LoginPresenter from '../presenter/loginPresenter.js';

const loginView = {
  render(container) {
    container.innerHTML = `
      <section aria-labelledby="login-heading">
        <h2 id="login-heading" style="display: none;">Login Form</h2>
        <form id="login-form">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Login</button>
        </form>

        <button id="sign-up-button">Sign Up Now!</button>

        <div id="error-message" style="display: none; color: red;" role="alert" aria-live="polite"></div>
      </section>
    `;

    new LoginPresenter();
  }
};

export default loginView;
