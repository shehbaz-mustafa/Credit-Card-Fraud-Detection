import { ConfusionMatrixData, ModelResults } from '../types/types';
declare global {
    interface Window {
        confusionChart?: any;
        predictionChart?: any;
    }
}
export declare class ChartManager {
    static drawConfusionMatrix(data: ConfusionMatrixData): void;
    static drawPredictionChart(results: ModelResults): void;
}
//# sourceMappingURL=charts.d.ts.map