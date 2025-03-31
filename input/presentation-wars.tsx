import React from 'react';
import { MonitorPlay, Users, Laptop, Palette, Zap, DollarSign, TrendingUp } from 'lucide-react';

const PresentationWars = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-6 text-white">
      {/* Header */}
      <div className="w-full mb-8 p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-indigo-600/30">
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
        <div className="p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-pink-500/30">
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
        <div className="p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-pink-500/30">
          <div className="flex items-center mb-4">
            <div className="bg-violet-800/60 p-2 rounded-full mr-3">
              <Zap size={24} className="text-pink-300" />
            </div>
            <h2 className="text-lg font-bold text-violet-100">AI Integration & Automation</h2>
          </div>
          
          <div className="mb-4 p-3 bg-indigo-800/20 rounded-lg">
            <p className="text-sm italic text-violet-200">AI capabilities have become the key battleground for presentation tools in 2025, with each platform racing to offer the most intelligent assistance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <p className="text-sm text-violet-100">Full presentations generated from brief prompts</p>
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

      {/* Second Row - Format Compatibility */}
      <div className="p-4 sm:p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-indigo-600/30 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-violet-800/60 p-2 rounded-full mr-3">
            <Laptop size={24} className="text-pink-300" />
          </div>
          <h2 className="text-lg font-bold text-violet-100">Format Responsiveness & AI Editability</h2>
        </div>
        
        <div className="mb-4 p-3 bg-indigo-800/20 rounded-lg">
          <p className="text-sm italic text-violet-200">How presentations adapt to different devices and screens has become critical, while AI-friendly formats determine how easily content can be modified by intelligent tools</p>
        </div>
        
        <div className="overflow-x-auto min-w-[768px] md:min-w-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-700/50">
                <th className="pb-3 text-left text-violet-200">Platform</th>
                <th className="pb-3 text-center text-violet-200">Responsive Design</th>
                <th className="pb-3 text-center text-violet-200">Output Formats</th>
                <th className="pb-3 text-center text-violet-200">AI Editability</th>
                <th className="pb-3 text-center text-violet-200">Offline Access</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-indigo-700/30">
                <td className="py-3 pr-4">
                  <div className="flex items-center">
                    <div className="text-xl mr-2">📊</div>
                    <span className="font-medium text-blue-300">PowerPoint</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-yellow-400 text-lg">⟳</div>
                    <span className="text-xs text-violet-300">Fixed layouts with manual resizing</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="bg-blue-900/60 text-xs px-1.5 py-0.5 rounded text-blue-300">PPTX</span>
                    <span className="bg-blue-900/60 text-xs px-1.5 py-0.5 rounded text-blue-300">PPT</span>
                    <span className="bg-blue-900/60 text-xs px-1.5 py-0.5 rounded text-blue-300">PDF</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-yellow-400 text-lg">⟳</div>
                    <span className="text-xs text-violet-300">Complex XML structure makes AI editing difficult</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="text-green-400 text-lg">✓</div>
                </td>
              </tr>
              
              <tr className="border-b border-indigo-700/30">
                <td className="py-3 pr-4">
                  <div className="flex items-center">
                    <div className="text-xl mr-2">☁️</div>
                    <span className="font-medium text-green-300">Google Slides</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-yellow-400 text-lg">⟳</div>
                    <span className="text-xs text-violet-300">Adapts to screen size but fixed slide dimensions</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="bg-green-900/60 text-xs px-1.5 py-0.5 rounded text-green-300">PPTX</span>
                    <span className="bg-green-900/60 text-xs px-1.5 py-0.5 rounded text-green-300">PDF</span>
                    <span className="bg-green-900/60 text-xs px-1.5 py-0.5 rounded text-green-300">JPEG</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-green-400 text-lg">✓</div>
                    <span className="text-xs text-violet-300">Google API makes it accessible to AI tools</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-yellow-400 text-lg">⟳</div>
                    <span className="text-xs text-violet-300">Limited</span>
                  </div>
                </td>
              </tr>
              
              <tr className="border-b border-indigo-700/30">
                <td className="py-3 pr-4">
                  <div className="flex items-center">
                    <div className="text-xl mr-2">🎨</div>
                    <span className="font-medium text-purple-300">Figma Slides</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-green-400 text-lg">✓</div>
                    <span className="text-xs text-violet-300">Auto-layout and responsive components</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="bg-purple-900/60 text-xs px-1.5 py-0.5 rounded text-purple-300">PDF</span>
                    <span className="bg-purple-900/60 text-xs px-1.5 py-0.5 rounded text-purple-300">PNG</span>
                    <span className="bg-purple-900/60 text-xs px-1.5 py-0.5 rounded text-purple-300">SVG</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-green-400 text-lg">✓</div>
                    <span className="text-xs text-violet-300">Well-structured API but complex design system</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="text-red-400 text-lg">✗</div>
                </td>
              </tr>
              
              <tr>
                <td className="py-3 pr-4">
                  <div className="flex items-center">
                    <div className="text-xl mr-2">🤖</div>
                    <span className="font-medium text-pink-300">Claude Artifacts</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-green-400 text-lg">✓</div>
                    <span className="text-xs text-violet-300">Fully responsive designs that auto-adjust to window size</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="bg-pink-900/60 text-xs px-1.5 py-0.5 rounded text-pink-300">HTML</span>
                    <span className="bg-pink-900/60 text-xs px-1.5 py-0.5 rounded text-pink-300">SVG</span>
                    <span className="bg-pink-900/60 text-xs px-1.5 py-0.5 rounded text-pink-300">PDF</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-green-400 text-lg">✓</div>
                    <span className="text-xs text-violet-300">Built for AI from the ground up with semantic structure</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="text-red-400 text-lg">✗</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-indigo-800/40 rounded-md border-l-4 border-pink-500">
            <h3 className="font-bold text-pink-300 mb-1">AI-First Formats</h3>
            <p className="text-sm text-violet-100">Claude Artifacts generates presentations in semantic HTML and SVG, making them inherently machine-readable and easily modifiable by AI. The content structure is designed for intelligent parsing.</p>
          </div>
          
          <div className="p-3 bg-indigo-800/40 rounded-md border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-300 mb-1">Legacy Format Challenges</h3>
            <p className="text-sm text-violet-100">PPTX format used by PowerPoint contains complex XML structures with proprietary elements that make AI interpretation difficult. This limits how effectively AI tools can modify existing presentations.</p>
          </div>
        </div>
      </div>

      {/* Pricing Comparison */}
      <div className="p-4 sm:p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-pink-500/30 mb-6">
        <div className="flex items-center mb-3">
          <div className="bg-violet-800/60 p-2 rounded-full mr-3">
            <DollarSign size={24} className="text-pink-300" />
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

      {/* Future Outlook */}
      <div className="p-4 sm:p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-indigo-600/30">
        <div className="flex items-center mb-4">
          <div className="bg-violet-800/60 p-2 rounded-full mr-3">
            <TrendingUp size={24} className="text-pink-300" />
          </div>
          <h2 className="text-lg font-bold text-violet-100">Future Outlook: The Next Generation</h2>
        </div>
        
        <div className="mb-5 p-3 bg-indigo-800/20 rounded-lg">
          <p className="text-sm italic text-violet-200">The presentation tool landscape is transforming rapidly with AI integration, responsive designs, and semantic formats becoming the key differentiators for future success</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 p-4 rounded-lg border border-indigo-700/40">
            <h3 className="text-lg font-bold text-pink-300 mb-3">Key Trends Reshaping Presentations</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="text-pink-400 text-lg mt-0.5 mr-2">🧠</div>
                <div>
                  <p className="text-sm font-medium text-violet-100">AI-First Creation</p>
                  <p className="text-xs text-violet-300">Full presentations generated from prompts will become the standard workflow for most users</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-pink-400 text-lg mt-0.5 mr-2">📱</div>
                <div>
                  <p className="text-sm font-medium text-violet-100">Responsive by Default</p>
                  <p className="text-xs text-violet-300">Fixed slide dimensions are becoming obsolete as content adapts to any device or screen size</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-pink-400 text-lg mt-0.5 mr-2">🔄</div>
                <div>
                  <p className="text-sm font-medium text-violet-100">Semantic Formats</p>
                  <p className="text-xs text-violet-300">Machine-readable formats that express meaning, not just appearance, will enable advanced AI editing</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-pink-400 text-lg mt-0.5 mr-2">🎭</div>
                <div>
                  <p className="text-sm font-medium text-violet-100">Dynamic Personalization</p>
                  <p className="text-xs text-violet-300">Presentations will adapt to audience interests and engagement in real-time</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 p-4 rounded-lg border border-indigo-700/40">
            <h3 className="text-lg font-bold text-pink-300 mb-3">Winners & Challengers</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-xl mr-2">📊</div>
                  <span className="font-medium text-blue-300">PowerPoint</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-violet-300 mr-2">Trajectory:</span>
                  <div className="text-lg text-blue-300">↘️</div>
                </div>
              </div>
              <p className="text-xs text-violet-200 pl-8">Microsoft's legacy platform will maintain enterprise market share but continue losing ground to cloud-native challengers if it doesn't address AI integration and format limitations</p>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div className="text-xl mr-2">☁️</div>
                  <span className="font-medium text-green-300">Google Slides</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-violet-300 mr-2">Trajectory:</span>
                  <div className="text-lg text-green-300">↗️</div>
                </div>
              </div>
              <p className="text-xs text-violet-200 pl-8">Will continue strengthening its position through deep Gemini AI integration and cloud-first approach, but needs to improve responsiveness</p>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div className="text-xl mr-2">🎨</div>
                  <span className="font-medium text-purple-300">Figma Slides</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-violet-300 mr-2">Trajectory:</span>
                  <div className="text-lg text-purple-300">⤴️</div>
                </div>
              </div>
              <p className="text-xs text-violet-200 pl-8">Positioned to capture design-focused users and teams that prioritize visual quality and responsive layouts</p>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div className="text-xl mr-2">🤖</div>
                  <span className="font-medium text-pink-300">Claude Artifacts</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-violet-300 mr-2">Trajectory:</span>
                  <div className="text-lg text-pink-300">🚀</div>
                </div>
              </div>
              <p className="text-xs text-violet-200 pl-8">Disruptive potential as AI-native solution with semantic formats and full responsiveness, positioned for rapid growth as AI adoption accelerates</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-lg border border-pink-600/30">
          <h3 className="text-lg font-bold text-pink-300 mb-2">The Future Belongs To...</h3>
          <p className="text-sm text-violet-100">As we move further into 2025 and beyond, the presentation tools that will thrive are those that can seamlessly integrate AI assistance, support responsive designs across all devices, and adopt semantic formats that enable intelligent editing. The traditional slide deck concept itself is being challenged by more dynamic, interactive ways of presenting information.</p>
          <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="bg-indigo-800/40 rounded p-3 text-center">
              <div className="text-lg mb-1">🧠</div>
              <div className="text-sm font-medium text-violet-100">AI Integration</div>
              <div className="text-xs text-violet-300 mt-1">Most Critical</div>
            </div>
            <div className="bg-indigo-800/40 rounded p-3 text-center">
              <div className="text-lg mb-1">📱</div>
              <div className="text-sm font-medium text-violet-100">Responsive Design</div>
              <div className="text-xs text-violet-300 mt-1">High Priority</div>
            </div>
            <div className="bg-indigo-800/40 rounded p-3 text-center">
              <div className="text-lg mb-1">🔄</div>
              <div className="text-sm font-medium text-violet-100">Semantic Formats</div>
              <div className="text-xs text-violet-300 mt-1">Growing Importance</div>
            </div>
            <div className="bg-pink-900/40 rounded p-3 text-center">
              <div className="text-lg mb-1">⚡</div>
              <div className="text-sm font-medium text-pink-300">Adaptability</div>
              <div className="text-xs text-pink-200 mt-1">Ultimate Winner</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-violet-300 text-center">
        <p>Created by Patrick Freyer • March 2025</p>
        <p className="text-xs mt-1">Personal views only. Not affiliated with or endorsed by any company mentioned.</p>
      </div>
    </div>
  );
};

export default PresentationWars;