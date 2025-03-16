import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { 
  listComponents, 
  exportComponent, 
  listOutputFiles, 
  saveUploadedFile,
  generateTSXComponent,
  saveGeneratedComponent,
  createTempComponent
} from './api.js';
import multer from 'multer';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

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

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5174',
      'https://tsx-to-pdf.replit.app', // Add your Replit domain
      /\.replit\.dev$/,               // Allow all Replit dev domains
      /\.repl\.co$/                   // Allow all Replit co domains
    ];
    
    // Check if the origin is allowed
    const allowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return origin === allowedOrigin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
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
      message: 'File uploaded successfully and server is being updated. The new component will be available shortly.', 
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

// Add Claude API endpoints
app.post('/api/claude/generate', express.json(), async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }
    
    // We're no longer using requirements or styling guidelines
    const options = {
      requirements: [],
      stylingGuidelines: [],
    };
    
    const result = await generateTSXComponent(prompt, options);
    
    if (!result.success) {
      return res.status(500).json(result);
    }
    
    // Create a temporary component for preview
    const tempComponent = await createTempComponent(result.code);
    
    return res.json({
      success: true,
      code: result.code,
      previewComponent: tempComponent.success ? tempComponent.componentName : null,
      previewFile: tempComponent.success ? tempComponent.filePath : null
    });
  } catch (error) {
    console.error('Error generating component:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate component' });
  }
});

app.post('/api/components/save', express.json(), async (req, res) => {
  try {
    const { componentName, tsxCode } = req.body;
    
    if (!componentName) {
      return res.status(400).json({ success: false, error: 'Component name is required' });
    }
    
    if (!tsxCode) {
      return res.status(400).json({ success: false, error: 'TSX code is required' });
    }
    
    const result = await saveGeneratedComponent(componentName, tsxCode);
    
    return res.json(result);
  } catch (error) {
    console.error('Error saving component:', error);
    return res.status(500).json({ success: false, error: 'Failed to save component' });
  }
});

// Serve the frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`In Replit, access at: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
}); 