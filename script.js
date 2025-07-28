let consumptionChart, comparisonChart, usageChart; // Variáveis globais para armazenar as instâncias dos gráficos

// Função para gerar dados de consumo diário (24 horas)
function generateDailyConsumptionData() {
    return {
        labels: [
            "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
            "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
            "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
        ],
        data: [
            2.1, 1.9, 1.7, 1.8, 2.0, 3.5,  // Consumo das 00h às 05h
            5.2, 8.1, 10.3, 9.8, 7.5, 6.8,  // Consumo das 06h às 11h (pico da manhã)
            6.2, 5.9, 5.7, 5.8, 6.1, 5.5,   // Consumo das 12h às 17h
            4.8, 4.5, 3.9, 3.2, 2.8, 2.5    // Consumo das 18h às 23h (queda gradual)
        ]
    };
}

// Função para gerar dados de consumo mensal, comparando dois anos
function generateMonthlyConsumptionData() {
    return {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        data2023: [280, 265, 290, 300, 310, 320, 335, 315, 300, 290, 280, 270], // Dados de consumo para 2023
        data2022: [300, 285, 310, 320, 330, 340, 355, 335, 320, 310, 300, 290]  // Dados de consumo para 2022
    };
}

// Função para gerar dados de uso de água por área
function generateUsageByAreaData() {
    return [35, 45, 15, 5]; // Percentuais: Área Comum, Apartamentos, Comercial, Outros
}

// Função principal para inicializar e renderizar todos os gráficos
function initializeCharts() {
    // Gráfico de Consumo (Diário)
    const dailyData = generateDailyConsumptionData();
    const consumptionCtx = document.getElementById('consumptionChart').getContext('2d');
    if (consumptionChart) consumptionChart.destroy(); // Destrói o gráfico existente antes de criar um novo
    consumptionChart = new Chart(consumptionCtx, {
        type: 'line', // Tipo de gráfico: linha
        data: {
            labels: dailyData.labels,
            datasets: [
                {
                    label: 'Consumo (m³)', // Legenda do dataset
                    data: dailyData.data,
                    borderColor: '#06b6d4', // Cor da linha
                    backgroundColor: 'rgba(6, 182, 212, 0.1)', // Cor de preenchimento abaixo da linha
                    tension: 0.4, // Suavidade da linha
                    fill: true, // Preencher a área abaixo da linha
                    borderWidth: 2 // Largura da linha
                }
            ]
        },
        options: {
            responsive: true, // O gráfico se adapta ao tamanho do contêiner
            maintainAspectRatio: false, // Não mantém a proporção original (permite redimensionamento livre)
            scales: {
                y: {
                    beginAtZero: true, // Eixo Y começa em zero
                    title: {
                        display: true,
                        text: 'm³' // Título do eixo Y
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + ' m³'; // Formato do tooltip
                        }
                    }
                }
            }
        }
    });

    // Gráfico de Comparação (Mensal)
    const monthlyData = generateMonthlyConsumptionData();
    const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
    if (comparisonChart) comparisonChart.destroy(); // Destrói o gráfico existente
    comparisonChart = new Chart(comparisonCtx, {
        type: 'bar', // Tipo de gráfico: barras
        data: {
            labels: monthlyData.labels,
            datasets: [
                {
                    label: '2023', // Legenda para os dados de 2023
                    data: monthlyData.data2023,
                    backgroundColor: '#0e7490', // Cor das barras de 2023
                    borderColor: '#0e7490',
                    borderWidth: 1
                },
                {
                    label: '2022', // Legenda para os dados de 2022
                    data: monthlyData.data2022,
                    backgroundColor: '#06b6d4', // Cor das barras de 2022
                    borderColor: '#06b6d4',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'm³'
                    }
                }
            }
        }
    });

    // Gráfico de Uso por Área (Rosca/Doughnut)
    const usageData = generateUsageByAreaData();
    const usageCtx = document.getElementById('usageChart').getContext('2d');
    if (usageChart) usageChart.destroy(); // Destrói o gráfico existente
    usageChart = new Chart(usageCtx, {
        type: 'doughnut', // Tipo de gráfico: rosca
        data: {
            labels: ['Área Comum', 'Apartamentos', 'Comercial', 'Outros'], // Rótulos das fatias
            datasets: [{
                data: usageData,
                backgroundColor: [ // Cores das fatias
                    '#06b6d4',
                    '#0e7490',
                    '#a5f3fc',
                    '#cffafe'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right', // Posição da legenda
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%'; // Formato do tooltip
                        }
                    }
                }
            }
        }
    });
}

// Função para atualizar os dados dos cartões de estatísticas
function updateStatsData() {
    // Dados fixos para demonstração
    const currentDailyConsumptionValue = '45.8';
    const dailyTrend = '+12';

    document.getElementById('currentDailyConsumption').textContent = `${currentDailyConsumptionValue} m³`;
    document.getElementById('dailyConsumptionTrend').textContent = `+${dailyTrend}% em relação a ontem`;
    
    const currentMonthlyConsumptionValue = '325';
    const monthlyTrend = '+8';

    document.getElementById('monthlyConsumption').textContent = `${currentMonthlyConsumptionValue} m³`;
    document.getElementById('monthlyConsumptionTrend').textContent = `+${monthlyTrend}% em relação ao mês passado`;
    
    const monthlyGoal = 500;
    // Calcula o progresso da meta, limitando a 100% para não ultrapassar visualmente
    const currentGoalProgress = Math.min(100, Math.round((325 / monthlyGoal) * 100)); 
    document.getElementById('monthlyGoal').textContent = `${monthlyGoal} m³`;
    document.getElementById('goalPercentage').textContent = `${currentGoalProgress}%`;
    document.getElementById('goalProgress').style.width = `${currentGoalProgress}%`;

    // Alertas fixos para demonstração
    document.getElementById('activeAlerts').textContent = '1';
}

// Adiciona um "ouvinte" para o evento de envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    // Simples validação de login
    if (email.toLowerCase() === 'admin@aquacontrol.com' && password === 'admin') {
        loginError.style.display = 'none'; // Esconde a mensagem de erro
        document.getElementById('authModal').style.display = 'none'; // Esconde o modal de autenticação
        // Mostra os elementos principais da página
        document.getElementById('mainHeader').classList.remove('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('mainFooter').classList.remove('hidden');
        initializeCharts(); // Inicializa os gráficos após o login
        updateStatsData(); // Atualiza os dados dos cartões de estatísticas
    } else {
        loginError.style.display = 'block'; // Mostra a mensagem de erro
    }
});

// Adiciona um "ouvinte" para o botão de logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('authModal').style.display = 'flex'; // Mostra o modal de autenticação
    // Esconde os elementos principais da página
    document.getElementById('mainHeader').classList.add('hidden');
    document.getElementById('mainContent').classList.add('hidden');
    document.getElementById('mainFooter').classList.add('hidden');
});

// Garante que o modal de autenticação seja exibido assim que a página carregar
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('authModal').style.display = 'flex';
});
