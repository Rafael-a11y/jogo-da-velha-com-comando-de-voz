const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList; 

  let recognitionAtivo = false;
  const recognition = new SpeechRecognition();
  const matrizPossibilidades = ["A1","A2","A3","B1","B2","B3","C1","C2","C3"]
  recognition.continuous = true;
  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;
  recognition.start();
  recognitionAtivo = true;

  recognition.addEventListener("result", onSpeak);

  function onSpeak(evento)
  {
    let chute = evento.results[evento.results.length - 1];
    chute =  verificarEConverter(chute);
    console.log(evento);
    validar(chute);
    reiniciar();
  }

  function verificarEConverter(chute)
  {
    chute = (chute == "81" ? "A1" : chute == "82" ? "A2" : chute == "83" ? "A3" : chute);
    return chute;
  }

  function validar(chute)
  {
    matrizPossibilidades.forEach((valor, indice) =>
    {
      for(let i = 0; i < chute.length; i++)
      {
        let alternativa = chute[i].transcript.replaceAll(" ", "");
        if(valor == alternativa)
        {
          console.log(alternativa);
          selecionarCampo(campos[indice], indice);
          return;
        }
      }
    });
  }
 