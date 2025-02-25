import React, { useState, useEffect } from 'react';

interface Component {
  file: string;
  componentName: string;
  routeName: string;
}

interface OutputFile {
  file: string;
  size: string;
  createdAt: string;
}

interface ExportOptions {
  aspectRatio: string;
  paperSize: string;
  orientation: string;
  margin: number;
  autoSize: boolean;
  debug: boolean;
}

// Dynamically determine the API URL based on the current environment
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : `${window.location.origin}/api`;

const ExportUI: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [outputFiles, setOutputFiles] = useState<OutputFile[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [outputFileName, setOutputFileName] = useState<string>('output.pdf');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'export' | 'files'>('export');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
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
        
        if (data.success) {
          setComponents(data.components);
          if (data.components.length > 0) {
            setSelectedComponent(data.components[0].file);
          }
        }
      } catch (error) {
        console.error('Error fetching components:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComponents();
    fetchOutputFiles();
  }, []);

  const fetchOutputFiles = async () => {
    try {
      const response = await fetch(`${API_URL}/output-files`);
      const data = await response.json();
      
      if (data.success && data.files) {
        setOutputFiles(data.files);
      } else {
        console.error('Failed to fetch output files:', data.message);
      }
    } catch (error) {
      console.error('Error fetching output files:', error);
    }
  };

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
        // Refresh the output files list
        fetchOutputFiles();
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.name.endsWith('.tsx')) {
      setUploadStatus('Error: Only .tsx files are allowed');
      return;
    }
    
    const formData = new FormData();
    formData.append('tsxFile', file);
    
    try {
      setIsUploading(true);
      setUploadStatus('Uploading...');
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUploadStatus(`Successfully uploaded ${file.name}`);
        // Refresh the component list
        const fetchComponentsAfterUpload = async () => {
          try {
            const response = await fetch(`${API_URL}/components`);
            const data = await response.json();
            
            if (data.success) {
              setComponents(data.components);
              if (data.components.length > 0) {
                setSelectedComponent(data.components[0].file);
              }
            }
          } catch (error) {
            console.error('Error fetching components:', error);
          }
        };
        
        fetchComponentsAfterUpload();
      } else {
        setUploadStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">TSX to PDF Converter</h1>
        
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'export' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('export')}
          >
            Export Component
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'files' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('files')}
          >
            Output Files
          </button>
        </div>
        
        {activeTab === 'export' ? (
          <>
            {/* File Upload Section */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Upload New TSX File</h2>
              <div className="flex flex-col space-y-4">
                <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg border border-blue-500 border-dashed cursor-pointer hover:bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="mt-2 text-base">Select a TSX file to upload</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".tsx" 
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </label>
                {uploadStatus && (
                  <div className={`text-center p-2 rounded ${uploadStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {uploadStatus}
                  </div>
                )}
              </div>
            </div>

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
          </>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Output Files</h2>
              <button
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-md"
                onClick={fetchOutputFiles}
              >
                Refresh
              </button>
            </div>
            
            {outputFiles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No output files found. Export a component to create a PDF file.
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {outputFiles.map((file) => (
                      <tr key={file.file} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {file.file}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={`/output/${file.file}`}
                            target="_blank"
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            View
                          </a>
                          <a
                            href={`/output/${file.file}`}
                            download
                            className="text-green-600 hover:text-green-900"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportUI; 