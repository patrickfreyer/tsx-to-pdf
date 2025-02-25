import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { listComponents, exportComponent, listOutputFiles, saveUploadedFile } from './api.js';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'input');
    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Keep the original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only .tsx files
    if (file.originalname.endsWith('.tsx')) {
      cb(null, true);
    } else {
      cb(new Error('Only .tsx files are allowed'), false);
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve output directory for file downloads
app.use('/output', express.static(path.join(__dirname, '..', 'output')));

// API Routes
app.get('/api/components', async (req, res) => {
  try {
    const components = await listComponents();
    res.json({ success: true, components });
  } catch (error) {
    console.error('Error listing components:', error);
    res.status(500).json({ success: false, message: 'Failed to list components', error: error.message });
  }
});

app.get('/api/output-files', async (req, res) => {
  try {
    const files = await listOutputFiles();
    res.json({ success: true, files });
  } catch (error) {
    console.error('Error listing output files:', error);
    res.status(500).json({ success: false, message: 'Failed to list output files', error: error.message });
  }
});

app.post('/api/export', async (req, res) => {
  try {
    const { componentFile, outputFile, options } = req.body;
    
    if (!componentFile) {
      return res.status(400).json({ success: false, message: 'Component file is required' });
    }
    
    const result = await exportComponent(componentFile, outputFile, options);
    res.json(result);
  } catch (error) {
    console.error('Error exporting component:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to export component', 
      error: error.message,
      command: error.command
    });
  }
});

// New endpoint for file uploads
app.post('/api/upload', upload.single('tsxFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const result = await saveUploadedFile(req.file);
    res.json({ 
      success: true, 
      message: 'File uploaded successfully', 
      file: result 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to upload file', 
      error: error.message 
    });
  }
});

// Serve the frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 