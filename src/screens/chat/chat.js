document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES DE ELEMENTOS ---
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // --- LÓGICA DO BOT ---
    const botResponses = {
        default: "Desculpe, não entendi. Você pode tentar reformular a pergunta? Eu posso ajudar com dúvidas sobre vencimento, status e como pagar suas contas.",
        greeting: "Olá! Eu sou o BeOne Assistant. Como posso ajudar você hoje?",
        vencimento: "Para saber o vencimento de uma conta, vá para a tela 'Próximas Contas'. Lá você pode ver todas as suas contas em uma lista ou em um calendário.",
        pagar: "No momento, este sistema não processa pagamentos. Você pode usar os detalhes da conta para pagar através do seu banco ou aplicativo de preferência.",
        status: "O status de uma conta (Paga, Pendente ou Vencida) é mostrado na tela de 'Próximas Contas' e também nos dashboards.",
        ajuda: "Eu posso responder perguntas sobre: \n- Vencimento das contas \n- Como pagar uma conta \n- Status das contas. \nVocê também pode navegar para as seções de Calendário, Dashboards ou Adicionar Conta."
    };

    function getBotResponse(userInput) {
        const lowerInput = userInput.toLowerCase();

        if (lowerInput.includes('vencimento') || lowerInput.includes('quando vence')) {
            return botResponses.vencimento;
        }
        if (lowerInput.includes('pagar') || lowerInput.includes('como pago')) {
            return botResponses.pagar;
        }
        if (lowerInput.includes('status') || lowerInput.includes('está paga')) {
            return botResponses.status;
        }
        if (lowerInput.includes('ajuda') || lowerInput.includes('socorro') || lowerInput.includes('o que você faz')) {
            return botResponses.ajuda;
        }
        if (lowerInput.includes('olá') || lowerInput.includes('oi') || lowerInput.includes('bom dia')) {
            return botResponses.greeting;
        }

        return botResponses.default;
    }

    // --- FUNÇÕES DA INTERFACE ---

    // Adiciona uma mensagem na tela
    function addMessageToUI(message, sender) {
        const messageBubble = document.createElement('div');
        messageBubble.className = `message-bubble ${sender}-message`;
        messageBubble.textContent = message;
        chatMessages.appendChild(messageBubble);

        // Rola para a mensagem mais recente
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Processa o envio de mensagem pelo usuário
    function handleSendMessage() {
        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        addMessageToUI(userInput, 'user');
        chatInput.value = '';

        // Simula o bot "pensando" e depois responde
        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            addMessageToUI(botResponse, 'bot');
        }, 800);
    }

    // --- EVENT LISTENERS ---

    sendBtn.addEventListener('click', handleSendMessage);

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // --- INICIALIZAÇÃO ---
    function initChat() {
        addMessageToUI(botResponses.greeting, 'bot');
    }

    initChat();
});
