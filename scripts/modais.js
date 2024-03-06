
const options = {keyboard: false, backdrop: "static", focus: true};
const modalTutorial = new bootstrap.Modal('#tutorialBackdrop', options);
const modalPlacar = new bootstrap.Modal("#placarModal", options);
const modalPlacarDOM = document.getElementById("placarModal");
modalPlacarDOM.addEventListener('hidden.bs.modal', () => {reiniciar();});

function exibirModalDeTutorial()
{
    modalTutorial.show();
}

function exibirModalDePlacar()
{
    modalPlacar.show();
}
exibirModalDeTutorial();


