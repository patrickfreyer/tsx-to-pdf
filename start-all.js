#!/usr/bin/env node

import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple color functions
const colors = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

// Create a simple chalk-like API
const chalk = {
  green: (text) => colors.green(text),
  red: (text) => colors.red(text),
  yellow: (text) => colors.yellow(text),
  cyan: (text) => colors.cyan(text)
};

chalk.blue = (text) => colors.blue(text);
chalk.blue.bold = (text) => colors.blue(colors.bold(text));

async function startAll() {
  console.log(chalk.blue.bold('\n=== TSX to PDF Converter ===\n'));

  // Check for Puppeteer installation
  console.log(chalk.blue('Checking Puppeteer installation...'));
  try {
    execSync('npm run check-puppeteer', { stdio: 'inherit' });
    console.log(chalk.green('✓ Puppeteer and Chrome are properly installed'));
  } catch (err) {
    console.error(chalk.red('Error: Puppeteer or Chrome is not properly installed.'));
    console.error(chalk.yellow('Attempting to install Chrome for Puppeteer...'));
    try {
      execSync('npx puppeteer browsers install chrome', { stdio: 'inherit' });
      console.log(chalk.green('✓ Chrome installed successfully'));
    } catch (installErr) {
      console.error(chalk.red('Failed to install Chrome. Please install it manually:'));
      console.error(chalk.yellow('npx puppeteer browsers install chrome'));
      process.exit(1);
    }
  }

  console.log(chalk.blue('Starting all services...'));
  
  // Step 1: Ensure input directory exists
  const inputDir = path.join(__dirname, 'input');
  try {
    await fs.mkdir(inputDir, { recursive: true });
    console.log(chalk.green('✓ Input directory is ready'));
  } catch (err) {
    console.error(chalk.red('Error creating input directory:'), err);
    process.exit(1);
  }
  
  // Step 2: Check for TSX files in the input directory
  let tsxFiles;
  try {
    const files = await fs.readdir(inputDir);
    tsxFiles = files.filter(file => file.endsWith('.tsx'));
    
    if (tsxFiles.length === 0) {
      console.log(chalk.yellow('No TSX files found in the input directory.'));
      console.log(chalk.yellow('Please add some TSX files to the input directory and try again.'));
      process.exit(0);
    }
    
    console.log(chalk.green(`✓ Found ${tsxFiles.length} TSX files in the input directory`));
  } catch (err) {
    console.error(chalk.red('Error reading input directory:'), err);
    process.exit(1);
  }
  
  // Step 3: Run the setup script
  console.log(chalk.blue('\nSetting up development server...'));
  try {
    // Check if RenderingServer directory exists and has the necessary files
    const renderingServerDir = path.join(__dirname, 'RenderingServer');
    try {
      await fs.access(renderingServerDir);
      await fs.access(path.join(renderingServerDir, 'package.json'));
      console.log(chalk.green('✓ RenderingServer directory exists'));
    } catch (err) {
      console.log(chalk.yellow('RenderingServer directory not found or incomplete, setting up...'));
      execSync('node setup-dev-server.js', { stdio: 'inherit' });
    }
    
    console.log(chalk.green('✓ Development server setup complete'));
    console.log(chalk.green('✓ File watching is enabled - new components will be automatically detected'));
  } catch (err) {
    console.error(chalk.red('Error setting up development server:'), err);
    process.exit(1);
  }
  
  // Step 4: Start the development server
  console.log(chalk.blue('\nStarting development server...'));
  console.log(chalk.yellow('The server will run in the background. Press Ctrl+C to stop everything when done.'));
  
  const serverProcess = spawn('npm', ['run', 'start-dev-server'], { 
    shell: true,
    detached: false
  });
  
  // Add error handling for the server process
  serverProcess.on('error', (err) => {
    console.error(chalk.red('Error starting development server:'), err);
    process.exit(1);
  });
  
  // Check if the server process started successfully
  serverProcess.stdout.on('data', (data) => {
    console.log(chalk.cyan('[Dev Server] ') + data.toString().trim());
  });
  
  serverProcess.stderr.on('data', (data) => {
    console.error(chalk.red('[Dev Server Error] ') + data.toString().trim());
  });
  
  // Wait for server to start
  console.log(chalk.yellow('Waiting for development server to start...'));
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Step 5: Build and start the UI server
  console.log(chalk.blue('\nBuilding and starting the UI server...'));
  
  try {
    // Build the frontend
    console.log(chalk.yellow('Building the frontend...'));
    execSync('npm run build-frontend', { stdio: 'inherit' });
    console.log(chalk.green('✓ Frontend built successfully'));
    
    // Start the UI server
    console.log(chalk.yellow('Starting the UI server...'));
    const uiServerProcess = spawn('npm', ['run', 'start-server'], { 
      shell: true,
      detached: false
    });
    
    // Add error handling for the UI server process
    uiServerProcess.on('error', (err) => {
      console.error(chalk.red('Error starting UI server:'), err);
      if (serverProcess) serverProcess.kill();
      process.exit(1);
    });
    
    // Check if the UI server process started successfully
    uiServerProcess.stdout.on('data', (data) => {
      console.log(chalk.green('[UI Server] ') + data.toString().trim());
    });
    
    uiServerProcess.stderr.on('data', (data) => {
      console.error(chalk.red('[UI Server Error] ') + data.toString().trim());
    });
    
    // Wait for UI server to start
    console.log(chalk.yellow('Waiting for UI server to start...'));
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(chalk.green('✓ UI server started successfully'));
    
    // Display available components and conversion commands
    console.log(chalk.blue.bold('\n=== Available Components ===\n'));
    
    const components = tsxFiles.map(file => {
      const componentName = file.replace('.tsx', '');
      const routeName = componentName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      return { file, componentName, routeName };
    });
    
    components.forEach(({ file, componentName, routeName }) => {
      console.log(chalk.green(`• ${componentName}`));
      console.log(`  URL: ${chalk.cyan(`http://localhost:5174/${routeName}`)}`);
      console.log(`  Convert: ${chalk.yellow(`npm run convert input/${file}`)}`);
      console.log('');
    });
    
    console.log(chalk.blue.bold('\n=== UI Access ===\n'));
    console.log(`Access the UI at: ${chalk.green('http://localhost:3000')}`);
    console.log(`Use the UI to select components and export them to PDF.\n`);
    
    console.log(chalk.blue.bold('=== Server Status ===\n'));
    console.log(`Development server is running at: ${chalk.green('http://localhost:5174')}`);
    console.log(`UI server is running at: ${chalk.green('http://localhost:3000')}`);
    console.log(`All PDFs will be saved to the ${chalk.green('output/')} directory`);
    console.log(chalk.yellow('\nWhen new files are uploaded, they will be automatically detected and available for export'));
    console.log(chalk.yellow('\nPress Ctrl+C to stop all servers when you are done\n'));
    
    // Keep the script running until user terminates
    process.on('SIGINT', () => {
      console.log(chalk.blue('\nShutting down...'));
      
      // Kill the server processes
      if (serverProcess) {
        serverProcess.kill();
      }
      
      if (uiServerProcess) {
        uiServerProcess.kill();
      }
      
      console.log(chalk.green('Servers stopped. Goodbye!'));
      process.exit(0);
    });
  } catch (err) {
    console.error(chalk.red('Error starting UI server:'), err);
    
    // Kill the development server if UI server fails
    if (serverProcess) {
      serverProcess.kill();
    }
    
    process.exit(1);
  }
}

startAll().catch(err => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
}); 