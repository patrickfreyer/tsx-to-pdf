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
  format: 'auto' | 'a4';
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
    format: 'auto',
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

  const toggleComponentSelection = (file: string) => {
    if (componentsToDelete.includes(file)) {
      setComponentsToDelete(componentsToDelete.filter(f => f !== file));
    } else {
      setComponentsToDelete([...componentsToDelete, file]);
    }
  };

  const toggleExportSelection = (component: Component) => {
    if (selectedComponents.some(c => c.file === component.file)) {
      setSelectedComponents(selectedComponents.filter(c => c.file !== component.file));
    } else {
      setSelectedComponents([...selectedComponents, component]);
    }
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

      {/* Export Options Section */}
      <div className="mb-6 p-4 bg-black/20 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold mb-4 text-blue-300">Export Options</h3>
        
        {/* Format Selection */}
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-2">Format</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`p-3 rounded-lg border ${
                options.format === 'auto'
                  ? 'bg-blue-600/30 border-blue-500/50 text-blue-300'
                  : 'bg-black/30 border-white/20 text-gray-300 hover:bg-black/40'
              }`}
              onClick={() => setOptions({ ...options, format: 'auto' })}
            >
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>Auto Height</span>
                <span className="text-xs opacity-70 mt-1">Adjusts to content</span>
              </div>
            </button>
            <button
              className={`p-3 rounded-lg border ${
                options.format === 'a4'
                  ? 'bg-blue-600/30 border-blue-500/50 text-blue-300'
                  : 'bg-black/30 border-white/20 text-gray-300 hover:bg-black/40'
              }`}
              onClick={() => setOptions({ ...options, format: 'a4' })}
            >
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z M16 3v7M8 3v7M3 8h18" />
                </svg>
                <span>A4 Pages</span>
                <span className="text-xs opacity-70 mt-1">Split into pages</span>
              </div>
            </button>
          </div>
        </div>

        {/* Width Selection - Only show if format is 'auto' */}
        {options.format === 'auto' && (
          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">Width Preset</label>
            <select
              value={options.widthPreset}
              onChange={(e) => {
                const width = {
                  iPhone: 390,
                  iPad: 820,
                  Desktop: 1200,
                  Custom: options.width,
                }[e.target.value] || options.width;
                
                setOptions({
                  ...options,
                  widthPreset: e.target.value,
                  width,
                });
              }}
              className="w-full p-2 bg-black/30 border border-white/20 rounded-lg text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="iPhone">iPhone (390px)</option>
              <option value="iPad">iPad (820px)</option>
              <option value="Desktop">Desktop (1200px)</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        )}

        {/* Custom Width Input - Only show if format is 'auto' and widthPreset is 'Custom' */}
        {options.format === 'auto' && options.widthPreset === 'Custom' && (
          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">Custom Width (px)</label>
            <input
              type="number"
              value={options.width}
              onChange={(e) => setOptions({ ...options, width: parseInt(e.target.value) || 0 })}
              className="w-full p-2 bg-black/30 border border-white/20 rounded-lg text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              min="100"
              max="2000"
            />
          </div>
        )}

        {/* Margin Input */}
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-2">Margin (px)</label>
          <input
            type="number"
            value={options.margin}
            onChange={(e) => setOptions({ ...options, margin: parseInt(e.target.value) || 0 })}
            className="w-full p-2 bg-black/30 border border-white/20 rounded-lg text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            min="0"
            max="100"
          />
        </div>

        {/* Debug Mode Toggle */}
        <div className="mb-4">
          <label className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              checked={options.debug}
              onChange={(e) => setOptions({ ...options, debug: e.target.checked })}
              className="h-4 w-4 bg-black/30 border-white/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 rounded"
            />
            <span>Debug Mode</span>
          </label>
        </div>
      </div>

      {/* Unified Component Management Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-300 font-semibold">Components</label>
          <div className="flex items-center space-x-2">
            {components.length > 0 && (
              <span className="text-sm text-gray-400">{components.length} component{components.length !== 1 ? 's' : ''}</span>
            )}
            {selectedComponents.length > 0 && (
              <span className="text-sm text-blue-400">{selectedComponents.length} selected for export</span>
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
                  } ${
                    selectedComponents.some(c => c.file === component.file) ? 'bg-green-900/20' : ''
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
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => toggleExportSelection(component)}
                    >
                      <div className="flex items-center">
                        <p className="text-gray-200 font-medium">{component.componentName}</p>
                        {selectedComponents.some(c => c.file === component.file) && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-green-900/50 text-green-300 rounded-full">
                            Selected for export
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm truncate">{component.file}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleExportSelection(component)}
                      className={`mr-2 p-1.5 ${
                        selectedComponents.some(c => c.file === component.file)
                          ? 'text-green-400 hover:text-green-300 hover:bg-green-900/30'
                          : 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30'
                      } rounded-lg transition-colors`}
                      title={selectedComponents.some(c => c.file === component.file) ? "Remove from export" : "Add to export"}
                      disabled={isLoading || isDeleting}
                    >
                      {selectedComponents.some(c => c.file === component.file) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </button>
                    {onDeleteComponent && (
                      <button
                        onClick={() => handleDeleteClick(component.file)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete component"
                        disabled={isLoading || isDeleting}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-black/30 border border-white/20 rounded-lg p-4 text-center text-gray-400">
            No components available. Upload TSX files to get started.
          </div>
        )}
        <p className="mt-1 text-sm text-gray-400">Click on a component to select/deselect it for export</p>
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

      {/* Export Button and Status */}
      <div className="mt-auto p-4 bg-black/20 rounded-xl border border-white/10">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={outputFileName}
              onChange={(e) => setOutputFileName(e.target.value)}
              placeholder="output.pdf"
              className="flex-1 p-2 bg-black/30 border border-white/20 rounded-lg text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleExport}
              disabled={isLoading || selectedComponents.length === 0}
              className={`px-6 py-2 rounded-lg font-medium ${
                isLoading || selectedComponents.length === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              {isLoading ? 'Exporting...' : 'Export'}
            </button>
          </div>
          {exportMessage && (
            <div className={`p-3 rounded-lg ${
              exportMessage.includes('failed') || exportMessage.includes('Error')
                ? 'bg-red-900/50 text-red-300'
                : 'bg-green-900/50 text-green-300'
            }`}>
              {exportMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPane; 