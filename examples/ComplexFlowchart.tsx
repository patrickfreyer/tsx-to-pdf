import React from 'react';
import { BrainCircuit, Database, Code, ArrowRight, BarChart4, MessageSquare, Shield, Lock } from 'lucide-react';

const ProcessVisualization = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">How Claude Uses MCP to Access Your Data Securely</h2>
      
      <div className="flex flex-col w-full max-w-4xl">
        {/* Step 1: Question to Claude */}
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
            <MessageSquare size={32} className="text-indigo-600" />
          </div>
          <div className="ml-4 bg-white p-4 rounded-lg shadow-sm flex-grow">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">1. Your Question</h3>
            <p className="text-gray-600 text-sm">
              You ask Claude a business question in plain English, without needing to know SQL
            </p>
            <div className="mt-2 bg-gray-100 p-2 rounded text-xs italic text-gray-700">
              "What were our top-performing products by region last quarter?"
            </div>
          </div>
        </div>
        
        <div className="flex justify-center my-1">
          <ArrowRight className="text-indigo-400" size={20} />
        </div>
        
        {/* Step 2: MCP Architecture */}
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
            <Shield size={32} className="text-green-600" />
          </div>
          <div className="ml-4 bg-white p-4 rounded-lg shadow-sm flex-grow">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">2. Model Context Protocol (MCP)</h3>
            <p className="text-gray-600 text-sm">
              Claude connects to your database through MCP, an open protocol that standardizes how AI models access external data sources securely
            </p>
            <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded bg-indigo-100 text-xs">
                  <div className="font-bold text-indigo-800 mb-1">Claude (MCP Host)</div>
                  <div className="text-indigo-600">Processes your question</div>
                </div>
                <ArrowRight className="text-green-500 mx-1" size={16} />
                <div className="p-2 rounded bg-green-100 text-xs">
                  <div className="font-bold text-green-800 mb-1">MCP Client</div>
                  <div className="text-green-600">Maintains connection</div>
                </div>
                <ArrowRight className="text-green-500 mx-1" size={16} />
                <div className="p-2 rounded bg-blue-100 text-xs">
                  <div className="font-bold text-blue-800 mb-1">MCP Server</div>
                  <div className="text-blue-600">Accesses your database</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center my-1">
          <ArrowRight className="text-indigo-400" size={20} />
        </div>
        
        {/* Step 3: SQL Generation via MCP */}
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
            <Code size={32} className="text-indigo-600" />
          </div>
          <div className="ml-4 bg-white p-4 rounded-lg shadow-sm flex-grow">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">3. SQL Query Generation</h3>
            <p className="text-gray-600 text-sm">
              Claude crafts SQL queries and sends them through the MCP server, which securely executes them on your database
            </p>
            <div className="mt-2 bg-gray-100 p-2 rounded text-xs font-mono text-gray-700">
              SELECT product_name, region, SUM(revenue) as total_revenue<br/>
              FROM sales<br/>
              WHERE quarter = 'Q4'<br/>
              GROUP BY product_name, region<br/>
              ORDER BY total_revenue DESC
            </div>
          </div>
        </div>
        
        <div className="flex justify-center my-1">
          <ArrowRight className="text-indigo-400" size={20} />
        </div>
        
        {/* Step 4: Security Benefits */}
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
            <Lock size={32} className="text-indigo-600" />
          </div>
          <div className="ml-4 bg-white p-4 rounded-lg shadow-sm flex-grow">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">4. Data Security</h3>
            <p className="text-gray-600 text-sm">
              Your data remains within your infrastructure. The MCP server follows best practices for securing your data:
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="bg-green-100 p-2 rounded text-xs text-green-800">
                <span className="font-bold">✓ Data doesn't leave your system</span>
              </div>
              <div className="bg-green-100 p-2 rounded text-xs text-green-800">
                <span className="font-bold">✓ Controlled access permissions</span>
              </div>
              <div className="bg-green-100 p-2 rounded text-xs text-green-800">
                <span className="font-bold">✓ Query validation & sanitization</span>
              </div>
              <div className="bg-green-100 p-2 rounded text-xs text-green-800">
                <span className="font-bold">✓ Standardized security protocols</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center my-1">
          <ArrowRight className="text-indigo-400" size={20} />
        </div>
        
        {/* Step 5: Query Refinement */}
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
            <BrainCircuit size={32} className="text-indigo-600" />
          </div>
          <div className="ml-4 bg-white p-4 rounded-lg shadow-sm flex-grow">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">5. Iterative Refinement</h3>
            <p className="text-gray-600 text-sm">
              Claude iteratively improves queries through the MCP connection until it gets comprehensive results
            </p>
            <div className="mt-2 flex flex-col space-y-1">
              <div className="bg-red-100 p-1 rounded text-xs text-red-700">Initial Query: Missing product categories</div>
              <div className="bg-yellow-100 p-1 rounded text-xs text-yellow-700">Refined Query: Added year-over-year comparison</div>
              <div className="bg-green-100 p-1 rounded text-xs text-green-700">Final Query: Complete data retrieved ✓</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center my-1">
          <ArrowRight className="text-indigo-400" size={20} />
        </div>
        
        {/* Step 6: Visualization */}
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
            <BarChart4 size={32} className="text-indigo-600" />
          </div>
          <div className="ml-4 bg-white p-4 rounded-lg shadow-sm flex-grow">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">6. Interactive Dashboard</h3>
            <p className="text-gray-600 text-sm">
              The MCP server returns data to Claude, which transforms it into interactive visualizations and insights
            </p>
            <div className="mt-2 flex justify-center">
              <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100 w-full">
                <div className="text-xs font-semibold mb-2 text-center">Top Products by Region (Q4)</div>
                <div className="h-24 flex items-end justify-around">
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-indigo-500 h-20 rounded-t"></div>
                    <div className="text-xs text-gray-600 mt-1">Product A</div>
                    <div className="text-xs text-gray-500">North</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-indigo-600 h-16 rounded-t"></div>
                    <div className="text-xs text-gray-600 mt-1">Product B</div>
                    <div className="text-xs text-gray-500">East</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-indigo-700 h-12 rounded-t"></div>
                    <div className="text-xs text-gray-600 mt-1">Product C</div>
                    <div className="text-xs text-gray-500">West</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 bg-indigo-800 h-8 rounded-t"></div>
                    <div className="text-xs text-gray-600 mt-1">Product D</div>
                    <div className="text-xs text-gray-500">South</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-indigo-100 rounded-lg border border-indigo-200 max-w-lg">
        <p className="text-indigo-800 text-center text-sm">
          <strong>Think of MCP like a USB-C port for AI applications</strong> — just as USB-C provides a standardized way to connect devices to peripherals, MCP provides a standardized way to connect AI models to different data sources and tools
        </p>
      </div>
    </div>
  );
};

export default ProcessVisualization;
