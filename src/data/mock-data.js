window.mockBills = [
    // Mês Atual (Outubro 2025)
    { id: 1, name: 'Aluguel', dueDate: '2025-10-10', value: 2200.00, status: 'A Vencer', category: 'Aluguel', icon: 'fa-house' },
    { id: 2, name: 'Internet', dueDate: '2025-10-10', value: 99.90, status: 'Paga', category: 'Internet', icon: 'fa-wifi' },
    { id: 3, name: 'Cartão de Crédito', dueDate: '2025-10-15', value: 850.40, status: 'A Vencer', category: 'Cartão de Crédito', icon: 'fa-credit-card' },
    { id: 4, name: 'COPASA', dueDate: '2025-10-20', value: 155.40, status: 'A Vencer', category: 'Água', icon: 'fa-tint' }, // COPASA is water
    { id: 5, name: 'Netflix', dueDate: '2025-10-01', value: 55.90, status: 'Paga', category: 'Assinaturas', icon: 'fa-tv' },

    // Meses Anteriores (para gráficos de evolução)
    { id: 6, name: 'Energia', dueDate: '2025-09-05', value: 180.50, status: 'Paga', category: 'Luz', paymentDate: '2025-09-05', icon: 'fa-lightbulb' },
    { id: 7, name: 'Aluguel', dueDate: '2025-09-10', value: 2200.00, status: 'Paga', category: 'Aluguel', paymentDate: '2025-09-08', icon: 'fa-house' },
    { id: 8, name: 'Academia', dueDate: '2025-09-28', value: 120.00, status: 'Paga', category: 'Lazer', paymentDate: '2025-09-28', icon: 'fa-dumbbell' },
    { id: 9, name: 'Energia', dueDate: '2025-08-05', value: 175.30, status: 'Paga', category: 'Luz', paymentDate: '2025-08-05', icon: 'fa-lightbulb' },
    { id: 10, name: 'Aluguel', dueDate: '2025-08-10', value: 2200.00, status: 'Paga', category: 'Aluguel', paymentDate: '2025-08-10', icon: 'fa-house' },
    { id: 11, name: 'Energia', dueDate: '2025-07-05', value: 170.10, status: 'Paga', category: 'Luz', paymentDate: '2025-07-05', icon: 'fa-lightbulb' },
    { id: 12, name: 'Energia', dueDate: '2025-06-05', value: 165.90, status: 'Paga', category: 'Luz', paymentDate: '2025-06-05', icon: 'fa-lightbulb' },
    { id: 13, name: 'Energia', dueDate: '2025-05-05', value: 160.00, status: 'Paga', category: 'Luz', paymentDate: '2025-05-05', icon: 'fa-lightbulb' },
    { id: 14, name: 'Energia', dueDate: '2025-04-05', value: 150.00, status: 'Paga', category: 'Luz', paymentDate: '2025-04-05', icon: 'fa-lightbulb' },
    { id: 15, name: 'Academia', dueDate: '2025-09-28', value: 120.00, status: 'Paga', category: 'Lazer', paymentDate: '2025-10-02', icon: 'fa-dumbbell' }, //This is paid late
    { id: 16, name: 'Plano de Saúde', dueDate: '2025-10-01', value: 450.00, status: 'Vencida', category: 'Saúde', icon: 'fa-file-medical' }, // Vencida means overdue
    // New bills from calendario.js
    { id: 17, name: 'Gás', dueDate: '2025-10-04', value: 75.00, status: 'Paga', category: 'Gás', icon: 'fa-fire' },
];
