export interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

export interface ChartDataset {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    hoverBackgroundColor?: string[];
    hoverBorderColor?: string[];
    hoverBorderWidth?: number;
    transition?: { duration: number };
}

export interface ChartOptions {
    responsive: boolean;
    maintainAspectRatio: boolean;
    animation: {
        duration: number;
        easing: string;
    };
    plugins: any;
}

export interface DataRecord {
    amount: number;
    class: number;
}

export interface ModelResults {
    isoForest: {
        precision: number;
        recall: number;
        f1Score: number;
        accuracy: number;
    };
    lof: {
        precision: number;
        recall: number;
        f1Score: number;
        accuracy: number;
    };
}

export interface ConfusionMatrixData {
    truePositive: number;
    falsePositive: number;
    falseNegative: number;
    trueNegative: number;
}

export interface DatasetStats {
    fraudCount: number;
    validCount: number;
    totalCount: number;
    fraudPercentage: number;
}
