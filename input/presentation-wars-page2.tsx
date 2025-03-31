import React from 'react';
import { Laptop, TrendingUp } from 'lucide-react';

const PresentationWarsPage2 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-6 text-white">

      {/* Format Responsiveness & AI Editability */}
      <div className="p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-indigo-600/30 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-violet-800/60 p-2 rounded-full mr-3">
            <Laptop size={24} className="text-pink-300" />
          </div>
          <h2 className="text-lg font-bold text-violet-100">Format Responsiveness & AI Editability</h2>
        </div>
        
        <div className="mb-4 p-3 bg-indigo-800/20 rounded-lg">
          <p className="text-sm italic text-violet-200">How presentations adapt to different devices and screens has become critical, while AI-friendly formats determine how easily content can be modified by intelligent tools</p>
        </div>
        
        <div className="overflow-x-auto">
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

      {/* Future Outlook */}
      <div className="p-5 backdrop-blur-sm bg-indigo-900/30 rounded-lg border border-indigo-600/30 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-violet-800/60 p-2 rounded-full mr-3">
            <TrendingUp size={24} className="text-pink-300" />
          </div>
          <h2 className="text-lg font-bold text-violet-100">Future Outlook: The Next Generation</h2>
        </div>
        
        <div className="mb-5 p-3 bg-indigo-800/20 rounded-lg">
          <p className="text-sm italic text-violet-200">The presentation tool landscape is transforming rapidly with AI integration, responsive designs, and semantic formats becoming the key differentiators for future success</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
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
            
            <div className="space-y-3">
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
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
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
        <p>Created by Patrick Freyer • March 2025 • Page 2/2</p>
        <p className="text-xs mt-1">Personal views only. Not affiliated with or endorsed by any company mentioned.</p>
      </div>
    </div>
  );
};

export default PresentationWarsPage2;