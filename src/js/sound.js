"use strict";

export class Sound {
    constructor() {
        this.isSoundOn = false; // Estado inicial do som (desligado)
        this.backgroundMusic = document.getElementById("backgroundMusic"); // Obtém o elemento de áudio
        this.soundButton = document.getElementById("soundButton"); // Obtém o botão de controle de som

        // Adiciona um evento ao botão para alternar o som, se os elementos existirem
        if (this.backgroundMusic && this.soundButton) {
            this.soundButton.addEventListener("click", () => this.toggleSound());
        }
    }

    // Alterna entre ativar e desativar o som
    toggleSound() {
        if (!this.backgroundMusic) return; // Se o áudio não existir, não faz nada

        // Se o som está ligado, pausa; senão, inicia a reprodução
        this.isSoundOn ? this.backgroundMusic.pause() : this.backgroundMusic.play().catch(console.warn);
        this.isSoundOn = !this.isSoundOn; // Alterna o estado do som
        this.updateButtonLabel(); // Atualiza o ícone do botão
    }

    // Atualiza o botão de som para mostrar um ícone de ativado ou desativado
    updateButtonLabel() {
        if (this.soundButton) {
            this.soundButton.innerText = this.isSoundOn ? "🔇" : "🔊";
        }
    }
}

// Garante que o código só seja executado após o carregamento completo da página
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
