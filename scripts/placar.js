const placar = JSON.parse(sessionStorage.getItem("pontuacao")) || [{jogador: "O", pontuacao: 0}, {jogador: "X", pontuacao: 0}];

function definirPontuacao()
{
    let vencedorDaVez = (xOuCircle == true ? {jogador: "X"} : {jogador: "O"});   
    
    if(placar.length > 0)
    {
        placar.forEach((competidor) => 
            {
                if(competidor.jogador === vencedorDaVez.jogador) 
                {
                    competidor.pontuacao += 1;
                }
            });
        salvarPontuacaoNaSessionStorage();
        exibirModalDePlacar();
    }
}

function salvarPontuacaoNaSessionStorage()
{
    sessionStorage.setItem("pontuacao", JSON.stringify(placar));
}
