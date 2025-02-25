# TSX to PDF Converter

A tool to convert TSX (React TypeScript) files to PDF documents with proper formatting.

## Features

- Convert TSX files to PDF with proper formatting
- Maintain aspect ratio and background styles
- Support for complex React components with external dependencies
- Merge multiple TSX files into a single PDF
- Customizable page size, orientation, and margins

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tsx-to-pdf.git
cd tsx-to-pdf

# Install dependencies
npm install
```

## Usage

### Command Line Interface

```bash
# Basic usage
npm run convert examples/ExampleSlide.tsx output.pdf

# Multiple files
npm run convert examples/Slide1.tsx examples/Slide2.tsx output.pdf

# With options
npm run convert examples/ExampleSlide.tsx output.pdf --aspect-ratio 16:9 --paper-size A4 --orientation landscape --margin 0 --debug
```

### API Usage

```javascript
import convertTsxToPdf from 'tsx-to-pdf';

// Convert a single TSX file to PDF
await convertTsxToPdf(['path/to/component.tsx'], 'output.pdf');

// Convert multiple TSX files to a single PDF
await convertTsxToPdf(['slide1.tsx', 'slide2.tsx'], 'presentation.pdf', {
  aspectRatio: '16:9',
  paperSize: 'A4',
  orientation: 'landscape',
  margin: 0,
  debugMode: false
});
```

## How It Works

1. **Build Process**: The tool uses webpack to build TSX files into JavaScript bundles
2. **Rendering**: The bundles are rendered to HTML using React
3. **PDF Generation**: Puppeteer is used to convert the HTML to PDF
4. **Merging**: Multiple PDFs are merged into a single document using pdf-lib

## Options

- `aspectRatio`: Aspect ratio for the slides (e.g., '16:9')
- `paperSize`: PDF paper size ('A4' or 'Letter')
- `orientation`: PDF orientation ('portrait' or 'landscape')
- `margin`: Margin in pixels
- `debugMode`: If true, keeps temporary files for debugging

## Requirements

- Node.js 16 or higher
- npm or yarn

## Handling External Dependencies

If your TSX files use external dependencies like UI libraries, make sure to install them:

```bash
npm install react react-dom your-ui-library
```

## License

MIT 