import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Converts TSX components to PDF using Vite SSR rather than Puppeteer
 * 
 * @param {string[]} tsxPaths - Array of paths to TSX files
 * @param {string} outputPath - Path where the final PDF will be saved
 * @param {Object} options - Configuration options
 */
export async function convertTsxToPdfWithSSR(tsxPaths, outputPath, options = {}) {
  console.log('Starting TSX to PDF conversion using Server-Side Rendering...');
  
  // Ensure tsxPaths is an array
  const tsxPathsArray = Array.isArray(tsxPaths) ? tsxPaths : [tsxPaths];
  
  // Ensure output path is in the output directory
  let finalOutputPath = outputPath;
  if (!finalOutputPath.startsWith('output/') && !path.isAbsolute(finalOutputPath)) {
    finalOutputPath = path.join('output', finalOutputPath);
  }
  
  // Parse options and set defaults
  const {
    width = 390,
    widthPreset = 'iPhone',
    margin = 0,
    autoSize = true,
    debugMode = false
  } = options;

  console.log(`Starting conversion of ${tsxPathsArray.length} TSX files to PDF...`);
  console.log(`TSX files: ${tsxPathsArray.join(', ')}`);
  console.log(`Output path: ${finalOutputPath}`);
  console.log(`Options received:`, options);
  
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(finalOutputPath);
  await fs.mkdir(outputDir, { recursive: true });
  
  // Create temp directory if it doesn't exist
  const tempDir = path.join(process.cwd(), 'temp');
  await fs.mkdir(tempDir, { recursive: true });
  
  // Path to RenderingServer directory
  const renderingServerDir = path.join(process.cwd(), 'RenderingServer');
  
  // Path to the entry-server.js file we'll create
  const entryServerPath = path.join(renderingServerDir, 'src', 'entry-server.js');
  
  // Create an entry-server.js file if it doesn't exist
  if (!existsSync(entryServerPath)) {
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
  
  // Start a Vite server in SSR mode
  console.log('Starting Vite SSR server...');
  const vite = await createServer({
    root: renderingServerDir,
    server: { middlewareMode: true },
    appType: 'custom'
  });
  
  const tempPdfPaths = [];
  
  try {
    // Process each TSX file
    for (let i = 0; i < tsxPathsArray.length; i++) {
      const tsxPath = tsxPathsArray[i];
      console.log(`Processing file ${i+1}/${tsxPathsArray.length}: ${tsxPath}`);
      
      try {
        // Get the component name from the file path
        const fileName = path.basename(tsxPath, path.extname(tsxPath));
        const componentName = fileName
          .split('-')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join('');
        
        // Path to the component relative to the input directory
        const relativePath = path.relative(path.join(process.cwd(), 'input'), tsxPath);
        
        // Create SSR renderer
        const ssrModule = await vite.ssrLoadModule('/src/entry-server.js');
        
        // Import the component
        console.log(`Importing component: ${componentName}`);
        const componentModule = await vite.ssrLoadModule(`/src/components/${componentName}.jsx`);
        
        if (!componentModule.default) {
          console.log(`Creating temporary component file for: ${componentName}`);
          
          // Read the original TSX file
          const tsxContent = await fs.readFile(tsxPath, 'utf-8');
          
          // Create a temporary component file
          const tempComponentPath = path.join(renderingServerDir, 'src', 'components', `${componentName}.jsx`);
          await fs.mkdir(path.dirname(tempComponentPath), { recursive: true });
          
          // Rewrite the TSX as JSX for the temporary component
          await fs.writeFile(tempComponentPath, `
            import React from 'react';
            
            export default function ${componentName}() {
              ${tsxContent.includes('export default') ? 
                '// Using original export default' : 
                `return (
                  <div style={{ width: "${width}px", margin: "0 auto" }}>
                    ${tsxContent}
                  </div>
                );`
              }
            }
          `);
          
          // Try to load the component again
          const reloadedModule = await vite.ssrLoadModule(`/src/components/${componentName}.jsx`);
          if (reloadedModule.default) {
            console.log(`Successfully created and loaded temporary component: ${componentName}`);
          } else {
            throw new Error(`Failed to create temporary component: ${componentName}`);
          }
        }
        
        // Render the component to HTML
        console.log(`Rendering component: ${componentName}`);
        const html = ssrModule.render(componentModule.default);
        
        // Create a full HTML document with the rendered component
        const fullHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>${componentName}</title>
              <style>
                body, html {
                  margin: 0;
                  padding: 0;
                  width: ${width}px;
                }
              </style>
            </head>
            <body>
              <div id="root">${html}</div>
            </body>
          </html>
        `;
        
        // Save the HTML to a temporary file
        const tempHtmlPath = path.join(tempDir, `${componentName}.html`);
        await fs.writeFile(tempHtmlPath, fullHtml);
        
        // Convert HTML to PDF using html-pdf-node library (needs to be installed)
        console.log(`Converting HTML to PDF: ${componentName}`);
        
        const tempPdfPath = path.join(tempDir, `slide_${i}.pdf`);
        
        try {
          // Use our HTML-to-PDF conversion function
          await convertHtmlToPdf(tempHtmlPath, tempPdfPath, {
            width,
            margin
          });
        } catch (pdfError) {
          console.error(`Error converting HTML to PDF for ${componentName}:`, pdfError);
          
          // Fall back to basic PDF with PDF-Lib
          console.log('Falling back to basic PDF creation');
          const pdfDoc = await PDFDocument.create();
          const page = pdfDoc.addPage([width, width * 1.5]);
          
          // Use a standard font
          const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
          
          page.drawText(`Rendered component: ${componentName}`, {
            x: 50,
            y: page.getHeight() - 50,
            size: 20,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
          
          const pdfBytes = await pdfDoc.save();
          await fs.writeFile(tempPdfPath, pdfBytes);
        }
        
        console.log(`PDF generated: ${tempPdfPath}`);
        tempPdfPaths.push(tempPdfPath);
      } catch (err) {
        console.error(`Error processing file ${tsxPath}:`, err);
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
    // Close Vite server
    await vite.close();
    
    // Clean up temporary files if not in debug mode
    if (!debugMode) {
      console.log('Cleaning up temporary files');
      for (const pdfPath of tempPdfPaths) {
        try {
          await fs.unlink(pdfPath);
        } catch (err) {
          console.warn(`Error removing temporary file ${pdfPath}:`, err);
        }
      }
      
      // Try to remove temp directory if it's empty
      try {
        await fs.rmdir(tempDir);
      } catch (err) {
        // Ignore errors if directory is not empty
        console.log('Could not remove temp directory (may not be empty)');
      }
    }
  }
  
  return finalOutputPath;
}

/**
 * Convert HTML to PDF using html-pdf or another method
 * 
 * @param {string} htmlPath - Path to the HTML file
 * @param {string} pdfPath - Path where the PDF should be saved
 * @param {Object} options - Configuration options
 * @returns {Promise<void>}
 */
async function convertHtmlToPdf(htmlPath, pdfPath, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const { width = 390 } = options;
      
      console.log(`Converting HTML to PDF: ${htmlPath} -> ${pdfPath}`);
      
      // Try to use html-pdf
      const htmlPdf = require('html-pdf');
      const html = fs.readFile(htmlPath, 'utf-8');
      
      const pdfOptions = {
        width: `${width}px`,
        height: `${width * 1.5}px`,
        border: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0'
        },
        type: 'pdf'
      };
      
      htmlPdf.create(html, pdfOptions).toFile(pdfPath, (err, res) => {
        if (err) {
          console.error('Error converting HTML to PDF with html-pdf:', err);
          // Fall back to basic PDF creation with pdf-lib
          createBasicPdf(htmlPath, pdfPath, options)
            .then(() => resolve())
            .catch(reject);
        } else {
          console.log('PDF created successfully with html-pdf');
          resolve();
        }
      });
    } catch (error) {
      console.error('Error in convertHtmlToPdf:', error);
      // Fall back to basic PDF creation with pdf-lib
      createBasicPdf(htmlPath, pdfPath, options)
        .then(() => resolve())
        .catch(reject);
    }
  });
}

/**
 * Create a basic PDF with just text when HTML conversion fails
 * 
 * @param {string} htmlPath - Path to the HTML file
 * @param {string} pdfPath - Path where the PDF should be saved
 * @param {Object} options - Configuration options
 * @returns {Promise<void>}
 */
async function createBasicPdf(htmlPath, pdfPath, options = {}) {
  try {
    const { width = 390 } = options;
    const height = width * 1.5;
    
    console.log('Creating basic PDF with pdf-lib');
    
    // Get the name of the component from the HTML path
    const componentName = path.basename(htmlPath, '.html');
    
    // Read HTML content
    const htmlContent = await fs.readFile(htmlPath, 'utf-8');
    
    // Extract text content (very basic)
    const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([width, height]);
    
    // Add a title
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const titleSize = 14;
    const contentSize = 10;
    
    page.drawText(`Component: ${componentName}`, {
      x: 50,
      y: height - 50,
      size: titleSize,
      font,
      color: rgb(0, 0, 0),
    });
    
    // Add content (simplified)
    // We'll split the text into lines of ~60 characters each
    const maxLineLength = Math.floor(width / 5); // Rough estimate for line length
    let currentY = height - 80;
    
    // Split text into chunks of maximum line length
    for (let i = 0; i < textContent.length; i += maxLineLength) {
      const line = textContent.substring(i, i + maxLineLength);
      
      page.drawText(line, {
        x: 50,
        y: currentY,
        size: contentSize,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });
      
      currentY -= 15;
      if (currentY < 50) break; // Avoid going off the page
    }
    
    // Save PDF
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(pdfPath, pdfBytes);
    
    console.log('Basic PDF created successfully');
  } catch (error) {
    console.error('Error creating basic PDF:', error);
    throw error;
  }
} 