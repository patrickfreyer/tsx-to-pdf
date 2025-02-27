import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { exec } from 'child_process';

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
    // Build the command arguments
    const args = ['run', 'convert', `input/${componentFile}`];
    
    // Add output file if provided
    if (outputFile) {
      args.push(outputFile);
    }
    
    // Add options
    if (options.aspectRatio) {
      args.push(`--aspect-ratio=${options.aspectRatio}`);
    }
    
    if (options.paperSize) {
      args.push(`--paper-size=${options.paperSize}`);
    }
    
    if (options.orientation) {
      args.push(`--orientation=${options.orientation}`);
    }
    
    if (options.margin !== undefined) {
      args.push(`--margin=${options.margin}`);
    }
    
    if (options.autoSize === false) {
      args.push('--no-auto-size');
    }
    
    if (options.debug) {
      args.push('--debug');
    }
    
    // Build the full command for display purposes
    const command = `npm ${args.join(' ')}`;
    console.log(`Executing command: ${command}`);
    
    // Execute the command
    const process = spawn('npm', args, {
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
      console.log('Updating frontend-build server with new component...');
      exec('node setup-dev-server.js', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
        if (error) {
          console.error('Error updating frontend-build server:', error);
          return;
        }
        console.log('Frontend-build server updated successfully');
      });
    } catch (updateError) {
      console.error('Error triggering component update:', updateError);
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