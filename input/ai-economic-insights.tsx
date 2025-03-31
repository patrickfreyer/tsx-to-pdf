import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Cpu, BookOpen, Building2, LineChart, BriefcaseBusiness, Search, UserCog, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';

const EconomicInsightsDashboard = () => {
  // Data from the research papers
  const occupationalCategoryData = [
    { name: 'Computer & Mathematical', percentage: 37.2, color: '#4f46e5' },
    { name: 'Arts, Design & Media', percentage: 10.3, color: '#7c3aed' },
    { name: 'Education & Library', percentage: 9.3, color: '#8b5cf6' },
    { name: 'Office & Administrative', percentage: 7.9, color: '#a78bfa' },
    { name: 'Life, Physical & Social Science', percentage: 6.4, color: '#c4b5fd' },
    { name: 'Business & Financial', percentage: 5.9, color: '#ddd6fe' }
  ];

  const insightSections = [
    {
      title: "Current Adoption Patterns",
      icon: <TrendingUp size={24} className="text-blue-600" />,
      insights: [
        {
          key: "Tech Workers Drive AI Usage",
          finding: "Computer & Mathematical occupations account for just over a third of all AI usage",
          implication: "Despite the logically challenging nature of computer & mathematical tasks, AI is most actively adopted by tech workers, significantly outpacing all other sectors."
        },
        {
          key: "Creative Professionals: The Next AI Frontier",
          finding: "Arts/Media (10.3%) and Education (9.3%) are the next highest usage areas",
          implication: "These sectors represent expansion opportunities beyond technical roles, suggesting AI is crossing the chasm from technical to creative knowledge workers."
        },
        {
          key: "Physical Labor Remains AI-Resistant—For Now",
          finding: "Healthcare support, construction, and transportation show minimal AI usage",
          implication: "Workers in physical domains have longer runway before significant AI impact, but this may change as robotics and embodied AI advance."
        }
      ]
    },
    {
      title: "Depth of Integration",
      icon: <Search size={24} className="text-purple-600" />,
      insights: [
        {
          key: "Complete Job Replacement Remains Rare",
          finding: "Only ~4% of occupations show AI usage in 75%+ of their tasks",
          implication: "Complete job automation remains rare; businesses should focus on task-level augmentation strategies rather than wholesale role replacement."
        },
        {
          key: "AI Has Already Transformed One-Third of Jobs",
          finding: "~36% of occupations show usage in at least 25% of their tasks",
          implication: "A significant fraction of the workforce is already experiencing AI integration, suggesting we're at an inflection point where AI is becoming normalized across many professions."
        },
        {
          key: "Develop What AI Can't Do Well",
          finding: "Critical thinking, writing, and coding are the most augmented skills",
          implication: "Workers should focus on developing complementary skills that AI struggles with: interpersonal abilities, creative direction, ethical judgment, and physical dexterity."
        }
      ]
    },
    {
      title: "Economic & Workforce Impact",
      icon: <BriefcaseBusiness size={24} className="text-green-600" />,
      insights: [
        {
          key: "Middle-Class Knowledge Jobs Face Most Disruption",
          finding: "Peak AI usage in mid-to-high wage jobs ($75k-$100k) requiring bachelor's degrees",
          implication: "The 'hollowing out' pattern continues with AI—middle-skill knowledge jobs face the most immediate transformation, while both lower-wage service roles and elite specialized positions see less disruption currently."
        },
        {
          key: "Partnership Beats Replacement",
          finding: "57% of AI use cases involve augmentation vs. 43% automation",
          implication: "Human-AI collaboration is the dominant paradigm. Companies implementing AI might be better off designing systems that leverage this collaborative potential rather than pursuing full automation."
        },
        {
          key: "Four-Year Degrees Need Radical Reinvention",
          finding: "Bachelor's degree jobs (Job Zone 4) show highest AI integration",
          implication: "Traditional 4-year degrees may need to evolve, with greater emphasis on AI literacy, human-AI collaboration skills, and distinctly human capabilities that complement AI systems."
        }
      ]
    },
    {
      title: "Future Trajectories",
      icon: <Lightbulb size={24} className="text-amber-600" />,
      insights: [
        {
          key: "Creative Industries: Prepare for AI Acceleration",
          finding: "Increasing adoption in arts, design, and educational contexts",
          implication: "AI's impact appears to be spreading from technical domains to creative and educational fields, suggesting these sectors should prepare for acceleration of AI-driven transformation."
        },
        {
          key: "Elite Expertise Provides Temporary Shelter",
          finding: "High-expertise roles (Job Zone 5) show lower current adoption",
          implication: "Deep specialization currently provides some insulation from AI disruption, but this may change as models continue to advance in specialized domains."
        },
        {
          key: "Vertical AI Solutions Likely to Dominate Markets",
          finding: "Users Select Different AI Models Based on Task Requirements",
          implication: "The AI market is likely to segment into specialized tools optimized for different professional contexts, rather than converging on one-size-fits-all solutions."
        }
      ]
    }
  ];

  const researchBackground = {
    dataSource: "1 million privacy-preserved Claude.ai conversations (Dec '24-Jan '25)",
    methodology: "Clio framework mapped conversations to 17,000+ tasks in O*NET database",
    citation: "Anthropic Economic Index, 2025 - huggingface.co/datasets/Anthropic/EconomicIndex"
  };

  return (
    <div className="w-full p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">AI's Economic Impact: Key Insights</h1>
          <p className="text-gray-600 mt-2">Learnings from Anthropic's empirical research</p>
        </div>
        
        {/* Introduction Section */}
        <div className="bg-white/90 p-5 rounded-lg shadow-md backdrop-blur-sm border border-indigo-100 mb-6">
          <h2 className="text-xl font-bold text-indigo-800 mb-3">Research Overview</h2>
          <p className="text-gray-700 mb-4">
            The Anthropic Economic Index represents the first large-scale empirical study measuring how AI is actually being used across the economy. 
            Unlike predictive models or surveys, this research analyzes real-world interactions between humans and AI systems to provide
            ground-truth evidence of where and how AI is transforming work today.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-800 mb-2">Methodology</h3>
              <p className="text-gray-700 text-sm">
                Using Clio, a privacy-preserving analysis framework, researchers examined over 1 million Claude.ai conversations from December 2024 to January 2025.
                These conversations were systematically mapped to occupational tasks in the U.S. Department of Labor's O*NET database, 
                providing unprecedented visibility into which economic tasks are seeing actual AI usage in the wild.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Key Research Questions</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Which occupational categories show highest AI adoption?</li>
                <li>• How deeply is AI integrated within different professions?</li>
                <li>• Is AI primarily automating tasks or augmenting human capabilities?</li>
                <li>• How does AI usage correlate with wage levels and educational requirements?</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Occupational Categories Chart - Spanning full width */}
        <div className="bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm border border-blue-100 mb-6">
          <div className="flex items-center mb-6">
            <Cpu size={24} className="text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-indigo-900">AI Usage by Occupational Category</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={occupationalCategoryData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={24}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                <XAxis 
                  type="number" 
                  unit="%" 
                  domain={[0, 40]} 
                  tickCount={5}
                  fontSize={12}
                  tickFormatter={(value: number) => `${value}%`}
                  stroke="#6b7280"
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={180}
                  tick={{ fontSize: 13 }}
                  stroke="#6b7280"
                />
                <Bar 
                  dataKey="percentage" 
                  fill="#4f46e5"
                  radius={[0, 4, 4, 0]}
                  label={{ 
                    position: 'right',
                    fill: '#4f46e5',
                    fontSize: 13,
                    fontWeight: 500,
                    formatter: (value: number) => `${value}%`
                  }}
                >
                  {occupationalCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Main Insights Grid */}
        <div className="grid grid-cols-1 gap-6">
          {insightSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white/90 p-5 rounded-lg shadow-md backdrop-blur-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-2">{section.icon}</div>
                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
              </div>
              <div className="space-y-6">
                {section.insights.map((insight, insightIndex) => (
                  <div key={insightIndex} className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 bg-white/80 p-3 border-b border-indigo-100">
                      <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{`${sectionIndex + 1}.${insightIndex + 1}`}</span>
                      <h3 className="font-bold text-gray-900">{insight.key}</h3>
                    </div>
                    <div className="p-4">
                      <div className="mb-3 text-sm text-gray-600 bg-white/60 p-2 rounded border-l-4 border-indigo-200">
                        {insight.finding}
                      </div>
                      <div className="text-gray-800 bg-white/80 p-3 rounded">
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                          <p>{insight.implication}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 text-sm text-center text-gray-500">
        <p>Based on Anthropic Economic Index research, 2025 • Compiled by <a href="https://patrickfreyer.com" className="text-indigo-500 hover:text-indigo-600 transition-colors">Patrick Freyer</a></p>
      </div>
    </div>
  );
};

export default EconomicInsightsDashboard;