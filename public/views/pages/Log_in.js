import ModalInsert       from './../../services/ModalInsert.js'

let Log_in = {
  render: async () => {
    return /*html*/ `
    <div class="div-form-container">
      <form class='form-authentication'>
  				<h1 class="auth-title-text">Authorization</h1>
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
  					</div>
  					<div class="div-button-auth">
  						<button class="button-is-primary" id="log_in_submit_btn">Log In</button>
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
    const btnSignUp = document.getElementById("log_in_submit_btn");

    btnSignUp.addEventListener ("click", e => {
      event.preventDefault();
      const email = txtEmail.value;
      const pass = txtPass.value;

      if (email =='' | pass == '') {
        ModalInsert.insertTextInModal(`The fields cannot be empty`, 'error', 'Not valid');
      }
      else {
        firebase.auth().signInWithEmailAndPassword(email, pass)
          .then(function(regUser){
            ModalInsert.insertTextInModal(`User ${email} was successfully signed in!`, 'success', 'Success', function(){window.location.href = '/';});
          }).catch(function(error){
            ModalInsert.insertTextInModal(error.message, 'error', 'Error');
          });
      }
    });
  }
}

export default Log_in;
