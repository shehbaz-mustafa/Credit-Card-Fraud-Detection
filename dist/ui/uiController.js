export class UIController {
    constructor() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.loading = document.getElementById('loading');
        this.errorDiv = document.getElementById('error');
        this.successDiv = document.getElementById('success');
        this.resultsDiv = document.getElementById('results');
        this.resultsPanel = document.getElementById('resultsPanel');
        this.placeholderText = document.getElementById('placeholderText');
    }
    showLoading() {
        this.loading.classList.add('show');
    }
    hideLoading() {
        this.loading.classList.remove('show');
    }
    showError(message) {
        this.errorDiv.textContent = message;
        this.errorDiv.classList.add('show');
        this.shake(this.errorDiv);
    }
    showSuccess(message) {
        this.successDiv.textContent = message;
        this.successDiv.classList.add('show');
        this.bounce(this.successDiv);
    }
    clearMessages() {
        this.errorDiv.classList.remove('show');
        this.successDiv.classList.remove('show');
    }
    setFileSelected(fileName) {
        this.uploadArea.innerHTML = `<p style="animation: slideIn 0.4s ease;">✓ File selected: ${fileName}</p>`;
        this.analyzeBtn.disabled = false;
        this.addPulseAnimation(this.analyzeBtn);
    }
    resetUploadArea() {
        this.uploadArea.innerHTML = '<p>Drag your CSV file here</p><small>or click to browse</small>';
        this.analyzeBtn.disabled = true;
    }
    displayStats(fraudCount, validCount, totalCount, fraudPercentage) {
        const statsDiv = document.getElementById('stats');
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
    displayMetrics(results) {
        const metricsDiv = document.getElementById('metrics');
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
    showResults() {
        this.resultsDiv.classList.add('show');
        this.resultsPanel.style.display = 'block';
        this.placeholderText.style.display = 'none';
    }
    hideResults() {
        this.resultsDiv.classList.remove('show');
        this.resultsPanel.style.display = 'none';
        this.placeholderText.style.display = 'block';
    }
    disableAnalyzeBtn() {
        this.analyzeBtn.disabled = true;
    }
    enableAnalyzeBtn() {
        this.analyzeBtn.disabled = false;
    }
    setFileInputClickHandler(callback) {
        this.uploadArea.addEventListener('click', callback);
    }
    setFileInputChangeHandler(callback) {
        this.fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files)
                callback(files);
        });
    }
    setDragOverHandler(callback) {
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
            callback();
        });
    }
    setDragLeaveHandler() {
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });
    }
    setDropHandler(callback) {
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            const files = e.dataTransfer?.files;
            if (files)
                callback(files);
        });
    }
    setAnalyzeBtnClickHandler(callback) {
        this.analyzeBtn.addEventListener('click', callback);
    }
    setResetBtnClickHandler(callback) {
        this.resetBtn.addEventListener('click', callback);
    }
    shake(element) {
        element.style.animation = 'shake 0.4s ease';
        setTimeout(() => element.style.animation = '', 400);
    }
    bounce(element) {
        element.style.animation = 'bounce 0.6s ease';
        setTimeout(() => element.style.animation = '', 600);
    }
    addPulseAnimation(button) {
        button.style.animation = 'pulse 0.6s ease';
        setTimeout(() => button.style.animation = '', 600);
    }
}
//# sourceMappingURL=uiController.js.map