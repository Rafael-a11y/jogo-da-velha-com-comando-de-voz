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
    campo.addEventListener("click", (event) => 
    {
        
        if (verificarSeEstaDentroDoQuadrado(event, campo))
        {
            console.log("Dentro do quadrado");
            selecionarCampo(campo, indice);
        }
        
    });
});

document.addEventListener("keydown", (evento) =>
{
    let teclaNumerica = parseInt(evento.key);
    if(teclaNumerica >= 1 && teclaNumerica <= 9)
    {
        selecionarCampo(campos[teclaNumerica - 1], teclaNumerica - 1);
    }
});

function verificarSeEstaDentroDoQuadrado(evento, campo)
{
    const rect = campo.getBoundingClientRect();
    const limiteBorda = 5;
    const x = evento.clientX - rect.left;
    const y = evento.clientY - rect.top;
    if (x > limiteBorda && x < rect.width - limiteBorda && y > limiteBorda && y < rect.height - limiteBorda)
     return true;
}

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
    gerarOOuX();
    definirLinhaEColuna(indice);
    inserirXOuO(campo);
    verificarMatriz();
    if(vencedor)
    {
        definirPontuacao(xOuCircle);
        return;
    }
    reiniciar();
    console.log("chegou aqui");
    alternarXOuCircle();
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
    }
}

function alternarXOuCircle()
{
    xOuCircle = !xOuCircle;
}

function verificarMatriz()
{
    for(let l = 0; l < matriz.length; l++)
    {
        const casasHorizontais = [matriz[l][0], matriz[l][1], matriz[l][2]];
        const casasVerticais = [matriz[0][l], matriz[1][l], matriz[2][l]];
        const casasDiagonaisParaDireita = [matriz[0][0], matriz[1][1], matriz[2][2]];
        const casasDiagonaisParaEsquerda = [matriz[0][2], matriz[1][1], matriz[2][0]];
        const possiveisResultados = [casasHorizontais, casasVerticais, casasDiagonaisParaDireita, casasDiagonaisParaEsquerda];
        if(verificarPontuacao(possiveisResultados))
        {
            definirVencedor(true);
        }
    }

}

function verificarPontuacao(arrayComQuatroArrays)
{
    return arrayComQuatroArrays.some(array => verificarSeValoEValido(array) && verficarSeSaoIguais(array));
}

function definirVencedor(booleano)
{
    vencedor = booleano;
}

function reiniciar()
{
    if(campos.every(temFilhos) || vencedor)
    {
        window.location.reload();
    }
}

function verificarSeValoEValido(arrayComValoresASeremComparados)
{
    if(arrayComValoresASeremComparados.every(valor => valor != undefined && valor != null && valor != "" && valor != NaN))
    {
        return true;
    }
    return false;
}

function verficarSeSaoIguais(arrayComValoresASeremComparados)
{
    if(arrayComValoresASeremComparados.every(valor => valor === "X"))
    {
        return true;
    }
    else if(arrayComValoresASeremComparados.every(valor => valor === "O"))
    {
        return true;
    }
    return false;
}