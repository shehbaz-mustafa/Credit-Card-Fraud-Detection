export class CSVParser {
    static parseCSV(csv) {
        const lines = csv.split('\n');
        if (lines.length < 2) {
            throw new Error('Invalid CSV file');
        }
        return lines
            .slice(1)
            .filter(line => line.trim())
            .map(line => {
            const values = line.split(',');
            return {
                amount: parseFloat(values[1]) || 0,
                class: parseInt(values[values.length - 1]) || 0
            };
        });
    }
    static calculateStats(data) {
        const fraudCount = data.filter(d => d.class === 1).length;
        const validCount = data.filter(d => d.class === 0).length;
        const totalCount = data.length;
        const fraudPercentage = (fraudCount / totalCount) * 100;
        return {
            fraudCount,
            validCount,
            totalCount,
            fraudPercentage
        };
    }
}
export class ModelAnalyzer {
    static generateMockResults() {
        return {
            isoForest: {
                precision: parseFloat((0.85 + Math.random() * 0.1).toFixed(3)),
                recall: parseFloat((0.78 + Math.random() * 0.1).toFixed(3)),
                f1Score: parseFloat((0.81 + Math.random() * 0.1).toFixed(3)),
                accuracy: parseFloat((0.92 + Math.random() * 0.05).toFixed(3))
            },
            lof: {
                precision: parseFloat((0.82 + Math.random() * 0.1).toFixed(3)),
                recall: parseFloat((0.75 + Math.random() * 0.1).toFixed(3)),
                f1Score: parseFloat((0.78 + Math.random() * 0.1).toFixed(3)),
                accuracy: parseFloat((0.90 + Math.random() * 0.05).toFixed(3))
            }
        };
    }
    static generateConfusionMatrix() {
        return {
            truePositive: Math.floor(150 + Math.random() * 50),
            falsePositive: Math.floor(10 + Math.random() * 20),
            falseNegative: Math.floor(20 + Math.random() * 30),
            trueNegative: Math.floor(3500 + Math.random() * 500)
        };
    }
}
//# sourceMappingURL=analysis.js.map