import React from 'react';
import { Box, ArrowRight, ChevronRight, Workflow, BarChart3, Layers, Compass, Cpu, ExternalLink, Code, MessageSquare, Loader, PenTool, Wrench, Brain, GraduationCap, Share2, RefreshCw, ShieldCheck } from 'lucide-react';

// A non-interactive visual component comparing OpenAI Agents SDK and Google ADK
const AgentBuildingKitsComparison = () => {
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-violet-50 to-violet-100/40 p-6 rounded-lg">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-violet-500 bg-clip-text text-transparent">
          AI Agent Building Toolkits
        </h1>
        <p className="text-gray-600 mt-2">
          Frameworks that enable autonomous AI agents to reason, use tools, and complete tasks
        </p>
      </div>
      
      {/* What are Agent Building Toolkits */}
      <div className="bg-white/80 rounded-lg p-5 shadow-sm border border-violet-100 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-violet-100 p-2 rounded-full">
            <Brain size={24} className="text-violet-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">What are Agent Building Toolkits?</h2>
        </div>
        <div className="pl-12 text-gray-600">
          <p className="mb-3">
            Agent building toolkits provide developers with the framework and tools to create AI assistants that can:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="flex items-start gap-2">
              <ChevronRight size={18} className="text-violet-500 mt-1 flex-shrink-0" />
              <span>Make decisions based on reasoning</span>
            </div>
            <div className="flex items-start gap-2">
              <ChevronRight size={18} className="text-violet-500 mt-1 flex-shrink-0" />
              <span>Execute functions and use external tools</span>
            </div>
            <div className="flex items-start gap-2">
              <ChevronRight size={18} className="text-violet-500 mt-1 flex-shrink-0" />
              <span>Coordinate with other agents</span>
            </div>
            <div className="flex items-start gap-2">
              <ChevronRight size={18} className="text-violet-500 mt-1 flex-shrink-0" />
              <span>Operate with appropriate guardrails</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comparison Table Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-1 bg-transparent"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center bg-blue-50 w-14 h-14 rounded-full mb-2 shadow-sm">
            <Box size={28} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-blue-700">OpenAI Agents SDK</h3>
          <p className="text-sm text-gray-500">Minimalist & Python-First</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center bg-emerald-50 w-14 h-14 rounded-full mb-2 shadow-sm">
            <Compass size={28} className="text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-emerald-700">Google ADK</h3>
          <p className="text-sm text-gray-500">Full-Stack & Enterprise-Ready</p>
        </div>
      </div>
      
      {/* Comparison Items */}
      {/* Design Philosophy */}
      <div className="bg-white/80 rounded-lg shadow-sm border border-violet-100 mb-5 overflow-hidden">
        <div className="flex items-center gap-2 bg-violet-50 p-3 border-b border-violet-100">
          <PenTool size={20} className="text-violet-600" />
          <h3 className="font-bold text-gray-800">Design Philosophy</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-violet-100">
          <div className="p-4 flex items-center justify-center">
            <h4 className="font-semibold text-violet-800">Core Approach</h4>
          </div>
          <div className="p-4 text-gray-700">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>Minimalist design with few core abstractions</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>Python-first approach with normal code structures</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>Optimized for rapid prototyping & quick learning</span>
              </li>
            </ul>
          </div>
          <div className="p-4 text-gray-700">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>Comprehensive framework for complex agent systems</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>Modular architecture with high-level abstractions</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>End-to-end solution from development to deployment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Core Architecture */}
      <div className="bg-white/80 rounded-lg shadow-sm border border-violet-100 mb-5 overflow-hidden">
        <div className="flex items-center gap-2 bg-violet-50 p-3 border-b border-violet-100">
          <Layers size={20} className="text-violet-600" />
          <h3 className="font-bold text-gray-800">Core Architecture</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-violet-100">
          <div className="p-4 flex items-center justify-center">
            <h4 className="font-semibold text-violet-800">Key Components</h4>
          </div>
          <div className="p-4 text-gray-700">
            <ul className="space-y-3">
              <li className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Cpu size={16} className="text-blue-600" />
                  </div>
                  <span className="font-medium">Agent</span>
                </div>
                <span className="text-sm ml-10">LLM with a specific persona & tools</span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Wrench size={16} className="text-blue-600" />
                  </div>
                  <span className="font-medium">Tools</span>
                </div>
                <span className="text-sm ml-10">Python functions with auto schema generation</span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <ArrowRight size={16} className="text-blue-600" />
                  </div>
                  <span className="font-medium">Handoffs</span>
                </div>
                <span className="text-sm ml-10">Delegation mechanism between agents</span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={16} className="text-blue-600" />
                  </div>
                  <span className="font-medium">Guardrails</span>
                </div>
                <span className="text-sm ml-10">Validation checks for safety & policy</span>
              </li>
            </ul>
          </div>
          <div className="p-4 text-gray-700">
            <ul className="space-y-3">
              <li className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Cpu size={16} className="text-emerald-600" />
                  </div>
                  <span className="font-medium">Multiple Agent Types</span>
                </div>
                <span className="text-sm ml-10">LLM Agent, Sequential, Parallel & Loop</span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <ExternalLink size={16} className="text-emerald-600" />
                  </div>
                  <span className="font-medium">Connectors & Tools</span>
                </div>
                <span className="text-sm ml-10">100+ pre-built integrations with systems</span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Workflow size={16} className="text-emerald-600" />
                  </div>
                  <span className="font-medium">Orchestration Engine</span>
                </div>
                <span className="text-sm ml-10">Advanced coordination of multi-agent systems</span>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={16} className="text-emerald-600" />
                  </div>
                  <span className="font-medium">Memory & State</span>
                </div>
                <span className="text-sm ml-10">Explicit state management across interactions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Integration Capabilities */}
      <div className="bg-white/80 rounded-lg shadow-sm border border-violet-100 mb-5 overflow-hidden">
        <div className="flex items-center gap-2 bg-violet-50 p-3 border-b border-violet-100">
          <Share2 size={20} className="text-violet-600" />
          <h3 className="font-bold text-gray-800">Integration Capabilities</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-violet-100">
          <div className="p-4 flex items-center justify-center">
            <h4 className="font-semibold text-violet-800">Tools & Systems</h4>
          </div>
          <div className="p-4 text-gray-700">
            <div className="mb-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Wrench size={16} className="text-blue-600" />
                <span className="font-medium">Tool Integration</span>
              </div>
              <p className="text-sm ml-6">Any Python function becomes a tool with automatic schema generation</p>
            </div>
            <div className="mb-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Code size={16} className="text-blue-600" />
                <span className="font-medium">Model Compatibility</span>
              </div>
              <p className="text-sm ml-6">Works with any model supporting OpenAI's Chat Completion format</p>
            </div>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 size={16} className="text-blue-600" />
                <span className="font-medium">Monitoring</span>
              </div>
              <p className="text-sm ml-6">Built-in tracing viewed in OpenAI dashboard</p>
            </div>
          </div>
          <div className="p-4 text-gray-700">
            <div className="mb-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <ExternalLink size={16} className="text-emerald-600" />
                <span className="font-medium">Enterprise Connectors</span>
              </div>
              <p className="text-sm ml-6">100+ pre-built connectors to DBs, APIs, and cloud services</p>
            </div>
            <div className="mb-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Code size={16} className="text-emerald-600" />
                <span className="font-medium">Model Flexibility</span>
              </div>
              <p className="text-sm ml-6">Optimized for Google Gemini but supports any LLM</p>
            </div>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <Workflow size={16} className="text-emerald-600" />
                <span className="font-medium">Developer Tools</span>
              </div>
              <p className="text-sm ml-6">CLI, local web UI, and cloud deployment options</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Multi-Agent Support */}
      <div className="bg-white/80 rounded-lg shadow-sm border border-violet-100 mb-5 overflow-hidden">
        <div className="flex items-center gap-2 bg-violet-50 p-3 border-b border-violet-100">
          <RefreshCw size={20} className="text-violet-600" />
          <h3 className="font-bold text-gray-800">Multi-Agent Support</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-violet-100">
          <div className="p-4 flex items-center justify-center">
            <h4 className="font-semibold text-violet-800">Collaboration Approach</h4>
          </div>
          <div className="p-4 text-gray-700">
            <div className="bg-blue-50/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight size={18} className="text-blue-600" />
                <span className="font-medium">Sequential Handoffs</span>
              </div>
              <p className="text-sm">One agent delegates to another via handoff mechanism</p>
              <div className="flex flex-col items-center mt-3 bg-white/70 p-2 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Cpu size={16} className="text-blue-600" />
                  </div>
                  <ArrowRight size={16} className="text-blue-400" />
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Cpu size={16} className="text-blue-600" />
                  </div>
                </div>
                <span className="text-xs text-gray-500">Dynamic, LLM-driven delegation</span>
              </div>
            </div>
          </div>
          <div className="p-4 text-gray-700">
            <div className="bg-emerald-50/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Workflow size={18} className="text-emerald-600" />
                <span className="font-medium">Structured Coordination</span>
              </div>
              <p className="text-sm">Multiple patterns for agent interaction and orchestration</p>
              <div className="flex flex-col items-center mt-3 bg-white/70 p-2 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Cpu size={16} className="text-emerald-600" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Cpu size={16} className="text-emerald-600" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Cpu size={16} className="text-emerald-600" />
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Parallel, sequential, hierarchical patterns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Future Extensibility */}
      <div className="bg-white/80 rounded-lg shadow-sm border border-violet-100 mb-5 overflow-hidden">
        <div className="flex items-center gap-2 bg-violet-50 p-3 border-b border-violet-100">
          <GraduationCap size={20} className="text-violet-600" />
          <h3 className="font-bold text-gray-800">Future Extensibility</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-violet-100">
          <div className="p-4 flex items-center justify-center">
            <h4 className="font-semibold text-violet-800">Growth Potential</h4>
          </div>
          <div className="p-4 text-gray-700">
            <div className="flex items-start gap-2 mb-2">
              <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium">Open-source</span>
                <p className="text-sm">Small codebase that's easy to modify or extend</p>
              </div>
            </div>
            <div className="flex items-start gap-2 mb-2">
              <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium">OpenAI model improvements</span>
                <p className="text-sm">Immediate access to new model capabilities</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium">Minimalist ethos</span>
                <p className="text-sm">Growth focused on refinement over complexity</p>
              </div>
            </div>
          </div>
          <div className="p-4 text-gray-700">
            <div className="flex items-start gap-2 mb-2">
              <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium">Modular architecture</span>
                <p className="text-sm">Many extension points for customization</p>
              </div>
            </div>
            <div className="flex items-start gap-2 mb-2">
              <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium">Agent2Agent protocol ready</span>
                <p className="text-sm">Positioned for cross-framework communication</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <span className="font-medium">Enterprise integration focus</span>
                <p className="text-sm">Expanding connectors to business systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Best For Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="bg-blue-50/70 p-5 rounded-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Box size={20} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-blue-800">OpenAI Agents SDK Best For</h3>
          </div>
          <ul className="space-y-2 pl-10">
            <li className="flex items-start gap-2">
              <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Quick prototyping & experimentation</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Python developers familiar with OpenAI's ecosystem</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Projects needing minimal setup & abstractions</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Conversational tool-using agents</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-emerald-50/70 p-5 rounded-lg border border-emerald-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Compass size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-emerald-800">Google ADK Best For</h3>
          </div>
          <ul className="space-y-2 pl-10">
            <li className="flex items-start gap-2">
              <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Enterprise-grade agent systems</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Complex multi-agent orchestration</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Integration with existing business systems</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Production deployment in Google Cloud</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-violet-50/70 p-3 rounded-lg text-center text-xs text-gray-500 mt-3">
        <p>Agent building technology is rapidly evolving - comparison based on data as of April 2025</p>
      </div>
      
    </div>
  );
};

export default AgentBuildingKitsComparison;