#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { convertTsxToPdfWithSSR } from './ssr-converter.js';
import path from 'path';

// Debug: Log raw command line arguments
console.log('Raw CLI arguments:', process.argv);

// Parse command line arguments
yargs(hideBin(process.argv))
  .command(
    '$0 <files..> [output]',
    'Convert TSX files to PDF using SSR (without Puppeteer)',
    (yargs) => {
      return yargs
        .positional('files', {
          describe: 'TSX files to convert',
          type: 'string',
          array: true,
        })
        .positional('output', {
          describe: 'Output PDF path (will be saved in the output/ directory by default)',
          type: 'string',
          default: 'output.pdf',
        })
        .option('width', {
          describe: 'Width of the output in pixels',
          type: 'number',
          default: 390,
          coerce: (value) => {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 390 : parsed;
          }
        })
        .option('width-preset', {
          describe: 'Width preset',
          type: 'string',
          choices: ['iPhone', 'A4', 'MacBook', 'custom'],
          default: 'iPhone',
        })
        .option('margin', {
          describe: 'Margin in pixels',
          type: 'number',
          default: 0,
        })
        .option('auto-size', {
          describe: 'Automatically adjust PDF size to fit content',
          type: 'boolean',
          default: true,
        })
        .option('debug', {
          describe: 'Debug mode (keeps temporary files)',
          type: 'boolean',
          default: false,
        })
        .epilogue('All PDFs will be saved to the output/ directory by default unless an absolute path is provided.');
    },
    async (argv) => {
      try {
        // Debug: Log parsed arguments
        console.log('Parsed CLI arguments:', {
          files: argv.files,
          output: argv.output,
          width: argv.width,
          widthPreset: argv['width-preset'],
          margin: argv.margin,
          autoSize: argv['auto-size'],
          debug: argv.debug
        });
        
        // Ensure output path is properly formatted
        let outputPath = argv.output;
        if (!path.isAbsolute(outputPath) && !outputPath.startsWith('output/')) {
          console.log(`Note: Output will be saved to the output/ directory: ${path.join('output', outputPath)}`);
        }
        
        await convertTsxToPdfWithSSR(argv.files, outputPath, {
          width: argv.width,
          widthPreset: argv['width-preset'],
          margin: argv.margin,
          autoSize: argv['auto-size'],
          debugMode: argv.debug,
        });
      } catch (err) {
        console.error('Error:', err);
        process.exit(1);
      }
    }
  )
  .help()
  .parse(); 