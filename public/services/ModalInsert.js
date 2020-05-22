const ModalInsert = {
  insertTextInModal : (text, type, headerText, callback) => {
    let modal = document.getElementById("modal");
    let modalText = document.getElementById("modal-body-text");
    let modalHeader = document.getElementById('modal-header');
    let modalHeaderText = document.getElementById('modal-header-text');
    let span = document.getElementById("modal-header-close");

    modal.style.display = "block";
    modalText.innerText = text;

    span.onclick = function() {
      modal.style.display = "none";
      if (callback){ callback(); }
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        if (callback){ callback(); }
      }
    }

    switch (type) {
      case 'success':
        modalHeader.style.backgroundColor = "rgb(75,181,67)";
        break;
      case 'error':
        modalHeader.style.backgroundColor = "rgb(153,0,0)";
        break;
    }

    modalHeaderText.innerText = headerText;
  }
}

export default ModalInsert;
