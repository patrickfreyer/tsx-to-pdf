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

The frontend provides a user-friendly interface for:

1. Selecting a TSX component to export
2. Configuring export options (aspect ratio, paper size, orientation, etc.)
3. Exporting the component to PDF

The frontend communicates with the backend API to:

- Fetch the list of available components
- Send export requests

## API Endpoints

The frontend uses the following API endpoints:

- `GET /api/components` - Get a list of available components
- `POST /api/export` - Export a component to PDF 