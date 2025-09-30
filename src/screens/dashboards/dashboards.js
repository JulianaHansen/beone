document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS MOCKADOS DAS CONTAS (COM NOVOS STATUS) ---
    const mockBills = [
        { id: 1, name: 'Conta de Luz', dueDate: '2025-09-05', value: 150.75, status: 'Paga', category: 'Moradia', icon: 'fa-lightbulb' },
        { id: 2, name: 'Internet', dueDate: '2025-09-10', value: 99.90, status: 'Paga', category: 'Utilidades', icon: 'fa-wifi' },
        { id: 3, name: 'Aluguel', dueDate: '2025-09-10', value: 2200.00, status: 'A Vencer', category: 'Moradia', icon: 'fa-house' },
        { id: 4, name: 'Cartão de Crédito', dueDate: '2025-09-15', value: 850.40, status: 'A Vencer', category: 'Finanças', icon: 'fa-credit-card' },
        { id: 5, name: 'Conta de Água', dueDate: '2025-09-20', value: 85.50, status: 'Débito Automático Inferido', category: 'Moradia', icon: 'fa-tint' },
        { id: 6, name: 'Academia', dueDate: '2025-08-28', value: 120.00, status: 'Vencida', category: 'Saúde', icon: 'fa-dumbbell' },
        { id: 7, name: 'Netflix', dueDate: '2025-10-01', value: 55.90, status: 'Agendada', category: 'Lazer', icon: 'fa-tv' },
        { id: 8, name: 'Gás', dueDate: '2025-10-04', value: 75.00, status: 'A Vencer', category: 'Moradia', icon: 'fa-fire' },
    ];

    // --- PALETA DE CORES ---
    const colorPalette = {
        darkPurple: '#542B8C',
        lightPurple: '#8A6DF2',
        darkBlue: '#031859',
        brightBlue: '#0583F2',
        lightBlue: '#63BBF2',
        teal: '#087B98',
        cyan: '#04C4D9'
    };

    const colorPaletteRGBA = {
        darkPurple: 'rgba(84, 43, 140, 0.7)',
        lightPurple: 'rgba(138, 109, 242, 0.7)',
        darkBlue: 'rgba(3, 24, 89, 0.7)',
        brightBlue: 'rgba(5, 131, 242, 0.7)',
        lightBlue: 'rgba(99, 187, 242, 0.7)',
        teal: 'rgba(8, 123, 152, 0.7)',
        cyan: 'rgba(4, 196, 217, 0.7)'
    };

    // --- FUNÇÕES DE PROCESSAMENTO DE DADOS ---

    function processStatusData(bills) {
        const statusCounts = { 'Paga': 0, 'A Vencer': 0, 'Vencida': 0, 'Agendada': 0, 'Débito Automático Inferido': 0 };
        bills.forEach(bill => {
            if (statusCounts[bill.status] !== undefined) {
                statusCounts[bill.status]++;
            }
        });
        return statusCounts;
    }

    function processMonthlyExpenses(bills) {
        const monthlyTotals = {};
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);
        bills.forEach(bill => {
            const billDate = new Date(bill.dueDate + 'T00:00:00');
            if (billDate >= sixMonthsAgo) {
                const monthYear = billDate.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
                if (!monthlyTotals[monthYear]) monthlyTotals[monthYear] = 0;
                monthlyTotals[monthYear] += bill.value;
            }
        });
        return monthlyTotals;
    }

    function processCategoryData(bills) {
        const categoryTotals = {};
        bills.forEach(bill => {
            if (!categoryTotals[bill.category]) categoryTotals[bill.category] = 0;
            categoryTotals[bill.category] += bill.value;
        });
        return categoryTotals;
    }

    // --- FUNÇÕES DE RENDERIZAÇÃO DOS GRÁFICOS ---

    function renderStatusChart(data) {
        const ctx = document.getElementById('bills-by-status-chart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Paga', 'A Vencer', 'Vencida', 'Agendada', 'Débito Automático'],
                datasets: [{
                    label: 'Contas por Status',
                    data: [data.Paga, data['A Vencer'], data.Vencida, data.Agendada, data['Débito Automático Inferido']],
                    backgroundColor: [colorPaletteRGBA.lightBlue, colorPaletteRGBA.lightPurple, colorPaletteRGBA.darkPurple, colorPaletteRGBA.cyan, colorPaletteRGBA.teal],
                    borderColor: [colorPalette.lightBlue, colorPalette.lightPurple, colorPalette.darkPurple, colorPalette.cyan, colorPalette.teal],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } }
            }
        });
    }

    function renderMonthlyExpensesChart(data) {
        const ctx = document.getElementById('monthly-expenses-chart').getContext('2d');
        const labels = Object.keys(data).reverse();
        const values = Object.values(data).reverse();
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Gasto (R$)',
                    data: values,
                    backgroundColor: colorPaletteRGBA.brightBlue,
                    borderColor: colorPalette.brightBlue,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { display: false } }
            }
        });
    }

    function renderCategoryChart(data) {
        const ctx = document.getElementById('expenses-by-category-chart').getContext('2d');
        const labels = Object.keys(data);
        const values = Object.values(data);
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Gastos por Categoria',
                    data: values,
                    backgroundColor: Object.values(colorPaletteRGBA),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    // --- INICIALIZAÇÃO ---
    function init() {
        const statusData = processStatusData(mockBills);
        renderStatusChart(statusData);
        const monthlyData = processMonthlyExpenses(mockBills);
        renderMonthlyExpensesChart(monthlyData);
        const categoryData = processCategoryData(mockBills);
        renderCategoryChart(categoryData);
    }

    init();
});