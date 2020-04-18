let Navbar = {
  render: async () => {
    let view =  /*html*/`
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="/#/">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
              <div class="navbar-start">
                  <a class="navbar-item" href="/#/">
                      Home
                  </a>
                  <a class="navbar-item" href="/#/about">
                      About
                  </a>
              </div>
              <div class="navbar-end">
                  <div class="navbar-item">
                      <div class="buttons">
                          <a class="button is-primary" href="/#/register">
                              <strong>Sign up</strong>
                          </a>
                          <a class="button is-light" href="/#/log_in">
                              Log in
                          </a>
                          <button class="button is-primary hide" id="log_out_btn">
                              <strong>Log out</strong>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </nav>
    `
    return view
  },
  after_render: async () => {
    const btnLogOut = document.getElementById("log_out_btn")

    btnLogOut.addEventListener('click', e => {
      firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser){
        btnLogOut.style.display = 'block';
      } else {
        btnLogOut.style.display = 'none';
      }
    });
  }

}

export default Navbar;