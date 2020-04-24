import Utils        from './../../services/Utils.js'

async function getCrossword(id){
  const snapshot = await firebase.database().ref('/crosswords/' + id).once('value');

  return snapshot.val();
}

let CrosswordShow = {

  render : async () => {
    const request = Utils.parseRequestURL();

    const crossword = await getCrossword(request.id);

    return /*html*/`
      <section class="section">
      <h1> Crossword name : ${request.id}</h1>
      <div id="crossword_canvas" class="crossword_canvas">

      </div>
      <div id="questions" class="questions_wrappers">

      </div>
      <button id="crossword_submit_btn" class="submit_btn">Submit</button>
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

    function createField(){
      let field = '';
      for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
          let white_box = `<input type='text' class='buttons001' id='i=${i}, j=${j}' maxlength='1'/>`;
          field += white_box;
        }
        field += "<br>";
      }
      canvas.insertAdjacentHTML("afterBegin", field);
      creating_black_boxes();
      create_question_box();
      create_questions();
    }

    function creating_black_boxes() {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (!crossword.answers[i][j].char){
            document.getElementById(`i=${i}, j=${j}`).className = 'buttons002';
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
        let fragment = document.createDocumentFragment();
        let question_wrapper = document.createElement('div');
        question_wrapper.className = 'question_wrapper';
        question_wrapper.id = `question_wrapper=${i + 1}`;
        let question_label = document.createElement('label');
        let question_label_attribute = document.createAttribute('for');
        question_label_attribute.value = `question=${i + 1}`;
        question_label.innerHTML = `Question ${i + 1}: `;
        let question_p = document.createElement('p');
        question_p.id = `question=${i + 1}`;
        question_p.className = '__question';
        question_p.innerHTML = crossword.questions[i];
        fragment.appendChild(question_label);
        fragment.appendChild(question_p);
        question_wrapper.appendChild(fragment);

        questions_div.append(question_wrapper);
      }
    }

    createField();

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
      console.log(`total - ${total_boxes}, actual - ${actual}`);
      if (total_boxes == actual){
        alert('КРОСОВОК!!!!!!!!!!!-->');
      }
      else {
        alert('НЕ СЕДНЯ!((');
      }
    });
  }
}

export default CrosswordShow;
