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
    // A4 dimensions in pixels at 96 DPI
    const A4_WIDTH = 794; // 210mm
    const A4_HEIGHT = 1123; // 297mm

    this.options = {
      port: options.port || 3333,
      width: options.width || A4_WIDTH,
      height: options.height || A4_HEIGHT,
      margin: options.margin || 40,
      format: options.format || 'auto', // 'auto' or 'a4'
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
      
      // Set initial viewport
      await page.setViewport({
        width: this.options.format === 'a4' ? 794 : this.options.width, // A4 width for a4 format
        height: this.options.format === 'a4' ? 1123 : this.options.height // A4 height for a4 format
      });

      // Load the component
      const url = `http://localhost:${this.options.port}`;
      await page.goto(url, { waitUntil: 'networkidle0' });

      // Add necessary CSS for A4 format
      if (this.options.format === 'a4') {
        await page.addStyleTag({
          content: `
            @page {
              size: A4;
              margin: 0;
            }
            html {
              width: 794px;
              height: 1123px;
              margin: 0;
              padding: 0;
            }
            body {
              width: 794px;
              min-height: 1123px;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            #root {
              width: 794px;
              margin: 0 !important;
              padding: ${this.options.margin}px;
              box-sizing: border-box;
              background-color: white;
            }
            /* Force page breaks */
            .page-break {
              width: 794px;
              height: 1123px;
              padding: ${this.options.margin}px;
              margin: 0;
              box-sizing: border-box;
              page-break-after: always;
              page-break-before: always;
              position: relative;
              overflow: hidden;
            }
            /* Add page break hints for common elements */
            h1, h2, h3 {
              page-break-after: avoid;
              page-break-inside: avoid;
              margin-top: 0;
            }
            img, table {
              page-break-inside: avoid;
            }
            ul, ol {
              page-break-inside: avoid;
            }
            /* Prevent unwanted breaks */
            .no-break {
              page-break-inside: avoid;
            }
          `
        });

        // Add script to enforce page heights
        await page.addScriptTag({
          content: `
            function enforceA4Heights() {
              const pageBreaks = document.querySelectorAll('.page-break');
              pageBreaks.forEach(page => {
                page.style.height = '1123px';
                page.style.overflow = 'hidden';
              });
            }
            window.addEventListener('load', enforceA4Heights);
            enforceA4Heights();
          `
        });
      }

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

      if (this.options.format === 'auto') {
        // For auto format, measure content height
        const contentHeight = await page.evaluate(() => {
          const root = document.getElementById('root');
          return root ? root.scrollHeight : 0;
        });

        // Generate PDF with auto height
        await page.pdf({
          path: outputPath,
          width: this.options.width,
          height: contentHeight + (this.options.margin * 2),
          margin: {
            top: this.options.margin,
            right: this.options.margin,
            bottom: this.options.margin,
            left: this.options.margin
          },
          printBackground: true
        });
      } else if (this.options.format === 'a4') {
        // For A4 format, use standard dimensions and let content flow across pages
        await page.pdf({
          path: outputPath,
          format: 'A4',
          margin: 0,
          printBackground: true,
          preferCSSPageSize: true,
          displayHeaderFooter: false,
          scale: 1.0,
          pageRanges: '-',
        });
      }

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