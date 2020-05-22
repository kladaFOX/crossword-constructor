// import firebase from 'firebase'
// require('firebase/auth')

let Register = {
  render: async () => {
      return /*html*/ `


      <div class="div-form-container">
        <form class='form-authentication'>
            <h1 class="auth-title-text">Registration</h1>
            <div class="div-auth">
              <div class="help-text">
                <label for='email_input'>Login</label>
                <br>
                <input class="input" id="email_input" type="email" placeholder="Enter your Email">
              </div>
              <div class="help-text">
                <label for='pass_input'>Password</label>
                <br>
                <input class="input" id="pass_input" type="password" placeholder="Enter a Password">
                <br>
                <input class="input" id="repeat_pass_input" type="password" placeholder="Repeat a Password">
              </div>
              <div class="div-button-auth">
                <button class="button-is-primary" id="register_submit_btn">Register</button>
              </div>
            </div>
        <form>
      </div>


      <!-- ----------------------------------------
        <section class="section">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" id="email_input" type="email" placeholder="Enter your Email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" id="pass_input" type="password" placeholder="Enter a Password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" id="repeat_pass_input" type="password" placeholder="Enter the same Password again">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-primary" id="register_submit_btn">Register</button>
                </p>
            </div>
        </section>
        -->
      `
  },
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
  after_render: async () => {

  }
}

export default Register;
