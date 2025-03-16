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
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'files'>('export');
  const [outputFileName, setOutputFileName] = useState<string>('output.pdf');
  const [options, setOptions] = useState<ExportOptions>({
    width: 390, // iPhone width
    widthPreset: 'iPhone',
    margin: 0,
    autoSize: true,
    debug: false,
  });

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

  return (
    <div className="h-full flex flex-col flex-grow text-gray-200">
      {/* Tabs */}
      <div className="flex border-b border-white/20 mb-4">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'export' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('export')}
        >
          Export Configuration
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'files' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('files')}
        >
          Output Files
        </button>
      </div>
      
      {activeTab === 'export' ? (
        <>
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

          <div className="mb-6">
            <label className="block text-gray-300 font-semibold mb-2">Select Components</label>
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
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-300">Output Files</h2>
            <button
              className="text-sm bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 py-1.5 px-3 rounded-lg transition-colors"
              onClick={onRefreshOutputFiles || (() => {})}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </span>
            </button>
          </div>
          
          {outputFiles.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-lg border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-400">No output files found</p>
              <p className="text-gray-500 text-sm mt-1">Export a component to create a PDF file</p>
            </div>
          ) : (
            <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-black/30">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      File Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {outputFiles.map((file) => (
                    <tr key={file.file} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                        {file.file}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {file.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {file.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={`/output/${file.file}`}
                          target="_blank"
                          className="text-blue-400 hover:text-blue-300 mr-4 transition-colors"
                        >
                          View
                        </a>
                        <a
                          href={`/output/${file.file}`}
                          download
                          className="text-emerald-400 hover:text-emerald-300 transition-colors"
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
  );
};

export default ConfigurationPane; 