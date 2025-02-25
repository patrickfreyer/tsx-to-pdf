#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildFrontend() {
  console.log('Building frontend for TSX to PDF Converter...');
  
  // Create public directory if it doesn't exist
  const publicDir = path.join(__dirname, '..', 'public');
  try {
    await fs.mkdir(publicDir, { recursive: true });
    console.log(`Created public directory at: ${publicDir}`);
  } catch (err) {
    console.log('Public directory already exists');
  }
  
  // Create a temporary frontend build directory
  const frontendBuildDir = path.join(__dirname, '..', 'frontend-build');
  try {
    await fs.mkdir(frontendBuildDir, { recursive: true });
    console.log(`Created frontend build directory at: ${frontendBuildDir}`);
  } catch (err) {
    console.log('Frontend build directory already exists');
  }
  
  // Create package.json for the frontend
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

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../public',
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
  
  // Create src directory
  const srcDir = path.join(frontendBuildDir, 'src');
  await fs.mkdir(srcDir, { recursive: true });
  
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
  
  await fs.writeFile(path.join(srcDir, 'main.tsx'), mainTsx);
  
  // Create App.tsx
  const appTsx = `
import React from 'react';
import ExportUI from './ExportUI';

const App: React.FC = () => {
  return <ExportUI />;
};

export default App;
`;
  
  await fs.writeFile(path.join(srcDir, 'App.tsx'), appTsx);
  
  // Create index.css with Tailwind directives
  const indexCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;
  
  await fs.writeFile(path.join(srcDir, 'index.css'), indexCss);
  
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
  
  // Copy ExportUI.tsx from frontend directory to build directory
  try {
    const exportUiContent = await fs.readFile(path.join(__dirname, '..', 'frontend', 'src', 'ExportUI.tsx'), 'utf-8');
    await fs.writeFile(path.join(srcDir, 'ExportUI.tsx'), exportUiContent);
    console.log('Copied ExportUI.tsx to frontend build directory');
  } catch (err) {
    console.error('Error copying ExportUI.tsx:', err);
    process.exit(1);
  }
  
  // Install dependencies and build the frontend
  console.log('Installing frontend dependencies...');
  execSync('npm install', { cwd: frontendBuildDir, stdio: 'inherit' });
  
  console.log('Building frontend...');
  execSync('npm run build', { cwd: frontendBuildDir, stdio: 'inherit' });
  
  console.log('Frontend built successfully!');
}

buildFrontend().catch(err => {
  console.error('Error building frontend:', err);
  process.exit(1);
}); 