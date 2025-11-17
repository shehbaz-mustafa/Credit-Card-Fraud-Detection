export declare class UIController {
    private uploadArea;
    private fileInput;
    private analyzeBtn;
    private resetBtn;
    private loading;
    private errorDiv;
    private successDiv;
    private resultsDiv;
    private resultsPanel;
    private placeholderText;
    constructor();
    showLoading(): void;
    hideLoading(): void;
    showError(message: string): void;
    showSuccess(message: string): void;
    clearMessages(): void;
    setFileSelected(fileName: string): void;
    resetUploadArea(): void;
    displayStats(fraudCount: number, validCount: number, totalCount: number, fraudPercentage: number): void;
    displayMetrics(results: any): void;
    showResults(): void;
    hideResults(): void;
    disableAnalyzeBtn(): void;
    enableAnalyzeBtn(): void;
    setFileInputClickHandler(callback: () => void): void;
    setFileInputChangeHandler(callback: (files: FileList) => void): void;
    setDragOverHandler(callback: () => void): void;
    setDragLeaveHandler(): void;
    setDropHandler(callback: (files: FileList) => void): void;
    setAnalyzeBtnClickHandler(callback: () => void): void;
    setResetBtnClickHandler(callback: () => void): void;
    private shake;
    private bounce;
    private addPulseAnimation;
}
//# sourceMappingURL=uiController.d.ts.map