export class ChartManager {
    static drawConfusionMatrix(data) {
        const ctx = document.getElementById('confusionChart');
        if (!ctx)
            return;
        const canvasContext = ctx.getContext('2d');
        if (!canvasContext)
            return;
        if (window.confusionChart instanceof window.Chart) {
            window.confusionChart.destroy();
        }
        const Chart = window.Chart;
        const ChartDataLabels = window.ChartDataLabels;
        Chart.register(ChartDataLabels);
        window.confusionChart = new Chart(canvasContext, {
            type: 'bar',
            data: {
                labels: ['True Positive', 'False Positive', 'False Negative', 'True Negative'],
                datasets: [{
                        label: 'Predictions',
                        data: [
                            data.truePositive,
                            data.falsePositive,
                            data.falseNegative,
                            data.trueNegative
                        ],
                        backgroundColor: [
                            'rgba(34, 197, 94, 0.85)',
                            'rgba(239, 68, 68, 0.85)',
                            'rgba(239, 68, 68, 0.7)',
                            'rgba(59, 130, 246, 0.85)'
                        ],
                        borderColor: [
                            'rgba(34, 197, 94, 0.9)',
                            'rgba(239, 68, 68, 0.9)',
                            'rgba(239, 68, 68, 0.85)',
                            'rgba(59, 130, 246, 0.9)'
                        ],
                        borderWidth: 2,
                        borderRadius: 8,
                        hoverBackgroundColor: [
                            'rgba(34, 197, 94, 1)',
                            'rgba(239, 68, 68, 1)',
                            'rgba(239, 68, 68, 0.9)',
                            'rgba(59, 130, 246, 1)'
                        ],
                        hoverBorderWidth: 3
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    datalabels: {
                        color: '#ffffff',
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: (value) => value.toString(),
                        anchor: 'center',
                        align: 'center'
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: { size: 12, weight: '600' },
                            color: '#93c5fd'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 15, 25, 0.95)',
                        padding: 12,
                        titleFont: { size: 13, weight: '600' },
                        bodyFont: { size: 12 },
                        displayColors: true,
                        borderColor: 'rgba(59, 130, 246, 0.5)',
                        borderWidth: 2,
                        titleColor: '#93c5fd',
                        bodyColor: '#e0e7ff',
                        callbacks: {
                            label: (context) => `Count: ${context.parsed.y}`
                        }
                    }
                }
            }
        });
    }
    static drawPredictionChart(results) {
        const ctx = document.getElementById('predictionChart');
        if (!ctx)
            return;
        const canvasContext = ctx.getContext('2d');
        if (!canvasContext)
            return;
        if (window.predictionChart instanceof window.Chart) {
            window.predictionChart.destroy();
        }
        const Chart = window.Chart;
        const ChartDataLabels = window.ChartDataLabels;
        Chart.register(ChartDataLabels);
        window.predictionChart = new Chart(canvasContext, {
            type: 'doughnut',
            data: {
                labels: ['Isolation Forest', 'Local Outlier Factor'],
                datasets: [{
                        data: [results.isoForest.accuracy * 100, results.lof.accuracy * 100],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.85)',
                            'rgba(34, 211, 238, 0.85)'
                        ],
                        borderColor: [
                            'rgba(96, 165, 250, 0.9)',
                            'rgba(6, 182, 212, 0.9)'
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: [
                            'rgba(59, 130, 246, 1)',
                            'rgba(34, 211, 238, 1)'
                        ],
                        hoverBorderColor: [
                            'rgba(96, 165, 250, 1)',
                            'rgba(6, 182, 212, 1)'
                        ],
                        hoverBorderWidth: 5,
                        transition: { duration: 400 }
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    datalabels: {
                        color: '#ffffff',
                        font: { weight: 'bold', size: 16 },
                        formatter: (value) => value.toFixed(1) + '%',
                        anchor: 'center',
                        align: 'center'
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: { size: 12, weight: '600' },
                            color: '#93c5fd'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 15, 25, 0.95)',
                        padding: 12,
                        titleFont: { size: 13, weight: '600' },
                        bodyFont: { size: 12 },
                        displayColors: true,
                        borderColor: 'rgba(59, 130, 246, 0.5)',
                        borderWidth: 2,
                        titleColor: '#93c5fd',
                        bodyColor: '#e0e7ff',
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed.toFixed(1)}%`
                        }
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=charts.js.map