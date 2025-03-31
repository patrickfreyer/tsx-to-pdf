import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { ClaudeService } from './claude-service.js';
import { execSync } from 'child_process';
import convertTsxToPdf from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Lists all available TSX components in the input directory
 * @returns {Promise<Array<{file: string, componentName: string, routeName: string}>>} Array of component information
 */
export async function listComponents() {
  try {
    const inputDir = path.join(__dirname, '..', 'input');
    const files = await fs.readdir(inputDir);
    const tsxFiles = files.filter(file => file.endsWith('.tsx'));
    
    return tsxFiles.map(file => {
      const componentName = file.replace('.tsx', '')
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      
      const routeName = file.replace('.tsx', '')
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      return {
        file,
        componentName,
        routeName
      };
    });
  } catch (error) {
    console.error('Error listing components:', error);
    throw error;
  }
}

/**
 * Lists all PDF files in the output directory
 * @returns {Promise<Array<{file: string, size: string, createdAt: string}>>} Array of PDF file information
 */
export async function listOutputFiles() {
  try {
    const outputDir = path.join(__dirname, '..', 'output');
    
    // Create output directory if it doesn't exist
    try {
      await fs.mkdir(outputDir, { recursive: true });
    } catch (err) {
      // Directory already exists, ignore
    }
    
    const files = await fs.readdir(outputDir);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));
    
    // Get file stats for each PDF file
    const fileStats = await Promise.all(
      pdfFiles.map(async (file) => {
        const filePath = path.join(outputDir, file);
        const stats = await fs.stat(filePath);
        
        // Format file size
        let size;
        if (stats.size < 1024) {
          size = `${stats.size} B`;
        } else if (stats.size < 1024 * 1024) {
          size = `${(stats.size / 1024).toFixed(1)} KB`;
        } else {
          size = `${(stats.size / (1024 * 1024)).toFixed(1)} MB`;
        }
        
        // Format creation date
        const createdAt = new Date(stats.mtime).toLocaleString();
        
        return {
          file,
          size,
          createdAt
        };
      })
    );
    
    // Sort by most recent first
    return fileStats.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } catch (error) {
    console.error('Error listing output files:', error);
    throw error;
  }
}

/**
 * Exports a TSX component to PDF
 * @param {string} componentFile - The TSX file to export
 * @param {string} outputFile - The output PDF file name
 * @param {Object} options - Export options
 * @returns {Promise<{success: boolean, message: string, outputPath: string}>} Result of the export operation
 */
export async function exportComponent(componentFile, outputFile, options = {}) {
  try {
    console.log(`Export options received: ${JSON.stringify(options, null, 2)}`);
    
    // Prepare input path and output path
    const inputPath = `input/${componentFile}`;
    const outputFilePath = outputFile || 'output.pdf';
    
    // Prepare converter options
    const converterOptions = {
      format: options.format || 'auto',
      margin: options.margin || 0,
      debugMode: options.debug || false
    };

    // Only add width and autoSize if not using A4 format
    if (options.format !== 'a4') {
      converterOptions.width = parseInt(options.width, 10) || 390;
      converterOptions.autoSize = true;
    }

    // Call convertTsxToPdf directly
    await convertTsxToPdf([inputPath], outputFilePath, converterOptions);
    
    return {
      success: true,
      message: 'Export completed successfully',
      outputPath: outputFilePath
    };
    
  } catch (error) {
    console.error('Error during export:', error);
    return {
      success: false,
      message: `Export failed: ${error.message}`,
      error: error
    };
  }
}

/**
 * Saves an uploaded TSX file and returns information about it
 * @param {Object} file - The uploaded file object from multer
 * @returns {Promise<Object>} Information about the saved file
 */
export async function saveUploadedFile(file) {
  try {
    // The file is already saved by multer, so we just need to return the information
    const componentName = file.originalname.replace('.tsx', '')
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    
    const routeName = file.originalname.replace('.tsx', '')
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    // Trigger the component update by running the setup-dev-server script
    // This will update the frontend-build server with the new component
    try {
      console.log('Updating component files for preview...');
      execSync('node setup-dev-server.js', { stdio: 'inherit' });
      console.log('Component files updated successfully');
    } catch (updateError) {
      console.error('Error updating component files:', updateError);
      // Continue even if update fails, as the file is already saved
    }
    
    return {
      file: file.originalname,
      componentName,
      routeName,
      path: file.path,
      size: file.size
    };
  } catch (error) {
    console.error('Error saving uploaded file:', error);
    throw error;
  }
}

