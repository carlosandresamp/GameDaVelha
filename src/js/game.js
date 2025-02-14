"use strict";

import { Board } from "./board.js";
import { CPU } from "./cpu.js";

export class Game {
    constructor() {
        this.currentPlayer = 1; // Define o jogador atual (1 ou 2)
        this.board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; // Representação do tabuleiro
        this.gameEnded = false; // Indica se o jogo terminou
        this.scorePlayer1 = 0; // Placar do jogador 1
        this.scorePlayer2 = 0; // Placar do jogador 2
        this.playingAgainstCPU = false; // Indica se o jogo é contra a CPU
        this.boardInstance = new Board(this); // Instância do tabuleiro
        this.cpuInstance = new CPU(this); // Instância da CPU
        this.buttons = document.querySelectorAll('button[id*="nivel"]'); // Seleciona os botões de nível de dificuldade
        this.addEventListeners(); // Adiciona os event listeners aos botões
    }

    setGameMode(againstCPU) {
        this.playingAgainstCPU = againstCPU; // Define se o jogo será contra a CPU
    }

    addEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.setNivelMode(event); // Chama o método para definir o nível de dificuldade
            });
        });
    }

    setNivelMode(event) {
        const buttonId = event.target.id; // Obtém o ID do botão clicado
        console.log(buttonId); // Exibe no console o ID do botão pressionado
        this.nivelEscolhido = buttonId; // Armazena o nível escolhido
    }

    checkWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6] // Diagonais
        ];
        return winPatterns.some(pattern => pattern.every(index => this.board[index] === player));
        // Verifica se o jogador atual possui uma sequência vencedora
    }

    checkDraw() {
        return this.board.every(cell => cell !== "-"); // Retorna true se todas as casas estiverem preenchidas
    }

    getNivelMode() {
        return this.nivelEscolhido; // Retorna o nível de dificuldade escolhido
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1; // Alterna entre jogador 1 e 2
    
        if (this.playingAgainstCPU && this.currentPlayer === 2 && !this.gameEnded) {
            let nivel = this.getNivelMode(); // Obtém o nível escolhido
            console.log(nivel);
            this.cpuInstance.cpuMove(nivel); // Chama o movimento da CPU de acordo com o nível
        }
    }

    makeMove(index) {
        if (this.board[index] === "-" && !this.gameEnded) { // Verifica se a célula está vazia e o jogo ainda não acabou
            this.board[index] = this.currentPlayer === 1 ? "X" : "O"; // Define a jogada no tabuleiro
            this.boardInstance.renderBoard(); // Atualiza o tabuleiro na interface

            if (this.checkWin("X")) { // Verifica se o jogador 1 venceu
                alert("Jogador 1 ganhou!");
                this.scorePlayer1++;
                this.gameEnded = true;
            } else if (this.checkWin("O")) { // Verifica se o jogador 2 (ou CPU) venceu
                alert(this.playingAgainstCPU ? "A CPU ganhou!" : "O jogador 2 ganhou a partida!");
                this.scorePlayer2++;
                this.gameEnded = true;
            } else if (this.checkDraw()) { // Verifica se houve empate
                alert("Empate!");
                this.gameEnded = true;
            } else {
                this.switchPlayer(); // Alterna o jogador caso ninguém tenha vencido ainda
            }

            this.boardInstance.renderScore(); // Atualiza o placar
            if (this.gameEnded) setTimeout(() => this.resetGame(), 1000); // Reinicia o jogo após 1 segundo
        }
    }

    resetGame() {
        this.board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; // Reseta o tabuleiro
        this.gameEnded = false; // Reinicia o estado do jogo
        this.currentPlayer = 1; // Define o jogador inicial como o jogador 1
        this.boardInstance.renderBoard(); // Atualiza o tabuleiro na interface
    }

    resetScore() {
        this.scorePlayer1 = 0; // Reseta o placar do jogador 1
        this.scorePlayer2 = 0; // Reseta o placar do jogador 2
        this.boardInstance.renderScore(); // Atualiza o placar na interface
    }
}
