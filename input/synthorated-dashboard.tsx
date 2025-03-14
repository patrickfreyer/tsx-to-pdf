import React from 'react';
import { Headphones, Zap, ArrowRight, BarChart, Clock, Globe, Users } from 'lucide-react';

const SynthoratedFlyer = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-900 p-6 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header with attention-grabbing headline */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="px-4 py-1 bg-pink-500/30 rounded-full text-pink-200 text-sm font-medium mb-4">
            OPPORTUNITY FOR FOUNDERS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-200 via-pink-300 to-violet-200 text-transparent bg-clip-text mb-4">
            Synthorated.com
          </h1>
          <p className="text-xl text-violet-100 max-w-2xl mb-3">
            Fully Built AI Podcast Platform Ready for Scaling
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500/60 to-violet-500/60 rounded-full"></div>
        </div>

        {/* Hero section */}
        <div className="bg-indigo-900/40 backdrop-blur-sm p-6 rounded-lg border border-pink-500/30 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-3/5">
              <h2 className="text-2xl font-bold text-violet-100 mb-4">
                Ready-to-Scale AI Podcast Creation Platform
              </h2>
              <p className="text-violet-100 text-lg mb-4">
                Synthorated creates <span className="text-pink-300 font-medium">fully personalized podcasts</span> based on users' interests by analyzing the latest research, news, and developments across various fields.
              </p>
              <p className="text-violet-200 mb-6">
                Successfully built and tested, this platform is seeking the right founder to take it to market. Skip the initial development phase and start scaling immediately.
              </p>
              <div className="bg-indigo-950/50 p-4 rounded-lg">
                <div className="text-pink-200 font-medium mb-2 flex items-center">
                  <Zap size={18} className="mr-2" />
                  Why This Opportunity:
                </div>
                <p className="text-violet-200">
                  Companies like Descript and ElevenLabs have raised substantial funding for AI audio. Synthorated offers unique capabilities that build on and complement these existing solutions.
                </p>
              </div>
            </div>
            <div className="w-full md:w-2/5 bg-indigo-950/50 p-6 rounded-lg border border-indigo-600/30">
              <div className="relative">
                <div className="absolute -top-7 -right-4 w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center">
                  <Headphones size={28} className="text-pink-300" />
                </div>
                <h3 className="text-lg font-bold text-violet-100 mb-3">The Opportunity</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-6 text-pink-300">→</div>
                    <p className="text-violet-100">Complete codebase & platform</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-6 text-pink-300">→</div>
                    <p className="text-violet-100">Market-ready product</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-6 text-pink-300">→</div>
                    <p className="text-violet-100">Proven technology</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-6 text-pink-300">→</div>
                    <p className="text-violet-100">Growing market demand</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features with founder benefits */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-violet-100 mb-2">Key Features & Founder Benefits</h2>
            <p className="text-violet-200">Skip months of development and go straight to market</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-900/40 backdrop-blur-sm p-5 rounded-lg border border-pink-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-500/20 p-2 rounded-full">
                  <BarChart size={24} className="text-pink-300" />
                </div>
                <h3 className="text-lg font-bold text-violet-100">AI-Driven Content Creation</h3>
              </div>
              <p className="text-violet-200 mb-3">
                Personalized content generation across multiple topics, tailored to individual interests
              </p>
              <div className="bg-indigo-950/50 p-3 rounded-lg">
                <p className="text-pink-200 font-medium mb-1">Founder Benefit:</p>
                <p className="text-sm text-violet-300">
                  Immediate ability to deliver personalized content at scale without hiring content creators
                </p>
              </div>
            </div>
            
            <div className="bg-purple-900/40 backdrop-blur-sm p-5 rounded-lg border border-pink-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-500/20 p-2 rounded-full">
                  <Clock size={24} className="text-pink-300" />
                </div>
                <h3 className="text-lg font-bold text-violet-100">Automatic Episode Scheduling</h3>
              </div>
              <p className="text-violet-200 mb-3">
                Recurring episodes with professional podcast structure, automatically generated
              </p>
              <div className="bg-indigo-950/50 p-3 rounded-lg">
                <p className="text-pink-200 font-medium mb-1">Founder Benefit:</p>
                <p className="text-sm text-violet-300">
                  Content creation pipeline already built, focusing resources on growth instead of production
                </p>
              </div>
            </div>
            
            <div className="bg-purple-900/40 backdrop-blur-sm p-5 rounded-lg border border-pink-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-500/20 p-2 rounded-full">
                  <Globe size={24} className="text-pink-300" />
                </div>
                <h3 className="text-lg font-bold text-violet-100">Podcast Platform Integration</h3>
              </div>
              <p className="text-violet-200 mb-3">
                Seamless integration with Apple Podcasts, Spotify, and all other major platforms
              </p>
              <div className="bg-indigo-950/50 p-3 rounded-lg">
                <p className="text-pink-200 font-medium mb-1">Founder Benefit:</p>
                <p className="text-sm text-violet-300">
                  Distribution channels already set up, allowing immediate access to millions of listeners
                </p>
              </div>
            </div>
            
            <div className="bg-purple-900/40 backdrop-blur-sm p-5 rounded-lg border border-pink-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-500/20 p-2 rounded-full">
                  <Users size={24} className="text-pink-300" />
                </div>
                <h3 className="text-lg font-bold text-violet-100">Multi-Voice Synthesis</h3>
              </div>
              <p className="text-violet-200 mb-3">
                Natural listening experiences with varied voice profiles for engaging podcast formats
              </p>
              <div className="bg-indigo-950/50 p-3 rounded-lg">
                <p className="text-pink-200 font-medium mb-1">Founder Benefit:</p>
                <p className="text-sm text-violet-300">
                  Advanced voice technology already implemented, differentiated from competitors from day one
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Take Over Synthorated?</h2>
          <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
            Rather than letting this valuable technology collect dust, I'm looking to connect with ambitious founders who can focus on distribution and scaling.
          </p>
          <div className="inline-block bg-pink-500/40 px-6 py-3 rounded-lg text-white font-medium">
            Reach out to mail@patrickfreyer.com for Demo & Details
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-violet-300 text-xs">
          <p>Created by Patrick Freyer | BCG Strategy Consultant | AI & Software Developer</p>
          <div className="flex justify-center gap-2 mt-2">
            <span className="bg-indigo-900/40 px-2 py-1 rounded text-xs">Built & Tested</span>
            <span className="bg-indigo-900/40 px-2 py-1 rounded text-xs">Ready to Scale</span>
            <span className="bg-indigo-900/40 px-2 py-1 rounded text-xs">Market Opportunity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynthoratedFlyer;