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
 * Extracts style information from a TSX file
 * 
 * @param {string} tsxContent - The content of the TSX file
 * @returns {Object} - An object containing extracted style information
 */
function extractStylesFromTsx(tsxContent) {
  // This is a simplified approach - in a real implementation,
  // you would need to properly parse the TSX code
  
  // Extract background color or gradient
  let background = '#ffffff';
  const bgMatch = tsxContent.match(/background:\s*['"]([^'"]+)['"]/);
  if (bgMatch) {
    background = bgMatch[1];
  }
  
  // Extract text color
  let color = '#000000';
  const colorMatch = tsxContent.match(/color:\s*['"]([^'"]+)['"]/);
  if (colorMatch) {
    color = colorMatch[1];
  }
  
  // Extract title
  let title = '';
  const h1Match = tsxContent.match(/<h1[^>]*>(.*?)<\/h1>/s);
  if (h1Match) {
    title = h1Match[1].trim();
  }
  
  // Extract paragraph text
  let paragraph = '';
  const pMatch = tsxContent.match(/<p[^>]*>(.*?)<\/p>/s);
  if (pMatch) {
    paragraph = pMatch[1].trim();
  }
  
  return {
    background,
    color,
    title,
    paragraph
  };
}

/**
 * Builds a TSX file into a JavaScript bundle
 * 
 * @param {string} tsxPath - Path to the TSX file
 * @param {string} outputDir - Directory to output the bundle
 * @returns {Promise<{componentName: string, componentUrl: string}>} - Component name and URL
 */
async function buildTsxFile(tsxPath, outputDir) {
  console.log(`Processing TSX file: ${tsxPath}`);
  
  // Get the component name from the file name
  const componentName = path.basename(tsxPath, path.extname(tsxPath));
  
  // Assuming the component is available at localhost:5174/ComponentName
  // This assumes your development server is running and serving the components
  const componentUrl = `http://localhost:5174/${componentName}`;
  console.log(`Component URL: ${componentUrl}`);
  
  return { componentName, componentUrl };
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
  
  // Ensure output path is in the output directory
  let finalOutputPath = outputPath;
  if (!finalOutputPath.startsWith('output/') && !path.isAbsolute(finalOutputPath)) {
    finalOutputPath = path.join('output', finalOutputPath);
  }
  
  const {
    aspectRatio = '16:9',
    paperSize = 'A4',
    orientation = 'landscape',
    margin = 0,
    debugMode = false
  } = options;

  console.log(`Starting conversion of ${tsxPathsArray.length} TSX files to PDF...`);
  console.log(`TSX files: ${tsxPathsArray.join(', ')}`);
  console.log(`Output path: ${finalOutputPath}`);
  console.log(`Options: ${JSON.stringify(options, null, 2)}`);
  
  // Set debug mode environment variable
  if (debugMode) {
    process.env.DEBUG = 'true';
  }
  
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(finalOutputPath);
  await fs.mkdir(outputDir, { recursive: true });
  console.log(`Ensuring output directory exists: ${outputDir}`);
  
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
        // Get the component URL
        const { componentName, componentUrl } = await buildTsxFile(tsxPath);
        
        // Create PDF from the component URL
        const tempPdfPath = path.join(tempDir, `slide_${i}.pdf`);
        console.log(`Loading component in browser: ${componentUrl}`);
        
        // Navigate to the component URL
        await page.goto(componentUrl, { 
          waitUntil: 'networkidle0',
          timeout: 60000 // Increase timeout to 60 seconds
        });
        
        // Wait for the component to be fully rendered
        await page.waitForSelector('#root > *', { timeout: 10000 });
        
        // Optional: Wait a bit more to ensure all animations and resources are loaded
        // Use setTimeout instead of waitForTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
        console.log(`Copying single PDF to output: ${finalOutputPath}`);
        await fs.copyFile(tempPdfPaths[0], finalOutputPath);
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
        await fs.writeFile(finalOutputPath, mergedPdfBytes);
      }
      console.log(`PDF successfully created at: ${finalOutputPath}`);
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