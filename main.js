const tabuleiro = document.querySelector("#tabuleiro");
const campos = document.querySelectorAll(".campo");
const camposArray = Array.from(campos);
const matriz = [new Array(3), new Array(3), new Array(3)];
console.log(matriz);
let xOuCircle = false;

campos.forEach((campo) =>
{
    campo.addEventListener("click", () => {selecionarCampo(campo);});
});

document.addEventListener("click", () => 
{
    reiniciar();
});

function selecionarCampo(campo)
{
    const imgX = document.createElement("img");
    const imgCircle = document.createElement("img");

    imgX.setAttribute("src", `./assets/x.svg`);
    imgX.setAttribute("alt", `ícone de X`);
    imgX.classList.add("centralizado");
    
    imgCircle.setAttribute("src",`./assets/circle.svg`);
    imgCircle.setAttribute("alt",`ícone de O`);
    imgCircle.classList.add("centralizado");

    if(campo.childNodes.length > 0)
    {
        campo.innerHTML = "";
    }
    if(xOuCircle)
    {
        campo.append(imgX);
    }
    else
    {
        campo.append(imgCircle);
    }
    xOuCircle = !xOuCircle;
}

function reiniciar()
{
    if(camposArray.every((campo) => campo.hasChildNodes()))
    {
        window.location.reload();
    }
}