# Process Flow: TSX to PDF Conversion

This document outlines the step-by-step process of converting TSX files to PDF using this toolset. The tool supports two main paths: web API and command line interface.

## Web API Flow (Primary Usage)

1. **User Interaction (Frontend UI)**
   * A user interacts with a web frontend
   * Selects TSX file(s) and export options (e.g., `format: 'a4'`, `width: 390`, `margin: 10`, `output: 'MyFile.pdf'`)

2. **API Layer (`ConverterService/api.js`)**
   * Receives the request from the frontend
   * Processes options and prepares paths:
     ```javascript
     const inputPath = `input/${componentFile}`;
     const outputFilePath = outputFile || 'output.pdf';
     ```
   * Prepares converter options:
     * For A4 format: only includes `format`, `margin`, and `debugMode`
     * For other formats: includes additional `width` and `autoSize` options
   * Directly calls `convertTsxToPdf()` from `index.js`

3. **Core Conversion (`ConverterService/index.js` - `convertTsxToPdf` function)**
   * Receives the filtered options directly from the API
   * Merges options with defaults
   * **Width Logic:** Determines `finalWidth` based on format:
     * If `format` is `'a4'`: uses A4 dimensions
     * Otherwise: uses presets or provided width
   * **Component URL:** Determines URL for the component (e.g., `http://localhost:5174/ComponentName`)
   * **Browser Launch:** Launches Puppeteer
   * **PDF Generation:** Creates the PDF with appropriate settings
   * **Merging:** If multiple input files, merges temporary PDFs
   * **Cleanup:** Closes browser, removes temp files

4. **Final Output**
   * The final PDF is saved to the specified output path
   * Success/error status is returned to the frontend

## Common Options

* `format`: 'auto' or 'a4' (determines page sizing)
* `width`: Width in pixels (ignored for A4 format)
* `margin`: Page margins in pixels (converted to mm for A4)
* `autoSize`: Whether to fit content (forced false for A4)
* `debug`: Whether to keep temporary files

Note: The tool requires a development server running at http://localhost:5174 that can serve the TSX components for both web API and CLI usage.