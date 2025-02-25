# TSX to PDF Converter

A tool to convert React TSX components to PDF files with proper formatting.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

```bash
npm install
```

## Quick Start

The easiest way to use this tool is with the all-in-one command:

```bash
npm start
```

This command will:
1. Set up the input directory
2. Set up and start the development server
3. Build and start the UI server
4. Display a list of available components
5. Keep the servers running until you press Ctrl+C

## Using the Web UI

The tool now includes a web-based user interface for easier use:

1. Start the tool with `npm start`
2. Open your browser and navigate to http://localhost:3000
3. Use the UI to:
   - Select a component to export
   - Configure export options (aspect ratio, paper size, orientation, etc.)
   - Export the component to PDF
   - View and download previously exported PDF files

The UI provides a simple and intuitive way to export your TSX components without having to use the command line.

### Export Tab

The Export tab allows you to:
- Upload new TSX components directly through the UI
- Select a component from the input directory
- Set the output file name
- Configure export options
- Export the component to PDF

### Output Files Tab

The Output Files tab allows you to:
- View a list of all exported PDF files
- See file details (size, creation date)
- View PDFs directly in the browser
- Download PDFs to your computer

## Manual Usage

If you prefer to run each step manually, follow these instructions:

### Step 1: Add your TSX components

Place your TSX component files in the `input` directory. The tool supports both PascalCase and kebab-case file naming:
- `MyComponent.tsx` (PascalCase)
- `my-component.tsx` (kebab-case)

#### Working with Component Dependencies

If your components import other components or have dependencies:

1. **For shared components**: Place them in the `input/components` directory
   ```jsx
   // Example: input/MyComponent.tsx can import from input/components
   import SharedButton from './components/SharedButton';
   ```

2. **For direct imports**: You can import components directly from the input directory
   ```jsx
   // Example: input/Dashboard.tsx can import from input/Chart.tsx
   import Chart from './Chart';
   ```

3. **For external libraries**: Common libraries like React and lucide-react are already included. If you need additional libraries, you can modify the `setup-dev-server.js` file to include them in the `packageJson` object.

### Step 2: Set up and start the development server

Run the setup script to create a development server that will serve your TSX components:

```bash
./setup-dev-server.js
```

Then start the server:

```bash
cd dev-server
npm install
npm run dev
```

The server will be available at http://localhost:5174 and will automatically serve all components in the `input` directory.

### Step 3: Convert TSX files to PDF

Once your server is running, you can use this tool to convert TSX files to PDF:

```bash
npm run convert input/your-component.tsx [output.pdf]
```

Options:
- `--aspect-ratio`: Aspect ratio for the slides (e.g., '16:9', default: '16:9')
- `--paper-size`: PDF paper size ('A4' or 'Letter', default: 'A4')
- `--orientation`: PDF orientation ('portrait' or 'landscape', default: 'landscape')
- `--margin`: Margin in pixels (default: 0)
- `--auto-size`: Automatically adjust PDF size to fit content (default: true)
- `--no-auto-size`: Disable automatic sizing and use fixed dimensions
- `--debug`: Debug mode, keeps temporary files (default: false)

Example:
```bash
npm run convert input/complex-flowchart.tsx --paper-size=Letter --margin=20
```

## How It Works

1. The tool takes a TSX file as input
2. It extracts the component name from the file name (converting kebab-case to PascalCase if needed)
3. It navigates to `http://localhost:5174/ComponentName` using Puppeteer
4. It captures the rendered component as a PDF, automatically sizing the PDF to fit the content
5. If multiple TSX files are provided, it merges them into a single PDF

## Project Structure

- `input/` - Place your TSX components here for export
- `output/` - Exported PDFs are saved here
- `ConverterFrontend/` - Frontend UI source code
- `ConverterService/` - Backend source code
- `dev-server/` - Development server for rendering TSX components

## Examples

The `input` directory contains sample TSX files that you can use to test the tool:

- `example-slide.tsx`: A simple slide with a title and text
- `complex-flowchart.tsx`: A more complex component with a flowchart
- `thinking-llm-visualization.tsx`: A visualization of how thinking LLMs work

## License

MIT 