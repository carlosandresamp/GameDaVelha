class JogoDaVelha {
    private tabuleiro: string[];
    private jogadorAtual: string;
    private jogoEncerrado: boolean;

    constructor() {
        this.tabuleiro = Array(9).fill('-');
        this.jogadorAtual = 'X';
        this.jogoEncerrado = false;
    }

    public jogar(): void {
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

    private fazerJogada(): void {
        let posicao: number;
        do {
            posicao = parseInt(prompt(`Jogador ${this.jogadorAtual}, digite o número da posição para jogar (do 1 ao 9 em, sem gracinha 😑):`)) - 1;
        } while (posicao < 0 || posicao >= 9 || this.tabuleiro[posicao] !== '-');

        this.tabuleiro[posicao] = this.jogadorAtual;
    }

    private verificarVitoria(): boolean {
        const combinacoesVitoria: number[][] = [
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

    private verificarEmpate(): boolean {
        if (!this.tabuleiro.includes('-')) {
            alert('Deu véia! Empate!');
            return true;
        }
        return false;
    }

    private alternarJogador(): void {
        this.jogadorAtual = this.jogadorAtual === 'X' ? 'O' : 'X';
    }

    private exibirTabuleiro(): void {
        let tabuleiroFormatado = '';
        for (let i = 0; i < 9; i += 3) {
            tabuleiroFormatado += `${this.tabuleiro[i]} | ${this.tabuleiro[i + 1]} | ${this.tabuleiro[i + 2]}\n`;
        }
        alert(tabuleiroFormatado);
    }

    private encerrarJogo(): void {
        this.jogoEncerrado = true;
        if (confirm('Bora de novo?')) {
            this.reiniciarJogo();
        }
    }

    private reiniciarJogo(): void {
        this.tabuleiro = Array(9).fill('-');
        this.jogadorAtual = 'X';
        this.jogoEncerrado = false;
    }
}

const jogo = new JogoDaVelha();
jogo.jogar();
