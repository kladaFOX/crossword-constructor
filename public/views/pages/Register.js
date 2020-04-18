// import firebase from 'firebase'
// require('firebase/auth')

let Register = {
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
                <p class="control has-icons-left">
                    <input class="input" id="repeat_pass_input" type="password" placeholder="Enter the same Password again">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-primary" id="register_submit_btn">
                      Register
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
    const txtRepeatPass = document.getElementById("repeat_pass_input");
    const btnSignUp = document.getElementById("register_submit_btn")

    btnSignUp.addEventListener ("click", e => {
      const email = txtEmail.value;
      const pass = txtPass.value;
      const repeatPass = txtRepeatPass.value;

      if (pass != repeatPass) {
          alert (`The passwords dont match`);
      } else if (email =='' | pass == '' | repeatPass == '') {
          alert (`The fields cannot be empty`);
      }
      else {
        const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
        promise.catch(e => alert(e.message));
      }
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        window.location = 'index.html';
        alert(`User with email ${email} was successfully created!`);
      }
    });
  }
}

export default Register;
