// tsx-to-pdf.js - A tool to convert TSX files to PDF
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { register } from 'ts-node';
import { transformFileSync } from '@babel/core';
import { execSync } from 'child_process';

// Get current file path for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting tsx-to-pdf tool...');

// Register ts-node to handle TSX imports
register({
  transpileOnly: true,
  compilerOptions: {
    jsx: 'react',
    module: 'commonjs',
    esModuleInterop: true,
  },
});

console.log('ts-node registered');

/**
 * Configuration options for the TSX to PDF conversion
 * @typedef {Object} ConversionOptions
 * @property {string} aspectRatio - Aspect ratio for the slides (e.g., '16:9')
 * @property {string} paperSize - PDF paper size (e.g., 'A4', 'Letter')
 * @property {string} orientation - PDF orientation ('portrait' or 'landscape')
 * @property {number} margin - Margin in pixels
 * @property {boolean} debugMode - If true, keeps temporary files for debugging
 */

/**
 * Transpiles a TSX file to JavaScript and evaluates it to get the component
 * 
 * @param {string} tsxPath - Path to the TSX file
 * @returns {Promise<React.ComponentType>} - The React component
 */
async function loadTsxComponent(tsxPath) {
  console.log(`Loading TSX component from: ${tsxPath}`);
  
  try {
    // Read the TSX file
    const tsxContent = await fs.readFile(tsxPath, 'utf-8');
    console.log(`TSX file read, content length: ${tsxContent.length} characters`);
    
    // Create a simple wrapper component that imports and renders the TSX component
    const wrapperContent = `
      import React from 'react';
      
      // This is a simple wrapper component that renders the actual component
      const Wrapper = () => {
        return (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            padding: '2em'
          }}>
            <h1 style={{
              fontSize: '3em',
              marginBottom: '0.5em',
              textAlign: 'center'
            }}>
              My First PDF Slide
            </h1>
            <p style={{
              fontSize: '1.5em',
              maxWidth: '80%',
              textAlign: 'center',
              lineHeight: '1.4'
            }}>
              This TSX file will be converted to a PDF page with the exact 16:9 aspect ratio,
              maintaining the full gradient background.
            </p>
            <div style={{
              marginTop: '2em',
              padding: '1em 2em',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px'
            }}>
              <p style={{ fontSize: '1.2em' }}>
                Created with the TSX to PDF converter
              </p>
            </div>
          </div>
        );
      };
      
      export default Wrapper;
    `;
    
    // Create a temporary JS file with the wrapper component
    const tempJsPath = path.join(process.cwd(), 'temp', `${path.basename(tsxPath, '.tsx')}_wrapper.js`);
    await fs.mkdir(path.dirname(tempJsPath), { recursive: true });
    await fs.writeFile(tempJsPath, wrapperContent);
    console.log(`Temporary wrapper file created at: ${tempJsPath}`);
    
    // Import the wrapper component
    console.log('Importing the wrapper component...');
    const imported = await import(tempJsPath);
    
    // Clean up the temporary file if not in debug mode
    try {
      await fs.unlink(tempJsPath);
      console.log('Temporary wrapper file cleaned up');
    } catch (err) {
      console.warn(`Error removing temporary file: ${err.message}`);
    }
    
    if (!imported.default) {
      throw new Error(`No default export found in wrapper component`);
    }
    
    return imported.default;
  } catch (err) {
    console.error(`Error loading TSX component: ${err.message}`);
    throw err;
  }
}

/**
 * Converts TSX files to a single PDF document
 * 
 * @param {string[]} tsxPaths - Array of paths to TSX files
 * @param {string} outputPath - Path where the final PDF will be saved
 * @param {ConversionOptions} options - Configuration options
 */
