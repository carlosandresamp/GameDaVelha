"use strict";

import { Board } from "./src/js/board.js";
import { Score } from "./src/js/score.js";
import { Sound } from "./src/js/sound.js";
import { Game } from "./src/js/game.js";
import { CPU } from "./src/js/cpu.js";

// Criação das instâncias das classes
const soundInstance = new Sound(); // Instância responsável pelo controle do som
const gameInstance = new Game(); // Instância principal do jogo
const cpuInstance = new CPU(gameInstance); // Instância da CPU (se o jogo for contra a IA)
let scoreInstance = new Score(); // Instância do placar
const boardInstance = new Board(gameInstance); // Instância do tabuleiro

// Evento para resetar o placar e reiniciar o jogo
document.getElementById("resetBtn")?.addEventListener("click", () => {
    scoreInstance.resetScore(); // Zera o placar
    gameInstance.resetScore(); // Garante que o placar do Game também seja resetado
    gameInstance.resetGame(); // Reinicia o tabuleiro
    scoreInstance.renderScore(); // Atualiza a interface com os valores zerados
});

// Evento para voltar à tela inicial
document.getElementById("backToStartBtn")?.addEventListener("click", () => {
    // Mostra a tela de opções e esconde os elementos do jogo
    document.getElementById("game-options").style.display = "block";
    document.getElementById("board").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("endGame").style.display = "none";

    // Reseta o jogo e o placar
    scoreInstance.resetScore();
    gameInstance.resetScore();
    gameInstance.resetGame();

    scoreInstance.renderScore(); // Atualiza a interface do placar

    // Evita referências a instâncias antigas do placar e cria uma nova
    scoreInstance = null; 
    scoreInstance = new Score(gameInstance.isCPU);
});

// Função para iniciar o jogo corretamente
window.startGame = (againstCPU) => {
    gameInstance.setGameMode(againstCPU); // Define o modo de jogo (contra CPU ou 2 jogadores)
    gameInstance.resetGame(); // Reinicia o tabuleiro
    gameInstance.resetScore(); // Reseta o placar

    // Cria uma nova instância do placar para garantir a atualização correta
    scoreInstance = null;
    scoreInstance = new Score(againstCPU);
    scoreInstance.renderScore(); // Atualiza a interface do placar

    // Esconde a tela de opções e exibe os elementos do jogo
    document.getElementById("game-options").style.display = "none";
    document.getElementById("score").style.display = "block";
    document.getElementById("board").style.display = "grid";
    document.getElementById("endGame").style.display = "block";
};
