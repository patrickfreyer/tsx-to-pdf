# Process Flow: TSX to PDF Conversion

This document outlines the step-by-step process of converting TSX files to PDF using this toolset, specifically when invoked via the command line.

1.  **User Interaction (Frontend UI - Assumed)**
    *   A user interacts with a web frontend.
    *   Selects TSX file(s) and export options (e.g., `format: 'a4'`, `width: 390`, `margin: 10`, `output: 'MyFile.pdf'`).

2.  **UI Server (Assumed, based on logs)**
    *   Receives the request from the frontend.
    *   Constructs and executes a command: `node ConverterService/cli.js [args...]`.
    *   Passes user selections as command-line arguments (e.g., `--format=a4`, `--width=390`, `--output=MyFile.pdf`, `input/Component.tsx`).

3.  **`ConverterService/cli.js` (Command-Line Interface)**
    *   Parses command-line arguments using `yargs`.
    *   **Argument Filtering:**
        *   If `--format=a4` is present, it *omits* `--width` and `--auto-size` when calling the next step.
        *   Otherwise, it includes `--width` and `--auto-size`.
    *   Calls `convertTsxToPdf(files, outputPath, processedOptions)` from `ConverterService/index.js`.

4.  **`ConverterService/index.js` (`convertTsxToPdf` function - Main Logic)**
    *   Receives the filtered `processedOptions` from `cli.js`.
    *   Merges options with defaults.
    *   **Width Logic:** Determines a `finalWidth` variable. If `format` is `'a4'`, `finalWidth` is `null`; otherwise, it's based on presets or the `width` option.
    *   **Component URL:** Determines the URL for the component (e.g., `http://localhost:5174/ComponentName`).
    *   **Browser Launch:** Launches Puppeteer.
    *   **Initial Viewport:** Sets the initial page viewport using `page.setViewport()`. *Note: This step currently uses logic based on `finalWidth` or defaults, and does not correctly use A4 dimensions when `format` is 'a4'.*
    *   **Page Navigation:** Loads the component URL using `page.goto()`.
    *   **PDF Generation (`page.pdf()`):** Creates the PDF directly within this function.
        *   If `autoSize` (forced `false` for 'a4'), it calculates content dimensions and uses these `width`/`height` in `page.pdf()`.
        *   If not `autoSize` (i.e., for 'a4'), it uses fixed `width`/`height` derived from the initial (potentially incorrect) viewport size. *It crucially does NOT use the `format: 'A4'` option here, nor does it inject the print CSS.*
    *   **Merging:** If multiple input files, merges temporary PDFs using `pdf-lib`.
    *   **Cleanup:** Closes browser, removes temp files.

5.  **Final Output**
    *   The final PDF (e.g., `output/MyFile.pdf`) is saved.