
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">TSX to PDF Dev Server</h1>
      <p className="mb-4">This server hosts the TSX components for conversion to PDF.</p>
      <h2 className="text-xl font-semibold mb-4">Available Components:</h2>
      <ul className="list-disc pl-6">
        <li><a href="/ComplexFlowchart" className="text-blue-600 hover:underline">ComplexFlowchart</a></li>
        <li><a href="/ExampleSlide" className="text-blue-600 hover:underline">ExampleSlide</a></li>
        <li><a href="/ThinkingLlmVisualization" className="text-blue-600 hover:underline">thinking-llm-visualization</a></li>
      </ul>
    </div>
  </React.StrictMode>
);
  