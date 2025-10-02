document.addEventListener('DOMContentLoaded', () => {

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

    // --- FUNÇÕES ---
    function getStatusClass(status) {
        return status.toLowerCase().replace(/ /g, '-').replace(/á/g, 'a').replace(/ç/g, 'c').replace(/ê/g, 'e');
    }

    function getFilteredBills() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return window.mockBills.filter(bill => {
            const dueDate = new Date(bill.dueDate + 'T00:00:00');
            return dueDate >= today || bill.status === 'Vencida';
        });
    }

    function activateView(view) {
        viewListBtn.classList.toggle('active', view === 'list');
        viewCalendarBtn.classList.toggle('active', view === 'calendar');
        listView.classList.toggle('active', view === 'list');
        calendarView.classList.toggle('active', view === 'calendar');
    }

    function renderListView(bills) {
        listView.innerHTML = '';
        if (bills.length === 0) {
            listView.innerHTML = '<p>Nenhuma conta para exibir.</p>';
            return;
        }
        const sortedBills = bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        sortedBills.forEach(bill => {
            const billDate = new Date(bill.dueDate + 'T00:00:00');
            const formattedDate = billDate.toLocaleDateString('pt-BR');
            const formattedValue = bill.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const statusClass = getStatusClass(bill.status);

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
                    <p class="status ${statusClass}">${bill.status}</p>
                </div>
            `;
            listView.appendChild(billElement);
        });
    }

    function renderCalendar(year, month, bills) {
        calendarGrid.innerHTML = '';
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

        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell other-month';
            calendarGrid.appendChild(emptyCell);
        }

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

            const billsForDay = bills.filter(bill => {
                const billDate = new Date(bill.dueDate + 'T00:00:00');
                return billDate.getFullYear() === year && billDate.getMonth() === month && billDate.getDate() === day;
            });

            billsForDay.forEach(bill => {
                const statusClass = getStatusClass(bill.status);
                const billEl = document.createElement('div');
                billEl.className = `calendar-bill ${statusClass}`;
                billEl.innerHTML = `<span class="bill-name">${bill.name}</span><span class="bill-status">${bill.status}</span>`;
                billEl.title = `${bill.name} - ${bill.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
                dayCell.appendChild(billEl);
            });

            calendarGrid.appendChild(dayCell);
        }
    }

    // --- EVENT LISTENERS ---
    viewListBtn.addEventListener('click', () => activateView('list'));
    viewCalendarBtn.addEventListener('click', () => activateView('calendar'));

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth(), getFilteredBills());
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth(), getFilteredBills());
    });

    // --- INICIALIZAÇÃO ---
    function init() {
        const filteredBills = getFilteredBills();
        renderListView(filteredBills);
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth(), filteredBills);
        activateView('list');
    }

    init();
});
