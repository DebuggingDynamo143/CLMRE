// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
});

function initializeApplication() {
    setupNavigation();
    initializeCharts();
    setupEventListeners();
    loadDynamicContent();
}

function setupNavigation() {
    // Set active navigation based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initializeCharts() {
    // Initialize charts based on current page
    const path = window.location.pathname;
    
    switch(path) {
        case '/':
            initializeDashboardCharts();
            break;
        case '/oceanography':
            initializeOceanographyCharts();
            break;
        case '/fisheries':
            initializeFisheriesCharts();
            break;
        case '/molecular':
            initializeMolecularCharts();
            break;
        case '/correlations':
            initializeCorrelationCharts();
            break;
    }
}

function initializeDashboardCharts() {
    // Temperature trend chart
    const tempCtx = document.getElementById('temperatureChart');
    if (tempCtx) {
        new Chart(tempCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Sea Surface Temperature (°C)',
                    data: [28.1, 28.5, 29.2, 30.1, 30.8, 30.5, 29.8, 29.5, 29.7, 30.2, 29.8, 29.2],
                    borderColor: '#38b2ac',
                    backgroundColor: 'rgba(56, 178, 172, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Sea Temperature Trends 2023',
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Temperature (°C)' }
                    }
                }
            }
        });
    }

    // Species distribution chart
    const speciesCtx = document.getElementById('speciesChart');
    if (speciesCtx) {
        new Chart(speciesCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Tuna', 'Mackerel', 'Sardine', 'Pomfret', 'Shark', 'Crab', 'Lobster'],
                datasets: [{
                    data: [25, 20, 18, 15, 8, 7, 7],
                    backgroundColor: [
                        '#3182ce', '#38b2ac', '#48bb78', '#ed8936', 
                        '#e53e3e', '#805ad5', '#d53f8c'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Species Distribution'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function initializeOceanographyCharts() {
    const ctx = document.getElementById('oceanChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        data: [28.1, 28.5, 29.2, 30.1, 30.8, 30.5, 29.8, 29.5, 29.7, 30.2, 29.8, 29.2],
                        borderColor: '#e53e3e',
                        backgroundColor: 'rgba(229, 62, 62, 0.1)',
                        yAxisID: 'y',
                        tension: 0.4
                    },
                    {
                        label: 'Salinity (PSU)',
                        data: [35.2, 35.1, 34.9, 34.8, 34.7, 35.0, 35.3, 35.5, 35.2, 35.0, 34.9, 35.1],
                        borderColor: '#3182ce',
                        backgroundColor: 'rgba(49, 130, 206, 0.1)',
                        yAxisID: 'y1',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: { display: true, text: 'Temperature (°C)' }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: { display: true, text: 'Salinity (PSU)' },
                        grid: { drawOnChartArea: false }
                    }
                }
            }
        });
    }
}

function initializeFisheriesCharts() {
    const ctx = document.getElementById('fisheriesChart');
    if (ctx) {
        // Get data from hidden element or use default
        const chartDataEl = document.getElementById('chart-data');
        let speciesLabels = ['Tuna', 'Mackerel', 'Sardine', 'Pomfret', 'Shark'];
        let abundanceData = [156, 203, 278, 98, 45];

        if (chartDataEl) {
            try {
                speciesLabels = JSON.parse(chartDataEl.dataset.species || '[]');
                abundanceData = JSON.parse(chartDataEl.dataset.abundance || '[]');
            } catch (e) {
                console.log('Using default chart data');
            }
        }

        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: speciesLabels,
                datasets: [{
                    label: 'Average Abundance',
                    data: abundanceData,
                    backgroundColor: 'rgba(56, 178, 172, 0.8)',
                    borderColor: 'rgba(56, 178, 172, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Species Abundance Distribution'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Average Abundance'
                        }
                    }
                }
            }
        });
    }
}

