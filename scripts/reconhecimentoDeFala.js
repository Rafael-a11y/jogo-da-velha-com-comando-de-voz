const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList; 

  let recognitionAtivo = false;
  const casas = "#JSGF V1.0; grammar casas; public <casas> = A1 | A2 | A3;";
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  const matrizPossibilidades = ["A1","A2","A3","B1","B2","B3","C1","C2","C3"];
  speechRecognitionList.addFromString(casas, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.start();
  recognitionAtivo = true;

  recognition.addEventListener("result", onSpeak);

  function onSpeak(evento)
  {
    let chute = evento.results[evento.results.length - 1][0].transcript.replaceAll(" ", "").toUpperCase();
    chute =  verificarEConverter(chute);
    console.log(chute);
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
      if(valor == chute)
      {
        selecionarCampo(campos[indice], indice);
      }
    });
  }