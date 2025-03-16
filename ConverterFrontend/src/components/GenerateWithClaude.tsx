import React, { useState } from 'react';

interface GenerateWithClaudeProps {
  onComponentGenerated: (componentName: string, tsxCode: string) => void;
  apiUrl: string;
}

const GenerateWithClaude: React.FC<GenerateWithClaudeProps> = ({ onComponentGenerated, apiUrl }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [componentName, setComponentName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewComponent, setPreviewComponent] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  // Generate component
  const generateComponent = async () => {
    try {
      setError('');
      setIsGenerating(true);
      setGeneratedCode('');
      setPreviewComponent(null);
      setPreviewFile(null);
      
      // Validate inputs
      if (!prompt) {
        setError('Please enter a prompt');
        setIsGenerating(false);
        return;
      }
      
      // Prepare request data
      const requestData = {
        prompt,
        requirements: [],
        stylingGuidelines: [],
      };
      
      // Make API request
      const response = await fetch(`${apiUrl}/claude/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setError(data.error || 'Failed to generate component');
        setIsGenerating(false);
        return;
      }
      
      // Set generated code and preview info
      setGeneratedCode(data.code);
      setPreviewComponent(data.previewComponent);
      setPreviewFile(data.previewFile);
      setShowPreview(true);
      
      // Extract a default component name from the code
      const componentNameMatch = data.code.match(/function\s+([A-Za-z0-9_]+)/);
      const constComponentMatch = data.code.match(/const\s+([A-Za-z0-9_]+)\s*=/);
      
      if (componentNameMatch) {
        setComponentName(componentNameMatch[1]);
      } else if (constComponentMatch) {
        setComponentName(constComponentMatch[1]);
      } else {
        setComponentName(`GeneratedComponent${Date.now()}`);
      }
      
    } catch (error) {
      console.error('Error generating component:', error);
      setError('Failed to generate component');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save generated component
  const saveComponent = async () => {
    try {
      setError('');
      
      if (!generatedCode) {
        setError('No component to save');
        return;
      }
      
      if (!componentName) {
        setError('Please enter a component name');
        return;
      }
      
      const response = await fetch(`${apiUrl}/components/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          componentName,
          tsxCode: generatedCode,
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setError(data.error || 'Failed to save component');
        return;
      }
      
      // Notify parent component
      onComponentGenerated(componentName, generatedCode);
      
      // Show success message
      alert(`Component saved as ${data.filePath}`);
      
    } catch (error) {
      console.error('Error saving component:', error);
      setError('Failed to save component');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Generate TSX with Claude</h2>
        <p className="text-gray-300 text-sm">
          Use Claude to generate React TSX components based on your description.
        </p>
      </div>
      
      {/* Prompt Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Component Description</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the component you want to generate..."
          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white h-24"
        />
      </div>
      
      {/* Generate Button */}
      <div className="mb-4">
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={generateComponent}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Component'}
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-2 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
          {error}
        </div>
      )}
      
      {/* Generated Code Section */}
      {generatedCode && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Generated Component</h3>
            {showPreview && previewComponent && (
              <a
                href={`http://localhost:5174/${previewComponent}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                View in Browser
              </a>
            )}
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Component Name</label>
            <input
              type="text"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">TSX Code</label>
            <div className="relative">
              <pre className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-gray-200 text-sm overflow-auto h-64 whitespace-pre-wrap">
                {generatedCode}
              </pre>
              <button
                className="absolute top-2 right-2 p-1 bg-gray-700 rounded text-xs text-gray-300 hover:bg-gray-600"
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode);
                  alert('Code copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
          </div>
          
          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            onClick={saveComponent}
          >
            Save Component
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateWithClaude; 