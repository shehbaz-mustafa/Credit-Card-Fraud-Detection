import { CSVParser, ModelAnalyzer } from './utils/analysis';
import { ChartManager } from './utils/charts';
import { UIController } from './ui/uiController';

class FraudDetectionApp {
    private ui: UIController;
    private uploadedFile: File | null = null;

    constructor() {
        this.ui = new UIController();
        this.initializeEventHandlers();
    }

    private initializeEventHandlers(): void {
        this.ui.setFileInputClickHandler(() => {
            const fileInput = document.getElementById('fileInput') as HTMLInputElement;
            fileInput.click();
        });

        this.ui.setDragOverHandler(() => {});
        this.ui.setDragLeaveHandler();
        this.ui.setDropHandler((files) => this.handleFileSelect(files[0]));
        this.ui.setFileInputChangeHandler((files) => this.handleFileSelect(files[0]));
        this.ui.setAnalyzeBtnClickHandler(() => this.analyzeData());
        this.ui.setResetBtnClickHandler(() => this.resetForm());
    }

    private handleFileSelect(file: File): void {
        if (!file.name.endsWith('.csv')) {
            this.ui.showError('Please upload a CSV file');
            return;
        }

        this.uploadedFile = file;
        this.ui.setFileSelected(file.name);
        this.ui.clearMessages();
    }

    private analyzeData(): void {
        if (!this.uploadedFile) {
            this.ui.showError('Please select a file');
            return;
        }

        this.ui.showLoading();
        this.ui.clearMessages();
        this.ui.disableAnalyzeBtn();

        setTimeout(() => {
            try {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const csv = e.target?.result as string;
                        const data = CSVParser.parseCSV(csv);

                        if (data.length === 0) {
                            this.ui.showError('No data found in CSV file');
                            this.ui.hideLoading();
                            this.ui.enableAnalyzeBtn();
                            return;
                        }

                        // Calculate statistics
                        const stats = CSVParser.calculateStats(data);

                        // Display stats
                        this.ui.displayStats(
                            stats.fraudCount,
                            stats.validCount,
                            stats.totalCount,
                            stats.fraudPercentage
                        );

                        // Generate mock results
                        const mockResults = ModelAnalyzer.generateMockResults();
                        const confusionMatrix = ModelAnalyzer.generateConfusionMatrix();

                        // Display metrics
                        this.ui.displayMetrics(mockResults);

                        // Draw charts
                        ChartManager.drawConfusionMatrix(confusionMatrix);
                        ChartManager.drawPredictionChart(mockResults);

                        // Show results
                        this.ui.showResults();
                        this.ui.showSuccess('Analysis completed successfully');

                        this.ui.hideLoading();
                        this.ui.enableAnalyzeBtn();
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
                        this.ui.showError(errorMessage);
                        this.ui.hideLoading();
                        this.ui.enableAnalyzeBtn();
                    }
                };

                reader.onerror = () => {
                    this.ui.showError('Failed to read file');
                    this.ui.hideLoading();
                    this.ui.enableAnalyzeBtn();
                };

                if (this.uploadedFile) {
                    reader.readAsText(this.uploadedFile);
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred';
                this.ui.showError(errorMessage);
                this.ui.hideLoading();
                this.ui.enableAnalyzeBtn();
            }
        }, 500);
    }

    private resetForm(): void {
        this.uploadedFile = null;
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.value = '';
        this.ui.resetUploadArea();
        this.ui.clearMessages();
        this.ui.hideResults();

        // Destroy charts
        if (window.confusionChart instanceof (window as any).Chart) {
            window.confusionChart.destroy();
        }
        if (window.predictionChart instanceof (window as any).Chart) {
            window.predictionChart.destroy();
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FraudDetectionApp();
});

// Extend window interface to include Chart
declare global {
    interface Window {
        Chart?: any;
        ChartDataLabels?: any;
        confusionChart?: any;
        predictionChart?: any;
    }
}
