import React, { useState, useEffect } from 'react';
import PreviewPane from './PreviewPane';
import ConfigurationPane from './ConfigurationPane';

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
  autoSize: boolean;
  debug: boolean;
}

// Dynamically determine the API URL based on the current environment
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : `${window.location.origin}/api`;

const TwoPaneLayout: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [outputFiles, setOutputFiles] = useState<OutputFile[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
            setSelectedComponents([data.components[0]]);
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

  return (
    <div className="w-full h-[calc(100vh-80px)]">
      <div className="w-full h-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Left Pane - Preview */}
          <div className="h-[calc(100%-2.75rem)]">
            <PreviewPane selectedComponents={selectedComponents} />
          </div>
          
          {/* Right Pane - Configuration */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-4 h-full overflow-y-auto">
            <ConfigurationPane 
              components={components}
              selectedComponents={selectedComponents}
              onComponentSelectionChange={setSelectedComponents}
              outputFiles={outputFiles}
              onExport={handleExport}
              onRefreshOutputFiles={fetchOutputFiles}
              isLoading={isLoading}
              exportMessage={exportMessage}
              onFileUpload={handleFileUpload}
              isUploading={isUploading}
              uploadStatus={uploadStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoPaneLayout; 