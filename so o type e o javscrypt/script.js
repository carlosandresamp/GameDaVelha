"use strict";
class JogoDaVelha {
    constructor() {
        this.tabuleiro = Array(9).fill('-');
        this.jogadorAtual = 'X';
        this.jogoEncerrado = false;
    }
    jogar() {
        while (!this.jogoEncerrado) {
            this.exibirTabuleiro();
            this.fazerJogada();
            if (this.verificarVitoria() || this.verificarEmpate()) {
                this.exibirTabuleiro();
                this.encerrarJogo();
            }
            this.alternarJogador();
        }
    }
    fazerJogada() {
        let posicao;
        do {
            posicao = parseInt(prompt(`Jogador ${this.jogadorAtual}, digite o número da posição para jogar (do 1 ao 9 em, sem gracinha 😑):`)) - 1;
        } while (posicao < 0 || posicao >= 9 || this.tabuleiro[posicao] !== '-');
        this.tabuleiro[posicao] = this.jogadorAtual;
    }
    verificarVitoria() {
        const combinacoesVitoria = [
            [0, 1, 2], [], [], // Linhas
            [0, 3, 6], [], [], // Colunas
            [], [] // Diagonais
        ];
        for (const combinacao of combinacoesVitoria) {
            const [a, b, c] = combinacao;
            if (this.tabuleiro[a] !== '-' && this.tabuleiro[a] === this.tabuleiro[b] && this.tabuleiro[a] === this.tabuleiro[c]) {
                alert(`Jogador ${this.jogadorAtual} ganhou!`);
                return true;
            }
        }
        return false;
    }
    verificarEmpate() {
        if (!this.tabuleiro.includes('-')) {
            alert('Deu véia! Empate!');
            return true;
        }
        return false;
    }
    alternarJogador() {
        this.jogadorAtual = this.jogadorAtual === 'X' ? 'O' : 'X';
    }
    exibirTabuleiro() {
        let tabuleiroFormatado = '';
        for (let i = 0; i < 9; i += 3) {
            tabuleiroFormatado += `${this.tabuleiro[i]} | ${this.tabuleiro[i + 1]} | ${this.tabuleiro[i + 2]}\n`;
        }
        alert(tabuleiroFormatado);
    }
    encerrarJogo() {
        this.jogoEncerrado = true;
        if (confirm('Bora de novo?')) {
            this.reiniciarJogo();
        }
    }
    reiniciarJogo() {
        this.tabuleiro = Array(9).fill('-');
        this.jogadorAtual = 'X';
        this.jogoEncerrado = false;
    }
}
const jogo = new JogoDaVelha();
jogo.jogar();
