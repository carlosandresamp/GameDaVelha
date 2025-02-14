"use strict"; // Habilita o modo estrito do JavaScript para evitar erros comuns.

export class Score {
    constructor(isCPU = false) { // Define se o jogo será contra a CPU ou entre dois jogadores.
        this.isCPU = isCPU;  // Armazena a informação sobre o tipo de jogo (CPU ou jogador vs. jogador).
        this.scorePlayer1 = 0; // Inicializa a pontuação do jogador 1 como zero.
        this.scorePlayer2 = 0; // Inicializa a pontuação do jogador 2 como zero.
    }

    updateScore(winner) { // Atualiza a pontuação com base no vencedor da rodada.
        if (this.isCPU) {
            // Se o jogo for contra a CPU, o jogador 1 é o humano e o jogador 2 é a CPU.
            if (winner === 1) { 
                this.scorePlayer1++; // Se o jogador 1 vencer, aumenta a pontuação dele.
            } else if (winner === 2) {
                this.scorePlayer2++; // Se a CPU vencer, aumenta a pontuação dela.
            }
        } else {
            // Se for um jogo de dois jogadores, cada um recebe sua pontuação normalmente.
            if (winner === 1) {
                this.scorePlayer1++; // Se o jogador 1 vencer, aumenta sua pontuação.
            } else if (winner === 2) {
                this.scorePlayer2++; // Se o jogador 2 vencer, aumenta sua pontuação.
            }
        }
        this.renderScore(); // Atualiza a exibição do placar na tela.
    }

    resetScore() { // Reseta a pontuação dos jogadores para zero.
        this.scorePlayer1 = 0; // Define a pontuação do jogador 1 como zero.
        this.scorePlayer2 = 0; // Define a pontuação do jogador 2 como zero.
    
        if (window.gameInstance) { // Verifica se há uma instância global do jogo armazenada.
            gameInstance.scorePlayer1 = 0; // Zera a pontuação global do jogador 1.
            gameInstance.scorePlayer2 = 0; // Zera a pontuação global do jogador 2.
        }
    
        this.renderScore(); // Atualiza a exibição do placar na tela.
    }
    
    renderScore() { // Atualiza o placar na interface do usuário.
        const scoreElement = document.getElementById("score"); // Obtém o elemento HTML onde o placar será exibido.

        // Verifica se o elemento de placar existe para evitar erros ao tentar atualizar um elemento inexistente.
        if (scoreElement) {
            if (this.isCPU) {
                scoreElement.innerText = `Jogador 1 (X) Vs. CPU (O)`; // Exibe que o jogo é contra a CPU.
            } else {
                // Já existe em board.js
            }
        } else {
            console.error("Elemento de placar não encontrado."); // Exibe um erro no console se o placar não for encontrado.
        }
    }
}
