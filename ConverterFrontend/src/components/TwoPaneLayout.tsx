import React, { useState, useEffect } from 'react';
import PreviewPane from './PreviewPane';
import ConfigurationPane from './ConfigurationPane';
import GenerateWithClaude from './GenerateWithClaude';

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
  width: number;
  widthPreset: string;
  margin: number;
  format: 'auto' | 'a4';
  debug: boolean;
}

// Dynamically determine the API URL and base URL based on the current environment
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : `${window.location.origin}/api`;

const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : window.location.origin;

const TwoPaneLayout: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [outputFiles, setOutputFiles] = useState<OutputFile[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'export' | 'output' | 'generate'>('export');

  useEffect(() => {
    // Fetch available components from the API
    fetchComponents();
    fetchOutputFiles();
  }, []);

  const fetchComponents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/components`);
      const data = await response.json();
      
      if (data.success) {
        setComponents(data.components);
        if (data.components.length > 0) {
          setSelectedComponents([data.components[0]]);
        }
      }
    } catch (error) {
      console.error('Error fetching components:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleExport = async (outputFileName: string, options: ExportOptions) => {
    if (selectedComponents.length === 0) {
      setExportMessage('Please select at least one component to export');
      return;
    }

    setIsLoading(true);
    setExportMessage('Exporting component(s) to PDF...');

    try {
      // If multiple components are selected, we'll create a batch export
      const exportPromises = selectedComponents.map(async (component) => {
        const fileName = selectedComponents.length > 1 
          ? `${outputFileName.replace('.pdf', '')}_${component.componentName}.pdf`
          : outputFileName;
          
        const response = await fetch(`${API_URL}/export`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            componentFile: component.file,
            outputFile: fileName,
            options: options,
          }),
        });
        
        return await response.json();
      });
      
      const results = await Promise.all(exportPromises);
      const allSuccessful = results.every(result => result.success);
      
      if (allSuccessful) {
        setExportMessage(`Export successful! ${selectedComponents.length > 1 ? 'Multiple files created.' : `Output saved to: output/${outputFileName}`}`);
        // Refresh the output files list
        fetchOutputFiles();
      } else {
        const failedExports = results.filter(result => !result.success);
        setExportMessage(`Export failed: ${failedExports.map(result => result.message).join(', ')}`);
        console.error('Export errors:', failedExports);
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

  // Handle component generated from Claude
  const handleComponentGenerated = async (componentName: string, tsxCode: string) => {
    // Refresh the component list
    await fetchComponents();
    
    // Show a success message
    setExportMessage(`Component "${componentName}" generated successfully!`);
    
    // Clear the message after 3 seconds
    setTimeout(() => {
      setExportMessage('');
    }, 3000);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-100px)]">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg overflow-auto">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'export' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('export')}
          >
            Export
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'output' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('output')}
          >
            Output Files
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'generate' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('generate')}
          >
            Generate with Claude
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'export' && (
          <ConfigurationPane
            components={components}
            selectedComponents={selectedComponents}
            setSelectedComponents={setSelectedComponents}
            onExport={handleExport}
            isLoading={isLoading}
            exportMessage={exportMessage}
            onFileUpload={handleFileUpload}
            uploadStatus={uploadStatus}
            isUploading={isUploading}
            outputFiles={outputFiles}
            onRefreshOutputFiles={fetchOutputFiles}
          />
        )}
        
        {activeTab === 'output' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Output Files</h2>
            {outputFiles.length === 0 ? (
              <p className="text-gray-400">No output files yet. Export some components first.</p>
            ) : (
              <div className="space-y-2">
                {outputFiles.map((file, index) => (
                  <div key={index} className="p-3 bg-gray-700 rounded flex justify-between items-center">
                    <div>
                      <div className="font-medium">{file.file}</div>
                      <div className="text-xs text-gray-400">
                        {file.size} • {file.createdAt}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`${BASE_URL}/output/${encodeURIComponent(file.file)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        View
                      </a>
                      <a
                        href={`${BASE_URL}/output/${encodeURIComponent(file.file)}`}
                        className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                        download
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'generate' && (
          <GenerateWithClaude 
            onComponentGenerated={handleComponentGenerated}
            apiUrl={API_URL}
          />
        )}
      </div>
      
      {/* Right Panel - Preview */}
      <div className="w-full md:w-1/2 p-4 bg-gray-800 rounded-lg shadow-lg mt-4 md:mt-0 md:ml-4 overflow-auto">
        <PreviewPane
          selectedComponents={selectedComponents}
        />
      </div>
    </div>
  );
};

export default TwoPaneLayout; 