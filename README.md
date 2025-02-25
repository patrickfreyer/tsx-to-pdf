# TSX to PDF Converter

A tool to convert React TSX components to PDF files with proper formatting.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A development server running at http://localhost:5174 that can serve your TSX components

## Installation

```bash
npm install
```

## Usage

### Step 1: Add your TSX components

Place your TSX component files in the `input` directory. The tool supports both PascalCase and kebab-case file naming:
- `MyComponent.tsx` (PascalCase)
- `my-component.tsx` (kebab-case)

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

## Examples

The `input` directory contains sample TSX files that you can use to test the tool:

- `example-slide.tsx`: A simple slide with a title and text
- `complex-flowchart.tsx`: A more complex component with a flowchart
- `thinking-llm-visualization.tsx`: A visualization of how thinking LLMs work

## License

MIT 