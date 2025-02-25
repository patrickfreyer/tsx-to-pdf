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

### Step 1: Start your development server

Before using this tool, you need to have a development server running at http://localhost:5174 that can serve your TSX components.

For example, if you're using Vite, you can start the server with:

```bash
npm run dev
```

Make sure your server is configured to serve each component at a URL like:
`http://localhost:5174/ComponentName`

Where `ComponentName` is the name of your TSX file without the extension.

### Step 2: Convert TSX files to PDF

Once your server is running, you can use this tool to convert TSX files to PDF:

```bash
npm run convert path/to/your/Component.tsx [output.pdf]
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
npm run convert examples/ComplexFlowchart.tsx --paper-size=Letter --margin=20
```

## How It Works

1. The tool takes a TSX file as input
2. It extracts the component name from the file name
3. It navigates to `http://localhost:5174/ComponentName` using Puppeteer
4. It captures the rendered component as a PDF, automatically sizing the PDF to fit the content
5. If multiple TSX files are provided, it merges them into a single PDF

## Examples

The `examples` directory contains sample TSX files that you can use to test the tool:

- `ExampleSlide.tsx`: A simple slide with a title and text
- `ComplexFlowchart.tsx`: A more complex component with a flowchart

## License

MIT 