import React from 'react';
import { Briefcase, Award, GraduationCap, Beaker, Globe } from 'lucide-react';

const MattHigginsonProfile = () => {
  return (
    <div className="w-full h-full flex flex-col bg-white text-gray-800 p-8 rounded-lg">
      {/* Header with BCG-style green bar */}
      <div className="relative mb-8 pb-4">
        <div className="absolute top-0 left-0 w-24 h-1 bg-green-600"></div>
        
        <h1 className="text-3xl font-bold text-gray-900 mt-6">
          Matt Higginson
        </h1>
        <div className="flex items-center mt-2">
          <Briefcase size={16} className="text-green-600 mr-2" />
          <p className="text-gray-600">Partner at McKinsey & Company</p>
        </div>
        <p className="text-gray-500 mt-2 text-sm">Global Blockchain Lead & Digital Assets Strategy Expert</p>
      </div>

      {/* Main content in clean, minimal grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-8">
          {/* Expertise */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 p-2 rounded-full mr-3">
                <Award size={16} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Driving Digital Transformation</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-2 border-green-600 pl-4">
                <p className="font-medium text-gray-800">Global Blockchain Leadership</p>
                <p className="text-sm text-gray-600 mt-1">Heads McKinsey's distributed-ledger initiatives worldwide</p>
              </div>
              
              <div className="border-l-2 border-green-600 pl-4">
                <p className="font-medium text-gray-800">Financial Risk Innovation</p>
                <p className="text-sm text-gray-600 mt-1">Transforming credit collections & recovery strategies</p>
              </div>
              
              <div className="border-l-2 border-green-600 pl-4">
                <p className="font-medium text-gray-800">Digital Assets Strategy</p>
                <p className="text-sm text-gray-600 mt-1">Pioneering approaches to tokenization, CBDCs & market infrastructure</p>
              </div>
            </div>
          </div>

          {/* Speaking */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 p-2 rounded-full mr-3">
                <Globe size={16} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Shaping Industry Dialogue</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-xs font-bold">2023</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Point Zero Forum</p>
                  <p className="text-sm text-gray-600">Digital Payments & Purpose-Bound Money</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-xs font-bold">2024</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Assets on Blockchain Conference</p>
                  <p className="text-sm text-gray-600">New York - Future of Tokenized Assets</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Education */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 p-2 rounded-full mr-3">
                <GraduationCap size={16} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Building Knowledge Foundations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="w-24 flex-shrink-0">
                  <div className="h-6 w-20 bg-green-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Ph.D.</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Organic Chemistry</p>
                  <p className="text-sm text-gray-600">University of Bristol</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-24 flex-shrink-0">
                  <div className="h-6 w-20 bg-green-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-medium">MBA</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Business Administration</p>
                  <p className="text-sm text-gray-600">University of Oxford, Saïd Business School</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-24 flex-shrink-0">
                  <div className="h-6 w-20 bg-green-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-medium">M.A. & B.A.</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Geography</p>
                  <p className="text-sm text-gray-600">University of Oxford</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scientific Background */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 p-2 rounded-full mr-3">
                <Beaker size={16} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Bridging Science & Business</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                  <p className="font-medium text-gray-800">Forensic Scientist & Expert Witness</p>
                </div>
                <p className="text-sm text-gray-600 ml-5 mt-1">Led forensic science operations in the UK, providing expert testimony for legal cases</p>
              </div>
              
              <div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                  <p className="font-medium text-gray-800">Academic Research & Teaching</p>
                </div>
                <p className="text-sm text-gray-600 ml-5 mt-1">Lecturer at Boston University with research focus on climate change and oceanography</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with BCG-style green bar */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-gray-500 text-xs flex justify-between items-center">
        <p>Global Blockchain Lead & Partner, McKinsey & Company</p>
        <div className="h-1 w-24 bg-green-600"></div>
      </div>
    </div>
  );
};

export default MattHigginsonProfile;