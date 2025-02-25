#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDevServer() {
  console.log('Setting up development server for TSX components...');
  
  // Create a dev-server directory if it doesn't exist
  const devServerDir = path.join(__dirname, 'dev-server');
  try {
    await fs.mkdir(devServerDir, { recursive: true });
    console.log(`Created dev-server directory at: ${devServerDir}`);
  } catch (err) {
    console.log('Dev-server directory already exists');
  }
  
  // Create package.json for the dev server
  const packageJson = {
    name: "tsx-to-pdf-dev-server",
    version: "1.0.0",
    type: "module",
    scripts: {
      "dev": "vite --port 5173",
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
  
  // Create vite.config.js
  const viteConfig = `
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
  input[component] = \`\${component}.html\`;
});

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input,
    },
  },
});
  `;
  
  await fs.writeFile(path.join(devServerDir, 'vite.config.js'), viteConfig);
  
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
  
  // Create src directory
  const srcDir = path.join(devServerDir, 'src');
  await fs.mkdir(srcDir, { recursive: true });
  
  // Create components directory
  const componentsDir = path.join(srcDir, 'components');
  await fs.mkdir(componentsDir, { recursive: true });
  
  // Create main.jsx
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
        COMPONENT_LIST
      </ul>
    </div>
  </React.StrictMode>
);
  `;
  
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
  
  // Get all TSX files from the examples directory
  const examplesDir = path.join(__dirname, 'examples');
  const tsxFiles = await fs.readdir(examplesDir);
  const componentFiles = tsxFiles.filter(file => file.endsWith('.tsx'));
  
  // Create component list for main.jsx
  const componentListItems = componentFiles.map(file => {
    const componentName = file.replace('.tsx', '');
    return `<li><a href="/${componentName}" className="text-blue-600 hover:underline">${componentName}</a></li>`;
  }).join('\n        ');
  
  // Write main.jsx with component list
  await fs.writeFile(
    path.join(srcDir, 'main.jsx'),
    mainJsx.replace('COMPONENT_LIST', componentListItems)
  );
  
  // Create component HTML files and JSX wrappers
  for (const file of componentFiles) {
    const componentName = file.replace('.tsx', '');
    
    // Create HTML file for the component
    await fs.writeFile(
      path.join(devServerDir, `${componentName}.html`),
      componentTemplate.replace(/COMPONENT_NAME/g, componentName)
    );
    
    // Create JSX wrapper for the component
    const componentJsx = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import Component from '../../../examples/${file}';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);
    `;
    
    await fs.writeFile(path.join(componentsDir, `${componentName}.jsx`), componentJsx);
  }
  
  console.log('Development server setup complete!');
  console.log('To start the server:');
  console.log('1. cd dev-server');
  console.log('2. npm install');
  console.log('3. npm run dev');
  console.log('The server will be available at http://localhost:5173');
}

setupDevServer().catch(err => {
  console.error('Error setting up development server:', err);
  process.exit(1);
}); 