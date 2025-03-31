import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { ClaudeService } from './claude-service.js';
import { execSync } from 'child_process';

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
 * @returns {Promise<{success: boolean, message: string, command: string}>} Result of the export operation
 */
export async function exportComponent(componentFile, outputFile, options = {}) {
  return new Promise((resolve, reject) => {
    // Log the received options
    console.log(`Export options received: ${JSON.stringify(options, null, 2)}`);
    
    // Build the command arguments - call node directly instead of using npm run
    const args = ['ConverterService/cli.js', `input/${componentFile}`];
    
    // Add output file if provided
    if (outputFile) {
      args.push(outputFile);
    }
    
    // Add format option
    if (options.format) {
      args.push(`--format=${options.format}`);
    }
    
    // Add options
    if (options.width !== undefined) {
      const numericWidth = parseInt(options.width, 10);
      if (!isNaN(numericWidth)) {
        args.push(`--width=${numericWidth}`);
        console.log(`Using width: ${numericWidth}`);
      } else {
        console.warn(`Invalid width value: ${options.width}, not adding to command`);
      }
    }
    
    if (options.margin !== undefined) {
      args.push(`--margin=${options.margin}`);
    }
    
    if (options.debug) {
      args.push('--debug');
    }
    
    // Build the full command for display purposes
    const command = `node ${args.join(' ')}`;
    console.log(`Executing command: ${command}`);
    
    // Execute the command
    const process = spawn('node', args, {
      cwd: path.join(__dirname, '..'),
      stdio: ['ignore', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    process.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log(data.toString());
    });
    
    process.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error(data.toString());
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve({
          success: true,
          message: 'Export completed successfully',
          command,
          output: stdout
        });
      } else {
        resolve({
          success: false,
          message: `Export failed with code ${code}`,
          command,
          error: stderr
        });
      }
    });
    
    process.on('error', (err) => {
      reject({
        success: false,
        message: `Failed to start export process: ${err.message}`,
        command,
        error: err
      });
    });
  });
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