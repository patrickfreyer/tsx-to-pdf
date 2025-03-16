import React, { useState } from 'react';

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

interface ConfigurationPaneProps {
  components: Component[];
  selectedComponents: Component[];
  setSelectedComponents: (selectedComponents: Component[]) => void;
  outputFiles: OutputFile[];
  onExport: (outputFileName: string, options: ExportOptions) => Promise<void>;
  onRefreshOutputFiles?: () => void;
  isLoading: boolean;
  exportMessage: string;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  uploadStatus: string;
  onDeleteComponent?: (file: string) => void;
  onDeleteMultipleComponents?: (files: string[]) => void;
}

// Dynamically determine the API URL based on the current environment
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : `${window.location.origin}/api`;

const ConfigurationPane: React.FC<ConfigurationPaneProps> = ({
  components,
  selectedComponents,
  setSelectedComponents,
  outputFiles,
  onExport,
  onRefreshOutputFiles,
  isLoading,
  exportMessage,
  onFileUpload,
  isUploading,
  uploadStatus,
  onDeleteComponent,
  onDeleteMultipleComponents,
}) => {
  const [outputFileName, setOutputFileName] = useState<string>('output.pdf');
  const [options, setOptions] = useState<ExportOptions>({
    width: 390, // iPhone width
    widthPreset: 'iPhone',
    margin: 0,
    autoSize: true,
    debug: false,
  });
  const [componentToDelete, setComponentToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [componentsToDelete, setComponentsToDelete] = useState<string[]>([]);
  const [showBatchDeleteConfirm, setShowBatchDeleteConfirm] = useState<boolean>(false);

  const handleExport = async () => {
    if (selectedComponents.length === 0) return;
    await onExport(outputFileName, options);
  };

  const handleComponentSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedComponentFiles = selectedOptions.map(option => option.value);
    const newSelectedComponents = components.filter(component => 
      selectedComponentFiles.includes(component.file)
    );
    setSelectedComponents(newSelectedComponents);
  };

  const handleDeleteClick = (file: string) => {
    setComponentToDelete(file);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (componentToDelete && onDeleteComponent) {
      setIsDeleting(true);
      try {
        await onDeleteComponent(componentToDelete);
        
        // Also remove from selected components if it was selected
        if (selectedComponents.some(c => c.file === componentToDelete)) {
          setSelectedComponents(selectedComponents.filter(c => c.file !== componentToDelete));
        }
      } finally {
        setIsDeleting(false);
      }
    }
    setShowDeleteConfirm(false);
    setComponentToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setComponentToDelete(null);
  };

  const toggleComponentSelection = (file: string) => {
    if (componentsToDelete.includes(file)) {
      setComponentsToDelete(componentsToDelete.filter(f => f !== file));
    } else {
      setComponentsToDelete([...componentsToDelete, file]);
    }
  };

  const handleBatchDeleteClick = () => {
    if (componentsToDelete.length > 0) {
      setShowBatchDeleteConfirm(true);
    }
  };

  const confirmBatchDelete = async () => {
    if (componentsToDelete.length > 0 && onDeleteMultipleComponents) {
      setIsDeleting(true);
      try {
        await onDeleteMultipleComponents(componentsToDelete);
        
        // Remove deleted components from selected components
        setSelectedComponents(selectedComponents.filter(c => !componentsToDelete.includes(c.file)));
      } finally {
        setIsDeleting(false);
      }
    }
    setShowBatchDeleteConfirm(false);
    setComponentsToDelete([]);
  };

  const cancelBatchDelete = () => {
    setShowBatchDeleteConfirm(false);
  };

  const selectAllComponents = () => {
    setComponentsToDelete(components.map(c => c.file));
  };

  const deselectAllComponents = () => {
    setComponentsToDelete([]);
  };

  return (
    <div className="h-full flex flex-col flex-grow text-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-blue-300">Export Configuration</h2>
      
      {/* File Upload Section */}
      <div className="mb-6 p-4 bg-black/20 rounded-xl border border-white/10">
        <h2 className="text-lg font-semibold mb-4 text-blue-300">Upload New TSX File</h2>
        <div className="flex flex-col space-y-4">
          <label className="flex flex-col items-center px-4 py-6 bg-black/30 text-blue-400 rounded-lg border border-blue-500/50 border-dashed cursor-pointer hover:bg-black/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="mt-2 text-base">Select a TSX file to upload</span>
            <input 
              type="file" 
              className="hidden" 
              accept=".tsx" 
              onChange={onFileUpload}
              disabled={isUploading}
            />
          </label>
          {uploadStatus && (
            <div className={`text-center p-2 rounded-lg ${uploadStatus.includes('Error') ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
              {uploadStatus}
            </div>
          )}
        </div>
      </div>

      {/* Component Management Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-300 font-semibold">Available Components</label>
          <div className="flex items-center space-x-2">
            {components.length > 0 && (
              <span className="text-sm text-gray-400">{components.length} component{components.length !== 1 ? 's' : ''}</span>
            )}
            {(onDeleteComponent || onDeleteMultipleComponents) && components.length > 0 && (
              <button
                onClick={() => componentsToDelete.length === 0 ? selectAllComponents() : deselectAllComponents()}
                className="text-sm text-blue-400 hover:text-blue-300"
                disabled={isLoading || isDeleting}
              >
                {componentsToDelete.length === 0 ? 'Select All' : 'Deselect All'}
              </button>
            )}
            {onDeleteMultipleComponents && componentsToDelete.length > 0 && (
              <button
                onClick={handleBatchDeleteClick}
                className="text-sm px-2 py-1 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded transition-colors"
                disabled={isLoading || isDeleting}
              >
                Delete Selected ({componentsToDelete.length})
              </button>
            )}
          </div>
        </div>
        
        {components.length > 0 ? (
          <div className="bg-black/30 border border-white/20 rounded-lg overflow-hidden">
            <ul className="divide-y divide-white/10">
              {components.map((component) => (
                <li 
                  key={component.file} 
                  className={`flex items-center justify-between p-3 hover:bg-black/20 ${
                    componentsToDelete.includes(component.file) ? 'bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-center flex-1">
                    {(onDeleteComponent || onDeleteMultipleComponents) && (
                      <div className="mr-3">
                        <input
                          type="checkbox"
                          checked={componentsToDelete.includes(component.file)}
                          onChange={() => toggleComponentSelection(component.file)}
                          className="h-4 w-4 bg-black/30 border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 rounded"
                          disabled={isLoading || isDeleting}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-gray-200 font-medium">{component.componentName}</p>
                      <p className="text-gray-400 text-sm truncate">{component.file}</p>
                    </div>
                  </div>
                  {onDeleteComponent && (
                    <button
                      onClick={() => handleDeleteClick(component.file)}
                      className="ml-2 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete component"
                      disabled={isLoading || isDeleting}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-black/30 border border-white/20 rounded-lg p-4 text-center text-gray-400">
            No components available. Upload TSX files to get started.
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-white/10">
            <h3 className="text-xl font-semibold text-red-400 mb-2">Confirm Deletion</h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete this component? This action cannot be undone.
            </p>
            {componentToDelete && (
              <div className="bg-black/30 p-3 rounded-lg mb-4 border border-white/10">
                <p className="text-gray-200 font-medium">
                  {components.find(c => c.file === componentToDelete)?.componentName}
                </p>
                <p className="text-gray-400 text-sm truncate">{componentToDelete}</p>
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors ${
                  isDeleting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Delete Confirmation Dialog */}
      {showBatchDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-white/10">
            <h3 className="text-xl font-semibold text-red-400 mb-2">Confirm Batch Deletion</h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete {componentsToDelete.length} component{componentsToDelete.length !== 1 ? 's' : ''}? 
              This action cannot be undone.
            </p>
            <div className="bg-black/30 p-3 rounded-lg mb-4 border border-white/10 max-h-40 overflow-y-auto">
              {componentsToDelete.map(file => {
                const component = components.find(c => c.file === file);
                return (
                  <div key={file} className="mb-2 last:mb-0">
                    <p className="text-gray-200 font-medium">{component?.componentName}</p>
                    <p className="text-gray-400 text-sm truncate">{file}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelBatchDelete}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmBatchDelete}
                className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors ${
                  isDeleting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : `Delete ${componentsToDelete.length} Component${componentsToDelete.length !== 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">Select Components for Export</label>
        <select
          className="w-full p-2 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          value={selectedComponents.map(c => c.file)}
          onChange={handleComponentSelection}
          disabled={isLoading || components.length === 0}
          multiple
          size={Math.min(5, components.length || 1)}
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
        <p className="mt-1 text-sm text-gray-400">Hold Ctrl/Cmd to select multiple components</p>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">Output File Name</label>
        <input
          type="text"
          className="w-full p-2 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          value={outputFileName}
          onChange={(e) => setOutputFileName(e.target.value)}
          placeholder="output.pdf"
          disabled={isLoading}
        />
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Width</label>
          <input
            type="number"
            className="w-full p-2 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            value={options.width}
            onChange={(e) => {
              const numericValue = parseInt(e.target.value, 10);
              setOptions({
                ...options, 
                width: isNaN(numericValue) ? 0 : numericValue,
                widthPreset: 'custom' // Switch to custom preset when manually changing width
              });
            }}
            min="0"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Width Preset</label>
          <select
            className="w-full p-2 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            value={options.widthPreset}
            onChange={(e) => {
              const preset = e.target.value;
              let width = options.width;
              
              // Set width based on preset
              switch(preset) {
                case 'iPhone':
                  width = 390; // iPhone 12/13/14 width in points
                  break;
                case 'A4':
                  width = 794; // A4 width in points (72dpi)
                  break;
                case 'MacBook':
                  width = 1440; // MacBook Pro 14" width
                  break;
                case 'custom':
                  // Keep current width
                  break;
              }
              
              setOptions({...options, widthPreset: preset, width});
            }}
            disabled={isLoading}
          >
            <option value="iPhone">iPhone</option>
            <option value="A4">A4</option>
            <option value="MacBook">MacBook</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Margin (px)</label>
          <input
            type="number"
            className="w-full p-2 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
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
            className="mr-2 h-4 w-4 bg-black/30 border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 rounded"
            checked={options.autoSize}
            onChange={(e) => setOptions({...options, autoSize: e.target.checked})}
            disabled={isLoading}
          />
          <label htmlFor="autoSize" className="text-gray-300">Auto-size PDF to content</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="debug"
            className="mr-2 h-4 w-4 bg-black/30 border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 rounded"
            checked={options.debug}
            onChange={(e) => setOptions({...options, debug: e.target.checked})}
            disabled={isLoading}
          />
          <label htmlFor="debug" className="text-gray-300">Debug mode (keep temp files)</label>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          className={`px-6 py-2.5 rounded-lg font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 ${
            isLoading || selectedComponents.length === 0
              ? 'bg-blue-600/50 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-600/30'
          }`}
          onClick={handleExport}
          disabled={isLoading || selectedComponents.length === 0}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exporting...
            </span>
          ) : 'Export to PDF'}
        </button>
      </div>
      
      {exportMessage && (
        <div className={`mt-4 p-3 rounded-lg ${exportMessage.includes('successful') ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300'}`}>
          {exportMessage}
        </div>
      )}
    </div>
  );
};

export default ConfigurationPane; 