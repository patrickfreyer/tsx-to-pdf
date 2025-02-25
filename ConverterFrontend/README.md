# TSX to PDF Converter Frontend

This directory contains the frontend UI for the TSX to PDF Converter tool.

## Structure

- `src/` - Source code for the frontend
  - `ExportUI.tsx` - Main UI component for exporting TSX components to PDF

## Development

The frontend is built using:

- React
- TypeScript
- Tailwind CSS

To modify the frontend:

1. Make changes to the files in this directory
2. Run `npm run build-frontend` to build the frontend
3. Run `npm run start-server` to start the server

Or simply run `npm run start-ui` to build and start the server in one command.

## How It Works

The frontend provides a user-friendly interface with two main tabs:

### Export Tab

The Export tab allows users to:

1. Select a TSX component to export
2. Configure export options (aspect ratio, paper size, orientation, etc.)
3. Export the component to PDF

### Output Files Tab

The Output Files tab allows users to:

1. View a list of all exported PDF files
2. See file details (size, creation date)
3. View PDFs directly in the browser
4. Download PDFs to their computer

## API Endpoints

The frontend uses the following API endpoints:

- `GET /api/components` - Get a list of available components
- `GET /api/output-files` - Get a list of exported PDF files
- `POST /api/export` - Export a component to PDF 