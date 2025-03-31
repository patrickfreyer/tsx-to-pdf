import React from 'react';
import { BrainCircuit, SplitSquareVertical, Sigma, Scale, AlertCircle, ArrowDownUp } from 'lucide-react';

export default function PerplexityInfographic() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg p-6 text-gray-800">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          🧠 Understanding Perplexity in LLMs
        </h1>
        <p className="text-gray-600 mt-2">The measure of model uncertainty in language generation</p>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Definition Card */}
        <div className="bg-white p-5 rounded-lg border border-blue-300 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <BrainCircuit size={24} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">What is Perplexity?</h2>
          </div>
          <p className="text-gray-700">
            Perplexity quantifies the <span className="text-blue-600 font-medium">surprise</span> of a language model when generating text. 
            It's defined as the exponentiated average negative log likelihood of tokens in test data, conditional on preceding tokens.
          </p>
          <div className="mt-3 bg-blue-50 p-3 rounded border-l-2 border-blue-400">
            <p className="text-sm">
              <span className="text-blue-600 font-medium">Lower perplexity</span> = Model is more confident about its predictions
            </p>
          </div>
        </div>

        {/* Formula Card */}
        <div className="bg-white p-5 rounded-lg border border-purple-300 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <Sigma size={24} className="text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Mathematical Definition</h2>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center my-2">
            <p className="text-lg font-mono text-gray-800">
              Perplexity = exp(-1/N ∑ log P(w<sub>i</sub>|w<sub>1</sub>,...,w<sub>i-1</sub>))
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Where P(w<sub>i</sub>|w<sub>1</sub>,...,w<sub>i-1</sub>) is the probability the model assigns to token w<sub>i</sub> given the preceding tokens.
          </p>
        </div>

        {/* OpenAI API Card */}
        <div className="bg-white p-5 rounded-lg border border-green-300 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <ArrowDownUp size={24} className="text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">OpenAI API Connection</h2>
          </div>
          <p className="text-gray-700">
            Perplexity can be calculated directly from the OpenAI API using the <span className="bg-green-50 px-2 py-1 rounded font-mono text-sm">logprobs</span> output parameter.
          </p>
          <div className="mt-3 bg-green-50 p-3 rounded font-mono text-xs">
            <p className="text-gray-600">
              {"// Example API response with logprobs"}
            </p>
            <p className="text-green-700">
              {"token: 'artificial', logprob: -2.13"}
            </p>
            <p className="text-green-700">
              {"token: 'intelligence', logprob: -0.74"}
            </p>
          </div>
        </div>

        {/* Task Difficulty Card */}
        <div className="bg-white p-5 rounded-lg border border-orange-300 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
              <Scale size={24} className="text-orange-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Perplexity & Task Difficulty</h2>
          </div>
          <div className="flex items-center justify-between p-2">
            <div className="text-center p-2 bg-green-50 rounded-lg w-5/12 border border-green-200">
              <p className="text-xs text-gray-600">Easy Task</p>
              <div className="h-16 relative mt-2 bg-gradient-to-t from-green-200 to-green-50 rounded-lg flex items-end justify-center">
                <div className="absolute bottom-0 w-full h-4 bg-green-300 rounded-b-lg"></div>
                <p className="text-green-700 font-bold z-10 mb-1">Low Perplexity</p>
              </div>
            </div>
            
            <ArrowDownUp size={20} className="text-gray-500" />
            
            <div className="text-center p-2 bg-pink-50 rounded-lg w-5/12 border border-pink-200">
              <p className="text-xs text-gray-600">Hard Task</p>
              <div className="h-16 relative mt-2 bg-gradient-to-t from-pink-200 to-pink-50 rounded-lg flex items-end justify-center">
                <div className="absolute bottom-0 w-full h-12 bg-pink-300 rounded-b-lg"></div>
                <p className="text-pink-700 font-bold z-10 mb-1">High Perplexity</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Perplexity has been shown to correlate strongly with empirical task difficulty.
          </p>
        </div>

        {/* Problem Splitting Card */}
        <div className="md:col-span-2 bg-white p-5 rounded-lg border border-yellow-300 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <SplitSquareVertical size={24} className="text-yellow-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Problem Splitting Effect</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
              <h3 className="font-medium text-gray-700 mb-2 text-center">Joint Problem</h3>
              <div className="h-24 bg-pink-100 rounded-lg flex items-center justify-center border border-pink-300">
                <p className="font-bold text-pink-700">High Perplexity</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                "Write a research paper on quantum computing"
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-yellow-100 h-12 w-12 rounded-full flex items-center justify-center border border-yellow-300">
                <SplitSquareVertical size={24} className="text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h3 className="font-medium text-gray-700 mb-2 text-center">Split Problems</h3>
              <div className="space-y-2">
                <div className="h-10 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-300">
                  <p className="text-sm font-medium text-blue-700">Lower Perplexity</p>
                </div>
                <div className="h-10 bg-green-100 rounded-lg flex items-center justify-center border border-green-300">
                  <p className="text-sm font-medium text-green-700">Lower Perplexity</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                "Outline research paper" → "Write each section"
              </p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 text-center">
            By splitting a complex joint problem into smaller sub-problems, the perplexity generally decreases,
            reflecting the model's increased confidence in generating each part.
          </p>
        </div>

        {/* Practical Implications */}
        <div className="md:col-span-2 bg-white p-5 rounded-lg border border-purple-300 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <AlertCircle size={24} className="text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Practical Implications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-700 mb-2">For Developers 👨‍💻</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Monitor perplexity to identify model uncertainty</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Break complex prompts into smaller steps for better results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Use perplexity as a quality metric for model outputs</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <h3 className="text-sm font-medium text-green-700 mb-2">For Researchers 🔬</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">Use perplexity to benchmark model performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">Study correlation between perplexity and human evaluation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">Design training strategies to reduce perplexity on target tasks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Patrick Freyer | AI Strategy & Development
        </p>
      </div>
    </div>
  );
}
