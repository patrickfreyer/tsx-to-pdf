
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Get all TSX files from the input directory
const inputDir = path.resolve(__dirname, '../input');
const tsxFiles = fs.readdirSync(inputDir)
  .filter(file => file.endsWith('.tsx'))
  .map(file => {
    // Extract component name without extension
    const componentName = file.replace('.tsx', '');
    // Convert kebab-case to PascalCase for the route
    const routeName = componentName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    return { file, componentName, routeName };
  });

// Create input entries for each TSX file
const input = {
  main: 'index.html',
};

tsxFiles.forEach(({ routeName }) => {
  input[routeName] = `${routeName}.html`;
});

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input,
    },
  },
});
  