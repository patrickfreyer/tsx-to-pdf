#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import convertTsxToPdf from './index.js';
import path from 'path';

// Parse command line arguments
yargs(hideBin(process.argv))
  .command(
    '$0 <files..> [output]',
    'Convert TSX files to PDF',
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
        .option('aspect-ratio', {
          describe: 'Aspect ratio (width:height)',
          type: 'string',
          default: '16:9',
        })
        .option('paper-size', {
          describe: 'Paper size',
          type: 'string',
          choices: ['A4', 'Letter'],
          default: 'A4',
        })
        .option('orientation', {
          describe: 'Page orientation',
          type: 'string',
          choices: ['portrait', 'landscape'],
          default: 'landscape',
        })
        .option('margin', {
          describe: 'Page margin in pixels',
          type: 'number',
          default: 0,
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
        // Ensure output path is properly formatted
        let outputPath = argv.output;
        if (!path.isAbsolute(outputPath) && !outputPath.startsWith('output/')) {
          console.log(`Note: Output will be saved to the output/ directory: ${path.join('output', outputPath)}`);
        }
        
        await convertTsxToPdf(argv.files, outputPath, {
          aspectRatio: argv['aspect-ratio'],
          paperSize: argv['paper-size'],
          orientation: argv.orientation,
          margin: argv.margin,
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