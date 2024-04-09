class JogoDaVelha {
    private tabuleiro: string[]; // Array para armazenar o estado atual do tabuleiro
    private jogadorAtual: string; // Mantém o controle do jogador atual (X ou O)
    private jogoEncerrado: boolean; // Indica se o jogo está encerrado ou não

    constructor() {
        // Inicializa o tabuleiro preenchendo-o com '-' para representar as casas vazias
        this.tabuleiro = Array(9).fill('-');
        this.jogadorAtual = 'X'; // Começa com o jogador X
        this.jogoEncerrado = false; // Inicialmente o jogo não está encerrado
    }

    public jogar(): void {
        // Loop principal do jogo
        while (!this.jogoEncerrado) {
            this.exibirTabuleiro(); // Mostra o tabuleiro atual
            this.fazerJogada(); // Permite ao jogador atual fazer uma jogada
            // Verifica se houve vitória ou empate
            if (this.verificarVitoria() || this.verificarEmpate()) {
                this.exibirTabuleiro(); // Mostra o tabuleiro final
                this.encerrarJogo(); // Encerra o jogo
            }
            this.alternarJogador(); // Passa a vez para o próximo jogador
        }
    }

    private fazerJogada(): void {
        let posicao: number;
        // Loop para garantir que a posição digitada seja válida e vazia
        do {
            posicao = parseInt(prompt(`Jogador ${this.jogadorAtual}, digite o número da posição da célula do tabuleiro para jogar (do 1 ao 9 em, sem gracinha 😑):`)) - 1;
        } while (posicao < 0 || posicao >= 9 || this.tabuleiro[posicao] !== '-');

        this.tabuleiro[posicao] = this.jogadorAtual; // Marca a posição no tabuleiro com o símbolo do jogador atual
    }

    private verificarVitoria(): boolean {
        // Define todas as combinações de vitória possíveis no jogo da velha
        const combinacoesVitoria: number[][] = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],   // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6], // Diagonais
        ];

        // Percorre todas as combinações e verifica se algum jogador ganhou
        for (const combinacao of combinacoesVitoria) {
            const [a, b, c] = combinacao;
            if (this.tabuleiro[a] !== '-' && this.tabuleiro[a] === this.tabuleiro[b] && this.tabuleiro[a] === this.tabuleiro[c]) {
                alert(`Jogador ${this.jogadorAtual} ganhou!`); // Exibe uma mensagem indicando o vencedor
                return true; // Retorna true indicando que houve uma vitória
            }
        }

        return false; // Retorna false indicando que não houve vitória nesta jogada
    }

    private verificarEmpate(): boolean {
        // Verifica se não há mais casas vazias no tabuleiro
        if (!this.tabuleiro.includes('-')) {
            alert('Deu véia! Empate!'); // Exibe uma mensagem indicando empate
            return true; // Retorna true indicando que houve um empate
        }
        return false; // Retorna false indicando que não houve empate nesta jogada
    }

    private alternarJogador(): void {
        // Alterna entre os jogadores X e O
        this.jogadorAtual = this.jogadorAtual === 'X' ? 'O' : 'X';
    }

    private exibirTabuleiro(): void {
        // Monta uma representação visual do tabuleiro e exibe para o usuário
        let tabuleiroFormatado = '';
        for (let i = 0; i < 9; i += 3) {
            tabuleiroFormatado += `${this.tabuleiro[i]} | ${this.tabuleiro[i + 1]} | ${this.tabuleiro[i + 2]}\n`;
        }
        alert(tabuleiroFormatado); // Exibe o tabuleiro formatado em um alerta
    }

    private encerrarJogo(): void {
        this.jogoEncerrado = true; // Marca o jogo como encerrado
        if (confirm('Bora de novo?')) { // Pergunta se o usuário deseja jogar novamente
            this.reiniciarJogo(); // Reinicia o jogo se o usuário confirmar
        }
    }

    private reiniciarJogo(): void {
        // Reinicia o jogo, resetando o tabuleiro e outras variáveis de controle
        this.tabuleiro = Array(9).fill('-');
        this.jogadorAtual = 'X';
        this.jogoEncerrado = false;
    }
}

const jogo = new JogoDaVelha(); // Cria uma instância do jogo
jogo.jogar(); // Inicia o jogo
