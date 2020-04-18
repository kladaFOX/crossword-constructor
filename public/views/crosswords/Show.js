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
      <p> Crossword answers : ${crossword.answers} </p>
      <div id="crossword_canvas" class="crossword_canvas">

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
    }

    function creating_black_boxes() {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (!crossword.answers[i][j]){
            document.getElementById(`i=${i}, j=${j}`).className = 'buttons002';
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

    createField();

    crosswordSubmitBtn.addEventListener('click', e => {
      let answers = creating_dict();
      let total_boxes = answers.length * answers[0].length;
      let actual = 0;
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (crossword.answers[i][j] == answers[i][j]){
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
