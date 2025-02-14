"use strict";

// Classe responsável pelo controle do som
export class Sound {
    constructor() {
        // Estado inicial: som desligado
        this.isSoundOn = false;

        // Obtém os elementos HTML necessários
        this.backgroundMusic = document.getElementById("backgroundMusic"); // Elemento <audio>
        this.soundButton = document.getElementById("soundButton"); // Botão de controle de som

        // Cria um Web Worker que será usado para alternar o estado do som
        this.worker = new Worker("soundWorker.js");

        // Se os elementos existem, adiciona um evento de clique ao botão de som
        if (this.backgroundMusic && this.soundButton) {
            this.soundButton.addEventListener("click", () => this.toggleSound());
        }

        // Ouvinte para receber mensagens do Worker
        this.worker.onmessage = (e) => {
            // Atualiza o estado do som com a resposta do Worker
            this.isSoundOn = e.data.isSoundOn;
            this.updateButtonLabel(); // Atualiza o ícone do botão

            // Se o som está ligado, toca a música; caso contrário, pausa
            if (this.isSoundOn) {
                this.backgroundMusic.play().catch(console.warn);
            } else {
                this.backgroundMusic.pause();
            }
        };
    }

    // Envia o estado atual para o Worker decidir o próximo estado
    toggleSound() {
        if (!this.backgroundMusic) return; // Se o elemento <audio> não existe, não faz nada
        this.worker.postMessage({ isSoundOn: this.isSoundOn }); // Envia o estado atual para o Worker processar
    }

    // Atualiza o botão de som para exibir o ícone correto
    updateButtonLabel() {
        if (this.soundButton) {
            this.soundButton.innerText = this.isSoundOn ? "🔇" : "🔊"; // Altera o ícone do botão
        }
    }
}

// Aguarda o carregamento da página para inicializar a classe Sound
document.addEventListener("DOMContentLoaded", () => {
    const sound = new Sound(); // Cria uma instância da classe Sound
    const originalButton = document.getElementById("soundButton"); // Obtém o botão de som original
    const endGameDiv = document.getElementById("endGame"); // Obtém o contêiner de fim de jogo

    // Se ambos os elementos existirem, clona o botão de som e o adiciona à tela de fim de jogo
    if (originalButton && endGameDiv) {
        const clonedButton = originalButton.cloneNode(true); // Clona o botão original
        clonedButton.id = "clonedSoundButton"; // Define um novo ID para o botão clonado
        endGameDiv.appendChild(clonedButton); // Adiciona o botão clonado ao contêiner de fim de jogo
        clonedButton.addEventListener("click", () => sound.toggleSound()); // Adiciona evento para alternar o som no botão clonado
    }
});
