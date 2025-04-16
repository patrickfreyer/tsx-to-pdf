// setup-dev-server.js
// Auto-generates wrapper .jsx files for each .tsx in input/

const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'input');
const componentsDir = path.join(__dirname, 'RenderingServer', 'src', 'components');

function toComponentName(tsxFile) {
  // Remove extension, convert to PascalCase
  return tsxFile
    .replace(/\.tsx$/, '')
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function jsxWrapperContent(tsxFile) {
  return `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport Component from '../../../input/${tsxFile}';\nimport '../index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <Component />\n  </React.StrictMode>\n);\n`;
}

function main() {
  if (!fs.existsSync(inputDir)) {
    console.error('Input directory does not exist:', inputDir);
    process.exit(1);
  }
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  const tsxFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.tsx'));
  tsxFiles.forEach(tsxFile => {
    const componentName = toComponentName(tsxFile);
    const jsxFile = path.join(componentsDir, `${componentName}.jsx`);
    // Only write if missing or content is outdated
    const newContent = jsxWrapperContent(tsxFile);
    let shouldWrite = true;
    if (fs.existsSync(jsxFile)) {
      const existing = fs.readFileSync(jsxFile, 'utf8');
      if (existing === newContent) shouldWrite = false;
    }
    if (shouldWrite) {
      fs.writeFileSync(jsxFile, newContent, 'utf8');
      console.log('Generated wrapper:', jsxFile);
    }
  });
}

main(); 