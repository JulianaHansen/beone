/**
 * Esta função simula uma chamada de API para o nosso backend.
 * Na vida real, esta chamada buscaria os dados processados pelos Agentes de IA.
 * Note que os dados já vêm com 'status', 'categoria' e 'alertaAnomalia'.
 */
const apiMock = {
    fetchBills: function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        empresa: "CEMIG",
                        categoria: "Energia",
                        valor: 192.80,
                        vencimento: "2025-10-10",
                        status: "A Pagar",
                        alertaAnomalia: null
                    },
                    {
                        id: 2,
                        empresa: "COPASA",
                        categoria: "Água e Saneamento",
                        valor: 155.40,
                        vencimento: "2025-10-08",
                        status: "A Pagar",
                        alertaAnomalia: "Valor 85% acima da média. Possível vazamento."
                    },
                    {
                        id: 3,
                        empresa: "Claro Fibra",
                        categoria: "Internet",
                        valor: 129.90,
                        vencimento: "2025-10-05",
                        status: "Débito Automático Inferido",
                        alertaAnomalia: null
                    },
                    {
                        id: 4,
                        empresa: "Netflix",
                        categoria: "Assinaturas",
                        valor: 55.90,
                        vencimento: "2025-09-25",
                        status: "Paga",
                        alertaAnomalia: null
                    },
                    {
                        id: 5,
                        empresa: "Condomínio Residencial",
                        categoria: "Moradia",
                        valor: 450.00,
                        vencimento: "2025-09-15",
                        status: "Vencida",
                        alertaAnomalia: null
                    }
                ]);
            }, 500); // Simula um pequeno delay de rede
        });
    }
};