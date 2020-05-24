async function getCrossword(){
  const snapshot = await firebase.database().ref('/crosswords/').once('value');

  return snapshot.val();
}

let Home = {
  render : async () => {
    let view =  /*html*/`
      <section class="home-section">
          <h1 id="HomeTitle" class="title-section-text">Home</h1>
          <p class="desctiption-title-text">
          On the pages of our site you can solve crosswords in the online mode, that is, directly on the site, both on a laptop and on a mobile phone. <br>
          Our crosswords are absolutely free. You no longer need to buy magazines with crosswords and crosswords and carry them around with you all the time. <br>
          Have you got a free minute, lunch break or chef at the meeting? :) <br>
          Visit us and start solving any crossword puzzle.
          </p>
      </section>

      <section class="online-croswords-section">
        <h2 id="OnlineCrosswordsTitle" class="title-section-text">Online crosswords</h1>
        <p class="desctiption-title-text">
          You can select any crossword already created in advance on our website. To do this, click on the name of one of them or create a new crossword.
        </p>
        <div class="crossword-list-container">
        <ul id='crossword_table' class="items-container">
          <a href='/#/crosswords'><li class="list-element-buttom list-element-buttom--plus">+</li></a>
        </ul>
        <div>
      </section>
      </section>
    `
    return view
  }
  , after_render: async () => {
    const crossword_ul = document.getElementById('crossword_table');
    const crosswords = await getCrossword();
    create_crosswords_links();


    function create_crosswords_links(){
      for (let key in crosswords){
        let href = document.createElement('a');
        href.setAttribute('href', `#/crossword/${key}`);
        href.innerHTML = `<li class="list-element-buttom">
                            <p class="created-crossword created-crossword--title">${crosswords[key].name}</p><br>
                            <p class="created-crossword">Words: ${crosswords[key].number_of_questions}</p>
                          </li>`;
        crossword_ul.append(href);
      }

    }
  }

}

export default Home;
