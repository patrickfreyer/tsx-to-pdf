#!/usr/bin/env node

import fs from 'fs/promises';
import { watch } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple color functions
const colors = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

// Create a simple chalk-like API
const chalk = {
  green: (text) => colors.green(text),
  red: (text) => colors.red(text),
  yellow: (text) => colors.yellow(text),
  cyan: (text) => colors.cyan(text),
  magenta: (text) => colors.magenta(text),
  blue: (text) => colors.blue(text)
};

chalk.blue.bold = (text) => colors.blue(colors.bold(text));
chalk.green.bold = (text) => colors.green(colors.bold(text));
chalk.red.bold = (text) => colors.red(colors.bold(text));

// Paths
const frontendSrcDir = path.join(__dirname, 'ConverterFrontend', 'src');
const frontendBuildDir = path.join(__dirname, 'temp', 'frontend-build');
const publicDir = path.join(__dirname, 'public');

// Debounce function to prevent multiple rebuilds
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to build the frontend
async function buildFrontend() {
  console.log(chalk.blue.bold('\n=== Building Frontend ===\n'));
  
  try {
    // Ensure the build directory exists
    await fs.mkdir(frontendBuildDir, { recursive: true });
    
    // Copy all files from ConverterFrontend/src to temp/frontend-build/src
    await copyDirectory(frontendSrcDir, path.join(frontendBuildDir, 'src'));
    
    // Run the build
    console.log(chalk.yellow('Running build...'));
    execSync('npm run build', { cwd: frontendBuildDir, stdio: 'inherit' });
    
    console.log(chalk.green.bold('✓ Frontend built successfully!'));
    
    // Clear browser cache hint
    console.log(chalk.cyan('Tip: If changes are not visible, try clearing your browser cache or hard refresh (Ctrl+F5)'));
  } catch (error) {
    console.error(chalk.red.bold('✗ Error building frontend:'), error);
  }
}

// Function to copy a directory recursively
async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// Function to setup the initial build environment
async function setupBuildEnvironment() {
  console.log(chalk.blue.bold('\n=== Setting Up Build Environment ===\n'));
  
  try {
    // Create necessary directories
    await fs.mkdir(frontendBuildDir, { recursive: true });
    await fs.mkdir(path.join(frontendBuildDir, 'src'), { recursive: true });
    
    // Create package.json for the frontend build
    const packageJson = {
      name: "tsx-to-pdf-frontend",
      version: "1.0.0",
      type: "module",
      scripts: {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
      },
      dependencies: {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      },
      devDependencies: {
        "@types/react": "^18.2.67",
        "@types/react-dom": "^18.2.22",
        "@vitejs/plugin-react": "^4.2.1",
        "autoprefixer": "^10.4.19",
        "postcss": "^8.4.38",
        "tailwindcss": "^3.4.1",
        "typescript": "^5.3.3",
        "vite": "^5.2.6"
      }
    };
    
    await fs.writeFile(
      path.join(frontendBuildDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    
    // Create vite.config.js
    const viteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../../public'),
    emptyOutDir: true
  }
});
`;
    
    await fs.writeFile(path.join(frontendBuildDir, 'vite.config.js'), viteConfig);
    
    // Create index.html
    const indexHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TSX to PDF Converter</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
    
    await fs.writeFile(path.join(frontendBuildDir, 'index.html'), indexHtml);
    
    // Create main.tsx
    const mainTsx = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
    
    await fs.writeFile(path.join(frontendBuildDir, 'src', 'main.tsx'), mainTsx);
    
    // Create App.tsx
    const appTsx = `
import React from 'react';
import ExportUI from './ExportUI';

const App: React.FC = () => {
  return <ExportUI />;
};

export default App;
`;
    
    await fs.writeFile(path.join(frontendBuildDir, 'src', 'App.tsx'), appTsx);
    
    // Create index.css with Tailwind directives
    const indexCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;
    
    await fs.writeFile(path.join(frontendBuildDir, 'src', 'index.css'), indexCss);
    
    // Create tailwind.config.js
    const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
    
    await fs.writeFile(path.join(frontendBuildDir, 'tailwind.config.js'), tailwindConfig);
    
    // Create postcss.config.js
    const postcssConfig = `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
    
    await fs.writeFile(path.join(frontendBuildDir, 'postcss.config.js'), postcssConfig);
    
    // Install dependencies
    console.log(chalk.yellow('Installing frontend dependencies...'));
    execSync('npm install', { cwd: frontendBuildDir, stdio: 'inherit' });
    
    console.log(chalk.green.bold('✓ Build environment set up successfully!'));
  } catch (error) {
    console.error(chalk.red.bold('✗ Error setting up build environment:'), error);
    process.exit(1);
  }
}

// Function to start the server
function startServer() {
  console.log(chalk.blue.bold('\n=== Starting Server ===\n'));
  
  const server = spawn('node', ['ConverterService/server.js'], {
    stdio: 'inherit'
  });
  
  server.on('close', (code) => {
    if (code !== 0) {
      console.log(chalk.red(`Server process exited with code ${code}`));
    }
  });
  
  return server;
}

// Main function
async function main() {
  console.log(chalk.blue.bold('\n=== TSX to PDF Converter - Development Mode ===\n'));
  
  // Setup build environment
  await setupBuildEnvironment();
  
  // Initial build
  await buildFrontend();
  
  // Start the server
  const server = startServer();
  
  // Watch for changes in the frontend source directory
  const debouncedBuild = debounce(buildFrontend, 500);
  
  console.log(chalk.magenta('\nWatching for changes in ConverterFrontend/src...\n'));
  
  // Watch the entire src directory recursively
  function watchDir(dir) {
    watch(dir, { recursive: true }, (eventType, filename) => {
      if (filename) {
        console.log(chalk.yellow(`File changed: ${filename}`));
        debouncedBuild();
      }
    });
    
    console.log(chalk.cyan(`Watching directory: ${dir}`));
  }
  
  watchDir(frontendSrcDir);
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\nShutting down...'));
    server.kill();
    process.exit(0);
  });
}

main().catch(error => {
  console.error(chalk.red.bold('Fatal error:'), error);
  process.exit(1);
}); 