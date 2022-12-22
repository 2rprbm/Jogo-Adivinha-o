const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
const reconhecimentoFala = new SpeechRecognition();
reconhecimentoFala.lang = 'pt-br'

let numeroSecreto = Math.random()*100
numeroSecreto = Math.trunc(numeroSecreto) + 1
console.log(numeroSecreto)

const botao = document.querySelector(".iniciar-jogo")
botao.addEventListener('click', () => {
    botao.classList.add("invisivel")
    reconhecimentoFala.start();
    montaEstruturaJogo()
})

function montaEstruturaJogo(){
    const estruturaHtml = document.querySelector(".secao-jogo")
    estruturaHtml.innerHTML += ` 
    <h2 class="palpite">Você falou: </h2>
    <span class="resultado"></span>
    <h2 class="palpite">O número secreto é <span class="dica"></span></h2>`
}
  
reconhecimentoFala.onresult = (evento) => {
    console.log(evento.results[0][0].transcript)
    const mostraChute = document.querySelector(".resultado")
    mostraChute.textContent = evento.results[0][0].transcript
    const transformadoEmNumero = parseInt(evento.results[0][0].transcript)
    verificaFimJogo(transformadoEmNumero)
    
}

function verificaFimJogo(numeroFalado){
    const mostraResultado = document.querySelector(".dica")
    if(numeroFalado > numeroSecreto){
        mostraResultado.textContent = 'menor'
    }else if (numeroFalado < numeroSecreto){
        mostraResultado.textContent = 'maior'
    }else{
        mostraTelaVitoria(numeroFalado)
    }
}

function mostraTelaVitoria(numeroFalado){
    const estruturaHtmlFimJogo = document.querySelector(".secao-jogo")   
    estruturaHtmlFimJogo.innerHTML = `<h1 class="titulo-jogo">Voce acertou!</h1>
    <h2 class="palpite">O número secreto era: </h2>
    <span class="resultado"></span>
    <button class="reiniciar-jogo">Jogar Novamente!</button>`   
    const mostraChuteAcertado = document.querySelector(".resultado")
    mostraChuteAcertado.textContent = numeroFalado

    const botaoReiniciar = document.querySelector(".reiniciar-jogo")
    botaoReiniciar.addEventListener('click', () => {
        window.location.reload()
    })  
}

reconhecimentoFala.addEventListener('end', () => reconhecimentoFala.start())