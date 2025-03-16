import { Anthropic } from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Claude service for generating TSX components
 */
export class ClaudeService {
  constructor() {
    // Always use the environment variable for the API key
    this.apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!this.apiKey) {
      console.error('ANTHROPIC_API_KEY environment variable is not set');
      throw new Error('ANTHROPIC_API_KEY environment variable is not set');
    }
    
    this.anthropic = new Anthropic({
      apiKey: this.apiKey,
    });
  }

  /**
   * Generates a TSX component based on a user prompt
   * @param {string} prompt - The user's description of the component
   * @param {Object} options - Configuration options
   * @param {string[]} options.requirements - List of requirements for the component
   * @param {string[]} options.stylingGuidelines - List of styling guidelines
   * @returns {Promise<string>} - The generated TSX code
   */
  async generateTSXComponent(prompt, options = {}) {
    const {
      requirements = [],
      stylingGuidelines = [],
    } = options;

    // Create system message content
    const systemContent = `You are a React TSX component generator. 
    Generate only valid TSX code that can be rendered in a React application.
    - Use functional components with proper TypeScript typing
    - Include all necessary imports
    - Follow React best practices
    - Ensure the component is self-contained
    - Use available dependencies: React, react-dom, lucide-react, three.js
    - The component should be exported as default
    - Use modern React patterns (hooks, functional components)
    - Add appropriate comments for complex logic
    - Ensure the component has good default props`;

    // Create user message with the prompt and requirements
    const userMessage = `Generate a TSX component that ${prompt}.
    
    ${requirements.length > 0 ? `The component should:
    ${requirements.join('\n')}` : ''}
    
    ${stylingGuidelines.length > 0 ? `Use these styling guidelines:
    ${stylingGuidelines.join('\n')}` : ''}
    
    Output only the complete TSX code without explanations.`;

    try {
      // Make the API call to Claude with the correct format
      const response = await this.anthropic.messages.create({
        model: 'claude-3-7-sonnet-latest',
        max_tokens: 40000,
        system: systemContent,
        messages: [
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
      });
      
      // Extract and process the TSX code
      const tsxCode = response.content[0].text.trim();
      return this.processTSXResponse(tsxCode);
    } catch (error) {
      console.error('Error generating TSX component:', error);
      throw new Error(`Failed to generate TSX component: ${error.message}`);
    }
  }

  /**
   * Processes Claude's response to ensure it's valid TSX
   * @param {string} tsxCode - The raw TSX code from Claude
   * @returns {string} - Processed TSX code
   */
  processTSXResponse(tsxCode) {
    // Remove any markdown code block syntax if present
    let processedCode = tsxCode.replace(/```tsx|```jsx|```typescript|```javascript|```/g, '').trim();
    
    // Ensure the component has a default export
    if (!processedCode.includes('export default')) {
      const componentNameMatch = processedCode.match(/function\s+([A-Za-z0-9_]+)/);
      const constComponentMatch = processedCode.match(/const\s+([A-Za-z0-9_]+)\s*=/);
      
      let componentName = null;
      if (componentNameMatch) {
        componentName = componentNameMatch[1];
      } else if (constComponentMatch) {
        componentName = constComponentMatch[1];
      }
      
      if (componentName) {
        processedCode += `\n\nexport default ${componentName};`;
      }
    }
    
    // Ensure React is imported
    if (!processedCode.includes('import React')) {
      processedCode = `import React from 'react';\n${processedCode}`;
    }
    
    return processedCode;
  }
}

export default ClaudeService; 