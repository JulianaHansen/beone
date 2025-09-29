document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS MOCKADOS DAS CONTAS ---
    const mockBills = [
        { id: 1, name: 'Conta de Luz - Eletropaulo', dueDate: '2025-09-05', value: 150.75, status: 'paid', icon: 'fa-lightbulb' },
        { id: 2, name: 'Plano de Internet - Vivo Fibra', dueDate: '2025-09-10', value: 99.90, status: 'paid', icon: 'fa-wifi' },
        { id: 3, name: 'Aluguel - Apt 123', dueDate: '2025-09-10', value: 2200.00, status: 'pending', icon: 'fa-house' },
        { id: 4, name: 'Fatura Cartão de Crédito - Nubank', dueDate: '2025-09-15', value: 850.40, status: 'pending', icon: 'fa-credit-card' },
        { id: 5, name: 'Conta de Água - Sabesp', dueDate: '2025-09-20', value: 85.50, status: 'pending', icon: 'fa-tint' },
        { id: 6, name: 'Mensalidade Academia', dueDate: '2025-08-28', value: 120.00, status: 'overdue', icon: 'fa-dumbbell' },
        { id: 7, name: 'Netflix', dueDate: '2025-10-01', value: 55.90, status: 'pending', icon: 'fa-tv' },
        { id: 8, name: 'Conta de Gás - Comgás', dueDate: '2025-10-04', value: 75.00, status: 'pending', icon: 'fa-fire' },
    ];

    // --- SELETORES DE ELEMENTOS ---
    const viewListBtn = document.getElementById('view-list-btn');
    const viewCalendarBtn = document.getElementById('view-calendar-btn');
    const listView = document.getElementById('list-view');
    const calendarView = document.getElementById('calendar-view');
    const currentMonthYearEl = document.getElementById('current-month-year');
    const calendarGrid = document.querySelector('.calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');

    // --- ESTADO ---
    let currentDate = new Date();

    // --- LÓGICA DE TROCA DE VISUALIZAÇÃO ---
    function activateView(view) {
        // Botões
        viewListBtn.classList.toggle('active', view === 'list');
        viewCalendarBtn.classList.toggle('active', view === 'calendar');
        // Containers
        listView.classList.toggle('active', view === 'list');
        calendarView.classList.toggle('active', view === 'calendar');
    }

    viewListBtn.addEventListener('click', () => activateView('list'));
    viewCalendarBtn.addEventListener('click', () => activateView('calendar'));

    // --- RENDERIZAÇÃO DA LISTA ---
    function renderListView(bills) {
        listView.innerHTML = ''; // Limpa a lista
        if (bills.length === 0) {
            listView.innerHTML = '<p>Nenhuma conta para exibir.</p>';
            return;
        }

        const sortedBills = bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        sortedBills.forEach(bill => {
            const billDate = new Date(bill.dueDate + 'T00:00:00'); // Corrige problema de timezone
            const formattedDate = billDate.toLocaleDateString('pt-BR');
            const formattedValue = bill.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            const billElement = document.createElement('div');
            billElement.className = 'bill-item';
            billElement.innerHTML = `
                <div class="bill-info">
                    <div class="bill-icon"><i class="fa-solid ${bill.icon}"></i></div>
                    <div class="bill-details">
                        <h3>${bill.name}</h3>
                        <p>Vencimento: ${formattedDate}</p>
                    </div>
                </div>
                <div class="bill-value">
                    <p class="value">${formattedValue}</p>
                    <p class="status ${bill.status}">${bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}</p>
                </div>
            `;
            listView.appendChild(billElement);
        });
    }

    // --- RENDERIZAÇÃO DO CALENDÁRIO ---
    function renderCalendar(year, month, bills) {
        calendarGrid.innerHTML = ''; // Limpa o grid
        // Adiciona os nomes dos dias novamente
        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        dayNames.forEach(name => {
            const dayNameEl = document.createElement('div');
            dayNameEl.className = 'day-name';
            dayNameEl.textContent = name;
            calendarGrid.appendChild(dayNameEl);
        });

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const today = new Date();

        currentMonthYearEl.textContent = firstDayOfMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

        // Preenche os dias vazios do início
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell other-month';
            calendarGrid.appendChild(emptyCell);
        }

        // Preenche os dias do mês
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const cellDate = new Date(year, month, day);
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            if (cellDate.toDateString() === today.toDateString()) {
                dayCell.classList.add('today');
            }

            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayCell.appendChild(dayNumber);

            // Adiciona as contas do dia
            const billsForDay = bills.filter(bill => {
                const billDate = new Date(bill.dueDate + 'T00:00:00');
                return billDate.getFullYear() === year && billDate.getMonth() === month && billDate.getDate() === day;
            });

            billsForDay.forEach(bill => {
                const billEl = document.createElement('div');
                billEl.className = `calendar-bill ${bill.status}`;
                billEl.textContent = bill.name;
                billEl.title = `${bill.name} - ${bill.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
                dayCell.appendChild(billEl);
            });

            calendarGrid.appendChild(dayCell);
        }
    }

    // --- NAVEGAÇÃO DO CALENDÁRIO ---
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth(), mockBills);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth(), mockBills);
    });

    // --- INICIALIZAÇÃO ---
    function init() {
        renderListView(mockBills);
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth(), mockBills);
        activateView('list'); // Começa na visualização de lista
    }

    init();
});
