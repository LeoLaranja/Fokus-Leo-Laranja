const html = document.querySelector('html')
const foco = document.querySelector('.app__card-button--foco');
const curto = document.querySelector('.app__card-button--curto');
const longo = document.querySelector('.app__card-button--longo');
const imgDeTela = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const button = document.querySelectorAll('.app__card-button');
const startPause = document.querySelector('#start-pause');
const startPauseBotao = document.querySelector('#start-pause span');
const imgStartPause = document.querySelector('.app__card-primary-butto-icon');
const printTemporizador = document.querySelector('#timer');

const checkboxMusic = document.querySelector('#alternar-musica');
const music = new Audio ('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio ('./sons/play.wav');
const audioPause = new Audio ('./sons/pause.mp3');
const audioAcabou = new Audio ('./sons/beep.mp3');

let temporizador = 1500;
let intervaloId = null;

music.loop = true;

checkboxMusic.addEventListener('change', function(){
    if(music.paused){
    music.play()
   } else{
    music.pause()
   }
})

foco.addEventListener('click', function () {
    temporizador = 1500;
    alterarTela('foco');
    foco.classList.add('active');
})

curto.addEventListener('click', function (){
    temporizador = 300;
    alterarTela('descanso-curto');
    curto.classList.add('active')
})

longo.addEventListener('click', function(){
    temporizador = 900;
    alterarTela('descanso-longo');
    longo.classList.add('active')
})

function alterarTela (dados) {
    mostrarTempo();
    button.forEach(function(dados){
        dados.classList.remove('active')
    })
    html.setAttribute('data-contexto', dados)
    imgDeTela.setAttribute('src', `./imagens/${dados}.png`)
    switch (dados) {
        case 'foco':
            title.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>'
            break;
        case 'descanso-curto':
            title.innerHTML = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>'
            break;
        case 'descanso-longo':
            title.innerHTML = 'Hora de voltar a superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>'
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(temporizador <= 0){
        parar()
        audioAcabou.play()
        return
    }
    temporizador -= 1
    mostrarTempo();
}
startPause.addEventListener('click',iniciarPausar);

function iniciarPausar (){
    if (intervaloId){
        parar();
        audioPause.play()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startPauseBotao.textContent='Pausar'
    imgStartPause.setAttribute('src', './imagens/pause.png');
}

function parar () {
    clearInterval (intervaloId);
    intervaloId = null;
    startPauseBotao.textContent='Começar'
    imgStartPause.setAttribute('src', './imagens/play_arrow.png') 
}

function mostrarTempo (){
    const tempo = new Date(temporizador * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute:'2-digit', second: '2-digit'})
    printTemporizador.innerHTML = `${tempoFormatado}`
}

mostrarTempo();