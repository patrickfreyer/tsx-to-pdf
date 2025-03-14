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
    
    // DIRECT PATH: Use the exact path we know Chrome is installed at from the error message
    const exactChromePath = '/home/runner/.cache/puppeteer/chrome/linux-133.0.6943.126/chrome-linux64/chrome';
    if (existsSync(exactChromePath)) {
      console.log(`Found Chrome at exact path: ${exactChromePath}`);
      
      // Check if the file is executable
      try {
        execSync(`test -x "${exactChromePath}"`);
        console.log('Chrome is executable');
      } catch (err) {
        console.log('Chrome exists but is not executable, attempting to make it executable');
        try {
          execSync(`chmod +x "${exactChromePath}"`);
          console.log('Successfully made Chrome executable');
        } catch (chmodErr) {
          console.log(`Failed to make Chrome executable: ${chmodErr.message}`);
        }
      }
      
      return exactChromePath;
    }
    
    // Common Chrome paths in Replit
    const replitPaths = [
      '/home/runner/.cache/puppeteer/chrome/linux-*/chrome-linux*/chrome',
      '/nix/store/*/chromium-*/bin/chromium',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/usr/bin/google-chrome'
    ];
    
    // Try to find Chrome in Replit paths
    for (const chromePath of replitPaths) {
      if (chromePath.includes('*')) {
        // Handle wildcard paths
        try {
          // Get the parent directory
          const parentDir = path.dirname(chromePath.split('*')[0]);
          if (existsSync(parentDir)) {
            // Use find command for more reliable wildcard path resolution
            const findCmd = `find ${parentDir} -path "${chromePath}" -type f 2>/dev/null`;
            console.log(`Executing find command: ${findCmd}`);
            
            try {
              const foundPaths = execSync(findCmd).toString().trim().split('\n');
              if (foundPaths.length > 0 && foundPaths[0]) {
                const foundPath = foundPaths[0];
                console.log(`Found Chrome using find command: ${foundPath}`);
                
                // Check if executable and try to make it executable if not
                try {
                  execSync(`test -x "${foundPath}"`);
                } catch (err) {
                  console.log(`Chrome exists but is not executable, attempting to make it executable: ${foundPath}`);
                  try {
                    execSync(`chmod +x "${foundPath}"`);
                    console.log('Successfully made Chrome executable');
                  } catch (chmodErr) {
                    console.log(`Failed to make Chrome executable: ${chmodErr.message}`);
                  }
                }
                
                return foundPath;
              }
            } catch (findErr) {
              console.log(`Error executing find command: ${findErr.message}`);
            }
            
            // Fallback to directory listing if find command fails
            try {
              const dirs = await fs.readdir(parentDir);
              for (const dir of dirs) {
                const fullPath = chromePath.replace('*', dir).replace('*', '');
                if (existsSync(fullPath)) {
                  console.log(`Found Chrome in Replit at: ${fullPath}`);
                  return fullPath;
                }
              }
            } catch (err) {
              console.log(`Error checking wildcard path ${chromePath}: ${err.message}`);
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
      console.log(`Using Chrome executable path: ${executablePath}`);
    } else {
      console.log('No Chrome executable path found, letting Puppeteer try to find Chrome');
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
    
    // Special handling for Replit environment
    if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
      console.error('\nReplit-specific troubleshooting:');
      console.error('1. Chrome path issues in Replit are common due to its containerized environment');
      console.error('2. Try setting PUPPETEER_EXECUTABLE_PATH in the Secrets tab in Replit');
      console.error('3. The exact Chrome path should be: /home/runner/.cache/puppeteer/chrome/linux-133.0.6943.126/chrome-linux64/chrome');
      console.error('4. Check if Chrome is executable: chmod +x /home/runner/.cache/puppeteer/chrome/linux-133.0.6943.126/chrome-linux64/chrome');
    }
    
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