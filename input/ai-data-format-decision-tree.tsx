import React from 'react';
import { Database, FileSpreadsheet, FileText } from 'lucide-react';

const DecisionTree = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto font-sans">
      <h2 className="text-2xl font-bold text-center mb-8">AI Data Format Decision Tree</h2>
      
      {/* Tree Structure */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          {/* Tree Visualization */}
          <svg width="700" height="340" viewBox="0 0 700 340">
            {/* Root to First Level Connections */}
            <line x1="350" y1="50" x2="175" y2="130" stroke="#666" strokeWidth="2" />
            <line x1="350" y1="50" x2="350" y2="130" stroke="#666" strokeWidth="2" />
            <line x1="350" y1="50" x2="525" y2="130" stroke="#666" strokeWidth="2" />
            
            {/* First Level to Second Level Connections */}
            <line x1="175" y1="170" x2="175" y2="240" stroke="#666" strokeWidth="2" />
            <line x1="350" y1="170" x2="350" y2="240" stroke="#666" strokeWidth="2" />
            <line x1="525" y1="170" x2="525" y2="240" stroke="#666" strokeWidth="2" />
          </svg>
          
          {/* Tree Nodes */}
          {/* Root Node */}
          <div className="absolute top-6 left-0 w-full flex justify-center">
            <div className="bg-blue-100 border-2 border-blue-400 rounded-lg px-6 py-3 text-center font-medium w-64">
              What is your data like?
            </div>
          </div>
          
          {/* First Level Nodes */}
          <div className="absolute" style={{ top: "130px", left: "45px" }}>
            <div className="bg-green-100 border-2 border-green-400 rounded-lg px-6 py-3 text-center font-medium w-64">
              Large data
            </div>
          </div>
          
          <div className="absolute" style={{ top: "130px", left: "220px" }}>
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg px-6 py-3 text-center font-medium w-64">
              Limited size, quantitative
            </div>
          </div>
          
          <div className="absolute" style={{ top: "130px", left: "395px" }}>
            <div className="bg-red-100 border-2 border-red-400 rounded-lg px-6 py-3 text-center font-medium w-64">
              Limited size, text-heavy
            </div>
          </div>
          
          {/* Second Level Nodes */}
          <div className="absolute" style={{ top: "240px", left: "45px" }}>
            <div className="bg-purple-100 border-2 border-purple-400 rounded-lg px-6 py-3 text-center font-medium w-64 flex items-center justify-center">
              <Database className="mr-2 h-5 w-5 text-purple-600" />
              <span>SQL Database with MCP</span>
            </div>
          </div>
          
          <div className="absolute" style={{ top: "240px", left: "220px" }}>
            <div className="bg-orange-100 border-2 border-orange-400 rounded-lg px-6 py-3 text-center font-medium w-64 flex items-center justify-center">
              <FileSpreadsheet className="mr-2 h-5 w-5 text-orange-600" />
              <span>CSV with context prompt</span>
            </div>
          </div>
          
          <div className="absolute" style={{ top: "240px", left: "395px" }}>
            <div className="bg-teal-100 border-2 border-teal-400 rounded-lg px-6 py-3 text-center font-medium w-64 flex items-center justify-center">
              <FileText className="mr-2 h-5 w-5 text-teal-600" />
              <span>TXT file or PDF</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Explanations */}
      <div className="mt-8 space-y-6">
        <div className="border-l-4 border-purple-400 pl-4">
          <h3 className="font-bold text-lg mb-2 flex items-center">
            <Database className="mr-2 h-5 w-5 text-purple-600" />
            SQL Database with MCP
          </h3>
          <p className="text-gray-700">
            <strong>When to use:</strong> For large datasets that can't be efficiently processed all at once.
          </p>
          <p className="text-gray-700">
            <strong>Why:</strong> SQL databases allow you to query specific subsets of data, reducing memory 
            usage and processing time. Multi-Context Processing (MCP) enables AI to efficiently work with 
            these large datasets by retrieving only the relevant information needed for a particular task.
          </p>
          <p className="text-gray-700">
            <strong>Benefits:</strong> Handles massive datasets, enables complex queries, maintains data 
            integrity, and optimizes performance when working with AI systems.
          </p>
        </div>
        
        <div className="border-l-4 border-orange-400 pl-4">
          <h3 className="font-bold text-lg mb-2 flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5 text-orange-600" />
            CSV with Context Prompt
          </h3>
          <p className="text-gray-700">
            <strong>When to use:</strong> For limited-size datasets that are primarily numerical or structured.
          </p>
          <p className="text-gray-700">
            <strong>Why:</strong> CSV files provide a simple, tabular format that's easy for AI models to 
            parse and process. The context prompt explains the meaning of columns and relationships, 
            helping the AI understand how to interpret the data correctly.
          </p>
          <p className="text-gray-700">
            <strong>Benefits:</strong> Lightweight, widely compatible, easy to manipulate, and works well 
            with quantitative analysis tasks when accompanied by explanatory context.
          </p>
        </div>
        
        <div className="border-l-4 border-teal-400 pl-4">
          <h3 className="font-bold text-lg mb-2 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-teal-600" />
            TXT File or PDF
          </h3>
          <p className="text-gray-700">
            <strong>When to use:</strong> For limited-size datasets that are primarily text-based or document-oriented.
          </p>
          <p className="text-gray-700">
            <strong>Why:</strong> Text files and PDFs preserve the natural flow and formatting of text-heavy content. 
            This helps AI models understand the context, structure, and relationships within documents 
            better than stripped-down formats would.
          </p>
          <p className="text-gray-700">
            <strong>Benefits:</strong> Maintains document structure, preserves formatting important for context, 
            and works well for natural language processing tasks requiring semantic understanding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
