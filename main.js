document.addEventListener('DOMContentLoaded', () => {
    const billListContainer = document.getElementById('bill-list');
    const totalDueEl = document.getElementById('total-due');
    const totalPaidEl = document.getElementById('total-paid');

    // Função principal que carrega e exibe os dados
    async function loadApp() {
        // Na aplicação real, aqui teríamos um indicador de loading
        const bills = await apiMock.fetchBills();
        renderDashboard(bills);
        renderBillList(bills);
    }

    // Calcula e exibe os totais no dashboard
    function renderDashboard(bills) {
        const totalDue = bills
            .filter(bill => bill.status === 'A Pagar' || bill.status === 'Vencida')
            .reduce((sum, bill) => sum + bill.valor, 0);

        const totalPaid = bills
            .filter(bill => bill.status === 'Paga')
            .reduce((sum, bill) => sum + bill.valor, 0);

        totalDueEl.textContent = formatCurrency(totalDue);
        totalPaidEl.textContent = formatCurrency(totalPaid);
    }

    // Cria o HTML para cada conta e insere na página
    function renderBillList(bills) {
        billListContainer.innerHTML = ''; // Limpa a lista antes de renderizar

        bills.sort((a, b) => new Date(a.vencimento) - new Date(b.vencimento));

        bills.forEach(bill => {
            const billCard = document.createElement('article');
            billCard.className = `bill-card status-${getStatusClass(bill.status)}`;

            let anomalyHTML = '';
            if (bill.alertaAnomalia) {
                anomalyHTML = `<p class="anomaly-alert">⚠️ ${bill.alertaAnomalia}</p>`;
            }
            
            let actionButtonHTML = '';
            if (bill.status === 'A Pagar' || bill.status === 'Vencida') {
                actionButtonHTML = `<div class="bill-actions"><button data-bill-id="${bill.id}">Pagar</button></div>`;
            }

            billCard.innerHTML = `
                <div class="bill-info">
                    <h3>${bill.empresa}</h3>
                    <p>${bill.categoria} - Vencimento: ${formatDate(bill.vencimento)}</p>
                    ${anomalyHTML}
                </div>
                <div class="bill-value">
                    <strong>${formatCurrency(bill.valor)}</strong>
                </div>
                ${actionButtonHTML}
            `;
            billListContainer.appendChild(billCard);
        });
    }
    
    // Adiciona evento de clique para os botões de pagar
    billListContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const billId = event.target.dataset.billId;
            // Na aplicação real, isso iniciaria o fluxo de pagamento
            alert(`Iniciando pagamento seguro da conta ID ${billId} via Bemobi Pay...`);
        }
    });

    // --- Funções Utilitárias ---

    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function formatDate(dateString) {
        const date = new Date(dateString + 'T03:00:00Z'); // Ajuste de fuso
        return date.toLocaleDateString('pt-BR');
    }

    function getStatusClass(status) {
        return status.toLowerCase().replace(/\s+/g, '-').replace('inferido', '');
    }

    // Inicia a aplicação
    loadApp();
});