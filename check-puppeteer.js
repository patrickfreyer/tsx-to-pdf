#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

/**
 * Find the Chrome executable path across different environments
 * @returns {string|null} The path to Chrome executable or null if not found
 */
async function findChromePath() {
  console.log('Attempting to find Chrome executable path...');
  
  // Check environment variable first (highest priority)
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    console.log(`Using Chrome path from PUPPETEER_EXECUTABLE_PATH: ${process.env.PUPPETEER_EXECUTABLE_PATH}`);
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  
  // Check if running in Replit
  const isReplit = process.env.REPL_SLUG && process.env.REPL_OWNER;
  if (isReplit) {
    console.log('Detected Replit environment, checking Replit-specific paths');
    
    // Common Chrome paths in Replit
    const replitPaths = [
      '/nix/store/x205pbkd5xh5g4iv0n41nvpy7wp1wr8w-chromium-108.0.5359.94/bin/chromium',
      '/nix/store/hy65mn4w9whf10f2w1q08v727h0rryjw-chromium-112.0.5615.49/bin/chromium',
      '/home/runner/.cache/puppeteer/chrome/linux-*/chrome-linux*/chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium'
    ];
    
    // Try to find Chrome in Replit paths
    for (const chromePath of replitPaths) {
      if (chromePath.includes('*')) {
        // Handle wildcard paths
        try {
          // Get the parent directory
          const parentDir = path.dirname(chromePath.split('*')[0]);
          if (existsSync(parentDir)) {
            // List all subdirectories
            const dirs = await fs.readdir(parentDir);
            for (const dir of dirs) {
              const fullPath = chromePath.replace('*', dir).replace('*', '');
              if (existsSync(fullPath)) {
                console.log(`Found Chrome in Replit at: ${fullPath}`);
                return fullPath;
              }
            }
          }
        } catch (err) {
          console.log(`Error checking wildcard path ${chromePath}: ${err.message}`);
        }
      } else if (existsSync(chromePath)) {
        console.log(`Found Chrome in Replit at: ${chromePath}`);
        return chromePath;
      }
    }
    
    // Try to find using which command
    try {
      const chromiumPath = execSync('which chromium-browser || which chromium || which google-chrome').toString().trim();
      if (chromiumPath) {
        console.log(`Found Chrome using 'which' command: ${chromiumPath}`);
        return chromiumPath;
      }
    } catch (err) {
      console.log('Chrome not found using which command');
    }
  }
  
  // Check common paths based on OS
  const platform = process.platform;
  let paths = [];
  
  if (platform === 'darwin') {
    // macOS paths
    paths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
      '/Applications/Chromium.app/Contents/MacOS/Chromium'
    ];
  } else if (platform === 'win32') {
    // Windows paths
    const programFiles = process.env.PROGRAMFILES || 'C:\\Program Files';
    const programFilesX86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)';
    
    paths = [
      `${programFiles}\\Google\\Chrome\\Application\\chrome.exe`,
      `${programFilesX86}\\Google\\Chrome\\Application\\chrome.exe`,
      `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`
    ];
  } else {
    // Linux paths
    paths = [
      '/usr/bin/google-chrome',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium'
    ];
  }
  
  // Check if any of the paths exist
  for (const chromePath of paths) {
    if (existsSync(chromePath)) {
      console.log(`Found Chrome at: ${chromePath}`);
      return chromePath;
    }
  }
  
  // Last resort: let Puppeteer try to find Chrome itself
  console.log('Could not find Chrome executable, will let Puppeteer try to find it');
  return null;
}

async function checkPuppeteerInstallation() {
  console.log('Checking Puppeteer installation...');
  
  try {
    // Find Chrome executable path
    const executablePath = await findChromePath();
    
    // Configure browser launch options
    const launchOptions = {
      headless: 'new', // Use new headless mode
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ],
      ignoreDefaultArgs: ['--disable-extensions'],
    };
    
    // Add executable path if found
    if (executablePath) {
      launchOptions.executablePath = executablePath;
    }
    
    console.log(`Browser launch options: ${JSON.stringify(launchOptions, null, 2)}`);
    
    // Try to launch browser
    console.log('Attempting to launch Chrome...');
    const browser = await puppeteer.launch(launchOptions);
    
    // Get browser version
    const version = await browser.version();
    console.log(`✅ Success! Chrome is installed and working properly.`);
    console.log(`Chrome version: ${version}`);
    
    // Close browser
    await browser.close();
    console.log('Browser closed successfully.');
    
    return true;
  } catch (error) {
    console.error('❌ Error: Failed to launch Chrome.');
    console.error(error.message);
    console.error('\nTroubleshooting steps:');
    console.error('1. Make sure Chrome is installed by running: npx puppeteer browsers install chrome');
    console.error('2. Check if your environment has the necessary dependencies for Chrome.');
    console.error('3. If running in a container or CI environment, make sure to use --no-sandbox flag.');
    console.error('4. If running in Replit, try setting PUPPETEER_EXECUTABLE_PATH environment variable.');
    console.error('\nFor more information, visit: https://pptr.dev/guides/troubleshooting');
    
    return false;
  }
}

// Run the check
checkPuppeteerInstallation().then(success => {
  if (!success) {
    process.exit(1);
  }
}); 