import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration options for the conversion process
 * 
 * @typedef {Object} ConversionOptions
 * @property {number} width - Width of the output in pixels
 * @property {string} widthPreset - Preset name for width (e.g., 'iPhone', 'A4', 'MacBook')
 * @property {number} margin - Page margin in pixels
 * @property {boolean} autoSize - Whether to automatically size the content
 * @property {boolean} debugMode - Whether to enable debug mode
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
  const fileName = path.basename(tsxPath, path.extname(tsxPath));
  
  // Convert kebab-case to PascalCase for the route
  const componentName = fileName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
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
  // Debug: Log the raw options object
  console.log('Raw options object:', options);
  console.log('Options type:', typeof options);
  console.log('Width type:', typeof options.width);
  console.log('Width value:', options.width);
  
  // Ensure tsxPaths is an array
  const tsxPathsArray = Array.isArray(tsxPaths) ? tsxPaths : [tsxPaths];
  
  // Ensure output path is in the output directory
  let finalOutputPath = outputPath;
  if (!finalOutputPath.startsWith('output/') && !path.isAbsolute(finalOutputPath)) {
    finalOutputPath = path.join('output', finalOutputPath);
  }
  
  // Parse options and ensure width is a number
  const widthValue = options.width !== undefined ? parseInt(options.width, 10) : 390;
  
  const {
    width = widthValue, // Use parsed width or default to iPhone width
    widthPreset = 'iPhone',
    margin = 0,
    autoSize = true,
    debugMode = false
  } = options;

  console.log(`Starting conversion of ${tsxPathsArray.length} TSX files to PDF...`);
  console.log(`TSX files: ${tsxPathsArray.join(', ')}`);
  console.log(`Output path: ${finalOutputPath}`);
  console.log(`Options received: ${JSON.stringify(options, null, 2)}`);
  console.log(`Parsed width: ${widthValue}, Final width: ${width}, Width preset: ${widthPreset}`);
  
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

  // Calculate dimensions based on width
  // We'll use a dynamic height that fits the content
  let viewportWidth = parseInt(width, 10); // Ensure width is a number
  if (isNaN(viewportWidth) || viewportWidth <= 0) {
    console.warn(`Invalid width value: ${width}, using default of 390`);
    viewportWidth = 390; // Default to iPhone width if invalid
  }
  
  let viewportHeight = Math.round(viewportWidth * 1.5); // Default height ratio of 1.5x width
  
  console.log(`Setting initial viewport to ${viewportWidth}x${viewportHeight}`);
  
  // Set viewport to match desired width
  await page.setViewport({ width: viewportWidth, height: viewportHeight });

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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate PDF
        if (autoSize) {
          try {
            // First, ensure we scroll through the entire page to load all content
            await page.evaluate(async () => {
              // Scroll to the bottom of the page to ensure all content is loaded
              await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                  const scrollHeight = document.body.scrollHeight;
                  window.scrollBy(0, distance);
                  totalHeight += distance;
                  
                  if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    window.scrollTo(0, 0); // Scroll back to top
                    resolve();
                  }
                }, 100);
              });
            });
            
            // Wait a moment for any post-scroll rendering to complete
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Get the dimensions of the content with a more precise calculation
            const dimensions = await page.evaluate(() => {
              // First approach: Get the root element's content
              const rootElement = document.querySelector('#root > *');
              
              if (rootElement) {
                // Get all elements in the document to find the true content boundaries
                const allElements = Array.from(document.querySelectorAll('*'));
                let maxBottom = 0;
                let maxRight = 0;
                let minTop = Infinity;
                let minLeft = Infinity;
                
                // Check all elements to find the true boundaries of content
                allElements.forEach(el => {
                  // Only consider elements that are actually visible and rendered
                  if (el.offsetParent !== null && 
                      window.getComputedStyle(el).display !== 'none' && 
                      window.getComputedStyle(el).visibility !== 'hidden') {
                    const rect = el.getBoundingClientRect();
                    
                    // Only consider elements that have actual dimensions
                    if (rect.width > 0 && rect.height > 0) {
                      maxRight = Math.max(maxRight, rect.right + window.scrollX);
                      maxBottom = Math.max(maxBottom, rect.bottom + window.scrollY);
                      minLeft = Math.min(minLeft, rect.left + window.scrollX);
                      minTop = Math.min(minTop, rect.top + window.scrollY);
                    }
                  }
                });
                
                // If we found valid dimensions
                if (maxRight > 0 && maxBottom > 0 && minLeft < Infinity && minTop < Infinity) {
                  // Calculate width and height accounting for the actual content boundaries
                  const width = maxRight - minLeft;
                  const height = maxBottom - minTop;
                  
                  return {
                    width: Math.ceil(width),
                    height: Math.ceil(height),
                    method: 'absoluteContentBounds',
                    details: {
                      minLeft, minTop, maxRight, maxBottom,
                      viewportWidth: window.innerWidth,
                      viewportHeight: window.innerHeight,
                      scrollX: window.scrollX,
                      scrollY: window.scrollY
                    }
                  };
                }
              }
              
              // Fallback to document dimensions if no valid content found
              const body = document.body;
              const html = document.documentElement;
              
              const width = Math.max(
                body.scrollWidth,
                body.offsetWidth,
                html.clientWidth,
                html.scrollWidth,
                html.offsetWidth
              );
              
              const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
              );
              
              return { 
                width, 
                height,
                method: 'documentDimensions'
              };
            });
            
            console.log(`Content dimensions: ${dimensions.width}x${dimensions.height} (method: ${dimensions.method})`);
            if (dimensions.details) {
              console.log(`Content bounds details:`, dimensions.details);
            }
            
            // Use the content dimensions for the PDF, but ensure minimum width is respected
            const pdfWidth = Math.max(dimensions.width, viewportWidth);
            const pdfHeight = dimensions.height;
            
            console.log(`Using content-based dimensions for PDF: ${pdfWidth}x${pdfHeight}`);
            
            await page.pdf({
              path: tempPdfPath,
              width: `${pdfWidth}px`,
              height: `${pdfHeight}px`,
              margin: {
                top: `${margin}px`,
                right: `${margin}px`,
                bottom: `${margin}px`,
                left: `${margin}px`,
              },
              printBackground: true,
            });
          } catch (error) {
            console.error('Error determining content dimensions:', error);
            // Fallback to default dimensions if content dimensions couldn't be determined
            console.log(`Using default dimensions for PDF: ${viewportWidth}x${viewportHeight}`);
            await page.pdf({
              path: tempPdfPath,
              width: `${viewportWidth}px`,
              height: `${viewportHeight}px`,
              margin: {
                top: `${margin}px`,
                right: `${margin}px`,
                bottom: `${margin}px`,
                left: `${margin}px`,
              },
              printBackground: true,
            });
          }
        } else {
          // Use fixed dimensions based on viewport
          console.log(`Using fixed dimensions for PDF: ${viewportWidth}x${viewportHeight}`);
          await page.pdf({
            path: tempPdfPath,
            width: `${viewportWidth}px`,
            height: `${viewportHeight}px`,
            margin: {
              top: `${margin}px`,
              right: `${margin}px`,
              bottom: `${margin}px`,
              left: `${margin}px`,
            },
            printBackground: true,
          });
        }
        
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