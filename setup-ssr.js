#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupSSR() {
  console.log('Setting up Server-Side Rendering (SSR) environment...');
  
  // Path to RenderingServer directory
  const renderingServerDir = path.join(__dirname, 'RenderingServer');
  
  // Check if the RenderingServer directory exists
  if (!existsSync(renderingServerDir)) {
    console.log('RenderingServer directory not found. Creating it...');
    await fs.mkdir(renderingServerDir, { recursive: true });
  }
  
  // Path to the entry-server.js file
  const entryServerPath = path.join(renderingServerDir, 'src', 'entry-server.js');
  const componentsPath = path.join(renderingServerDir, 'src', 'components');
  
  // Ensure src directory exists
  await fs.mkdir(path.join(renderingServerDir, 'src'), { recursive: true });
  
  // Ensure components directory exists
  await fs.mkdir(componentsPath, { recursive: true });
  
  // Create entry-server.js if it doesn't exist
  if (!existsSync(entryServerPath)) {
    console.log('Creating entry-server.js file...');
    await fs.writeFile(entryServerPath, `
      import React from 'react';
      import ReactDOMServer from 'react-dom/server';

      export function render(Component) {
        return ReactDOMServer.renderToString(
          React.createElement(Component)
        );
      }
    `);
  }
  
  // Install dependencies for SSR
  console.log('Installing dependencies for SSR...');
  try {
    // Make sure Rendering Server has the right dependencies
    execSync('cd RenderingServer && npm install react react-dom express', { stdio: 'inherit' });
    console.log('Dependencies installed successfully');
  } catch (error) {
    console.error('Error installing dependencies:', error.message);
    console.log('Please install the dependencies manually:');
    console.log('cd RenderingServer && npm install react react-dom express');
  }
  
  console.log('SSR environment setup complete!');
}

setupSSR().catch(error => {
  console.error('Error setting up SSR environment:', error);
  process.exit(1);
}); 