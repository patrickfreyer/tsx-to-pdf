import React, { useState, useEffect } from 'react';

interface Component {
  file: string;
  componentName: string;
  routeName: string;
}

interface ExportOptions {
  aspectRatio: string;
  paperSize: string;
  orientation: string;
  margin: number;
  autoSize: boolean;
  debug: boolean;
}

const API_URL = 'http://localhost:3000/api';

const ExportUI: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [outputFileName, setOutputFileName] = useState<string>('output.pdf');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');
  const [options, setOptions] = useState<ExportOptions>({
    aspectRatio: '16:9',
    paperSize: 'A4',
    orientation: 'landscape',
    margin: 0,
    autoSize: true,
    debug: false,
  });

  useEffect(() => {
    // Fetch available components from the API
    const fetchComponents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/components`);
        const data = await response.json();
        
        if (data.success && data.components) {
          setComponents(data.components);
          if (data.components.length > 0) {
            setSelectedComponent(data.components[0].file);
          }
        } else {
          console.error('Failed to fetch components:', data.message);
          setExportMessage('Failed to fetch components: ' + data.message);
        }
      } catch (error) {
        console.error('Error fetching components:', error);
        setExportMessage('Error fetching components. Is the server running?');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComponents();
  }, []);

  const handleExport = async () => {
    if (!selectedComponent) {
      setExportMessage('Please select a component to export');
      return;
    }

    setIsLoading(true);
    setExportMessage('Exporting component to PDF...');

    try {
      const response = await fetch(`${API_URL}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          componentFile: selectedComponent,
          outputFile: outputFileName,
          options: {
            aspectRatio: options.aspectRatio,
            paperSize: options.paperSize,
            orientation: options.orientation,
            margin: options.margin,
            autoSize: options.autoSize,
            debug: options.debug,
          },
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setExportMessage(`Export successful! Output saved to: output/${outputFileName}`);
      } else {
        setExportMessage(`Export failed: ${result.message}`);
        console.error('Export error:', result.error);
      }
    } catch (error) {
      console.error('Error exporting component:', error);
      setExportMessage(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">TSX to PDF Converter</h1>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Select Component</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            disabled={isLoading || components.length === 0}
          >
            {components.length === 0 && (
              <option value="">No components available</option>
            )}
            {components.map((component) => (
              <option key={component.file} value={component.file}>
                {component.componentName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Output File Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={outputFileName}
            onChange={(e) => setOutputFileName(e.target.value)}
            placeholder="output.pdf"
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Aspect Ratio</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={options.aspectRatio}
              onChange={(e) => setOptions({...options, aspectRatio: e.target.value})}
              disabled={isLoading}
            >
              <option value="16:9">16:9</option>
              <option value="4:3">4:3</option>
              <option value="1:1">1:1</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Paper Size</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={options.paperSize}
              onChange={(e) => setOptions({...options, paperSize: e.target.value})}
              disabled={isLoading}
            >
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Orientation</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={options.orientation}
              onChange={(e) => setOptions({...options, orientation: e.target.value})}
              disabled={isLoading}
            >
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Margin (px)</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={options.margin}
              onChange={(e) => setOptions({...options, margin: parseInt(e.target.value) || 0})}
              min="0"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoSize"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              checked={options.autoSize}
              onChange={(e) => setOptions({...options, autoSize: e.target.checked})}
              disabled={isLoading}
            />
            <label htmlFor="autoSize" className="text-gray-700">Auto-size PDF to content</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="debug"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              checked={options.debug}
              onChange={(e) => setOptions({...options, debug: e.target.checked})}
              disabled={isLoading}
            />
            <label htmlFor="debug" className="text-gray-700">Debug mode (keep temp files)</label>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            onClick={handleExport}
            disabled={isLoading || !selectedComponent}
          >
            {isLoading ? 'Exporting...' : 'Export to PDF'}
          </button>
        </div>
        
        {exportMessage && (
          <div className={`mt-4 p-3 rounded-md ${exportMessage.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {exportMessage}
          </div>
        )}
        
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Preview</h2>
          {selectedComponent && (
            <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
              <p className="mb-2"><strong>Component:</strong> {components.find(c => c.file === selectedComponent)?.componentName}</p>
              <p className="mb-2"><strong>Preview URL:</strong> <a href={`http://localhost:5174/${components.find(c => c.file === selectedComponent)?.routeName}`} target="_blank" className="text-blue-600 hover:underline">http://localhost:5174/{components.find(c => c.file === selectedComponent)?.routeName}</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportUI; 