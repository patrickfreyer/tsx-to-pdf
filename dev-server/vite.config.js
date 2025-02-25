
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Get all TSX files from the examples directory
const examplesDir = path.resolve(__dirname, '../examples');
const tsxFiles = fs.readdirSync(examplesDir)
  .filter(file => file.endsWith('.tsx'))
  .map(file => file.replace('.tsx', ''));

// Create input entries for each TSX file
const input = {
  main: 'index.html',
};

tsxFiles.forEach(component => {
  input[component] = `${component}.html`;
});

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input,
    },
  },
});
  