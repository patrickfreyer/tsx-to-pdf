import React from 'react';
import { Globe, Briefcase, BookOpen, Award, GraduationCap, BookMarked, Beaker, Database, Building } from 'lucide-react';

const MattHigginsonProfile = () => {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-green-900 to-teal-800 text-white p-6 rounded-lg">
      {/* Header with Visual Elements */}
      <div className="mb-8 relative">
        {/* Abstract visualization of blockchain/digital assets */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <div className="absolute top-4 right-4 w-16 h-16 border-4 border-green-300 rounded-lg transform rotate-12"></div>
          <div className="absolute top-12 right-12 w-16 h-16 border-4 border-teal-400 rounded-lg transform -rotate-12"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-4 border-emerald-200 rounded-lg"></div>
        </div>
        
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-200">
          Matt Higginson
        </h1>
        <div className="flex items-center mt-2 space-x-2">
          <Briefcase size={18} className="text-green-400" />
          <p className="text-lg text-green-100">Partner at McKinsey & Company</p>
        </div>
        <div className="flex mt-3 space-x-1">
          <span className="bg-green-700/60 px-2 py-1 rounded-md text-xs text-green-100">Blockchain</span>
          <span className="bg-teal-700/60 px-2 py-1 rounded-md text-xs text-green-100">Digital Assets</span>
          <span className="bg-emerald-700/60 px-2 py-1 rounded-md text-xs text-green-100">Financial Strategy</span>
        </div>
      </div>

      {/* Main content with visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expertise Column */}
        <div className="space-y-5">
          {/* Expertise with visual element */}
          <div className="bg-green-800/40 backdrop-blur-sm p-5 rounded-lg border border-green-600/30 relative overflow-hidden">
            {/* Abstract blockchain visualization */}
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <div className="w-24 h-24 border-2 border-green-300 rounded-lg"></div>
              <div className="w-16 h-16 border-2 border-green-300 rounded-lg absolute top-4 left-4"></div>
              <div className="w-8 h-8 border-2 border-green-300 rounded-lg absolute top-8 left-8"></div>
            </div>
            
            <div className="flex items-center mb-4 relative z-10">
              <div className="bg-green-700 p-2 rounded-full mr-3">
                <Award size={20} className="text-green-300" />
              </div>
              <h2 className="text-lg font-bold text-green-100">Driving Digital Transformation</h2>
            </div>
            
            <div className="space-y-3 relative z-10">
              <div className="flex items-start">
                <div className="mt-1 mr-3 w-1 h-1 rounded-full bg-green-300"></div>
                <div>
                  <p className="font-medium text-green-100">Global Blockchain Lead</p>
                  <p className="text-sm text-green-300">Heads McKinsey's distributed-ledger initiatives</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-3 w-1 h-1 rounded-full bg-green-300"></div>
                <div>
                  <p className="font-medium text-green-100">Financial Services Risk</p>
                  <p className="text-sm text-green-300">Credit collections & recovery strategies</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-3 w-1 h-1 rounded-full bg-green-300"></div>
                <div>
                  <p className="font-medium text-green-100">Digital Assets Strategy</p>
                  <p className="text-sm text-green-300">Tokenization, CBDCs & market infrastructure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Appearances */}
          <div className="bg-teal-800/40 backdrop-blur-sm p-5 rounded-lg border border-teal-600/30">
            <div className="flex items-center mb-3">
              <div className="bg-teal-700 p-2 rounded-full mr-3">
                <Globe size={20} className="text-teal-300" />
              </div>
              <h2 className="text-lg font-bold text-teal-100">Shaping Industry Dialogue</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex">
                <div className="w-2 h-2 rounded-full bg-teal-300 mt-2 mr-2"></div>
                <div>
                  <p className="font-medium text-teal-100">Point Zero Forum 2023</p>
                  <p className="text-xs text-teal-300">Digital Payments & Purpose-Bound Money</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-2 h-2 rounded-full bg-teal-300 mt-2 mr-2"></div>
                <div>
                  <p className="font-medium text-teal-100">Assets on Blockchain Conference 2024</p>
                  <p className="text-xs text-teal-300">New York - Future of Tokenized Assets</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Education Section */}
        <div className="space-y-5">
          <div className="bg-emerald-800/40 backdrop-blur-sm p-5 rounded-lg border border-emerald-600/30">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-700 p-2 rounded-full mr-3">
                <GraduationCap size={20} className="text-emerald-300" />
              </div>
              <h2 className="text-lg font-bold text-emerald-100">Building Knowledge Foundations</h2>
            </div>
            
            <div className="space-y-5">
              <div className="relative border-l-2 border-emerald-500 pl-5 pb-5">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                <div className="flex items-center">
                  <BookOpen size={16} className="text-emerald-300 mr-2" />
                  <p className="font-bold text-emerald-100">Ph.D. in Organic Chemistry</p>
                </div>
                <p className="text-sm text-emerald-300 mt-1">University of Bristol</p>
                <p className="text-xs text-emerald-200 mt-2">Doctoral research in advanced organic chemistry with applications in environmental science</p>
              </div>
              
              <div className="relative border-l-2 border-emerald-500 pl-5 pb-5">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                <div className="flex items-center">
                  <Building size={16} className="text-emerald-300 mr-2" />
                  <p className="font-bold text-emerald-100">MBA</p>
                </div>
                <p className="text-sm text-emerald-300 mt-1">University of Oxford, Saïd Business School</p>
                <p className="text-xs text-emerald-200 mt-2">Bridging scientific expertise with business strategy and management</p>
              </div>
              
              <div className="relative border-l-2 border-emerald-500 pl-5 pb-5">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                <div className="flex items-center">
                  <BookMarked size={16} className="text-emerald-300 mr-2" />
                  <p className="font-bold text-emerald-100">M.A. & B.A. in Geography</p>
                </div>
                <p className="text-sm text-emerald-300 mt-1">University of Oxford</p>
                <p className="text-xs text-emerald-200 mt-2">Focus on environmental and earth sciences with specialization in climate studies</p>
              </div>
            </div>
          </div>
          
          {/* Prior Experience */}
          <div className="bg-green-800/40 backdrop-blur-sm p-5 rounded-lg border border-green-600/30">
            <div className="flex items-center mb-4">
              <div className="bg-green-700 p-2 rounded-full mr-3">
                <Beaker size={20} className="text-green-300" />
              </div>
              <h2 className="text-lg font-bold text-green-100">Bridging Science & Business</h2>
            </div>
            
            <div className="space-y-3">
              <div className="bg-green-700/30 p-3 rounded-lg">
                <p className="font-medium text-green-100">Forensic Scientist & Expert Witness</p>
                <p className="text-xs text-green-300 mt-1">Led operations in forensic science sector in the UK</p>
                <p className="text-xs text-green-200 mt-1">Provided expert testimony for legal cases and managed laboratory teams</p>
              </div>
              
              <div className="bg-green-700/30 p-3 rounded-lg">
                <p className="font-medium text-green-100">Academic Research & Teaching</p>
                <p className="text-xs text-green-300 mt-1">Lecturer in Earth Sciences at Boston University</p>
                <p className="text-xs text-green-200 mt-1">Research Associate at UMass Dartmouth with focus on climate change and oceanography</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-green-700/30 text-emerald-300 text-xs flex justify-between items-center">
        <p>Global Blockchain Lead & Partner, McKinsey & Company</p>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-green-300"></span>
          <span className="w-2 h-2 rounded-full bg-teal-300"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
        </div>
      </div>
    </div>
  );
};

export default MattHigginsonProfile;