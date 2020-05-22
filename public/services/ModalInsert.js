const ModalInsert = {
  insertTextInModal : (text, type, headerText) => {
    let modal = document.getElementById("modal");
    let modalText = document.getElementById("modal-body-text");
    let modalHeader = document.getElementById('modal-header');
    let modalHeaderText = document.getElementById('modal-header-text');

    modal.style.display = "block";
    modalText.innerText = text;

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