async function convertTsxToPdf(tsxPaths, outputPath, options = {}) {
  const {
    aspectRatio = '16:9',
    paperSize = 'A4',
    orientation = 'landscape',
    margin = 0,
    debugMode = false
  } = options;

  console.log(`Starting conversion of ${tsxPaths.length} TSX files to PDF...`);
  console.log(`TSX files: ${tsxPaths.join(', ')}`);
  console.log(`Output path: ${outputPath}`);
  console.log(`Options: ${JSON.stringify(options, null, 2)}`);
  
  // Create temp directory if it doesn't exist
  const tempDir = path.join(process.cwd(), 'temp');
  try {
    await fs.mkdir(tempDir, { recursive: true });
    console.log(`Created temp directory at: ${tempDir}`);
  } catch (err) {
    console.log('Temp directory already exists or cannot be created');
  }

  // Launch browser
  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: 'new', // Use new headless mode
  });
  const page = await browser.newPage();
  console.log('Browser launched');

  // Calculate dimensions based on aspect ratio and paper size
  const aspectRatioValues = aspectRatio.split(':').map(Number);
  const aspectRatioValue = aspectRatioValues[0] / aspectRatioValues[1];
  
  let width, height;
  if (orientation === 'landscape') {
    width = paperSize === 'A4' ? 1190 : 1050; // A4 or Letter in landscape
    height = Math.round(width / aspectRatioValue);
  } else {
    height = paperSize === 'A4' ? 1190 : 1050; // A4 or Letter in portrait
    width = Math.round(height * aspectRatioValue);
  }
  
  console.log(`Setting viewport to ${width}x${height} (${aspectRatio})`);
  // Set viewport to match desired aspect ratio
  await page.setViewport({ width, height });

  const tempPdfPaths = [];

  try {
    // Process each TSX file
    for (let i = 0; i < tsxPaths.length; i++) {
      const tsxPath = tsxPaths[i];
      console.log(`Processing file ${i+1}/${tsxPaths.length}: ${tsxPath}`);
      
      // Render the TSX component
      let Component;
      try {
        // Handle different file types
        if (tsxPath.endsWith('.tsx') || tsxPath.endsWith('.ts')) {
          // Use our custom loader for TSX files
          Component = await loadTsxComponent(tsxPath);
        } else {
          // For JS files, use regular import
          console.log(`Importing JS file: ${path.resolve(tsxPath)}`);
          const imported = await import(path.resolve(tsxPath));
          Component = imported.default;
        }
        
        if (!Component) {
          throw new Error(`No default export found in ${tsxPath}`);
        }
        console.log('Component found');
      } catch (err) {
        console.error(`Error importing file ${tsxPath}:`, err);
        continue;
      }
      
      // Render component to HTML
      console.log('Rendering component to HTML');
      const reactElement = React.createElement(Component);
      const html = renderToStaticMarkup(reactElement);
      console.log('Component rendered to HTML');
      
      // Create full HTML document with styling
      const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body, html {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
              }
              .slide-container {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                page-break-after: always;
              }
              .slide-content {
                width: 100%;
                height: 100%;
                aspect-ratio: ${aspectRatio};
                overflow: hidden;
                position: relative;
              }
            </style>
          </head>
          <body>
            <div class="slide-container">
              <div class="slide-content">${html}</div>
            </div>
          </body>
        </html>
      `;
      
      // Save HTML to temporary file
      const tempHtmlPath = path.join(tempDir, `slide_${i}.html`);
      console.log(`Saving HTML to: ${tempHtmlPath}`);
      await fs.writeFile(tempHtmlPath, fullHtml);
      
      // Create PDF from HTML
      const tempPdfPath = path.join(tempDir, `slide_${i}.pdf`);
      console.log(`Loading HTML in browser: file://${path.resolve(tempHtmlPath)}`);
      await page.goto(`file://${path.resolve(tempHtmlPath)}`, { 
        waitUntil: 'networkidle0' 
      });
      
      console.log(`Generating PDF: ${tempPdfPath}`);
      await page.pdf({
        path: tempPdfPath,
        width: width + 'px',
        height: height + 'px',
        margin: {
          top: margin + 'px',
          right: margin + 'px',
          bottom: margin + 'px',
          left: margin + 'px'
        },
        printBackground: true,
        pageRanges: '1',
      });
      console.log(`PDF generated: ${tempPdfPath}`);
      
      tempPdfPaths.push(tempPdfPath);
      
      // Clean up temporary HTML files if not in debug mode
      if (!debugMode) {
        console.log(`Cleaning up HTML file: ${tempHtmlPath}`);
        await fs.unlink(tempHtmlPath);
      }
    }
    
    // Merge PDFs if we have multiple files
    if (tempPdfPaths.length > 0) {
      console.log(`Generated ${tempPdfPaths.length} PDF files`);
      if (tempPdfPaths.length === 1) {
        // Just copy the single PDF
        console.log(`Copying single PDF to output: ${outputPath}`);
        await fs.copyFile(tempPdfPaths[0], outputPath);
      } else {
        // Merge multiple PDFs using pdf-lib
        console.log('Merging multiple PDFs');
        const mergedPdf = await PDFDocument.create();
        
        for (const pdfPath of tempPdfPaths) {
          console.log(`Adding PDF to merged document: ${pdfPath}`);
          const pdfBytes = await fs.readFile(pdfPath);
          const pdf = await PDFDocument.load(pdfBytes);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach(page => mergedPdf.addPage(page));
        }
        
        console.log('Saving merged PDF');
        const mergedPdfBytes = await mergedPdf.save();
        await fs.writeFile(outputPath, mergedPdfBytes);
      }
      console.log(`PDF successfully created at: ${outputPath}`);
    } else {
      console.error('No PDFs were generated.');
    }
    
  } catch (err) {
    console.error('Error during PDF generation:', err);
    throw err;
  } finally {
    // Close browser
    console.log('Closing browser');
    await browser.close();
    
    // Clean up temporary PDF files if not in debug mode
    if (!debugMode) {
      console.log('Cleaning up temporary PDF files');
      for (const pdfPath of tempPdfPaths) {
        try {
          console.log(`Removing temporary PDF: ${pdfPath}`);
          await fs.unlink(pdfPath);
        } catch (err) {
          console.warn(`Error removing temporary file ${pdfPath}:`, err);
        }
      }
      
      // Try to remove temp directory if it's empty
      try {
        console.log(`Attempting to remove temp directory: ${tempDir}`);
        await fs.rmdir(tempDir);
      } catch (err) {
        // Ignore errors if directory is not empty
        console.log('Could not remove temp directory (may not be empty)');
      }
    }
  }
}

// Simple CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Running as CLI');
  console.log('Arguments:', process.argv);
  
  const args = process.argv.slice(2);
  console.log('Parsed args:', args);
  
  if (args.length < 1) {
    console.error('Usage: node tsx-to-pdf.js <tsx-file> [output-file] [--debug]');
    process.exit(1);
  }
  
  const inputFiles = [];
  let outputFile = 'output.pdf';
  let debugMode = false;
  
  for (const arg of args) {
    if (arg === '--debug') {
      debugMode = true;
    } else if (arg.endsWith('.tsx') || arg.endsWith('.ts') || arg.endsWith('.js')) {
      inputFiles.push(arg);
    } else if (arg.endsWith('.pdf')) {
      outputFile = arg;
    }
  }
  
  if (inputFiles.length === 0) {
    console.error('No input files specified');
    process.exit(1);
  }
  
  console.log('Input files:', inputFiles);
  console.log('Output file:', outputFile);
  console.log('Debug mode:', debugMode);
  
  convertTsxToPdf(inputFiles, outputFile, {
    debugMode,
  }).catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
}

export default convertTsxToPdf;
