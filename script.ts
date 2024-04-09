// Variáveis para controlar o estado do jogo
let currentPlayer: number = 1; // Jogador atual
let board: string[] = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; // Tabuleiro do jogo
let gameEnded: boolean = false; // Flag indicando se o jogo terminou
let scorePlayer1: number = 0; // Pontuação do Jogador 1
let scorePlayer2: number = 0; // Pontuação do Jogador 2

// Variável para armazenar o estado do som (ligado/desligado)
let isSoundOn: boolean = true;

// Função para verificar se algum jogador ganhou
function checkWin(player: string): boolean {
    // Lógica de verificação de vitória
    for (let i = 0; i <= 6; i += 3) {
        if (board[i] === player && board[i + 1] === player && board[i + 2] === player) {
            return true;
        }
    }
    for (let i = 0; i <= 2; i++) {
        if (board[i] === player && board[i + 3] === player && board[i + 6] === player) {
            return true;
        }
    }
    if ((board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)) {
        return true;
    }
    return false;
}

// Função para verificar se houve empate
function checkDraw(): boolean {
    return !board.includes("-");
}

// Função para alternar entre os jogadores
function switchPlayer(): void {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// Função para renderizar o tabuleiro na tela
function renderBoard(): void {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerText = board[i];
        cell.addEventListener("click", () => makeMove(i));
        boardElement.appendChild(cell);
    }
}

// Função para realizar uma jogada
function makeMove(index: number): void {
    if (board[index] === "-" && !gameEnded) {
        board[index] = currentPlayer === 1 ? "X" : "O";
        renderBoard();
        if (checkWin("X")) {
            alert("Jogador 1 ganhou essa rodada!");
            scorePlayer1++;
            gameEnded = true;
        } else if (checkWin("O")) {
            alert("Jogador 2 ganhou essa rodada!");
            scorePlayer2++;
            gameEnded = true;
        } else if (checkDraw()) {
            alert("Deu véia! Empate!");
            gameEnded = true;
        } else {
            switchPlayer();
        }
        renderScore();
        if (gameEnded) {
            resetGame();
        }
    }
}

// Função para reiniciar o jogo
function resetGame(): void {
    board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    gameEnded = false;
    renderBoard();
}

// Função para reiniciar a pontuação
function resetScore(): void {
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    renderScore();
}

// Função para renderizar a pontuação na tela
function renderScore(): void {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `  Jogador 1: ${scorePlayer1} | Jogador 2: ${scorePlayer2}`;
}

// Função para ligar/desligar o som
function toggleSound(): void {
    const backgroundMusic = document.getElementById("backgroundMusic") as HTMLAudioElement;
    const soundButton = document.getElementById("soundButton") as HTMLButtonElement;

    if (isSoundOn) {
        backgroundMusic.pause();
        soundButton.innerText = "🔇";
    } else {
        backgroundMusic.play();
        soundButton.innerText = "🔊";
    }
    isSoundOn = !isSoundOn;
}

// Adiciona um evento de clique ao botão de som
document.getElementById("soundButton")?.addEventListener("click", toggleSound);

// Inicia a música automaticamente ao carregar a página
window.addEventListener("load", () => {
    const backgroundMusic = document.getElementById("backgroundMusic") as HTMLAudioElement;
    backgroundMusic.play();
});

// Renderiza a pontuação e o tabuleiro na tela
renderScore();
renderBoard();
