import React from 'react';
import Button from './components/Button';

const ButtonShowcase = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Button Component Showcase</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Button Colors</h2>
          <div className="flex flex-wrap gap-4">
            <Button text="Primary Button" color="primary" />
            <Button text="Secondary Button" color="secondary" />
            <Button text="Success Button" color="success" />
            <Button text="Danger Button" color="danger" />
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Button Usage Examples</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Form Submission</h3>
              <div className="flex gap-3">
                <Button text="Submit" color="primary" />
                <Button text="Cancel" color="secondary" />
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Confirmation Dialog</h3>
              <div className="flex gap-3">
                <Button text="Confirm" color="success" />
                <Button text="Delete" color="danger" />
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <footer className="mt-8 pt-4 border-t border-gray-200 text-gray-500 text-sm">
        <p>This component demonstrates importing and using a shared Button component.</p>
      </footer>
    </div>
  );
};

export default ButtonShowcase; 