// test-convert.js
import convertTsxToPdf from './tsx-to-pdf.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting test conversion...');

const tsxFile = path.resolve('./ExampleSlide.tsx');
const outputFile = path.resolve('./output.pdf');

console.log('TSX file:', tsxFile);
console.log('Output file:', outputFile);

convertTsxToPdf([tsxFile], outputFile, {
  debugMode: true
}).then(() => {
  console.log('Conversion completed successfully!');
}).catch(err => {
  console.error('Conversion failed:', err);
}); 