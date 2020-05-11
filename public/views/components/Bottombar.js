let Bottombar = {
    render: async () => {
        let view =  /*html*/`
        <footer class="footer-container">
            <div class="contact-details-container">
            <p class="footer-title-text">Contact details:</p>
            <p class="footer-text">E-mail:</p>
            <p class="footer-text"><a href="mailto:klapatok1980@gmail.com">klapatok1980@gmail.com</a><p>
            <p class="footer-text">Phone:</p>
            <p class="footer-text"><a href="tel:+375293367685">+375 (29) 336-76-85</a></p>
            </div>
            <div class="copyright-container">
            <p>Crossword labs ©2020</p>
            </div>
        </footer>
        `
        return view
    },
    after_render: async () => { }

}

export default Bottombar;
