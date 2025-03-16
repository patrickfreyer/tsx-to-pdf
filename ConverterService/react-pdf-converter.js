import puppeteer from 'puppeteer';
import express from 'express';
import { createServer } from 'vite';
import path from 'path';
import fs from 'fs/promises';
import { PDFDocument } from 'pdf-lib';

/**
 * ReactPDFConverter - A clean, minimal service for converting React components to PDF
 * 
 * Core principles:
 * 1. Single responsibility - Each step does one thing well
 * 2. Reliable cleanup - Resources are properly managed
 * 3. Minimal dependencies - Only essential packages
 * 4. Robust error handling - Each step can fail gracefully
 */
export class ReactPDFConverter {
  constructor(options = {}) {
    this.options = {
      port: options.port || 3333,
      width: options.width || 800,
      height: options.height || 1200,
      margin: options.margin || 40,
      ...options
    };
    
    this.server = null;
    this.vite = null;
    this.browser = null;
    this.app = express();
  }

  /**
   * Initialize the conversion environment
   */
  async initialize() {
    try {
      // Setup Vite dev server for React component rendering
      this.vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom'
      });

      // Configure express with Vite middleware
      this.app.use(this.vite.middlewares);
      
      // Launch Puppeteer
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      // Start server
      this.server = this.app.listen(this.options.port);

      return true;
    } catch (error) {
      console.error('Initialization failed:', error);
      await this.cleanup();
      throw error;
    }
  }

  /**
   * Convert a React component to PDF
   */
  async convertToPDF(componentPath, outputPath) {
    if (!this.browser || !this.server) {
      throw new Error('Converter not initialized. Call initialize() first.');
    }

    let page = null;
    try {
      // Create new page
      page = await this.browser.newPage();
      await page.setViewport({
        width: this.options.width,
        height: this.options.height
      });

      // Load the component
      const url = `http://localhost:${this.options.port}`;
      await page.goto(url, { waitUntil: 'networkidle0' });

      // Inject the component
      await page.evaluate(async (componentPath) => {
        const component = await import(componentPath);
        const root = document.getElementById('root');
        if (root && component.default) {
          ReactDOM.render(React.createElement(component.default), root);
        }
      }, componentPath);

      // Wait for rendering
      await page.waitForSelector('#root > *');

      // Generate PDF
      await page.pdf({
        path: outputPath,
        width: this.options.width,
        height: this.options.height,
        margin: {
          top: this.options.margin,
          right: this.options.margin,
          bottom: this.options.margin,
          left: this.options.margin
        },
        printBackground: true
      });

      return outputPath;
    } catch (error) {
      console.error('PDF conversion failed:', error);
      throw error;
    } finally {
      if (page) await page.close();
    }
  }

  /**
   * Convert multiple React components to a single PDF
   */
  async convertMultipleToPDF(componentPaths, outputPath) {
    try {
      const tempPdfs = [];
      
      // Convert each component
      for (const componentPath of componentPaths) {
        const tempPath = `${outputPath}.temp.${Date.now()}.pdf`;
        await this.convertToPDF(componentPath, tempPath);
        tempPdfs.push(tempPath);
      }

      // Merge PDFs if needed
      if (tempPdfs.length === 1) {
        await fs.rename(tempPdfs[0], outputPath);
      } else {
        const mergedPdf = await PDFDocument.create();
        
        for (const pdfPath of tempPdfs) {
          const pdfBytes = await fs.readFile(pdfPath);
          const pdf = await PDFDocument.load(pdfBytes);
          const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          pages.forEach(page => mergedPdf.addPage(page));
        }
        
        await fs.writeFile(outputPath, await mergedPdf.save());
      }

      // Cleanup temp files
      await Promise.all(tempPdfs.map(path => fs.unlink(path).catch(() => {})));

      return outputPath;
    } catch (error) {
      console.error('Multiple PDF conversion failed:', error);
      throw error;
    }
  }

  /**
   * Clean up resources
   */
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    
    if (this.server) {
      await new Promise(resolve => this.server.close(resolve));
      this.server = null;
    }
    
    if (this.vite) {
      await this.vite.close();
      this.vite = null;
    }
  }
} 