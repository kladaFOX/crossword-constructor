import ModalInsert       from './../../services/ModalInsert.js'

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
        <button id="crossword_submit_btn" class="submit_btn hidden button-is-primary">Submit Crossword</button>
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
    const addQuestionBtn = document.getElementById('add_question');
    const questions_div = document.getElementById("questions");
    const id_db = await getId();
    let id = 0;
    let width = 0;
    let height = 0;
    let name = '';
    let answers = [];
    let questions = {};
    let question_counter = [0];
    let question_input_counter = 0;

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
        field += `<br>`;
      }
      canvas.insertAdjacentHTML("afterBegin", field);
      crosswordSubmitBtn.classList.remove('hidden');
      addQuestionBtn.classList.remove('hidden');
    }

    function increment_question_counter() {
      let actual_length = question_counter.length;
      for (let i = 0; i < actual_length; i++) {
        if (question_counter[i] == 0 && (i + 1) == actual_length) {
          question_counter[i] = 1;
          question_counter.push(0);
          return;
        }
        else if (question_counter[i] == 0){
          question_counter[i] = 1;
          return;
        }
      }
    }

    function decrement_question_counter(wrapper) {
      let number = 0;
      for (let element of wrapper.children){
        if (element.tagName == 'SPAN'){
          number = parseInt(element.innerHTML, 10);
        }
      }
      question_counter[number - 1] = 0;
    }

    function return_next_number_of_question() {
      for (let i = 0; i < question_counter.length; i++) {
        if (question_counter[i] == 0){
          return i + 1;
        }
      }
    }

    function create_question_box(target) {
      let tmp = target.value;
      let tmp_id = target.id;
      let wrapper = document.createElement('div');
      let span_number = document.createElement('span');
      wrapper.className = 'question_div';
      span_number.className = 'question_number';
      span_number.innerHTML = return_next_number_of_question();
      wrapper.innerHTML = span_number.outerHTML;
      wrapper.innerHTML += target.outerHTML;
      target.parentNode.replaceChild(wrapper, target);
      document.getElementById(tmp_id).value = tmp;
    }

    function destroy_question_box(wrapper) {
      var docFrag = document.createDocumentFragment();
      while (wrapper.firstChild) {
        var child = wrapper.removeChild(wrapper.firstChild);
        if (child.classList.contains('buttons001')){
            docFrag.appendChild(child);
        }
      }
      wrapper.parentNode.replaceChild(docFrag, wrapper);
    }

    function destroy_question_input(id) {
      question_input_counter -= 1;
      let question_wrapper = document.getElementById(id);
      question_wrapper.innerHTML = '';
      question_wrapper.remove();
    }

    function creating_black_boxes() {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (!answers[i][j].char){
            document.getElementById(`i=${i}, j=${j}`).className = 'buttons002';
          }
        }
      }
    }

    function create_answers() {
      let answers = [];
      for (let i = 0; i < height; i++){
        answers[i] = [];
      }

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (document.getElementById(`i=${i}, j=${j}`).parentNode.classList.contains('crossword_canvas')){
            answers[i][j] = {
              char: document.getElementById(`i=${i}, j=${j}`).value,
              start: false
            };
          }
          else {
            answers[i][j] = {
              char: document.getElementById(`i=${i}, j=${j}`).value,
              start: document.getElementById(`i=${i}, j=${j}`).parentNode.getElementsByTagName('span')[0].textContent
            };
          }
        }
      }
      return answers
    }

    function create_questions() {
      let questions = {};
      for (let i = 1; i <= question_input_counter; i++){
        questions[`${i}`] = {
          question_number: document.getElementById(`question_number=${i}`).value,
          question: document.getElementById(`question=${i}`).value,
          direction: document.getElementById(`question_direction=${i}`).value,
        };
      }
      return questions
    }



    function pushId(id) {
      firebase.database().ref('/last_id').set({ id });
    }

    function save_crossword() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase.database().ref('crosswords/' + id).set({
            name: name,
            answers: answers,
            questions: questions,
            number_of_questions: question_input_counter
          }, function(error){
            if (error){
              console.log(error);
            }
            else {
              ModalInsert.insertTextInModal(`Crossword with id: ${id} was saved successfully!`, 'success', 'Success', function(){window.location.href = `/#/crossword/${id}`;});
            }
          });
        }
      });
    }

    demensionsSubmitBtn.addEventListener('click', e => {
      event.preventDefault();
      width = txtWidth.value;
      height = txtHeight.value;
      questions_div.innerHTML = '';
      question_counter = [0];
      creating_field();
      let firstInput = null || document.getElementById('i=0, j=0');
      if (firstInput){
        firstInput.focus();
      }
    });

    canvas.oninput = function(event) {
      let target = event.target;

      if (target.tagName != 'INPUT') {
        return; }
      else if (target.value != '') {
        let iAndj = target.id.split(',');
        let i = parseInt(iAndj[0].split('=')[1], 10);
        let j = parseInt(iAndj[1].split('=')[1], 10);
        let nextElem = null || document.getElementById(`i=${i}, j=${j + 1}`);
        if (nextElem){
          nextElem.focus();
        }
      }
      else if (target.value == '') {
        let iAndj = target.id.split(',');
        let i = parseInt(iAndj[0].split('=')[1], 10);
        let j = parseInt(iAndj[1].split('=')[1], 10);
        let nextElem = null || document.getElementById(`i=${i}, j=${j - 1}`);
        if (nextElem){
          nextElem.focus();
        }
      }
    }

    canvas.ondblclick = function(event) {
      let target = event.target;

      if (target.tagName != 'INPUT' && target.tagName != 'SPAN') {
        return; }
      else if (target.parentNode.classList.contains('crossword_canvas')) {
        create_question_box(target);
        increment_question_counter();
      }
      else {
        decrement_question_counter(target.parentNode);
        destroy_question_box(target.parentNode);
      }
    }

    addQuestionBtn.onclick = function(event) {
      question_input_counter++;
      let question_wrapper = document.createElement('form');
      question_wrapper.className = 'question_wrapper';
      question_wrapper.id = `question_wrapper=${question_input_counter}`;
      question_wrapper.innerHTML = `
                                    <li style="line-height: 60px">
                                      <label class="new-crosword-name" for='question_number=${question_input_counter}'>Question number: </label>
                                      <input class="input-crosword-number" id='question_number=${question_input_counter}' type='number'></input>
                                      <label class="new-crosword-name" for='question=${question_input_counter}'>Question: </label>
                                      <input class="input-crosword-question" id='question=${question_input_counter}'></input>
                                      <label class="new-crosword-name" for='question_direction=${question_input_counter}'>Chose the direction: </label>
                                      <select class="button-is-primary" id='question_direction=${question_input_counter}'>
                                        <option value="vertical">Vertical</option>
                                        <option value="horizontal">Horizontal</option>
                                      </select>
                                      <button class="button-is-primary" id='question_delete=${question_input_counter}' name='question_delete_btn'>Delete question</button>
                                    </li>
                                    `;

      questions_div.append(question_wrapper);
    }

    questions_div.onclick = function(event) {
      event.preventDefault();
      let target = event.target;

      if (target.tag != 'BUTTON' && target.name != 'question_delete_btn'){
        return; }
      else {
        destroy_question_input(target.parentNode.parentNode.id);
      }
    }

    crosswordSubmitBtn.addEventListener('click', e => {
      id = id_db.id + 1;
      pushId(id);
      answers = create_answers();
      name = txtName.value;
      questions = create_questions();
      creating_black_boxes();
      save_crossword();
    });

  }

}

export default CrosswordNew;
