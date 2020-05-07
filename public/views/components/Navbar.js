let Navbar = {
  render: async () => {
    let view =  /*html*/`
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="/#/">
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
                  <a class="navbar-item" href="/#/crosswords">
                      New Crossword
                  </a>
              </div>
              <div class="navbar-end">
                  <div class="navbar-item">
                      <div class="buttons">
                          <a class="button is-primary" href="/#/register">
                              <strong>Sign up</strong>
                          </a>
                          <a id='log_in_btn' class="button is-light" href="/#/log_in">
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
    const btnLogOut = document.getElementById("log_out_btn");
    const btnLogIn  = document.getElementById('log_in_btn');

    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut()
          .then(function(){
            alert('signed out successfully');
          }).catch(function(error){
            alert(error.message);
          });
      });

      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser){
          btnLogIn.style.display = 'none';
          btnLogOut.style.display = 'block';
        } else {
          btnLogIn.style.display = 'block';
          btnLogOut.style.display = 'none';
        }
      });
  }

}

export default Navbar;
