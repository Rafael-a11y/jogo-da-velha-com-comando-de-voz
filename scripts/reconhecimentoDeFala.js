const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList; 

  const recognition = new SpeechRecognition();
  // const gramaticaDeReconhecimentoDeFala = new SpeechGrammarList();
  const matrizPossibilidades = ["A1","A2","A3","B1","B2","B3","C1","C2","C3"];
  const matrizNumerosEmExtenso = ["um", "dois", "três"]
  // const gramatica = '#JSGF V1.0; grammar casas; public <casa> = ' + matrizPossibilidades.join(' | ') + ' ;';

  // gramaticaDeReconhecimentoDeFala.addFromString(gramatica, 1);
  // recognition.grammars = gramaticaDeReconhecimentoDeFala;
  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;
  
  
  recognition.addEventListener("result", onSpeak);
  recognition.addEventListener("end", () => {recognition.start();})
  recognition.addEventListener("nomatch", () => {console.log("Não entendi o que disse")})
  recognition.addEventListener("error", (e) => {console.log("Houve um erro com o reconhecimento de fala: " + e.error)})
  
  function iniciarCapturaDeVoz()
  {
    recognition.start();
  }
  
  function onSpeak(evento)
  {
    let chute = evento.results[evento.results.length - 1];
    console.log(evento);
    validar(chute);
  }

  function numeroParaExtenso(numero)
  {
    if(numero >= 1 && numero <= 3)
    {
      let numeroConvertidoEmExtenso = matrizNumerosEmExtenso(numero - 1);
      return numeroConvertidoEmExtenso;
    }
    return;
  }

  function validar(chute)
  {
    matrizPossibilidades.forEach((valor, indice) =>
    {
      for(let i = 0; i < chute.length; i++)
      {
        let alternativa = chute[i].transcript.replaceAll(" ", "").replaceAll(".", "").toUpperCase();
        alternativa = alternativa.includes("UM") ? alternativa.replaceAll("UM", "1") : alternativa;
        console.log(alternativa);
        if(valor == alternativa)
        {
          console.log(alternativa);
          selecionarCampo(campos[indice], indice);
          return;
        }
        
      }
    });
  }
 