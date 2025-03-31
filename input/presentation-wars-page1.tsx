import React from 'react';
import { MonitorPlay, Zap } from 'lucide-react';

const PresentationWarsPage1 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-6 text-white">
      {/* Header */}
      <div className="w-full mb-8 p-4 sm:p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-indigo-600/30">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-violet-200 mb-2">
          The Presentation Tool War
        </h1>
        <p className="text-violet-100 mb-4">
          The landscape of presentation tools is experiencing a dramatic shift. While Microsoft PowerPoint has dominated for decades, innovative competitors are challenging its supremacy.
        </p>
        
        <div className="bg-indigo-800/40 p-4 rounded-lg border border-pink-500/20">
          <h3 className="text-lg font-semibold text-pink-300 mb-2">Current Industry Trends 🔍</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-start space-x-2">
              <div className="text-xl mt-1">🧠</div>
              <p className="text-sm text-violet-100">AI integration is becoming the key differentiator, with all major players racing to implement generative capabilities</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="text-xl mt-1">🌐</div>
              <p className="text-sm text-violet-100">Cloud-native solutions are winning as remote work becomes the norm, driving demand for real-time collaboration</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="text-xl mt-1">🎨</div>
              <p className="text-sm text-violet-100">Design-focused tools are gaining market share as visual communication becomes increasingly important</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Competitors Card */}
        <div className="p-4 sm:p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-pink-500/30">
          <div className="flex items-center mb-4">
            <div className="bg-violet-800/60 p-2 rounded-full mr-3">
              <MonitorPlay size={24} className="text-pink-300" />
            </div>
            <h2 className="text-lg font-bold text-violet-100">The Major Players</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-4 bg-indigo-800/40 rounded-md border-l-4 border-blue-500 transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">📊</div>
                <div>
                  <h3 className="font-bold text-pink-300 text-lg">PowerPoint</h3>
                  <div className="flex items-center mt-1">
                    <div className="h-1.5 w-16 bg-blue-500/60 rounded-full mr-2"></div>
                    <span className="text-xs text-violet-200">Since 1987</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-violet-100 mt-2">Market leader with decades of dominance, evolving slowly with AI integration through Copilot.</p>
              <div className="mt-3 p-2 bg-red-900/30 border border-red-500/40 rounded flex items-start">
                <div className="text-red-400 mr-2 text-lg">⚠️</div>
                <p className="text-xs text-red-200">Legacy commitment to backward compatibility and enterprise customers significantly slows innovation pace</p>
              </div>
            </div>
            
            <div className="p-4 bg-indigo-800/40 rounded-md border-l-4 border-green-500 transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">☁️</div>
                <div>
                  <h3 className="font-bold text-pink-300 text-lg">Google Slides</h3>
                  <div className="flex items-center mt-1">
                    <div className="h-1.5 w-10 bg-green-500/60 rounded-full mr-2"></div>
                    <span className="text-xs text-violet-200">Since 2006</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-violet-100 mt-2">Strong position in education and small business, cloud-native with seamless collaboration.</p>
            </div>
            
            <div className="p-4 bg-indigo-800/40 rounded-md border-l-4 border-purple-500 transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">🎨</div>
                <div>
                  <h3 className="font-bold text-pink-300 text-lg">Figma Slides</h3>
                  <div className="flex items-center mt-1">
                    <div className="h-1.5 w-4 bg-purple-500/60 rounded-full mr-2"></div>
                    <span className="text-xs text-violet-200">Since 2024</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-violet-100 mt-2">Rapidly gaining attention in design-focused industries, bringing powerful design tools to presentations.</p>
            </div>
            
            <div className="p-4 bg-indigo-800/40 rounded-md border-l-4 border-pink-500 transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center">
                <div className="mr-3 text-2xl">🤖</div>
                <div>
                  <h3 className="font-bold text-pink-300 text-lg">Claude Artifacts</h3>
                  <div className="flex items-center mt-1">
                    <div className="h-1.5 w-2 bg-pink-500/60 rounded-full mr-2"></div>
                    <span className="text-xs text-violet-200">Since 2024</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-violet-100 mt-2">Newest entrant with unique AI-powered approach, focused on content generation and automation.</p>
            </div>
          </div>
        </div>

        {/* AI Integration Card */}
        <div className="p-4 sm:p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-pink-500/30">
          <div className="flex items-center mb-4">
            <div className="bg-violet-800/60 p-2 rounded-full mr-3">
              <Zap size={24} className="text-pink-300" />
            </div>
            <h2 className="text-lg font-bold text-violet-100">AI Integration & Automation</h2>
          </div>
          
          <div className="mb-4 p-3 bg-indigo-800/20 rounded-lg">
            <p className="text-sm italic text-violet-200">AI capabilities have become the key battleground for presentation tools in 2025, with each platform racing to offer the most intelligent assistance</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-4 rounded-lg border border-blue-700/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-blue-300">PowerPoint + Copilot</h3>
                <div className="bg-blue-900/60 text-blue-300 text-xs px-2 py-1 rounded-full">Enterprise Focus</div>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="text-blue-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">Generates slide content and designs from prompts</p>
                </li>
                <li className="flex items-start">
                  <div className="text-blue-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">Transforms Word documents into slides</p>
                </li>
                <li className="flex items-start">
                  <div className="text-red-400 mr-2">✗</div>
                  <p className="text-sm text-violet-100">Limited to Microsoft 365 subscribers</p>
                </li>
              </ul>
              
              <div className="mt-3 text-right">
                <div className="inline-block bg-blue-900/60 px-2 py-1 rounded text-xs text-blue-300">
                  AI Maturity: ★★★☆☆
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-4 rounded-lg border border-green-700/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-green-300">Google Slides + Gemini</h3>
                <div className="bg-green-900/60 text-green-300 text-xs px-2 py-1 rounded-full">Accessibility</div>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="text-green-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">"Help me visualize" image generation</p>
                </li>
                <li className="flex items-start">
                  <div className="text-green-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">Smart formatting suggestions</p>
                </li>
                <li className="flex items-start">
                  <div className="text-green-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">Free basic features for all Google users</p>
                </li>
              </ul>
              
              <div className="mt-3 text-right">
                <div className="inline-block bg-green-900/60 px-2 py-1 rounded text-xs text-green-300">
                  AI Maturity: ★★★★☆
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-4 rounded-lg border border-purple-700/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-purple-300">Figma Slides</h3>
                <div className="bg-purple-900/60 text-purple-300 text-xs px-2 py-1 rounded-full">Design-First</div>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="text-purple-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">AI-powered layout suggestions</p>
                </li>
                <li className="flex items-start">
                  <div className="text-purple-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">Style matching and brand consistency tools</p>
                </li>
                <li className="flex items-start">
                  <div className="text-red-400 mr-2">✗</div>
                  <p className="text-sm text-violet-100">Steeper learning curve for non-designers</p>
                </li>
              </ul>
              
              <div className="mt-3 text-right">
                <div className="inline-block bg-purple-900/60 px-2 py-1 rounded text-xs text-purple-300">
                  AI Maturity: ★★★☆☆
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 p-4 rounded-lg border border-pink-700/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-pink-300">Claude Artifacts</h3>
                <div className="bg-pink-900/60 text-pink-300 text-xs px-2 py-1 rounded-full">AI-Native</div>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="text-pink-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">Full presentations generated from prompts</p>
                </li>
                <li className="flex items-start">
                  <div className="text-pink-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">Interactive charts and complex visualizations</p>
                </li>
                <li className="flex items-start">
                  <div className="text-pink-400 mr-2">✓</div>
                  <p className="text-sm text-violet-100">Transforms content between different formats</p>
                </li>
              </ul>
              
              <div className="mt-3 text-right">
                <div className="inline-block bg-pink-900/60 px-2 py-1 rounded text-xs text-pink-300">
                  AI Maturity: ★★★★★
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Comparison */}
      <div className="p-4 sm:p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-pink-500/30 mb-6">
        <div className="flex items-center mb-3">
          <div className="bg-violet-800/60 p-2 rounded-full mr-3">
            <Zap size={24} className="text-pink-300" />
          </div>
          <h2 className="text-lg font-bold text-violet-100">Cost & Accessibility</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-indigo-800/40 rounded-md">
            <h3 className="font-bold text-pink-300">PowerPoint</h3>
            <p className="text-sm text-violet-100">$6.99+ monthly (Microsoft 365)</p>
            <p className="text-xs text-violet-300">One-time purchase option available with fewer features</p>
          </div>
          <div className="p-3 bg-indigo-800/40 rounded-md">
            <h3 className="font-bold text-pink-300">Google Slides</h3>
            <p className="text-sm text-violet-100">Free with Google account</p>
            <p className="text-xs text-violet-300">Premium features with Google Workspace subscription</p>
          </div>
          <div className="p-3 bg-indigo-800/40 rounded-md">
            <h3 className="font-bold text-pink-300">Figma Slides</h3>
            <p className="text-sm text-violet-100">$12+ per editor monthly</p>
            <p className="text-xs text-violet-300">Free tier available with limitations</p>
          </div>
          <div className="p-3 bg-indigo-800/40 rounded-md">
            <h3 className="font-bold text-pink-300">Claude Artifacts</h3>
            <p className="text-sm text-violet-100">Free tier / $20 monthly (Pro)</p>
            <p className="text-xs text-violet-300">Free tier has usage limitations</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-violet-300 text-center">
        <p>Created by Patrick Freyer • March 2025 • Page 1/2</p>
        <p className="text-xs mt-1">Personal views only. Not affiliated with or endorsed by any company mentioned.</p>
      </div>
    </div>
  );
};

export default PresentationWarsPage1;