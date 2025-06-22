import SignUpPresenter from '../presenter/signUpPresenter.js';

const signUpView = {
  render(container) {
    container.innerHTML = `
      <section aria-labelledby="signup-heading">
        <h2 id="signup-heading" style="display: none;">Sign Up Form</h2>
        <form id="signUp-form">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>

          <button type="submit">Sign Up your account</button>
        </form>

        <section>
          <button id="sign-in-button">Sign In Now!</button>
        </section>

        <div id="signup-error-message" style="color:red;display:none;"></div>
      </section>
    `;

    new SignUpPresenter();
  }
};

export default signUpView;