/**
 * Generates a TSX component using Claude
 * @param {string} prompt - User prompt describing the component
 * @param {Object} options - Generation options
 * @returns {Promise<{success: boolean, code?: string, error?: string}>} Result object
 */
export async function generateTSXComponent(prompt, options = {}) {
  try {
    const claudeService = new ClaudeService();
    const tsxCode = await claudeService.generateTSXComponent(prompt, options);
    
    return {
      success: true,
      code: tsxCode
    };
  } catch (error) {
    console.error('Error generating TSX component:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Saves a generated TSX component to the input directory
 * @param {string} componentName - Name for the component file (without extension)
 * @param {string} tsxCode - The TSX code to save
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>} Result object
 */
export async function saveGeneratedComponent(componentName, tsxCode) {
  try {
    // Convert component name to kebab-case for the file name
    const fileName = componentName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase() + '.tsx';
    
    const inputDir = path.join(__dirname, '..', 'input');
    const filePath = path.join(inputDir, fileName);
    
    // Write the TSX code to the file
    await fs.writeFile(filePath, tsxCode, 'utf8');
    
    // Trigger the setup-dev-server.js script to update the component files
    console.log('Updating component files for preview...');
    try {
      execSync('node setup-dev-server.js', { stdio: 'inherit' });
      console.log('Component files updated successfully');
    } catch (setupError) {
      console.error('Error updating component files:', setupError);
      // Continue even if the setup script fails
    }
    
    return {
      success: true,
      filePath: fileName,
      routeName: componentName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
    };
  } catch (error) {
    console.error('Error saving generated component:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Creates a temporary component for preview
 * @param {string} tsxCode - The TSX code to preview
 * @returns {Promise<{success: boolean, componentName?: string, error?: string}>} Result object
 */
export async function createTempComponent(tsxCode) {
  try {
    // Generate a unique component name for the preview
    const timestamp = Date.now();
    const componentName = `TempComponent${timestamp}`;
    
    // Extract the component name from the code if possible
    const componentNameMatch = tsxCode.match(/function\s+([A-Za-z0-9_]+)/);
    const constComponentMatch = tsxCode.match(/const\s+([A-Za-z0-9_]+)\s*=/);
    
    let extractedName = null;
    if (componentNameMatch) {
      extractedName = componentNameMatch[1];
    } else if (constComponentMatch) {
      extractedName = constComponentMatch[1];
    }
    
    // Create a temporary file in the input directory
    const tempFileName = `temp-component-${timestamp}.tsx`;
    const inputDir = path.join(__dirname, '..', 'input');
    const filePath = path.join(inputDir, tempFileName);
    
    // Write the TSX code to the file
    await fs.writeFile(filePath, tsxCode, 'utf8');
    
    // Trigger the setup-dev-server.js script to update the component files
    console.log('Updating component files for preview...');
    try {
      execSync('node setup-dev-server.js', { stdio: 'inherit' });
      console.log('Component files updated successfully');
    } catch (setupError) {
      console.error('Error updating component files:', setupError);
      // Continue even if the setup script fails
    }
    
    // Return the component name for routing
    return {
      success: true,
      componentName: extractedName || componentName,
      filePath: tempFileName,
      routeName: extractedName || componentName
    };
  } catch (error) {
    console.error('Error creating temporary component:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Serves a PDF file for viewing or downloading
 * @param {string} filename - The name of the PDF file
 * @param {boolean} download - Whether to serve the file as a download
 * @returns {Promise<{success: boolean, filePath: string, error?: string}>} Result object
 */
export async function servePdfFile(filename, download = false) {
  try {
    const outputDir = path.join(__dirname, '..', 'output');
    const filePath = path.join(outputDir, filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return {
        success: false,
        error: 'File not found'
      };
    }
    
    return {
      success: true,
      filePath,
      contentType: 'application/pdf',
      contentDisposition: download ? 'attachment' : 'inline',
      filename
    };
  } catch (error) {
    console.error('Error serving PDF file:', error);
    return {
      success: false,
      error: error.message
    };
  }
} 