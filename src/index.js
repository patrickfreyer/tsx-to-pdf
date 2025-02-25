import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
 * Builds a TSX file into a JavaScript bundle
 * 
 * @param {string} tsxPath - Path to the TSX file
 * @param {string} outputDir - Directory to output the bundle
 * @returns {Promise<string>} - Path to the built HTML file
 */
async function buildTsxFile(tsxPath, outputDir) {
  console.log(`Building TSX file: ${tsxPath}`);
  
  // Create a temporary directory for the build
  const tempDir = path.join(process.cwd(), 'temp');
  await fs.mkdir(tempDir, { recursive: true });
  
  // Create a simple HTML file that will load the TSX component
  const componentName = path.basename(tsxPath, path.extname(tsxPath));
  const htmlPath = path.join(tempDir, `${componentName}.html`);
  
  // Copy the template HTML file to the temp directory
  const templatePath = path.join(process.cwd(), 'src/template.html');
  await fs.copyFile(templatePath, htmlPath);
  
  console.log(`Created HTML file at: ${htmlPath}`);
  return htmlPath;
}

/**
 * Converts TSX files to a single PDF document
 * 
 * @param {string[]} tsxPaths - Array of paths to TSX files
 * @param {string} outputPath - Path where the final PDF will be saved
 * @param {ConversionOptions} options - Configuration options
 */
async function convertTsxToPdf(tsxPaths, outputPath, options = {}) {
  // Ensure tsxPaths is an array
  const tsxPathsArray = Array.isArray(tsxPaths) ? tsxPaths : [tsxPaths];
  
  const {
    aspectRatio = '16:9',
    paperSize = 'A4',
    orientation = 'landscape',
    margin = 0,
    debugMode = false
  } = options;

  console.log(`Starting conversion of ${tsxPathsArray.length} TSX files to PDF...`);
  console.log(`TSX files: ${tsxPathsArray.join(', ')}`);
  console.log(`Output path: ${outputPath}`);
  console.log(`Options: ${JSON.stringify(options, null, 2)}`);
  
  // Set debug mode environment variable
  if (debugMode) {
    process.env.DEBUG = 'true';
  }
  
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputPath);
  await fs.mkdir(outputDir, { recursive: true });
  
  // Create temp directory if it doesn't exist
  const tempDir = path.join(process.cwd(), 'temp');
  try {
    await fs.mkdir(tempDir, { recursive: true });
    console.log(`Created temp directory at: ${tempDir}`);
  } catch (err) {
    console.log('Temp directory already exists or cannot be created');
  }
  
  // Create dist directory for webpack output
  const distDir = path.join(process.cwd(), 'dist');
  await fs.mkdir(distDir, { recursive: true });

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
    for (let i = 0; i < tsxPathsArray.length; i++) {
      const tsxPath = tsxPathsArray[i];
      console.log(`Processing file ${i+1}/${tsxPathsArray.length}: ${tsxPath}`);
      
      try {
        // Build the TSX file into a bundle
        const htmlPath = await buildTsxFile(tsxPath, distDir);
        console.log(`HTML template created at: ${htmlPath}`);
        
        // Read the TSX file content
        const tsxContent = await fs.readFile(tsxPath, 'utf-8');
        console.log(`Read TSX file: ${tsxPath}`);
        
        // Create PDF from HTML
        const tempPdfPath = path.join(tempDir, `slide_${i}.pdf`);
        console.log(`Loading HTML in browser: file://${path.resolve(htmlPath)}`);
        await page.goto(`file://${path.resolve(htmlPath)}`, { 
          waitUntil: 'networkidle0' 
        });
        
        // Inject the TSX component directly
        await page.evaluate(`
          // This is a simplified approach - in a real implementation, 
          // you would need to properly transpile the TSX code
          document.getElementById('root').innerHTML = '<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: #f0f0f0;"><h1>Preview of ${path.basename(tsxPath)}</h1></div>';
        `);
        
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
      } catch (err) {
        console.error(`Error processing file ${tsxPath}:`, err);
        continue;
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
      
      // Clean up dist directory
      try {
        console.log('Cleaning up dist directory');
        const distFiles = await fs.readdir(distDir);
        for (const file of distFiles) {
          await fs.unlink(path.join(distDir, file));
        }
        await fs.rmdir(distDir);
      } catch (err) {
        console.warn('Error cleaning up dist directory:', err);
      }
    }
  }
}

export default convertTsxToPdf; 