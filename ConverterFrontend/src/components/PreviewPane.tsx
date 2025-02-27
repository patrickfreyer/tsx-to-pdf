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
      <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No components selected for preview</p>
      </div>
    );
  }

  const activeComponent = selectedComponents.find(c => c.file === activeTab);

  return (
    <div className="h-full flex flex-col">
      {/* Tabs for multiple components */}
      {selectedComponents.length > 1 && (
        <div className="flex border-b">
          {selectedComponents.map((component) => (
            <button
              key={component.file}
              className={`py-2 px-4 font-medium ${
                activeTab === component.file
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(component.file)}
            >
              {component.componentName}
            </button>
          ))}
        </div>
      )}

      {/* Preview iframe */}
      <div className="flex-grow">
        {activeComponent && (
          <iframe
            src={`http://localhost:5174/${activeComponent.routeName}`}
            className="w-full h-full border-0"
            title={`Preview of ${activeComponent.componentName}`}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPane; 