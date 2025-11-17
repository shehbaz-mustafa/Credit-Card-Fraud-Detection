# Fraud Detection - TypeScript Version

This is a refactored TypeScript version of the Fraud Detection application, converted from the original HTML/JavaScript file.

## Project Structure

```
src/
  ├── app.ts              # Main application entry point
  ├── types/
  │   └── types.ts        # TypeScript interfaces and type definitions
  ├── utils/
  │   ├── analysis.ts     # CSV parsing and model analysis logic
  │   └── charts.ts       # Chart rendering and management
  ├── ui/
  │   └── uiController.ts # UI state and event management
  └── styles/
      └── main.css        # Application styles
index-new.html             # New HTML entry point (replace old index.html)
package.json              # Project dependencies
tsconfig.json             # TypeScript configuration
```

## Key Improvements

1. **Type Safety**: Full TypeScript with strict type checking
2. **Modular Architecture**: Separated concerns into different modules
3. **Better Maintainability**: Clear separation of UI, business logic, and utilities
4. **Reusability**: Components can be easily imported and reused
5. **Scalability**: Easy to extend with new features

## Module Breakdown

### `types.ts`
Defines all TypeScript interfaces used throughout the application:
- `ChartData` - Chart configuration
- `DataRecord` - CSV data structure
- `ModelResults` - ML model results
- `ConfusionMatrixData` - Confusion matrix data
- `DatasetStats` - Dataset statistics

### `analysis.ts`
Contains business logic:
- `CSVParser` - Parses CSV files and calculates statistics
- `ModelAnalyzer` - Generates mock model results and confusion matrices

### `charts.ts`
Manages chart rendering:
- `ChartManager` - Handles confusion matrix and prediction charts

### `uiController.ts`
Controls all UI interactions:
- Event handler setup
- DOM manipulation
- User feedback (errors, success messages)
- Animation triggers

### `app.ts`
Main application class that orchestrates all modules:
- Initializes event handlers
- Coordinates data analysis flow
- Manages application state

## Setup and Usage

1. **Install TypeScript**:
   ```bash
   npm install
   ```

2. **Compile TypeScript to JavaScript**:
   ```bash
   npm run build
   ```

3. **Watch for changes during development**:
   ```bash
   npm run dev
   ```

4. **Serve the application**:
   ```bash
   npm run serve
   ```
   Then open `http://localhost:8000` in your browser

5. **Use the new HTML file**:
   Replace `index.html` with `index-new.html` or rename it to `index.html`

## Migration from Original HTML

The original `index.html` has been converted to a modular TypeScript structure:
- All inline styles moved to `src/styles/main.css`
- All JavaScript logic split into typed modules
- Event handlers managed through `UIController`
- Business logic separated from UI concerns

## Browser Compatibility

- Requires ES2020+ support
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)

## Future Enhancements

- Add actual ML model integration (Python backend via API)
- Add data export functionality
- Add more visualization options
- Add real-time model comparison
- Add data preprocessing options
