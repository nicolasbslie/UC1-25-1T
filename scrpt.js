//Pegamos os botões de escolha: pedra, papel, tesoura
//la no html podemos colocar todos os botões dentro da área com classe "choices"
const botoes = document.querySelectorAll(".choices button") //Essa linha de código seleciona vários botões no html e guarda eles em uma variável chamadas botões

//Pegamos os textos que mostram as mensagens na tela
//essas mensagens são para mostrar o que o jogador fez e quem venceu
const textoJ1 = document.getElementById("player1-choice") //onde vai aparecer a escolha do jogador 1
const textoJ2 = document.getElementById("player2-choice") //onde vai aparecer a escolha do jogador 2
const textoResultado = document.getElementById("winner") //onde aparece o resultado do jogo

//varáveis que guardam o que cada jogador escolheu
// começando com "null"
let jogador1 = null
let jogador2 = null

function verificarVencedor(j1, j2){
    if(j1 === j2){
        return "Empate"
    } else if (j1 === "pedra" && j2 === "tesoura" || (j1 === "papel" && j2 === "pedra") || (j1 === "tesoura" && j2 === "papel")){
        return "Jogador 1 Venceu!!!"
    } else {
        return "Jogador 2 Venceu!!!"
    }
}

function novoJogo(){
    jogador1 = null //zera a escolha do jogador 1
    jogador2 = null //zera a escolha do jogador 2
    textoJ1.textContent = "Jogador 1: escolha sua jogada" //mostra essa mensagem orientando o jogador 1
    textoJ2.textContent = "Jogador 2: escolha sua jogada" //mostra essa mensagem orientando o jogador 2
    textoResultado.textContent = "" //apaga o resultado anterioir
}

//Aqui é onde tratamos os cliques nos botões, no caso, quando alguém clica em "pedra, papel e tesoura"

botoes.forEach( botao => {
    botao.addEventListener("click", () => { //Pegamos uma escolha que está no botão clicando (esse valor está guardado no atributo do data-choice no HTML0)
        const escolha = botao.getAttribute("data-choice") // Ela vai pegar o valor do atributo data-choice do botão que foi clicado
        if(jogador1 === null){
            jogador1 = escolha //guarda a escolha
            textoJ1.textContent = "Jogador 1 já escolheu"
            textoResultado.textContent = "Vez do jogador 2!"
        } else if(jogador2 === null) {
            jogador2 = escolha
            textoJ2.textContent = "Jogador 2 já escolher"
            const resultado = verificarVencedor(jogador1, jogador2) //mostramos o resultado na tela junto com as jogadas
            textoResultado.textContent = `${resultado} (J1: ${jogador1} | J2: ${jogador2})`
        } else{
            novoJogo() //Zera tudo
            jogador1 = escolha //jogador 1 faz sua nova escolha
            textoJ1.textContent = "Jogador 1 já escolheu"
            textoResultado.textContent = "Vez do jogador 2!"
        }
    })
});
//Quando a página é carregada, chamamos a função para começar o jogo "limpo"
novoJogo()