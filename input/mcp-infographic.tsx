import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Database, Globe, Zap, Server, Cloud, Cpu, MessageSquare, LayoutList, Search, FileText, GitBranch } from 'lucide-react';

interface CircleProps {
  children: React.ReactNode;
  bgColor?: string;
  size?: string;
  extraClasses?: string;
}

interface MCPExplanationProps {
  paperFormat?: 'a4' | 'letter' | 'responsive';
}

const MCPExplanation: React.FC<MCPExplanationProps> = ({ paperFormat = 'a4' }) => {
  // Custom styles based on Patrick's styleguide
  const containerStyle = "bg-white text-gray-800 p-6 shadow-lg max-w-full mx-auto";
  const titleStyle = "text-3xl font-bold text-indigo-600 mb-6";
  const sectionStyle = "bg-indigo-50/30 rounded-lg p-5 mb-5 border border-indigo-100 shadow-sm";
  const sectionTitleStyle = "text-lg font-bold text-gray-800 mb-3 flex items-center gap-2";
  const cardStyle = "bg-white rounded-lg p-4 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow";
  const bodyTextStyle = "text-gray-600";
  const accentTextStyle = "text-indigo-600 font-medium";
  const noteStyle = "text-xs text-gray-500 mt-2 italic";
  
  // Custom circle component for diagrams
  const Circle: React.FC<CircleProps> = ({ children, bgColor = "bg-indigo-50", size = "w-16 h-16", extraClasses = "" }) => (
    <div className={`${bgColor} ${size} rounded-full flex items-center justify-center ${extraClasses}`}>
      {children}
    </div>
  );

  // Get appropriate container class based on paper format
  const getContainerClass = () => {
    switch (paperFormat) {
      case 'a4':
        return 'max-w-[210mm] mx-auto print:w-full';
      case 'letter':
        return 'max-w-[8.5in] mx-auto print:w-full';
      default:
        return 'w-full';
    }
  };

  return (
    <div className={`${containerStyle} ${getContainerClass()}`}>
      <div className="flex flex-col">
        {/* Page 1 */}
        <div className="print:min-h-page print:flex print:flex-col print:pt-6">
          {/* Title Section */}
          <div className="mb-8 text-center">
            <h1 className={titleStyle + " text-4xl"}>AI MCP Cheatsheet</h1>
          </div>
          
          <div className="flex-grow">
            <div className={sectionStyle}>
              <h2 className={sectionTitleStyle}><Zap size={20} className="text-indigo-600" /> What is MCP?</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div className={cardStyle + " page-break-inside-avoid"}>
                  <h3 className="font-semibold text-gray-800 mb-2">The Problem</h3>
                  <p className={bodyTextStyle}>AI models like ChatGPT are trained on vast data but lack direct access to:</p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-center gap-2">
                      <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                        <Database size={18} className="text-indigo-600" />
                      </Circle>
                      <span className="text-gray-600">Private or real-time data</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                        <Globe size={18} className="text-indigo-600" />
                      </Circle>
                      <span className="text-gray-600">External systems and APIs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                        <GitBranch size={18} className="text-indigo-600" />
                      </Circle>
                      <span className="text-gray-600">Tools that can perform actions</span>
                    </li>
                  </ul>
                </div>
                <div className={cardStyle + " page-break-inside-avoid"}>
                  <h3 className="font-semibold text-gray-800 mb-2">MCP Solution</h3>
                  <p className={bodyTextStyle}>MCP is like <span className={accentTextStyle}>USB-C for AI models</span> - a standardized interface that:</p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-center gap-2">
                      <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                        <Server size={18} className="text-indigo-600" />
                      </Circle>
                      <span className="text-gray-600">Connects AI to any digital system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                        <LayoutList size={18} className="text-indigo-600" />
                      </Circle>
                      <span className="text-gray-600">Defines standard formats for tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                        <Zap size={18} className="text-indigo-600" />
                      </Circle>
                      <span className="text-gray-600">Eliminates custom integrations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Core Components Section */}
            <div className={sectionStyle + " page-break-inside-avoid"}>
              <h2 className={sectionTitleStyle}><Cpu size={20} className="text-indigo-600" /> MCP Core Components</h2>
              
              {/* Simplified, More Intuitive Diagram */}
              <div className="p-4 bg-indigo-50/50 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-full overflow-x-auto">
                    <div className="min-w-lg">
                      {/* Main Component Flow */}
                      <div className="grid grid-cols-2 gap-6 w-full p-4">
                        {/* Host Box */}
                        <div className="bg-gradient-to-b from-white to-violet-50/40 p-4 rounded-lg border border-violet-100 shadow-sm relative">
                          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">1</div>
                          <div className="text-center">
                            <div className="bg-violet-50 text-xs text-gray-700 rounded-full px-3 py-1 inline-block mb-2">
                              Hosted by AI Provider
                            </div>
                            <div className="flex justify-center">
                              <Circle bgColor="bg-violet-50" size="w-14 h-14">
                                <Cpu size={20} className="text-violet-600" />
                              </Circle>
                            </div>
                            <div className="font-bold text-gray-800 mt-2">MCP Host</div>
                            <div className="text-xs text-gray-600 mt-1">(AI Model)</div>
                            <div className="text-xs bg-violet-50 text-gray-700 rounded mt-2 py-1">
                              Cloud (Anthropic, OpenAI)
                            </div>
                          </div>
                        </div>

                        {/* Client Box */}
                        <div className="bg-gradient-to-b from-white to-blue-50/40 p-4 rounded-lg border border-blue-100 shadow-sm relative">
                          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">2</div>
                          <div className="text-center">
                            <div className="bg-blue-50 text-xs text-gray-700 rounded-full px-3 py-1 inline-block mb-2">
                              Hosted by Integrator
                            </div>
                            <div className="flex justify-center">
                              <Circle bgColor="bg-blue-50" size="w-14 h-14">
                                <GitBranch size={20} className="text-blue-600" />
                              </Circle>
                            </div>
                            <div className="font-bold text-gray-800 mt-2">MCP Client</div>
                            <div className="text-xs text-gray-600 mt-1">(Middleware)</div>
                            <div className="text-xs bg-blue-50 text-gray-700 rounded mt-2 py-1">
                              Local, Docker, Cloud Service
                            </div>
                          </div>
                        </div>

                        {/* Server Box */}
                        <div className="bg-gradient-to-b from-white to-emerald-50/40 p-4 rounded-lg border border-emerald-100 shadow-sm relative">
                          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">3</div>
                          <div className="text-center">
                            <div className="bg-emerald-50 text-xs text-gray-700 rounded-full px-3 py-1 inline-block mb-2">
                              Hosted by Tool Provider
                            </div>
                            <div className="flex justify-center">
                              <Circle bgColor="bg-emerald-50" size="w-14 h-14">
                                <Server size={20} className="text-emerald-600" />
                              </Circle>
                            </div>
                            <div className="font-bold text-gray-800 mt-2">MCP Server</div>
                            <div className="text-xs text-gray-600 mt-1">(Tool Implementation)</div>
                            <div className="text-xs bg-emerald-50 text-gray-700 rounded mt-2 py-1">
                              Local, SaaS, Internal Service
                            </div>
                          </div>
                        </div>

                        {/* External APIs Box */}
                        <div className="bg-gradient-to-b from-white to-amber-50/40 p-4 rounded-lg border border-amber-100 shadow-sm relative">
                          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">4</div>
                          <div className="text-center">
                            <div className="bg-amber-50 text-xs text-gray-700 rounded-full px-3 py-1 inline-block mb-2">
                              External Systems
                            </div>
                            <div className="flex justify-center gap-3">
                              <Circle bgColor="bg-amber-50" size="w-10 h-10">
                                <Database size={16} className="text-amber-600" />
                              </Circle>
                              <Circle bgColor="bg-amber-50" size="w-10 h-10">
                                <Globe size={16} className="text-amber-600" />
                              </Circle>
                              <Circle bgColor="bg-amber-50" size="w-10 h-10">
                                <Cloud size={16} className="text-amber-600" />
                              </Circle>
                            </div>
                            <div className="font-bold text-gray-800 mt-2">External Tools & APIs</div>
                            <div className="text-xs text-gray-600 mt-1">(Data Sources, Services)</div>
                            <div className="text-xs bg-amber-50 text-gray-700 rounded mt-2 py-1">
                              Databases, SaaS, Cloud APIs
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="print:pb-4 print:mt-auto"></div>
        </div>

        {/* Page 2 */}
        <div className="mt-8 print:mt-0 print:min-h-page print:flex print:flex-col print:pt-6 page-break-before">
          {/* Component Descriptions */}
          <div className={sectionStyle}>
            <h2 className={sectionTitleStyle}><Server size={20} className="text-indigo-600" /> Component Details</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className={cardStyle + " relative page-break-inside-avoid"}>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">1</div>
                <h3 className="font-semibold text-violet-900 mb-2">MCP Host (AI Model)</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">• Receives user prompts</li>
                  <li className="text-sm text-gray-600">• Identifies when to use tools</li>
                  <li className="text-sm text-gray-600">• Formats structured requests</li>
                  <li className="text-sm text-gray-600">• Interprets tool responses</li>
                </ul>
                <p className={noteStyle}>Example: Claude, ChatGPT</p>
              </div>
              
              <div className={cardStyle + " relative page-break-inside-avoid"}>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">2</div>
                <h3 className="font-semibold text-blue-900 mb-2">MCP Client (Middleware)</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">• Routes requests to tools</li>
                  <li className="text-sm text-gray-600">• Manages authentication</li>
                  <li className="text-sm text-gray-600">• Aggregates tool schemas</li>
                  <li className="text-sm text-gray-600">• Handles error responses</li>
                </ul>
                <p className={noteStyle}>Tech: Node.js, Python, Go SDKs</p>
              </div>
              
              <div className={cardStyle + " relative page-break-inside-avoid"}>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">3</div>
                <h3 className="font-semibold text-emerald-900 mb-2">MCP Server (Tool Provider)</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">• Defines available tools</li>
                  <li className="text-sm text-gray-600">• Implements business logic</li>
                  <li className="text-sm text-gray-600">• Connects to external APIs</li>
                  <li className="text-sm text-gray-600">• Returns formatted responses</li>
                </ul>
                <p className={noteStyle}>Tech: FastAPI, Express.js, etc.</p>
              </div>
              
              <div className={cardStyle + " relative page-break-inside-avoid"}>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">4</div>
                <h3 className="font-semibold text-amber-900 mb-2">External Tools & APIs</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">• Provide data access</li>
                  <li className="text-sm text-gray-600">• Execute operations</li>
                  <li className="text-sm text-gray-600">• Store and retrieve information</li>
                  <li className="text-sm text-gray-600">• Enable real-world interactions</li>
                </ul>
                <p className={noteStyle}>Examples: Notion, Slack, GitHub, SQL</p>
              </div>
            </div>
          </div>

          {/* How It Works Section - Start */}
          <div className={sectionStyle}>
            <h2 className={sectionTitleStyle}><Zap size={20} className="text-indigo-600" /> How MCP Works: End-to-End Flow</h2>
            
            <div className="space-y-5">
              {/* Steps 1-3 */}
              <div className="flex gap-4 items-start page-break-inside-avoid">
                <div className="flex-shrink-0 mt-1">
                  <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                    <span className="text-indigo-600 font-bold">1</span>
                  </Circle>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">User Request</h3>
                  <p className={bodyTextStyle + " text-sm"}>User asks: <span className="italic">"Find my last 3 emails about the project"</span></p>
                  <div className={cardStyle + " bg-gradient-to-b from-white to-indigo-50/20 mt-2 p-3"}>
                    <div className="flex items-start gap-2">
                      <MessageSquare size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                      <p className="text-xs text-gray-600">AI model (Host) receives the natural language prompt and determines it needs to use an external tool</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start page-break-inside-avoid">
                <div className="flex-shrink-0 mt-1">
                  <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                    <span className="text-indigo-600 font-bold">2</span>
                  </Circle>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Tool Selection</h3>
                  <p className={bodyTextStyle + " text-sm"}>AI identifies the appropriate tool: <span className="italic text-indigo-600">fetch_latest_emails</span></p>
                  <div className={cardStyle + " bg-gradient-to-b from-white to-indigo-50/20 mt-2 p-3"}>
                    <div className="flex items-start gap-2">
                      <Search size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div className="text-xs text-gray-600">
                        <p>AI Host formats a structured call with parameters:</p>
                        <pre className="bg-white p-2 rounded mt-1 overflow-x-auto text-gray-700 border border-indigo-50">
                          {`{
  "tool": "fetch_latest_emails", 
  "params": { 
    "topic": "project",
    "limit": 3 
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start page-break-inside-avoid">
                <div className="flex-shrink-0 mt-1">
                  <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                    <span className="text-indigo-600 font-bold">3</span>
                  </Circle>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Request Routing</h3>
                  <p className={bodyTextStyle + " text-sm"}>MCP Client routes the request to the correct MCP Server</p>
                  <div className={cardStyle + " bg-gradient-to-b from-white to-indigo-50/20 mt-2 p-3"}>
                    <div className="flex items-start gap-2">
                      <GitBranch size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                      <p className="text-xs text-gray-600">Client handles authentication, formats the request appropriately, and ensures it reaches the correct tool implementation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="print:pb-4 print:mt-auto"></div>
        </div>

        {/* Page 3 */}
        <div className="mt-8 print:mt-0 print:min-h-page print:flex print:flex-col print:pt-6 page-break-before">
          {/* How It Works Section - Continued */}
          <div className={sectionStyle}>
            <h2 className={sectionTitleStyle}><Zap size={20} className="text-indigo-600" /> How MCP Works: Completion</h2>
            
            <div className="space-y-5">
              {/* Steps 4-5 */}
              <div className="flex gap-4 items-start page-break-inside-avoid">
                <div className="flex-shrink-0 mt-1">
                  <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                    <span className="text-indigo-600 font-bold">4</span>
                  </Circle>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Tool Execution</h3>
                  <p className={bodyTextStyle + " text-sm"}>MCP Server executes the tool by calling external APIs (e.g., Gmail)</p>
                  <div className={cardStyle + " bg-gradient-to-b from-white to-indigo-50/20 mt-2 p-3"}>
                    <div className="flex items-start gap-2">
                      <Server size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div className="text-xs text-gray-600">
                        <p>Server processes the request and returns structured data:</p>
                        <pre className="bg-white p-2 rounded mt-1 overflow-x-auto text-gray-700 border border-indigo-50">
                          {`{
  "emails": [
    { "subject": "Project Update", "date": "2025-03-27" },
    { "subject": "Project Meeting", "date": "2025-03-25" },
    { "subject": "Project Resources", "date": "2025-03-22" }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start page-break-inside-avoid">
                <div className="flex-shrink-0 mt-1">
                  <Circle bgColor="bg-indigo-50" size="w-8 h-8">
                    <span className="text-indigo-600 font-bold">5</span>
                  </Circle>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Response Generation</h3>
                  <p className={bodyTextStyle + " text-sm"}>AI model receives data and generates a natural language response</p>
                  <div className={cardStyle + " bg-gradient-to-b from-white to-indigo-50/20 mt-2 p-3"}>
                    <div className="flex items-start gap-2">
                      <MessageSquare size={16} className="text-indigo-600 mt-1 flex-shrink-0" />
                      <p className="text-xs text-gray-600">"I found 3 recent emails about the project. The most recent is 'Project Update' from March 27th, followed by 'Project Meeting' from March 25th, and 'Project Resources' from March 22nd."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Applications */}
          <div className={sectionStyle}>
            <h2 className={sectionTitleStyle}><Globe size={20} className="text-indigo-600" /> Real-World Applications</h2>
            
            <div className="grid md:grid-cols-2 gap-5">
              <div className={cardStyle + " bg-gradient-to-b from-white to-indigo-50/20 page-break-inside-avoid"}>
                <h3 className="font-semibold text-gray-800 mb-2">Knowledge Management</h3>
                <div className="flex items-center gap-3 mb-2">
                  <Circle bgColor="bg-indigo-50" size="w-10 h-10">
                    <FileText size={18} className="text-indigo-600" />
                  </Circle>
                  <span className={bodyTextStyle}>Search & retrieve documents from Notion</span>
                </div>
                <p className="text-xs text-gray-500 pl-12">AI can access your team's wiki, project docs, and knowledge base</p>
              </div>
              
              <div className={cardStyle + " bg-gradient-to-b from-white to-indigo-50/20 page-break-inside-avoid"}>
                <h3 className="font-semibold text-gray-800 mb-2">Data Analysis</h3>
                <div className="flex items-center gap-3 mb-2">
                  <Circle bgColor="bg-indigo-50" size="w-10 h-10">
                    <Database size={18} className="text-indigo-600" />
                  </Circle>
                  <span className={bodyTextStyle}>Query databases & visualize results</span>
                </div>
                <p className="text-xs text-gray-500 pl-12">AI can run SQL queries and generate meaningful insights</p>
              </div>
              
              <div className={cardStyle + " bg-gradient-to-b from-white to-indigo-50/20 page-break-inside-avoid"}>
                <h3 className="font-semibold text-gray-800 mb-2">Personal Assistance</h3>
                <div className="flex items-center gap-3 mb-2">
                  <Circle bgColor="bg-indigo-50" size="w-10 h-10">
                    <MessageSquare size={18} className="text-indigo-600" />
                  </Circle>
                  <span className={bodyTextStyle}>Manage emails, calendar & tasks</span>
                </div>
                <p className="text-xs text-gray-500 pl-12">AI can schedule meetings and respond to messages</p>
              </div>
              
              <div className={cardStyle + " bg-gradient-to-b from-white to-indigo-50/20 page-break-inside-avoid"}>
                <h3 className="font-semibold text-gray-800 mb-2">Code & Development</h3>
                <div className="flex items-center gap-3 mb-2">
                  <Circle bgColor="bg-indigo-50" size="w-10 h-10">
                    <GitBranch size={18} className="text-indigo-600" />
                  </Circle>
                  <span className={bodyTextStyle}>Interact with GitHub, run tests & deploy</span>
                </div>
                <p className="text-xs text-gray-500 pl-12">AI can analyze PRs and automate development tasks</p>
              </div>
            </div>
          </div>
          
          {/* Footer - always at bottom in print */}
          <div className="mt-8 print:mt-auto text-center text-xs text-gray-500 py-4 page-break-inside-avoid">
            <p>© 2025 Patrick Freyer | <a href="https://patrickfreyer.com" className="text-indigo-600 hover:text-indigo-700">patrickfreyer.com</a> | MCP is an open standard for AI integration</p>
            <p className="mt-1">Designed for educational purposes, based on technical documentation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCPExplanation;