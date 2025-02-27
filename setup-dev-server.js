#!/usr/bin/env node

import fs from 'fs/promises';
import { watch } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate component files based on input directory
async function generateComponentFiles() {
  // Get all TSX files from the input directory
  const inputDir = path.join(__dirname, 'input');
  const tsxFiles = await fs.readdir(inputDir);
  const componentFiles = tsxFiles.filter(file => file.endsWith('.tsx'));
  
  // Process component files
  const components = componentFiles.map(file => {
    const componentName = file.replace('.tsx', '');
    // Convert kebab-case to PascalCase for the route
    const routeName = componentName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    return { file, componentName, routeName };
  });

  return components;
}

// Function to update main.jsx with component list
async function updateMainJsx(components) {
  const srcDir = path.join(__dirname, 'RenderingServer', 'src');
  
  // Create component list for main.jsx
  const componentListItems = components.map(({ componentName, routeName }) => {
    return `<li><a href="/${routeName}" className="text-blue-600 hover:underline">${componentName}</a></li>`;
  }).join('\n        ');
  
  // Main.jsx template
  const mainJsx = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">TSX to PDF Dev Server</h1>
      <p className="mb-4">This server hosts the TSX components for conversion to PDF.</p>
      <h2 className="text-xl font-semibold mb-4">Available Components:</h2>
      <ul className="list-disc pl-6">
        ${componentListItems}
      </ul>
    </div>
  </React.StrictMode>
);
  `;
  
  // Write main.jsx with component list
  await fs.writeFile(path.join(srcDir, 'main.jsx'), mainJsx);
  console.log('Updated main.jsx with new component list');
}

// Function to update vite.config.js with new component routes
async function updateViteConfig(components) {
  const devServerDir = path.join(__dirname, 'RenderingServer');
  
  // Create vite.config.js with support for component dependencies
  const viteConfig = `
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
  input[routeName] = \`\${routeName}.html\`;
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
  `;
  
  await fs.writeFile(path.join(devServerDir, 'vite.config.js'), viteConfig);
  console.log('Updated vite.config.js with new component routes');
}

// Function to create or update component HTML and JSX files
async function updateComponentFiles(components) {
  const devServerDir = path.join(__dirname, 'RenderingServer');
  const componentsDir = path.join(devServerDir, 'src', 'components');
  
  // Create a template HTML file for each component
  const componentTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>COMPONENT_NAME</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/components/COMPONENT_NAME.jsx"></script>
  </body>
</html>
  `;
  
  for (const { file, componentName, routeName } of components) {
    // Create HTML file for the component
    await fs.writeFile(
      path.join(devServerDir, `${routeName}.html`),
      componentTemplate.replace(/COMPONENT_NAME/g, routeName)
    );
    
    // Create JSX wrapper for the component with support for dependencies
    const componentJsx = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import Component from '../../../input/${file}';

// Add global styles if needed
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);
    `;
    
    await fs.writeFile(path.join(componentsDir, `${routeName}.jsx`), componentJsx);
  }
  
  console.log('Updated component HTML and JSX files');
}

// Function to handle file changes in the input directory
async function handleFileChange() {
  console.log('Detected changes in input directory, updating components...');
  try {
    const components = await generateComponentFiles();
    await updateMainJsx(components);
    await updateViteConfig(components);
    await updateComponentFiles(components);
    console.log('Components updated successfully!');
  } catch (err) {
    console.error('Error updating components:', err);
  }
}

async function setupDevServer() {
  console.log('Setting up development server for TSX components...');
  
  // Create a dev-server directory if it doesn't exist
  const devServerDir = path.join(__dirname, 'RenderingServer');
  try {
    await fs.mkdir(devServerDir, { recursive: true });
    console.log(`Created RenderingServer directory at: ${devServerDir}`);
  } catch (err) {
    console.log('RenderingServer directory already exists');
  }
  
  // Create package.json for the dev server
  const packageJson = {
    name: "tsx-to-pdf-dev-server",
    version: "1.0.0",
    type: "module",
    scripts: {
      "dev": "vite --port 5174",
      "build": "vite build",
      "preview": "vite preview"
    },
    dependencies: {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "lucide-react": "^0.363.0"
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
    path.join(devServerDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  
  // Create src directory
  const srcDir = path.join(devServerDir, 'src');
  await fs.mkdir(srcDir, { recursive: true });
  
  // Create components directory
  const componentsDir = path.join(srcDir, 'components');
  await fs.mkdir(componentsDir, { recursive: true });
  
  // Create index.css
  const indexCss = `
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
  `;
  
  await fs.writeFile(path.join(srcDir, 'index.css'), indexCss);
  
  // Create index.html
  const indexHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TSX to PDF Dev Server</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
  `;
  
  await fs.writeFile(path.join(devServerDir, 'index.html'), indexHtml);
  
  // Create a jsconfig.json file to help with imports
  const jsConfig = {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@input/*": ["../input/*"],
        "@components/*": ["../input/components/*"]
      }
    }
  };
  
  await fs.writeFile(
    path.join(devServerDir, 'jsconfig.json'),
    JSON.stringify(jsConfig, null, 2)
  );
  
  // Create input directory if it doesn't exist
  const inputDir = path.join(__dirname, 'input');
  try {
    await fs.mkdir(inputDir, { recursive: true });
    console.log(`Ensured input directory exists at: ${inputDir}`);
  } catch (err) {
    console.log('Input directory already exists');
  }
  
  // Create components directory in input if it doesn't exist
  const inputComponentsDir = path.join(inputDir, 'components');
  try {
    await fs.mkdir(inputComponentsDir, { recursive: true });
    console.log(`Ensured components directory exists at: ${inputComponentsDir}`);
  } catch (err) {
    console.log('Components directory already exists');
  }
  
  // Generate initial component files
  const components = await generateComponentFiles();
  
  // Update main.jsx, vite.config.js, and component files
  await updateMainJsx(components);
  await updateViteConfig(components);
  await updateComponentFiles(components);
  
  // Set up file watcher for the input directory
  const watcher = watch(inputDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.tsx')) {
      console.log(`File ${filename} ${eventType}`);
      handleFileChange();
    }
  });
  
  // Handle process termination
  process.on('SIGINT', () => {
    watcher.close();
    process.exit(0);
  });
  
  console.log('Development server setup complete!');
  console.log('To start the server:');
  console.log('1. cd RenderingServer');
  console.log('2. npm install');
  console.log('3. npm run dev');
  console.log('\nAvailable components:');
  components.forEach(({ componentName, routeName }) => {
    console.log(`- ${componentName} (accessible at: http://localhost:5174/${routeName})`);
  });
  console.log('\nFile watching is enabled. New components will be automatically detected.');
}

setupDevServer().catch(err => {
  console.error('Error setting up development server:', err);
  process.exit(1);
}); 