# TSX Creation with Claude Integration: Action Plan

## Overview

This plan outlines how to add a new feature to the TSX-to-PDF Converter that allows users to:
1. Connect to Claude using their API key
2. Send prompts to Claude to generate TSX components
3. Immediately preview generated components in the Converter Service
4. Export generated components to PDF

## Current Progress

Basic Claude integration is already set up with:
- The Anthropic SDK installed (`@anthropic-ai/sdk`)
- Environment variable configuration for API keys
- Basic message creation functionality working

```javascript
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await anthropic.messages.create({
  model: 'claude-3-opus-20240229',
  max_tokens: 1000,
  messages: [
    {role: 'user', content: 'Hello, Claude!'}
  ],
});
console.log(message.content[0].text);
```

## Prerequisites

- Anthropic Claude API key
- Basic knowledge of React components

## Implementation Steps

### 1. Extend Existing Claude Integration

1. **Create Claude Service Module**
   - Create a new file: `ConverterService/claude-service.js` using the existing code as a foundation
   - Implement additional functions:
     - `generateTSXComponent(prompt, options)` - Takes a user prompt and returns TSX code
     - `validateAPIKey(apiKey)` - Validates a user's API key before storing
     - `processTSXResponse(response)` - Ensures the response is valid TSX and adds any missing imports

2. **Add TSX-specific Prompt Engineering**
   - Create system prompts that instruct Claude to generate valid TSX
   - Include component structure templates
   - Add guardrails to ensure clean, renderable code

### 2. Update Converter Frontend

1. **Add "Generate with Claude" Tab**
   - Create a new tab in the UI alongside "Export" and "Output Files" tabs
   - Design form with:
     - API key input (with option to use environment variable or input directly)
     - Prompt input area (with examples/templates)
     - Component configuration options (styling, complexity, etc.)

2. **Create Component Preview Area**
   - Add a live preview section to display generated components
   - Include options to:
     - Edit the generated TSX
     - Save to input directory
     - Directly export to PDF

### 3. Update Backend API

1. **Add New Endpoints**
   - `/api/claude/generate` - Takes a prompt and returns generated TSX code using the existing Claude setup
   - `/api/claude/validate-key` - Validates a Claude API key
   - `/api/components/save` - Saves generated TSX to the input directory

2. **Modify Existing Functionality**
   - Update `ConverterService/api.js` to integrate with the Claude service
   - Ensure generated components can be immediately rendered for preview

### 4. Enhance RenderingServer for Dynamic Components

1. **Implement Dynamic Component Loading**
   - Modify the RenderingServer to accept and render components on-the-fly
   - Create a temporary rendering mechanism for previews before saving

2. **Add Support for Template Components**
   - Create starter templates users can customize with prompts
   - Include examples showing different component styles

### 5. Implement Security Measures

1. **API Key Management**
   - Allow both environment variable and UI input methods
   - For UI input, store API keys securely (optional local storage with encryption)
   - Never send keys to backend unnecessarily

2. **Input Validation**
   - Sanitize TSX code before rendering
   - Implement rate limiting for API calls

### 6. User Documentation

1. **Update README**
   - Add section on Claude integration with examples
   - Include prompt templates that work well

2. **Create In-App Guide**
   - Add tooltips and help sections
   - Provide example prompts that generate good results

## Implementation Roadmap

### Phase 1: Core Integration (Building on existing setup)
- Complete the Claude service module with TSX-specific functions
- Create effective system prompts for TSX generation
- Add simple preview mechanism

### Phase 2: UI Enhancements
- Develop full UI for the Generate tab
- Implement live preview functionality
- Add TSX editing capabilities

### Phase 3: Polish & Documentation
- Refine the user experience
- Add prompt templates and examples
- Complete documentation

## Claude Prompting Strategy for TSX Generation

Building on your existing Claude setup, here's how to optimize prompts for TSX generation:

1. **System Message Template:**
   ```javascript
   const systemMessage = {
     role: 'system',
     content: `You are a React TSX component generator. 
     Generate only valid TSX code that can be rendered in a React application.
     - Use functional components with proper TypeScript typing
     - Include all necessary imports
     - Follow React best practices
     - Ensure the component is self-contained
     - Use available dependencies: React, react-dom, lucide-react, three.js`
   };
   ```

2. **User Prompt Structure:**
   ```javascript
   const userMessage = {
     role: 'user',
     content: `Generate a TSX component that ${userDescription}.
     
     The component should:
     ${userRequirements.join('\n')}
     
     Use these styling guidelines:
     ${userStylingGuidelines.join('\n')}
     
     Output only the complete TSX code without explanations.`
   };
   ```

3. **Example API Call:**
   ```javascript
   const response = await anthropic.messages.create({
     model: 'claude-3-sonnet-20240229',
     max_tokens: 4000,
     messages: [systemMessage, userMessage],
     temperature: 0.7,
   });
   
   // Extract the TSX code
   const tsxCode = response.content[0].text.trim();
   ```

## Testing Plan

1. Test TSX generation with various prompts
2. Test component rendering with different complexity levels
3. Test error handling for invalid TSX
4. Test end-to-end workflow from prompt to PDF

This implementation will create a seamless experience where users can go from idea to PDF with minimal technical knowledge. 