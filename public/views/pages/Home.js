async function getCrossword(){
  const snapshot = await firebase.database().ref('/crosswords/').once('value');

  return snapshot.val();
}

let Home = {
  render : async () => {
    let crosswords = await getCrossword();
    let crosswords_keys = [];
    for(let key in crosswords){
      crosswords_keys.push(key);
    }
    let view =  /*html*/`
      <section class="section">
        <h1> Crosswords </h1>
        <ul>
          ${ crosswords_keys.map(name =>
            /*html*/`<li><a href="#/crossword/${name}">${name}</a></li>`
            ).join('\n ')
          }
        </ul>
      </section>
    `
    return view
  }
  , after_render: async () => {
  }

}

export default Home;
