async function getId(){
  const snapshot = await firebase.database().ref('/last_id').once('value');

  return snapshot.val();
}

let CrosswordNew = {
  render : async () => {
    let view =  /*html*/`
      <section class="new-crossword-section">
        <h2 class="created-crossword-name">New crosword</h1>
        <p class="desctiption-title-text">
        Enter a name, crossword puzzle size. Double-click on the cell to create a new question. <br>
        After that, you can enter the questions you need and indicate its direction.
        </p>
      </section>
      <form class="section-crosword-name-size">
        <div class="section-crosword-name-wrapper f-grow">
          <label class="new-crosword-name" for="crossword_name">Name</label>
          <input class="input-crosword-name" type="text" id="crossword_name">
        </div>
            <div class="section-crosword-name-wrapper">
              <label class="new-crosword-size" for="crossword_width">Width</label>
              <input class="input-crosword-width" type="number" min="0" step="1" max='34' id="crossword_width">
            </div>
            <div class="section-crosword-name-wrapper">
              <label class="new-crosword-size" for="crossword_height">Height</label>
              <input class="input-crosword-height" type="number" min="0" step="1" max='50' id="crossword_height">
            </div>
            <button class="button-is-primary" id="demensions_submit_btn" class="submit_btn">Submit</button>
      </form>
      <section class="crosword-container">
        <div id="crossword_canvas" class="crossword_canvas"></div>
      </section>
      <section class="new-crossword-add-question-section">
        <div class="add-question-full-width">
        <button class="button-is-primary" id='add_question' class='add_question_button hidden'>Add question</button>
        </div>
        <ul id="questions" class="questions ul-add-questions"></ul>
      <section/>




        </div>
        <button id="crossword_submit_btn" class="submit_btn hidden button-is-primary">Submit Crossword</button>
      </section>
    `
    return view
  },
  after_render: async () => {

  }

}

export default CrosswordNew;
