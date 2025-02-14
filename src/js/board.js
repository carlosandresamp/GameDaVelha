"use strict";

export class Board {
    constructor(gameInstance) {
        this.game = gameInstance; // Referência à instância do jogo
    }

    // Atualiza o placar na interface
    renderScore() {
        const scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.innerText = `Jogador 1 (X): ${this.game.scorePlayer1} \n Jogador 2 (O): ${this.game.scorePlayer2}`;
        }
    }

    // Renderiza o tabuleiro na interface
    renderBoard() {
        const boardElement = document.getElementById("board");
        if (!boardElement) return; // Se o elemento do tabuleiro não for encontrado, interrompe a função

        boardElement.innerHTML = ""; // Limpa o conteúdo do tabuleiro antes de renderizar novamente

        // Percorre todas as posições do tabuleiro
        for (let i = 0; i < this.game.board.length; i++) {
            const cell = document.createElement("div"); // Cria um elemento <div> para cada célula
            cell.className = "cell"; // Adiciona a classe CSS para estilização
            cell.innerText = this.game.board[i] !== "-" ? this.game.board[i] : ""; // Exibe "X" ou "O" se houver jogada na célula
            cell.onclick = () => this.game.makeMove(i); // Adiciona o evento de clique para fazer uma jogada

            boardElement.appendChild(cell); // Adiciona a célula ao tabuleiro
        }
    }
}
