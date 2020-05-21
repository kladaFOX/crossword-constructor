let Navbar = {
  render: async () => {
    let view =  /*html*/`
      <a href="/">
        <div class="logo-container">
          <img class="header-logo-size" src="./images/logo.png" alt="Logo">
          <div class="crosswords-name-container">Crossword Labs</div>
        </div>
      </a>
      <div class="auth-container">
        <a id="log_out_btn" class="header-button-color hide"><div class="div-header-buttons"><p>Logout</p></div></a>
        <a id='log_in_btn' href="/#/log_in" class="header-button-color"><div class="div-header-buttons"><p>Log in</p></div></a>
        <a href="/#/register" class="header-button-color"><div class="div-header-buttons"><p>Sing up</p></div></a>
      </div>

      <nav class="nav-container">
        <div class="navigation-ref-home"><a class="navigation-ref-text" href="#HomeTitle">Home</a></div>
        <div class="navigation-ref-online-crosswords"><a class="navigation-ref-text" href="#OnlineCrosswordsTitle">Online crosswords</a></div>
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
