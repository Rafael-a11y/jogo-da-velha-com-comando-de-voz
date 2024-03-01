const tabuleiro = document.querySelector("#tabuleiro");
const campos = Array.from(document.querySelectorAll(".campo"));
const matriz = [new Array(3), new Array(3), new Array(3)];
const temFilhos =  elemento => elemento.hasChildNodes();
let xOuCircle = false;
let imgX;
let imgCircle;
let vencedor = false;
let linha;
let coluna;

campos.forEach((campo, indice) =>
{
    campo.addEventListener("click", () => 
    {
        gerarOOuX();
        selecionarCampo(campo, indice);
    });
});

document.addEventListener("click", () => 
{
    reiniciar();
});

function gerarOOuX()
{
    imgX = document.createElement("img");
    imgCircle = document.createElement("img");
    imgX.setAttribute("src", `./assets/x.svg`);
    imgX.setAttribute("alt", `ícone de X`);
    imgX.setAttribute("data-conteudo", "X");
    imgX.classList.add("centralizado");
    
    imgCircle.setAttribute("src",`./assets/circle.svg`);
    imgCircle.setAttribute("alt",`ícone de O`);
    imgCircle.setAttribute("data-conteudo", "O");
    imgCircle.classList.add("centralizado");
}

function selecionarCampo(campo, indice)
{
    definirLinhaEColuna(indice);
    inserirXOuO(campo);
    verificarMatriz();
}

function definirLinhaEColuna(indice)
{
    linha = (indice >= 0 && indice <=2 ) ? 0 : 
        (indice >= 3 && indice <= 5) ? 1 : 2;

    coluna = (linha == 0) ? indice :
        (linha == 1) ? indice - 3 : indice - 6;
}

function verificarSeIndiceNaMatrizEstaVago()
{
    if(matriz[linha][coluna] == null)
    {
        return true;
    }
    return false;
}

function inserirXOuO(campo)
{
    let valorParaInserirNaMatriz = xOuCircle == true ? "X" : "O";
    let imagemParaInserirNaTela =  xOuCircle == true ? imgX : imgCircle;
    if(verificarSeIndiceNaMatrizEstaVago() && campo.childNodes.length == 0)
    {
        matriz[linha][coluna] = valorParaInserirNaMatriz;
        campo.append(imagemParaInserirNaTela);
        xOuCircle = !xOuCircle
    }
    console.log(matriz);
}

function verificarMatriz()
{
    for(let l = 0; l < matriz.length; l++)
    {
        if(matriz[l][0] == matriz[l][1] && matriz[l][1] == matriz[l][2]) anunciarVencedor();
        else if(matriz[0][l] == matriz[1][l] && matriz[1][l] == matriz[2][l]) anunciarVencedor();
        else if(matriz[0][0] == matriz[1][1] && matriz[1][1] == matriz[2][2]) anunciarVencedor();
        else if(matriz[0][2] == matriz[1][1] && matriz[1][1] == matriz[2][0]) anunciarVencedor();
    }
    reiniciar();
}

function anunciarVencedor(jogadorVencedor)
{
    console.log("O jogador " + jogadorVencedor + " venceu1.");
    vencedor = true;
}

function reiniciar()
{
    if(campos.every(temFilhos) || vencedor)
    {
        window.location.reload();
    }
}