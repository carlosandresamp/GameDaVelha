"use strict";

export class CPU {
  constructor(gameInstance) {
    this.game = gameInstance; // Referência ao jogo
  }

  // Método para a CPU realizar uma jogada
  cpuMove(nivel) {
    if (nivel == "nivelFacil") {
      if (this.game.gameEnded) return; // Se o jogo acabou, não faz nada

      let bestMove = this.easyMove(); // Obtém a melhor jogada no modo facil
      if (bestMove !== null) {
        setTimeout(() => this.game.makeMove(bestMove), 500); // Faz a jogada com um pequeno atraso
      }
    }

    if (nivel == "nivelMedio") {
      if (this.game.gameEnded) return; // Se o jogo acabou, não faz nada

      let bestMove = this.medioMove(); // Obtém a melhor jogada
      if (bestMove !== null) {
        setTimeout(() => this.game.makeMove(bestMove), 500); // Faz a jogada com um pequeno atraso
      }
    }

    if (nivel == "nivelDificil") {
      if (this.game.gameEnded) return; // Se o jogo acabou, não faz nada

      let bestMove = this.getBestMove(); // Obtém a melhor jogada
      if (bestMove !== null) {
        setTimeout(() => this.game.makeMove(bestMove), 500); // Faz a jogada com um pequeno atraso
      }
    }
  }

  // Encontra a melhor jogada usando o algoritmo Minimax
  getBestMove() {
    let bestScore = -Infinity; // Começa com o menor valor possível
    let move = null;
    let board = this.game.board;

    board.forEach((cell, index) => {
      if (cell === "-") {
        // Se a célula estiver vazia
        board[index] = "O"; // Simula a jogada da CPU
        let score = this.minimax(board, 0, false); // Avalia a jogada
        board[index] = "-"; // Desfaz a simulação

        if (score > bestScore) {
          // Se for melhor que a jogada anterior, atualiza
          bestScore = score;
          move = index;
        }
      }
    });

    return move; // Retorna a melhor jogada encontrada
  }

  // Encontra a melhor jogada usando o algoritmo Minimax com 20% de erro
  medioMove() {
    let bestScore = -Infinity; // Começa com o menor valor possível
    let move = null;
    let board = this.game.board;

    let erroChance = Math.random() < 0.2; // 20% de chance de errar

    let possibleMoves = [];

    board.forEach((cell, index) => {
      if (cell === "-") {
        // Se a célula estiver vazia
        board[index] = "O"; // Simula a jogada da CPU
        let score = this.minimax(board, 0, false); // Avalia a jogada
        board[index] = "-"; // Desfaz a simulação

        possibleMoves.push({ index, score });
      }
    });

    if (erroChance) {
      // Se errar, escolhe uma jogada aleatória válida
      move =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)].index;
    } else {
      // Caso contrário, escolhe a melhor jogada
      move = possibleMoves.reduce((bestMove, currentMove) =>
        currentMove.score > bestMove.score ? currentMove : bestMove
      ).index;
    }

    return move; // Retorna a jogada escolhida
  }

  // Encontra a melhor jogada usando o algoritmo Minimax com 90% de erro
  easyMove() {
    let bestScore = -Infinity; // Começa com o menor valor possível
    let move = null;
    let board = this.game.board;

    let erroChance = Math.random() < 0.9; // 5% de chance de errar

    let possibleMoves = [];

    board.forEach((cell, index) => {
      if (cell === "-") {
        // Se a célula estiver vazia
        board[index] = "O"; // Simula a jogada da CPU
        let score = this.minimax(board, 0, false); // Avalia a jogada
        board[index] = "-"; // Desfaz a simulação

        possibleMoves.push({ index, score });
      }
    });

    if (erroChance) {
      // Se errar, escolhe uma jogada aleatória válida
      move =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)].index;
    } else {
      // Caso contrário, escolhe a melhor jogada
      move = possibleMoves.reduce((bestMove, currentMove) =>
        currentMove.score > bestMove.score ? currentMove : bestMove
      ).index;
    }

    return move; // Retorna a jogada escolhida
  }

  // Algoritmo Minimax para determinar a melhor jogada
  minimax(board, depth, isMaximizing) {
    let result = this.checkWinner(board);
    if (result !== null) return result; // Se já houver vencedor, retorna o resultado

    if (isMaximizing) {
      let bestScore = -Infinity; // O jogador da CPU quer o maior valor possível
      board.forEach((cell, index) => {
        if (cell === "-") {
          board[index] = "O"; // Simula a jogada da CPU
          let score = this.minimax(board, depth + 1, false); // Chamada recursiva
          board[index] = "-"; // Desfaz a jogada
          bestScore = Math.max(score, bestScore); // Escolhe a maior pontuação possível
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity; // O jogador humano quer minimizar a pontuação da CPU
      board.forEach((cell, index) => {
        if (cell === "-") {
          board[index] = "X"; // Simula a jogada do jogador
          let score = this.minimax(board, depth + 1, true); // Chamada recursiva
          board[index] = "-"; // Desfaz a jogada
          bestScore = Math.min(score, bestScore); // Escolhe a menor pontuação possível
        }
      });
      return bestScore;
    }
  }

  // Verifica se há um vencedor ou empate
  checkWinner(board) {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Linhas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Colunas
      [0, 4, 8],
      [2, 4, 6], // Diagonais
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] !== "-" && board[a] === board[b] && board[a] === board[c]) {
        return board[a] === "O" ? 10 : -10; // CPU ganha: +10, jogador ganha: -10
      }
    }

    return board.includes("-") ? null : 0; // Empate retorna 0, jogo em andamento retorna null
  }
}
