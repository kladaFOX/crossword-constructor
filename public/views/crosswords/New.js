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
        <div id="questions" class="questions">

        </div>
        <button id="crossword_submit_btn" class="submit_btn hidden">Submit</button>
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
    const questions_div = document.getElementById("questions");
    let width = 0;
    let height = 0;
    let name = '';
    let answers = [];
    let questions = [];
    let question_counter = 0;

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
      crosswordSubmitBtn.classList.remove('hidden');
    }

    function create_question_box(target) {
      let tmp = target.value;
      let tmp_id = target.id;
      let wrapper = document.createElement('div');
      let span_number = document.createElement('span');
      wrapper.className = 'question_div';
      span_number.className = 'question_number';
      span_number.innerHTML = question_counter;
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

    function create_question_input() {
      let fragment = document.createDocumentFragment();
      let question_wrapper = document.createElement('div');
      question_wrapper.className = 'question_wrapper';
      question_wrapper.id = `question_wrapper=${question_counter}`;
      let question_label = document.createElement('label');
      let question_label_attribute = document.createAttribute('for');
      question_label_attribute.value = `question=${question_counter}`;
      question_label.innerHTML = `Question ${question_counter}: `;
      let question_input = document.createElement('input');
      question_input.id = `question=${question_counter}`;
      fragment.appendChild(question_label);
      fragment.appendChild(question_input);
      question_wrapper.appendChild(fragment);

      questions_div.append(question_wrapper);
    }

    function destroy_question_input() {
      let question_wrapper = document.getElementById(`question_wrapper=${question_counter}`);
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
      let questions = [];
      for (let i = 0; i < question_counter; i++){
        questions[i] = document.getElementById(`question=${i + 1}`).value;
      }
      return questions
    }

    function save_crossword() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase.database().ref('crosswords/' + name).set({
            answers: answers,
            questions: questions
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

    canvas.oncontextmenu = function(event) {
      let target = event.target;

      if (target.tagName != 'INPUT') {
        return; }
      else if (target.parentNode.classList.contains('crossword_canvas')) {
        question_counter += 1;
        create_question_box(target);
        create_question_input();
      }
      else {
        destroy_question_box(target.parentNode);
        question_counter -= 1;
        destroy_question_input();
      }
    }

    crosswordSubmitBtn.addEventListener('click', e => {
      answers = create_answers();
      questions = create_questions();
      creating_black_boxes();
      save_crossword();
    });

  }

}

export default CrosswordNew;
