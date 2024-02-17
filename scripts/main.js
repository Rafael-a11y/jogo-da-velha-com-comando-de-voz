const tabuleiro = document.querySelector("#tabuleiro");
const campos = Array.from(document.querySelectorAll(".campo"));
const matriz = [1,2,3,4,5,6,7,8,9];
const temFilhos =  elemento => elemento.hasChildNodes();
let xOuCircle = false;
let vencedor = false;

campos.forEach((campo, indice) =>
{
    campo.addEventListener("click", () => {selecionarCampo(campo, indice);});
});

document.addEventListener("click", () => 
{
    reiniciar();
});

function selecionarCampo(campo, indice)
{
    const imgX = document.createElement("img");
    const imgCircle = document.createElement("img");

    imgX.setAttribute("src", `./assets/x.svg`);
    imgX.setAttribute("alt", `ícone de X`);
    imgX.setAttribute("data-conteudo", "X");
    imgX.classList.add("centralizado");
    
    imgCircle.setAttribute("src",`./assets/circle.svg`);
    imgCircle.setAttribute("alt",`ícone de O`);
    imgCircle.setAttribute("data-conteudo", "O");
    imgCircle.classList.add("centralizado");

    if(campo.childNodes.length > 0)
    {
        campo.innerHTML = "";
    }
    if(xOuCircle)
    {
        matriz[indice] = "X"
        campo.append(imgX);
    }
    else
    {
        matriz[indice] = "O";
        campo.append(imgCircle);
    }
    verificarMatriz();
    xOuCircle = !xOuCircle;
    console.log(matriz);
}

function reiniciar()
{
    if(campos.every(temFilhos) || vencedor)
    {
        window.location.reload();
    }
}

function anunciarVencedor(jogadorVencedor)
{
    console.log("O jogador " + jogadorVencedor + " venceu1.");
    vencedor = true;
}

function verificarMatriz()
{
    for(let c = 0; c < matriz.length; c++)
    {
        if(matriz[c] == matriz[c + 1] && matriz[c + 1] == matriz[c + 2])
        {
            anunciarVencedor(matriz[c]);
        }
        else if(matriz[c] == matriz[c + 3] && matriz[c + 3] == matriz[c + 6])
        {
            anunciarVencedor(matriz[c]);
        }
        else if(matriz[c] == matriz[c + 4] && matriz[c + 4] == matriz[c + 8])
        {
            anunciarVencedor(matriz[c]);
        }
        else if( c == 2 && matriz[c] == matriz[c + 2] && matriz[c + 2] == matriz[c + 4])
        {
            anunciarVencedor(matriz[c]);
        }
        reiniciar();
    }
}