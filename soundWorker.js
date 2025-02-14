// O Worker escuta mensagens enviadas pela thread principal
self.onmessage = function (e) {
    // Alterna o estado do som com base na última informação recebida
    const newState = !e.data.isSoundOn;

    // Envia o novo estado para a thread principal
    self.postMessage({ isSoundOn: newState });
};
