const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList; 

  let recognitionAtivo = false;
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  const matrizPossibilidades = ["A1","A2","A3","B1","B2","B3","C1","C2","C3"];
  const grammar = '#JSGF V1.0; grammar casas; public <casa> = ' +
  'A1 | A2 | A3 | B1 | B2 | B3 | C1 | C2 | C3 ;';

  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = "pt-BR";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;
  recognition.start();
  
  recognition.addEventListener("result", onSpeak);
  recognition.addEventListener("end", () => {recognition.start();})
  // recognition.addEventListener("nomatch", () => {console.log("Não entendi o que disse")})
  // recognition.addEventListener("error", (e) => {console.log("Houve um erro com o reconhecimento de fala: " + e.error)})
  recognition.onnomatch = () => {console.log("Não entendi o que disse")};
  recognition.onerror = () => {console.log("Um erro ocorreu durante o reconhecimento de voz")};
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
        let alternativa = chute[i].transcript.replaceAll(" ", "").toUpperCase();
        if(valor == alternativa)
        {
          console.log(alternativa);
          selecionarCampo(campos[indice], indice);
          return;
        }
      }
    });
  }
 