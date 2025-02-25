import React from 'react';
import { ArrowDown, BrainCircuit, Lightbulb, Trees, GitBranch, Filter, Cpu, Gauge, BookOpen } from 'lucide-react';

const ThinkingLLMVisualization = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl shadow-lg font-sans">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">How Thinking LLMs Work</h1>
        <p className="text-lg text-slate-600">The evolution from standard language models to reasoning systems</p>
      </header>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Introduction Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BrainCircuit className="text-blue-600 mr-3" size={28} />
            <h2 className="text-2xl font-semibold text-blue-800">What are "Thinking" LLMs?</h2>
          </div>
          <p className="text-slate-700 mb-4">
            Thinking LLMs are language models enhanced with explicit reasoning capabilities. 
            Unlike standard LLMs that generate text in a single pass, thinking models incorporate 
            deliberate, multi-step reasoning processes before producing their final output.
          </p>
          <div className="flex items-center gap-4 justify-center text-slate-500 my-3">
            <div className="text-center">
              <div className="border border-blue-200 rounded-lg p-3 bg-blue-50 mb-2">
                <span className="font-medium">Standard LLMs</span>
              </div>
              <span>Direct response</span>
            </div>
            <ArrowDown size={24} className="rotate-90 text-blue-400" />
            <div className="text-center">
              <div className="border border-blue-200 rounded-lg p-3 bg-blue-50 mb-2">
                <span className="font-medium">Thinking LLMs</span>
              </div>
              <span>Deliberate reasoning</span>
            </div>
          </div>
        </section>
        
        {/* Process Flow */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <GitBranch className="text-blue-600 mr-3" size={28} />
            <h2 className="text-2xl font-semibold text-blue-800">The Thinking Process</h2>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 w-full">
              {/* Step 1 */}
              <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">1</div>
                <h3 className="font-medium text-blue-800 mb-1">Query Analysis</h3>
                <p className="text-sm text-slate-600">Parse and understand the input query</p>
              </div>
              <div className="flex justify-center items-center">
                <ArrowDown size={20} className="rotate-90 text-blue-400 hidden md:block" />
                <ArrowDown size={20} className="text-blue-400 md:hidden my-1" />
              </div>
              {/* Step 2 */}
              <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">2</div>
                <h3 className="font-medium text-blue-800 mb-1">Reasoning Strategy</h3>
                <p className="text-sm text-slate-600">Choose approach: step-by-step, tree of thoughts, etc.</p>
              </div>
              <div className="flex justify-center items-center">
                <ArrowDown size={20} className="rotate-90 text-blue-400 hidden md:block" />
                <ArrowDown size={20} className="text-blue-400 md:hidden my-1" />
              </div>
              {/* Step 3 */}
              <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">3</div>
                <h3 className="font-medium text-blue-800 mb-1">Extended Thinking</h3>
                <p className="text-sm text-slate-600">Process multiple reasoning paths or steps</p>
              </div>
              <div className="flex justify-center items-center">
                <ArrowDown size={20} className="rotate-90 text-blue-400 hidden md:block" />
                <ArrowDown size={20} className="text-blue-400 md:hidden my-1" />
              </div>
              {/* Step 4 */}
              <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">4</div>
                <h3 className="font-medium text-blue-800 mb-1">Evaluation</h3>
                <p className="text-sm text-slate-600">Assess reasoning quality, find flaws or contradictions</p>
              </div>
              <div className="flex justify-center items-center">
                <ArrowDown size={20} className="rotate-90 text-blue-400 hidden md:block" />
                <ArrowDown size={20} className="text-blue-400 md:hidden my-1" />
              </div>
              {/* Step 5 */}
              <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">5</div>
                <h3 className="font-medium text-blue-800 mb-1">Answer Generation</h3>
                <p className="text-sm text-slate-600">Produce final response informed by reasoning</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Thinking Approaches */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Lightbulb className="text-blue-600 mr-3" size={28} />
            <h2 className="text-2xl font-semibold text-blue-800">Key Reasoning Approaches</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chain of Thought */}
            <div className="border border-blue-200 rounded-lg p-4 bg-gradient-to-b from-white to-blue-50">
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <BookOpen size={20} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-700">Chain of Thought</h3>
              </div>
              <p className="text-sm text-slate-600">Linear step-by-step reasoning process that breaks complex problems into smaller, manageable steps</p>
            </div>
            
            {/* Tree of Thoughts */}
            <div className="border border-blue-200 rounded-lg p-4 bg-gradient-to-b from-white to-blue-50">
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <Trees size={20} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-700">Tree of Thoughts</h3>
              </div>
              <p className="text-sm text-slate-600">Explores multiple reasoning paths simultaneously, pruning unproductive branches and developing promising ones</p>
            </div>
            
            {/* Reflection */}
            <div className="border border-blue-200 rounded-lg p-4 bg-gradient-to-b from-white to-blue-50">
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <Filter size={20} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-700">Self-Reflection</h3>
              </div>
              <p className="text-sm text-slate-600">Critically evaluates its own reasoning, identifies flaws, and iteratively improves its answer</p>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Gauge className="text-blue-600 mr-3" size={28} />
            <h2 className="text-2xl font-semibold text-blue-800">Benefits of Thinking LLMs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
                <Cpu size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-700 mb-1">Improved Reasoning</h3>
                <p className="text-sm text-slate-600">Enhanced ability to handle complex logical problems and multi-step reasoning tasks</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
                <Cpu size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-700 mb-1">Reduced Hallucinations</h3>
                <p className="text-sm text-slate-600">More reliable outputs with fewer factual errors due to careful evaluation of reasoning</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
                <Cpu size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-700 mb-1">Better Problem Solving</h3>
                <p className="text-sm text-slate-600">Enhanced ability to tackle complex reasoning tasks that require multiple attempts</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
                <Cpu size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-700 mb-1">Transparent Decision-Making</h3>
                <p className="text-sm text-slate-600">Reasoning steps are visible, making the model's thought process more interpretable</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <footer className="mt-6 text-center text-sm text-slate-500">
        <p>© 2025 • Visual explanation of thinking mechanisms in modern Large Language Models</p>
      </footer>
    </div>
  );
};

export default ThinkingLLMVisualization;
