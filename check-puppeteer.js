#!/usr/bin/env node

import puppeteer from 'puppeteer';

async function checkPuppeteerInstallation() {
  console.log('Checking Puppeteer installation...');
  
  try {
    // Try to launch browser
    console.log('Attempting to launch Chrome...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    
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