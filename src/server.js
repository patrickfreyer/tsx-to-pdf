import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { listComponents, exportComponent } from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

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

// Serve the frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 