document.addEventListener('DOMContentLoaded', () => {

    // --- DATA MOCKADA --- //
    // Usando a data de referência: 04 de Outubro de 2025
    const today = new Date('2025-10-04T00:00:00');

    const mockBills = [
        // Mês Atual (Outubro 2025)
        { id: 1, name: 'Aluguel', dueDate: '2025-10-10', value: 2200.00, status: 'A Vencer', category: 'Moradia' },
        { id: 2, name: 'Internet', dueDate: '2025-10-10', value: 99.90, status: 'Paga', category: 'Moradia' },
        { id: 3, name: 'Cartão de Crédito', dueDate: '2025-10-15', value: 850.40, status: 'A Vencer', category: 'Finanças' },
        { id: 4, name: 'COPASA', dueDate: '2025-10-20', value: 155.40, status: 'A Vencer', category: 'Moradia' },
        { id: 5, name: 'Netflix', dueDate: '2025-10-01', value: 55.90, status: 'Paga', category: 'Assinaturas' },

        // Meses Anteriores (para gráficos de evolução)
        { id: 6, name: 'Energia', dueDate: '2025-09-05', value: 180.50, status: 'Paga', category: 'Moradia', paymentDate: '2025-09-05' },
        { id: 7, name: 'Aluguel', dueDate: '2025-09-10', value: 2200.00, status: 'Paga', category: 'Moradia', paymentDate: '2025-09-08' },
        { id: 8, name: 'Academia', dueDate: '2025-09-28', value: 120.00, status: 'Paga', category: 'Saúde', paymentDate: '2025-09-28' },
        { id: 9, name: 'Energia', dueDate: '2025-08-05', value: 175.30, status: 'Paga', category: 'Moradia', paymentDate: '2025-08-05' },
        { id: 10, name: 'Aluguel', dueDate: '2025-08-10', value: 2200.00, status: 'Paga', category: 'Moradia', paymentDate: '2025-08-10' },
        { id: 11, name: 'Energia', dueDate: '2025-07-05', value: 170.10, status: 'Paga', category: 'Moradia', paymentDate: '2025-07-05' },
        { id: 12, name: 'Energia', dueDate: '2025-06-05', value: 165.90, status: 'Paga', category: 'Moradia', paymentDate: '2025-06-05' },
        { id: 13, name: 'Energia', dueDate: '2025-05-05', value: 160.00, status: 'Paga', category: 'Moradia', paymentDate: '2025-05-05' },
        { id: 14, name: 'Energia', dueDate: '2025-04-05', value: 150.00, status: 'Paga', category: 'Moradia', paymentDate: '2025-04-05' },
        { id: 15, name: 'Academia', dueDate: '2025-09-28', value: 120.00, status: 'Paga', category: 'Saúde', paymentDate: '2025-10-02' },
        { id: 16, name: 'Plano de Saúde', dueDate: '2025-10-01', value: 450.00, status: 'Vencida', category: 'Saúde' },
    ];

    const mockInsights = [
        {
            type: 'alerta',
            icon: '⚠️',
            text: '<strong>Atenção:</strong> Sua conta da COPASA (R$ 155,40) veio 85% acima da sua média. Recomendamos verificar possíveis vazamentos.'
        },
        {
            type: 'preditivo',
            icon: '🔮',
            text: '<strong>Prepare-se:</strong> Com base no seu histórico, sua conta de energia em Dezembro tende a aumentar. Estimamos um valor próximo a R$ 250.'
        },
        {
            type: 'economia',
            icon: '💰',
            text: '<strong>Oportunidade:</strong> Encontramos uma forma de você economizar R$ 30/mês. Seu plano da Vivo pode ser combinado com sua assinatura Netflix.'
        }
    ];

    // --- PALETA DE CORES --- //
    const colorPalette = {
        blue: '#0583F2',
        purple: '#8A6DF2',
        green: '#067647',
        orange: '#974f0c',
        red: '#de350b',
        teal: '#087b98',
        pink: '#f263b1'
    };

    // --- 1. WIDGET: RESUMO DO MÊS ATUAL --- //
    function renderKpiWidget() {
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const monthName = today.toLocaleDateString('pt-BR', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase());

        const billsThisMonth = mockBills.filter(bill => {
            const billDate = new Date(bill.dueDate);
            return billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear;
        });

        const totalDue = billsThisMonth
            .filter(b => b.status === 'A Vencer')
            .reduce((sum, b) => sum + b.value, 0);

        const totalPaid = billsThisMonth
            .filter(b => b.status === 'Paga')
            .reduce((sum, b) => sum + b.value, 0);

        const totalOverdue = mockBills
            .filter(b => new Date(b.dueDate) < today && b.status !== 'Paga')
            .reduce((sum, b) => sum + b.value, 0);

        const nextDueBill = billsThisMonth
            .filter(b => b.status === 'A Vencer' && new Date(b.dueDate) >= today)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

        document.getElementById('total-due-title').textContent = `Total a Vencer em ${monthName}`;
        document.getElementById('total-paid-title').textContent = `Total Já Pago em ${monthName}`;

        document.getElementById('total-due').textContent = `R$ ${totalDue.toFixed(2)}`;
        document.getElementById('total-paid').textContent = `R$ ${totalPaid.toFixed(2)}`;
        document.getElementById('total-overdue').textContent = `R$ ${totalOverdue.toFixed(2)}`;

        if (nextDueBill) {
            const nextDueDate = new Date(nextDueBill.dueDate).toLocaleDateString('pt-BR');
            document.getElementById('next-due').textContent = nextDueDate;
            document.getElementById('next-due-value').textContent = `R$ ${nextDueBill.value.toFixed(2)}`;
        }
    }

    // --- 2. WIDGET: SEU ASSISTENTE RECOMENDA --- //
    function renderAssistantWidget() {
        const container = document.getElementById('assistant-insights');
        container.innerHTML = '';
        mockInsights.forEach(insight => {
            const card = document.createElement('div');
            card.className = `insight-card ${insight.type}`;
            card.innerHTML = `
                <div class="insight-icon">${insight.icon}</div>
                <p class="insight-text">${insight.text}</p>
            `;
            container.appendChild(card);
        });
    }

    // --- 3. WIDGET: DISTRIBUIÇÃO DE GASTOS --- //
    function renderCategoryDonutChart() {
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const billsThisMonth = mockBills.filter(bill => {
            const billDate = new Date(bill.dueDate);
            return billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear;
        });

        const categoryTotals = billsThisMonth.reduce((acc, bill) => {
            if (!acc[bill.category]) {
                acc[bill.category] = 0;
            }
            acc[bill.category] += bill.value;
            return acc;
        }, {});

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);

        const ctx = document.getElementById('category-donut-chart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: Object.values(colorPalette),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // --- 4. WIDGET: EVOLUÇÃO MENSAL DOS GASTOS --- //
    function renderMonthlyBarChart() {
        const monthlyTotals = {};
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today);
            d.setMonth(today.getMonth() - i);
            const monthYear = d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
            monthlyTotals[monthYear] = 0;
        }

        mockBills.forEach(bill => {
            const billDate = new Date(bill.dueDate);
            const monthYear = billDate.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
            if (monthlyTotals[monthYear] !== undefined) {
                monthlyTotals[monthYear] += bill.value;
            }
        });

        const labels = Object.keys(monthlyTotals);
        const data = Object.values(monthlyTotals);

        const ctx = document.getElementById('monthly-bar-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Gasto (R$)',
                    data: data,
                    backgroundColor: colorPalette.blue,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // --- 5. WIDGET: ANÁLISE DETALHADA POR CATEGORIA --- //
    let categoryLineChart;
    function renderCategoryLineChart(selectedCategory) {
        const monthlyTotals = {};
        for (let i = 11; i >= 0; i--) {
            const d = new Date(today);
            d.setMonth(today.getMonth() - i);
            const monthYear = d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
            monthlyTotals[monthYear] = 0;
        }

        mockBills
            .filter(b => b.category === selectedCategory)
            .forEach(bill => {
                const billDate = new Date(bill.dueDate);
                const monthYear = billDate.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
                if (monthlyTotals[monthYear] !== undefined) {
                    monthlyTotals[monthYear] += bill.value;
                }
            });

        const labels = Object.keys(monthlyTotals);
        const data = Object.values(monthlyTotals);

        const ctx = document.getElementById('category-line-chart').getContext('2d');
        
        if (categoryLineChart) {
            categoryLineChart.destroy();
        }

        categoryLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Gasto com ${selectedCategory} (R$)`,
                    data: data,
                    borderColor: colorPalette.purple,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    function setupCategorySelector() {
        const categories = [...new Set(mockBills.map(b => b.category))];
        const selector = document.getElementById('category-selector');
        categories.forEach(c => {
            const option = document.createElement('option');
            option.value = c;
            option.textContent = c;
            selector.appendChild(option);
        });

        selector.addEventListener('change', (e) => {
            renderCategoryLineChart(e.target.value);
        });

        // Render initial chart
        if (categories.length > 0) {
            renderCategoryLineChart(categories[0]);
        }
    }

    // --- 6. WIDGET: DESEMPENHO DE PAGAMENTO MENSAL --- //
    function renderPaymentPerformanceWidget() {
        const previousMonth = new Date(today);
        previousMonth.setMonth(today.getMonth() - 1);
        const previousMonthNumber = previousMonth.getMonth();
        const previousMonthYear = previousMonth.getFullYear();

        const billsLastMonth = mockBills.filter(bill => {
            const billDate = new Date(bill.dueDate);
            return billDate.getMonth() === previousMonthNumber && billDate.getFullYear() === previousMonthYear;
        });

        let paidEarly = 0;
        let paidOnTime = 0;
        let paidLate = 0;

        billsLastMonth.forEach(bill => {
            if (bill.status === 'Paga' && bill.paymentDate) {
                const dueDate = new Date(bill.dueDate);
                const paymentDate = new Date(bill.paymentDate);
                if (paymentDate < dueDate) {
                    paidEarly++;
                } else if (paymentDate.getTime() === dueDate.getTime()) {
                    paidOnTime++;
                } else {
                    paidLate++;
                }
            } else if (bill.status === 'Vencida') {
                paidLate++;
            }
        });

        const totalPaidBills = paidEarly + paidOnTime + paidLate;
        const paidOnTimeOrEarlyPercentage = totalPaidBills > 0 ? ((paidEarly + paidOnTime) / totalPaidBills) * 100 : 0;

        const insightText = document.getElementById('payment-insight');
        const prevMonthName = previousMonth.toLocaleDateString('pt-BR', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase());

        if (paidOnTimeOrEarlyPercentage >= 80) {
            insightText.innerHTML = `Em ${prevMonthName}, <strong>${paidOnTimeOrEarlyPercentage.toFixed(0)}%</strong> das suas contas foram pagas em dia ou antes! Ótimo trabalho.`;
        } else {
            insightText.innerHTML = `Em ${prevMonthName}, <strong>${(100 - paidOnTimeOrEarlyPercentage).toFixed(0)}%</strong> das suas contas foram pagas com atraso. Vamos tentar melhorar esse número em Outubro?`;
        }

        const ctx = document.getElementById('payment-performance-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Pagas Adiantado', 'Pagas em Dia', 'Pagas com Atraso'],
                datasets: [{
                    data: [paidEarly, paidOnTime, paidLate],
                    backgroundColor: ['#8A6DF2', '#0583F2', '#63BBF2'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // --- INICIALIZAÇÃO --- //
    function init() {
        renderKpiWidget();
        renderAssistantWidget();
        renderCategoryDonutChart();
        renderMonthlyBarChart();
        setupCategorySelector();
        renderPaymentPerformanceWidget();
    }

    init();
});
