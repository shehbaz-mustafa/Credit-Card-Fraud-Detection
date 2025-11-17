import { DataRecord, DatasetStats, ModelResults, ConfusionMatrixData } from '../types/types';
export declare class CSVParser {
    static parseCSV(csv: string): DataRecord[];
    static calculateStats(data: DataRecord[]): DatasetStats;
}
export declare class ModelAnalyzer {
    static generateMockResults(): ModelResults;
    static generateConfusionMatrix(): ConfusionMatrixData;
}
//# sourceMappingURL=analysis.d.ts.map