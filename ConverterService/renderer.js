import React from 'react';
import { createRoot } from 'react-dom/client';

// This file is the entry point for webpack
// It will be used to render the TSX components to HTML

// The actual component will be injected at build time
// This is just a placeholder that will be replaced
const renderComponent = (Component) => {
  const root = createRoot(document.getElementById('root'));
  root.render(React.createElement(Component));
};

// Expose the render function to the global scope
// This allows us to call it from the browser context
window.renderTsxComponent = renderComponent;

// Export for webpack
export { renderComponent }; 