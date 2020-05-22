import ModalInsert       from './../../services/ModalInsert.js'

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
      `
  },
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
  after_render: async () => {

    const txtEmail = document.getElementById("email_input");
    const txtPass = document.getElementById("pass_input");
    const txtRepeatPass = document.getElementById("repeat_pass_input");
    const btnSignUp = document.getElementById("register_submit_btn")
    const modal = document.getElementById("modal");

    btnSignUp.addEventListener ("click",  () => {
      event.preventDefault();
      let email       = txtEmail.value;
      let pass        = txtPass.value;
      let repeatPass  = txtRepeatPass.value;

      if (pass != repeatPass) {
          ModalInsert.insertTextInModal('The passwords dont match', 'error', 'Not valid');
      } else if (email =='' | pass == '' | repeatPass == '') {
          ModalInsert.insertTextInModal('The fields cannot be empty', 'error', 'Not valid');
      }
      else {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
          .then(function(regUser){
            window.location.href = '/';
            ModalInsert.insertTextInModal(`User ${email} was successfully created!`, 'success', 'Account creating');
          }).catch(function(error){
            ModalInsert.insertTextInModal(error.message, 'error', 'Error');
          });
      }
    });
  }
}

export default Register;
