let Log_in = {
  render: async () => {
    return /*html*/ `
    <div class="div-form-container">
      <form class='form-authentication'>
  				<h1 class="auth-title-text">Authorization</h1>
  				<div class="div-auth">
  					<div class="help-text">
  						<p>Login</p>
              <input class="input" id="email_input" type="email" placeholder="Enter your Email">
  					</div>
  					<div class="help-text">
  						<p>Password</p>
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
        alert (`The fields cannot be empty`);
      }
      else {
        firebase.auth().signInWithEmailAndPassword(email, pass)
          .then(function(regUser){
            window.location.href = '/';
            alert(`User ${email} was successfully signed in!`);
          }).catch(function(error){
            alert(error.message);
          });
      }
    });
  }
}

export default Log_in;
