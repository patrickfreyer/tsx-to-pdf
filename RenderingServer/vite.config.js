
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
  resolve: {
    alias: {
      // Allow components to import from the input directory
      '@input': path.resolve(__dirname, '../input'),
      // Allow components to import from the components directory
      '@components': path.resolve(__dirname, '../input/components')
    }
  },
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    watch: {
      // Watch for changes in the input directory
      ignored: ['!**/input/**']
    }
  }
});
  