let CrosswordNew = {
  render : async () => {
    let view =  /*html*/`
      <section class="section">
      <label for="crossword_name">Name</label>
      <input type="text" id="crossword_name">
        <div class="demensions_input">
          <label for="crossword_width">Width</label>
          <input type="text" id="crossword_width">
          <label for="crossword_height">Height</label>
          <input type="text" id="crossword_height">
          <button id="demensions_submit_btn" class="submit_btn">Submit</button>
        </div>
        <div id="crossword_canvas" class="crossword_canvas">

        </div>
        <button id="crossword_submit_btn" class="submit_btn">Submit</button>
      </section>
    `
    return view
  },
  after_render: async () => {
    const demensionsSubmitBtn = document.getElementById("demensions_submit_btn");
    const txtWidth = document.getElementById("crossword_width");
    const txtHeight = document.getElementById("crossword_height");
    const txtName = document.getElementById('crossword_name');
    const canvas = document.getElementById("crossword_canvas");
    const crosswordSubmitBtn = document.getElementById("crossword_submit_btn");
    let width = 0;
    let height = 0;
    let name = '';
    let answers = [];

    function creating_field() {
      while(canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
      }
      let field = '';
      for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
          let white_box = `<input type='text' class='buttons001' id='i=${i}, j=${j}' maxlength='1'/>`;
          field += white_box;
        }
        field += "<br>";
      }
      canvas.insertAdjacentHTML("afterBegin", field);
    }

    function creating_dict() {
      let answers = [];
      for (let i = 0; i < height; i++){
        answers[i] = [];
      }

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          answers[i][j] = document.getElementById(`i=${i}, j=${j}`).value;
        }
      }
      return answers
    }

    function creating_black_boxes() {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (!answers[i][j]){
            document.getElementById(`i=${i}, j=${j}`).className = 'buttons002';
          }
        }
      }
    }

    function save_crossword() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase.database().ref('crosswords/' + name).set({
            answers: answers
          }, function(error){
            if (error){
              console.log(error);
            }
            else {
              console.log('nice!');
            }
          });
        } else {
          // No user is signed in.
        }
      });
    }

    demensionsSubmitBtn.addEventListener('click', e => {
      width = txtWidth.value;
      height = txtHeight.value;
      name = txtName.value;

      creating_field()
    });

    crosswordSubmitBtn.addEventListener('click', e => {
      answers = creating_dict();
      creating_black_boxes();
      save_crossword();
    });

  }

}

export default CrosswordNew;