function initializeMolecularCharts() {
    const ctx = document.getElementById('molecularChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['COI', '16S rRNA', '12S rRNA', 'cytb', '18S rRNA'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#3182ce', '#38b2ac', '#48bb78', '#ed8936', '#805ad5'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Genetic Marker Distribution'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Initialize eDNA concentration chart
    const ednaCtx = document.getElementById('ednaChart');
    if (ednaCtx) {
        new Chart(ednaCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Tuna', 'Mackerel', 'Sardine', 'Pomfret', 'Shark', 'Crab'],
                datasets: [{
                    label: 'eDNA Concentration',
                    data: [85, 92, 78, 65, 45, 55],
                    backgroundColor: 'rgba(56, 178, 172, 0.2)',
                    borderColor: 'rgba(56, 178, 172, 1)',
                    pointBackgroundColor: 'rgba(56, 178, 172, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
}

function initializeCorrelationCharts() {
    const ctx = document.getElementById('correlationChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Temperature vs Abundance',
                    data: [
                        {x: 28, y: 120}, {x: 29, y: 180}, {x: 30, y: 250},
                        {x: 31, y: 300}, {x: 32, y: 280}, {x: 29.5, y: 200},
                        {x: 30.5, y: 270}, {x: 28.5, y: 150}, {x: 31.5, y: 320}
                    ],
                    backgroundColor: 'rgba(229, 62, 62, 0.6)',
                    pointRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Temperature vs Species Abundance Correlation'
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Temperature (°C)' }
                    },
                    y: {
                        title: { display: true, text: 'Abundance' }
                    }
                }
            }
        });
    }
}

function setupEventListeners() {
    // Filter functionality
    const filters = document.querySelectorAll('.filters select, .filters input');
    filters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // AI Analysis button
    const analysisBtn = document.getElementById('runAnalysis');
    if (analysisBtn) {
        analysisBtn.addEventListener('click', runAIAnalysis);
    }

    // Real-time data refresh
    setInterval(updateRealTimeData, 30000); // Update every 30 seconds
}

function applyFilters() {
    const locationFilter = document.getElementById('locationFilter')?.value;
    const speciesFilter = document.getElementById('speciesFilter')?.value;
    
    console.log('Applying filters:', { location: locationFilter, species: speciesFilter });
    // In real implementation, this would fetch filtered data from API
}

async function runAIAnalysis() {
    const button = document.getElementById('runAnalysis');
    const resultsDiv = document.getElementById('correlationResults');
    
    if (!button || !resultsDiv) return;
    
    // Show loading state
    button.innerHTML = '<div class="loading"></div> Analyzing...';
    button.disabled = true;
    
    try {
        // Simulate API call
        const response = await fetch('/api/run-analysis');
        const result = await response.json();
        
        // Display results
        resultsDiv.innerHTML = `
            <div class="analysis-result">
                <h4>🤖 AI Analysis Complete</h4>
                <p><strong>Status:</strong> ${result.status}</p>
                
                <h5>Key Insights:</h5>
                ${result.insights.map(insight => `
                    <div class="insight-item">✅ ${insight}</div>
                `).join('')}
                
                <h5>Recommendations:</h5>
                ${result.recommendations.map(rec => `
                    <div class="insight-item">💡 ${rec}</div>
                `).join('')}
            </div>
        `;
        
    } catch (error) {
        resultsDiv.innerHTML = `
            <div class="analysis-result" style="background: #fed7d7; border-left-color: #e53e3e;">
                <h4>❌ Analysis Failed</h4>
                <p>Please try again later.</p>
            </div>
        `;
    } finally {
        button.innerHTML = '🔄 Run Analysis Again';
        button.disabled = false;
    }
}

function loadDynamicContent() {
    // Load real-time data updates
    updateRealTimeData();
}

function updateRealTimeData() {
    // Update timestamp
    const timestampElements = document.querySelectorAll('.last-updated');
    const now = new Date().toLocaleString();
    timestampElements.forEach(el => {
        el.textContent = `Last updated: ${now}`;
    });
    
    // Simulate real-time data updates for dashboard
    if (window.location.pathname === '/') {
        updateDashboardStats();
    }
}

function updateDashboardStats() {
    // Simulate real-time stat updates
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const current = parseInt(stat.textContent);
        const change = Math.floor(Math.random() * 10) - 2; // Random small change
        const newValue = Math.max(0, current + change);
        if (newValue !== current) {
            stat.textContent = newValue;
            stat.style.color = newValue > current ? '#48bb78' : '#e53e3e';
            setTimeout(() => {
                stat.style.color = '#3182ce';
            }, 1000);
        }
    });
}

// Export functions for global access
window.runAIAnalysis = runAIAnalysis;
window.applyFilters = applyFilters;