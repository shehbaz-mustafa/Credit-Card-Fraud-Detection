export class UIController {
    private uploadArea: HTMLElement;
    private fileInput: HTMLInputElement;
    private analyzeBtn: HTMLButtonElement;
    private resetBtn: HTMLButtonElement;
    private loading: HTMLElement;
    private errorDiv: HTMLElement;
    private successDiv: HTMLElement;
    private resultsDiv: HTMLElement;
    private resultsPanel: HTMLElement;
    private placeholderText: HTMLElement;

    constructor() {
        this.uploadArea = document.getElementById('uploadArea')!;
        this.fileInput = document.getElementById('fileInput') as HTMLInputElement;
        this.analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;
        this.resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
        this.loading = document.getElementById('loading')!;
        this.errorDiv = document.getElementById('error')!;
        this.successDiv = document.getElementById('success')!;
        this.resultsDiv = document.getElementById('results')!;
        this.resultsPanel = document.getElementById('resultsPanel')!;
        this.placeholderText = document.getElementById('placeholderText')!;
    }

    showLoading(): void {
        this.loading.classList.add('show');
    }

    hideLoading(): void {
        this.loading.classList.remove('show');
    }

    showError(message: string): void {
        this.errorDiv.textContent = message;
        this.errorDiv.classList.add('show');
        this.shake(this.errorDiv);
    }

    showSuccess(message: string): void {
        this.successDiv.textContent = message;
        this.successDiv.classList.add('show');
        this.bounce(this.successDiv);
    }

    clearMessages(): void {
        this.errorDiv.classList.remove('show');
        this.successDiv.classList.remove('show');
    }

    setFileSelected(fileName: string): void {
        this.uploadArea.innerHTML = `<p style="animation: slideIn 0.4s ease;">✓ File selected: ${fileName}</p>`;
        this.analyzeBtn.disabled = false;
        this.addPulseAnimation(this.analyzeBtn);
    }

    resetUploadArea(): void {
        this.uploadArea.innerHTML = '<p>Drag your CSV file here</p><small>or click to browse</small>';
        this.analyzeBtn.disabled = true;
    }

    displayStats(fraudCount: number, validCount: number, totalCount: number, fraudPercentage: number): void {
        const statsDiv = document.getElementById('stats')!;
        statsDiv.innerHTML = `
            <div class="stat-box">
                <div class="stat-value">${totalCount.toLocaleString()}</div>
                <div class="stat-label">Total Transactions</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" style="color: #ef4444;">${fraudCount}</div>
                <div class="stat-label">Fraudulent</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" style="color: #22c55e;">${validCount}</div>
                <div class="stat-label">Valid</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${fraudPercentage.toFixed(2)}%</div>
                <div class="stat-label">Fraud Rate</div>
            </div>
        `;
    }

    displayMetrics(results: any): void {
        const metricsDiv = document.getElementById('metrics')!;
        metricsDiv.innerHTML = `
            <div class="metric-card">
                <div class="metric-label">Isolation Forest</div>
                <div class="metric-value">${(results.isoForest.accuracy * 100).toFixed(1)}%</div>
                <div class="metric-subtext">Precision: ${(results.isoForest.precision * 100).toFixed(1)}% | Recall: ${(results.isoForest.recall * 100).toFixed(1)}%</div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Local Outlier Factor</div>
                <div class="metric-value">${(results.lof.accuracy * 100).toFixed(1)}%</div>
                <div class="metric-subtext">Precision: ${(results.lof.precision * 100).toFixed(1)}% | Recall: ${(results.lof.recall * 100).toFixed(1)}%</div>
            </div>
        `;
    }

    showResults(): void {
        this.resultsDiv.classList.add('show');
        this.resultsPanel.style.display = 'block';
        this.placeholderText.style.display = 'none';
    }

    hideResults(): void {
        this.resultsDiv.classList.remove('show');
        this.resultsPanel.style.display = 'none';
        this.placeholderText.style.display = 'block';
    }

    disableAnalyzeBtn(): void {
        this.analyzeBtn.disabled = true;
    }

    enableAnalyzeBtn(): void {
        this.analyzeBtn.disabled = false;
    }

    setFileInputClickHandler(callback: () => void): void {
        this.uploadArea.addEventListener('click', callback);
    }

    setFileInputChangeHandler(callback: (files: FileList) => void): void {
        this.fileInput.addEventListener('change', (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files) callback(files);
        });
    }

    setDragOverHandler(callback: () => void): void {
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
            callback();
        });
    }

    setDragLeaveHandler(): void {
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });
    }

    setDropHandler(callback: (files: FileList) => void): void {
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            const files = e.dataTransfer?.files;
            if (files) callback(files);
        });
    }

    setAnalyzeBtnClickHandler(callback: () => void): void {
        this.analyzeBtn.addEventListener('click', callback);
    }

    setResetBtnClickHandler(callback: () => void): void {
        this.resetBtn.addEventListener('click', callback);
    }

    private shake(element: HTMLElement): void {
        element.style.animation = 'shake 0.4s ease';
        setTimeout(() => element.style.animation = '', 400);
    }

    private bounce(element: HTMLElement): void {
        element.style.animation = 'bounce 0.6s ease';
        setTimeout(() => element.style.animation = '', 600);
    }

    private addPulseAnimation(button: HTMLElement): void {
        button.style.animation = 'pulse 0.6s ease';
        setTimeout(() => button.style.animation = '', 600);
    }
}
