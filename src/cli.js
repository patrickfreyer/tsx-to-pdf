#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import convertTsxToPdf from './index.js';

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
          describe: 'Output PDF path',
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
        });
    },
    async (argv) => {
      try {
        await convertTsxToPdf(argv.files, argv.output, {
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