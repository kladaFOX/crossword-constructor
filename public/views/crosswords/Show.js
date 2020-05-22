import Utils        from './../../services/Utils.js'
import ModalInsert  from './../../services/ModalInsert.js'

async function getCrossword(id){
  const snapshot = await firebase.database().ref('/crosswords/' + id).once('value');

  return snapshot.val();
}

let CrosswordShow = {

  render : async () => {
    const request = Utils.parseRequestURL();

    const crossword = await getCrossword(request.id);

    return /*html*/`
      <section class="created-crossword-section">
        <h2 class="title-section-text" id='crossword_name'></h2>
        <section class="crosword-container">
          <div id="crossword_canvas" class="crossword_canvas"></div>
        </section>
        <div id="questions" class="questions_wrappers"></div>
        <button class="button-is-primary" id="crossword_submit_btn" class="submit_btn">Submit</button>
      </section>
    `
  }
  , after_render: async () => {
    const request = Utils.parseRequestURL();
    const crossword = await getCrossword(request.id);
    const canvas = document.getElementById("crossword_canvas");
    const height = crossword.answers.length;
    const width = crossword.answers[0].length;
    const crosswordSubmitBtn = document.getElementById("crossword_submit_btn");
    const questions_div = document.getElementById("questions");
    const crossword_name = document.getElementById('crossword_name');

    function createField(){
      let field = '';
      for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
          let white_box = `<input type='text' class='buttons001' id='i=${i}, j=${j}' data-i=${i} data-j=${j} maxlength='1'/>`;
          field += white_box;
        }
        field += "<br>";
      }
      canvas.insertAdjacentHTML("afterBegin", field);
      crossword_name.innerHTML = `Crossword name: ${crossword.name}`;
      creating_black_boxes();
      create_question_box();
      create_questions();
    }

    function creating_black_boxes() {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (!crossword.answers[i][j].char){
            document.getElementById(`i=${i}, j=${j}`).className = 'buttons002';
            document.getElementById(`i=${i}, j=${j}`).disabled = true;
          }
        }
      }
    }

    function create_question_box(target) {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (crossword.answers[i][j].start){
            let wrapper = document.createElement('div');
            let span_number = document.createElement('span');
            wrapper.className = 'question_div';
            span_number.className = 'question_number';
            target = document.getElementById(`i=${i}, j=${j}`);
            span_number.innerHTML = crossword.answers[i][j].start;
            wrapper.innerHTML = span_number.outerHTML;
            wrapper.innerHTML += target.outerHTML;
            target.parentNode.replaceChild(wrapper, target);
          }
        }
      }
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

    function create_questions() {
      for(let i = 0; i < crossword.questions.length; i++){
        let question = crossword.questions[`${i + 1}`];
        if (!question){ continue; }
        let fragment = document.createDocumentFragment();
        let question_wrapper = document.createElement('div');
        question_wrapper.className = 'question_wrapper';
        question_wrapper.id = `question_wrapper=${i + 1}`;
        question_wrapper.className = 'question_wrapper_show';

        question_wrapper.innerHTML = `<p>${question.question_number}: </p>
                                      <p>${question.question}</p>
                                      <p>Direction: ${question.direction}</p>`;
        question_wrapper.appendChild(fragment);

        questions_div.append(question_wrapper);
      }
    }

    createField();

    canvas.oninput = function(event) {
      let target = event.target;

      if (target.tagName != 'INPUT') {
        return; }
      else if (target.value != '') {
        let i = parseInt(target.dataset.i, 10);
        let j = parseInt(target.dataset.j, 10);
        let nextElem = null || document.getElementById(`i=${i}, j=${j + 1}`);
        if (nextElem){
          nextElem.focus();
        }
      }
      else if (target.value == '') {
        let i = parseInt(target.dataset.i, 10);
        let j = parseInt(target.dataset.j, 10);
        let nextElem = null || document.getElementById(`i=${i}, j=${j - 1}`);
        if (nextElem){
          nextElem.focus();
        }
      }
    }

    crosswordSubmitBtn.addEventListener('click', e => {
      let answers = creating_dict();
      let total_boxes = answers.length * answers[0].length;
      let actual = 0;
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (crossword.answers[i][j].char == answers[i][j]){
            actual += 1;
          }
        }
      }
      if (total_boxes == actual){
        ModalInsert.insertTextInModal('You won!', 'success', 'Success');
      }
      else {
        ModalInsert.insertTextInModal('You lose', 'error', 'Fail');
      }
    });
  }
}

export default CrosswordShow;
