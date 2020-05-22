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

  }
}

export default Log_in;
