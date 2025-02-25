import React from 'react';
import { ArrowRight, BrainCircuit, Lightbulb, GitBranch, CheckCircle, XCircle, Zap, Clock, Cpu, User, FileCode, Scale } from 'lucide-react';

const LLMComparisonVisualization = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl shadow-lg font-sans">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Thinking LLMs vs Normal LLMs</h1>
        <p className="text-lg text-slate-600">A comparison of architectures and capabilities</p>
      </header>
      
      {/* Basic Definition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Normal LLM Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-400">
          <div className="flex items-center mb-4">
            <Cpu className="text-amber-500 mr-3" size={28} />
            <h2 className="text-2xl font-semibold text-slate-800">Normal LLMs</h2>
          </div>
          <p className="text-slate-700 mb-3">
            Standard language models that generate text by predicting the next token based on patterns learned during training. 
            They produce output in a single forward pass through the model.
          </p>
          <p className="text-sm bg-amber-50 p-3 rounded-md text-amber-700 border border-amber-100">
            Examples: Earlier GPT models, most commercial LLMs, base language models before fine-tuning for reasoning
          </p>
        </div>
        
        {/* Thinking LLM Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <BrainCircuit className="text-blue-600 mr-3" size={28} />
            <h2 className="text-2xl font-semibold text-slate-800">Thinking LLMs</h2>
          </div>
          <p className="text-slate-700 mb-3">
            Enhanced language models that incorporate explicit reasoning processes before generating final responses.
            They employ structured thinking approaches with multiple deliberate steps.
          </p>
          <p className="text-sm bg-blue-50 p-3 rounded-md text-blue-700 border border-blue-100">
            Examples: Claude 3.7 Sonnet (reasoning mode), newer models focused on complex problem-solving and logical reasoning
          </p>
        </div>
      </div>
      
      {/* Process Comparison */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center mb-4">
          <GitBranch className="text-blue-600 mr-3" size={28} />
          <h2 className="text-2xl font-semibold text-blue-800">Generation Process Comparison</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Normal LLM Process */}
          <div>
            <h3 className="font-semibold text-amber-600 mb-4 text-lg">Normal LLM Process</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3 mt-1">
                  <span className="font-medium text-amber-700">1</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex-grow">
                  <p className="font-medium text-amber-800">Receive query input</p>
                  <p className="text-sm text-slate-600">Process the user's question or instruction</p>
                </div>
              </div>
              
              <div className="flex justify-center my-1">
                <ArrowRight size={20} className="transform rotate-90 text-amber-400" />
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3 mt-1">
                  <span className="font-medium text-amber-700">2</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex-grow">
                  <p className="font-medium text-amber-800">Generate tokens</p>
                  <p className="text-sm text-slate-600">Predict next tokens based on patterns from training data</p>
                </div>
              </div>
              
              <div className="flex justify-center my-1">
                <ArrowRight size={20} className="transform rotate-90 text-amber-400" />
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-3 mt-1">
                  <span className="font-medium text-amber-700">3</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex-grow">
                  <p className="font-medium text-amber-800">Produce output</p>
                  <p className="text-sm text-slate-600">Direct response without explicit intermediate steps</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thinking LLM Process */}
          <div>
            <h3 className="font-semibold text-blue-600 mb-4 text-lg">Thinking LLM Process</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <span className="font-medium text-blue-700">1</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex-grow">
                  <p className="font-medium text-blue-800">Analyze query</p>
                  <p className="text-sm text-slate-600">Deeply parse the problem requirements and context</p>
                </div>
              </div>
              
              <div className="flex justify-center my-1">
                <ArrowRight size={20} className="transform rotate-90 text-blue-400" />
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <span className="font-medium text-blue-700">2</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex-grow">
                  <p className="font-medium text-blue-800">Plan reasoning approach</p>
                  <p className="text-sm text-slate-600">Choose appropriate reasoning strategy for the problem</p>
                </div>
              </div>
              
              <div className="flex justify-center my-1">
                <ArrowRight size={20} className="transform rotate-90 text-blue-400" />
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <span className="font-medium text-blue-700">3</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex-grow">
                  <p className="font-medium text-blue-800">Execute multi-step reasoning</p>
                  <p className="text-sm text-slate-600">Generate and explore multiple reasoning paths</p>
                </div>
              </div>
              
              <div className="flex justify-center my-1">
                <ArrowRight size={20} className="transform rotate-90 text-blue-400" />
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <span className="font-medium text-blue-700">4</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex-grow">
                  <p className="font-medium text-blue-800">Self-critique &amp; refinement</p>
                  <p className="text-sm text-slate-600">Evaluate reasoning, identify flaws, correct errors</p>
                </div>
              </div>
              
              <div className="flex justify-center my-1">
                <ArrowRight size={20} className="transform rotate-90 text-blue-400" />
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <span className="font-medium text-blue-700">5</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex-grow">
                  <p className="font-medium text-blue-800">Produce reasoned output</p>
                  <p className="text-sm text-slate-600">Generate response informed by explicit reasoning process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Differences */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center mb-4">
          <Scale className="text-blue-600 mr-3" size={28} />
          <h2 className="text-2xl font-semibold text-blue-800">Key Differences</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Time & Computation */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
              <Clock size={20} className="mr-2 text-slate-600" />
              Time &amp; Computation
            </h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2 mt-1">
                  <Zap size={16} className="text-amber-500" />
                </div>
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-amber-700">Normal LLMs:</span> Faster response generation with lower computational resources
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2 mt-1">
                  <Clock size={16} className="text-blue-500" />
                </div>
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-blue-700">Thinking LLMs:</span> Longer generation time due to multiple reasoning steps
                </p>
              </div>
            </div>
          </div>
          
          {/* Problem Complexity */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
              <FileCode size={20} className="mr-2 text-slate-600" />
              Problem Complexity
            </h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2 mt-1">
                  <CheckCircle size={16} className="text-amber-500" />
                </div>
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-amber-700">Normal LLMs:</span> Suitable for straightforward tasks and general knowledge queries
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2 mt-1">
                  <CheckCircle size={16} className="text-blue-500" />
                </div>
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-blue-700">Thinking LLMs:</span> Excel at complex reasoning, math, and multi-step problems
                </p>
              </div>
            </div>
          </div>
          
          {/* Output Reliability */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
              <User size={20} className="mr-2 text-slate-600" />
              Output Reliability
            </h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2 mt-1">
                  <XCircle size={16} className="text-amber-500" />
                </div>
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-amber-700">Normal LLMs:</span> Higher potential for hallucinations and reasoning errors
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2 mt-1">
                  <CheckCircle size={16} className="text-blue-500" />
                </div>
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-blue-700">Thinking LLMs:</span> Reduced hallucinations through explicit verification steps
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Case Comparison */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center mb-4">
          <Lightbulb className="text-blue-600 mr-3" size={28} />
          <h2 className="text-2xl font-semibold text-blue-800">Optimal Use Cases</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Normal LLM Use Cases */}
          <div>
            <h3 className="font-semibold text-amber-600 mb-3">When to Use Normal LLMs</h3>
            <ul className="space-y-2">
              <li className="flex items-start p-2 bg-amber-50 rounded-md border border-amber-100">
                <CheckCircle size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Quick responses to straightforward questions</span>
              </li>
              <li className="flex items-start p-2 bg-amber-50 rounded-md border border-amber-100">
                <CheckCircle size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Creative content generation (stories, marketing copy)</span>
              </li>
              <li className="flex items-start p-2 bg-amber-50 rounded-md border border-amber-100">
                <CheckCircle size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Simple language translation tasks</span>
              </li>
              <li className="flex items-start p-2 bg-amber-50 rounded-md border border-amber-100">
                <CheckCircle size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Resource-constrained environments</span>
              </li>
              <li className="flex items-start p-2 bg-amber-50 rounded-md border border-amber-100">
                <CheckCircle size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Casual conversational assistants</span>
              </li>
            </ul>
          </div>
          
          {/* Thinking LLM Use Cases */}
          <div>
            <h3 className="font-semibold text-blue-600 mb-3">When to Use Thinking LLMs</h3>
            <ul className="space-y-2">
              <li className="flex items-start p-2 bg-blue-50 rounded-md border border-blue-100">
                <CheckCircle size={18} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Complex mathematical or logical problems</span>
              </li>
              <li className="flex items-start p-2 bg-blue-50 rounded-md border border-blue-100">
                <CheckCircle size={18} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Multi-step reasoning tasks (e.g., scientific analysis)</span>
              </li>
              <li className="flex items-start p-2 bg-blue-50 rounded-md border border-blue-100">
                <CheckCircle size={18} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Safety-critical applications requiring reliability</span>
              </li>
              <li className="flex items-start p-2 bg-blue-50 rounded-md border border-blue-100">
                <CheckCircle size={18} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Research and data analysis requiring step-by-step verification</span>
              </li>
              <li className="flex items-start p-2 bg-blue-50 rounded-md border border-blue-100">
                <CheckCircle size={18} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Educational contexts for demonstrating problem-solving approaches</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <footer className="mt-6 text-center text-sm text-slate-500">
        <p>© 2025 • Comparing the architectures and capabilities of normal vs. thinking Large Language Models</p>
      </footer>
    </div>
  );
};

export default LLMComparisonVisualization;
