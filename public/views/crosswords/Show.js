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
    
  }
}

export default CrosswordShow;
