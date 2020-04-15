let Log_in = {
  render: async () => {
    return /*html*/ `
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
              <p class="control">
                  <button class="button is-primary" id="log_in_submit_btn">
                      Log In
                  </button>
              </p>
          </div>

      </section>
    `
  },
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
  after_render: async () => {

    const txtEmail = document.getElementById("email_input");
    const txtPass = document.getElementById("pass_input");
    const btnSignUp = document.getElementById("log_in_submit_btn")

    btnSignUp.addEventListener ("click", e => {
      const email = txtEmail.value;
      const pass = txtPass.value;

      if (email =='' | pass == '') {
        alert (`The fields cannot be empty`);
      }
      else {
        const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
        promise.catch(e => allert(e.message));
      }
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        window.location = 'index.html';
      }
    });
  }
}

export default Log_in;
