import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Load the entry-server.js file
      const { render } = await vite.ssrLoadModule('/src/entry-server.js');

      // Determine which component to render based on the URL
      const componentName = url.split('/')[1] || 'index';
      
      try {
        // Try to load the component
        const { default: Component } = await vite.ssrLoadModule(`/src/components/${componentName}.jsx`);
        
        // Render the component to HTML
        const html = render(Component);
        
        // Send the rendered HTML with proper content type
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
        res.status(500).end(`Error loading component: ${error.message}`);
      }
    } catch (error) {
      vite.ssrFixStacktrace(error);
      next(error);
    }
  });

  const port = process.env.PORT || 5175;
  app.listen(port, () => {
    console.log(`SSR server running at http://localhost:${port}`);
  });
}

startServer(); 