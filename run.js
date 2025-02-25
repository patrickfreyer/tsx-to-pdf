#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn, execSync } from 'child_process';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if chalk is installed, if not install it
try {
  require.resolve('chalk');
} catch (e) {
  console.log('Installing required dependencies...');
  execSync('npm install chalk', { stdio: 'inherit' });
  console.log('Dependencies installed successfully.');
}

async function run() {
  console.log(chalk.blue.bold('\n=== TSX to PDF Converter ===\n'));
  
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
    execSync('./setup-dev-server.js', { stdio: 'inherit' });
    console.log(chalk.green('✓ Development server setup complete'));
  } catch (err) {
    console.error(chalk.red('Error setting up development server:'), err);
    process.exit(1);
  }
  
  // Step 4: Start the development server
  console.log(chalk.blue('\nStarting development server...'));
  console.log(chalk.yellow('The server will run in the background. Press Ctrl+C to stop everything when done.'));
  
  const serverProcess = spawn('npm', ['run', 'dev'], { 
    cwd: path.join(__dirname, 'dev-server'),
    shell: true,
    detached: false
  });
  
  // Wait for server to start
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
    
    // Wait for UI server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(chalk.green('✓ UI server started successfully'));
    
    // Process component files to get their routes
    const components = tsxFiles.map(file => {
      const componentName = file.replace('.tsx', '');
      const routeName = componentName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      return { file, componentName, routeName };
    });
    
    // Display available components and conversion commands
    console.log(chalk.blue.bold('\n=== Available Components ===\n'));
    
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

run().catch(err => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
}); 