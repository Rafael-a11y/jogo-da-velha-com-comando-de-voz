
let placarO = document.querySelector("#pontuacao-o");
let placarX = document.querySelector("#pontuacao-x");
let exibeTutorial = sessionStorage.getItem("exibir-tutorial") || "true";
const options = {keyboard: false, backdrop: "static", focus: true};
const modalTutorial = new bootstrap.Modal('#tutorialBackdrop', options);
const modalTutorialDOM = document.querySelector("#tutorialBackdrop");
const modalPlacar = new bootstrap.Modal("#placarModal", options);
const modalPlacarDOM = document.getElementById("placarModal");
const checkbox = document.querySelector("#checkbox-tutorial");
console.log(checkbox);

modalTutorialDOM.addEventListener("hidden.bs.modal", () => 
{
    iniciarCapturaDeVoz();
    adicionarOuvinteDeTeclado();
});

modalPlacarDOM.addEventListener('hidden.bs.modal', () => {reiniciar();});

const naoMostrarTutorialNovamente = () =>
{
    if(checkbox.checked)
    {
        console.log("checkbox marcado");
        sessionStorage.setItem("exibir-tutorial", false);
    }
    else
    {
        console.log("checkbox desmarcado")
        sessionStorage.setItem("exibir-tutorial", true);
    }
}

checkbox.addEventListener("change", naoMostrarTutorialNovamente);

function exibirModalDeTutorial()
{
    if(exibeTutorial == "true")
    {
        modalTutorial.show();
    }
    else
    {
        console.log("tutrorial bloqueado")
    }
    
}

function exibirModalDePlacar()
{
    placarO.textContent = placar[0].pontuacao;
    placarX.textContent = placar[1].pontuacao;
    modalPlacar.show();
}

exibirModalDeTutorial();
