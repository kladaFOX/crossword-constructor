async function getCrossword(){
  const snapshot = await firebase.database().ref('/crosswords/').once('value');

  return snapshot.val();
}

let Home = {
  render : async () => {
    let view =  /*html*/`
      <section class="section">
        <div>
          <h1> Crosswords </h1>

          <ul id='crossword_table'>

          </ul>
        </div>
      </section>
    `
    return view
  }
  , after_render: async () => {
    const crossword_ul = document.getElementById('crossword_table');
    const crosswords = await getCrossword();
    let crosswords_keys = {};
    for(let key in crosswords){
      crosswords_keys['key'] = crosswords[`${key}`].name;
    }
    create_crosswords_links();


    function create_crosswords_links(){
      for (let [key, value] of Object.entries(crosswords_keys)){
        let href = document.createElement('li');
        href.innerHTML = `<a href='#/crosword/${key}'>${value}</a>`;
        crossword_ul.append(href);
      }

    }
  }

}

export default Home;
