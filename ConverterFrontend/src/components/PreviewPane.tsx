import React, { useState, useEffect } from 'react';

interface Component {
  file: string;
  componentName: string;
  routeName: string;
}

interface PreviewPaneProps {
  selectedComponents: Component[];
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ selectedComponents }) => {
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    // Set the first component as active when the selection changes
    if (selectedComponents.length > 0 && (!activeTab || !selectedComponents.some(c => c.file === activeTab))) {
      setActiveTab(selectedComponents[0].file); 
    }
  }, [selectedComponents, activeTab]);

  if (selectedComponents.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-black/20 rounded-lg border border-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-300 text-lg font-medium">No components selected</p>
        <p className="text-gray-400 text-sm mt-2">Select a component from the configuration panel</p>
      </div>
    );
  }

  const activeComponent = selectedComponents.find(c => c.file === activeTab);

  return (
    <div className="h-full flex flex-col">
      {/* Tabs for multiple components */}
      {selectedComponents.length > 1 && (
        <div className="flex border-b border-white/20 mb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {selectedComponents.map((component) => (
            <button
              key={component.file}
              className={`py-1.5 px-3 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === component.file
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab(component.file)}
            >
              {component.componentName}
            </button>
          ))}
        </div>
      )}

      {/* Preview iframe with loading indicator */}
      <div className="flex-grow relative bg-black/30 rounded-lg overflow-hidden">
        {activeComponent && (
          <>
            <div className="absolute top-0 left-0 right-0 h-6 bg-black/40 flex items-center px-3 text-xs text-gray-300">
              <div className="flex space-x-1.5 mr-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="opacity-70">Preview: {activeComponent.componentName}</span>
            </div>
            <div className="pt-6 h-full">
              <iframe
                src={`http://localhost:5174/${activeComponent.routeName}`}
                className="w-full h-full border-0 bg-white"
                title={`Preview of ${activeComponent.componentName}`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PreviewPane; 