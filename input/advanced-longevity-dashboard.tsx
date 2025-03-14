import React from 'react';
import { 
  Leaf, Battery, Clock, Droplets, Heart, 
  Activity, BarChart, Beaker, Brain, Shield,
  Sun, Moon, PieChart, Dumbbell, Apple
} from 'lucide-react';

const AdvancedLongevityDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-950 to-emerald-950">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto">
        <div className="p-6 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-emerald-600/20 mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent text-center mb-3">
            The Science-Backed Longevity System
          </h1>
          <p className="text-teal-200 text-center italic mb-4">
            "Optimizing your biological age through evidence-based interventions"
          </p>
          
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="p-3 rounded-lg bg-emerald-900/50 backdrop-blur-sm border border-emerald-700/30 text-center">
              <div className="bg-emerald-700/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Apple size={18} className="text-emerald-300" />
              </div>
              <p className="text-emerald-200 font-bold">Nutrition</p>
            </div>
            
            <div className="p-3 rounded-lg bg-blue-900/50 backdrop-blur-sm border border-blue-700/30 text-center">
              <div className="bg-blue-700/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Dumbbell size={18} className="text-blue-300" />
              </div>
              <p className="text-blue-200 font-bold">Exercise</p>
            </div>
            
            <div className="p-3 rounded-lg bg-purple-900/50 backdrop-blur-sm border border-purple-700/30 text-center">
              <div className="bg-purple-700/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Beaker size={18} className="text-purple-300" />
              </div>
              <p className="text-purple-200 font-bold">Supplements</p>
            </div>
            
            <div className="p-3 rounded-lg bg-cyan-900/50 backdrop-blur-sm border border-cyan-700/30 text-center">
              <div className="bg-cyan-700/30 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <BarChart size={18} className="text-cyan-300" />
              </div>
              <p className="text-cyan-200 font-bold">Biomarkers</p>
            </div>
          </div>
          
          <p className="text-slate-300 text-xs text-center">
            An evidence-based approach integrating all four pillars of longevity science
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Nutrition Section - First Column */}
          <div className="space-y-6">
            {/* Nutrition Overview */}
            <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-emerald-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-700/30 p-2 rounded-full">
                  <Leaf size={20} className="text-emerald-300" />
                </div>
                <h2 className="text-lg font-bold text-emerald-100">Precision Nutrition</h2>
              </div>
              
              {/* Macronutrient Dial Charts */}
              <div className="relative h-32 mb-4">
                {/* Visual representation of macros as circular segments */}
                <div className="absolute inset-0 rounded-full border-8 border-emerald-700/30"></div>
                <div className="absolute inset-0 rounded-full border-8 border-t-emerald-400 border-r-emerald-400 border-b-transparent border-l-transparent transform rotate-45"></div>
                <div className="absolute inset-0 rounded-full border-8 border-t-teal-400 border-r-transparent border-b-transparent border-l-transparent"></div>
                <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-r-transparent border-b-transparent border-l-blue-400 transform -rotate-45"></div>
                
                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-slate-900/80 p-2 rounded-full w-16 h-16 flex flex-col items-center justify-center">
                    <span className="text-emerald-300 text-xs font-bold">Optimal</span>
                    <span className="text-emerald-100 text-xs">Ratio</span>
                  </div>
                </div>
                
                {/* Macro labels */}
                <div className="absolute top-0 right-8 text-emerald-300 text-xs font-bold">
                  Plants 50%
                </div>
                <div className="absolute top-2 left-6 text-teal-300 text-xs font-bold">
                  Protein 30%
                </div>
                <div className="absolute bottom-2 left-6 text-blue-300 text-xs font-bold">
                  Fats 20%
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-emerald-100">
                  <span className="font-bold text-emerald-300">Nutrient Density &gt;</span> Caloric Restriction
                </p>
                <p className="text-sm text-emerald-100">
                  <span className="font-bold text-emerald-300">Time-Restricted Eating:</span> 16:8 window optimal
                </p>
                <p className="text-sm text-emerald-100">
                  <span className="font-bold text-emerald-300">Protein Timing:</span> 30g within 1hr of waking
                </p>
              </div>
            </div>
            
            {/* Dietary Principles */}
            <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-emerald-600/20">
              <h3 className="text-emerald-200 font-bold mb-3">Longevity Food Principles</h3>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-emerald-900/50 border border-emerald-700/30">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-emerald-100">Polyphenol-Rich Foods</p>
                    <span className="text-xs font-bold bg-emerald-700/50 px-2 py-1 rounded text-emerald-200">5+ daily</span>
                  </div>
                  <p className="text-xs text-emerald-200 mt-1">Berries, olive oil, green tea, dark chocolate</p>
                </div>
                
                <div className="p-3 rounded-lg bg-emerald-900/50 border border-emerald-700/30">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-emerald-100">Cruciferous Vegetables</p>
                    <span className="text-xs font-bold bg-emerald-700/50 px-2 py-1 rounded text-emerald-200">2+ daily</span>
                  </div>
                  <p className="text-xs text-emerald-200 mt-1">Broccoli, kale, cabbage, brussels sprouts</p>
                </div>
                
                <div className="p-3 rounded-lg bg-emerald-900/50 border border-emerald-700/30">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-emerald-100">Fermented Foods</p>
                    <span className="text-xs font-bold bg-emerald-700/50 px-2 py-1 rounded text-emerald-200">1+ daily</span>
                  </div>
                  <p className="text-xs text-emerald-200 mt-1">Kimchi, sauerkraut, yogurt, kefir</p>
                </div>
              </div>
            </div>
            
            {/* Circadian Eating */}
            <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-blue-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-700/30 p-2 rounded-full">
                  <Clock size={20} className="text-blue-300" />
                </div>
                <h2 className="text-lg font-bold text-blue-100">Circadian Nutrition</h2>
              </div>
              
              <div className="relative h-24 mb-3">
                {/* Day/Night timeline */}
                <div className="absolute inset-x-0 top-6 h-2 bg-slate-700 rounded-full"></div>
                <div className="absolute left-0 right-1/2 top-6 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-l-full"></div>
                
                {/* Time markers */}
                <div className="absolute top-0 left-0 flex flex-col items-center">
                  <Sun size={16} className="text-yellow-300 mb-1" />
                  <span className="text-yellow-200 text-xs">7AM</span>
                </div>
                
                <div className="absolute top-0 left-1/3 flex flex-col items-center">
                  <span className="text-emerald-300 text-xs">1PM</span>
                </div>
                
                <div className="absolute top-0 left-2/3 flex flex-col items-center">
                  <span className="text-blue-300 text-xs">7PM</span>
                </div>
                
                <div className="absolute top-0 right-0 flex flex-col items-center">
                  <Moon size={16} className="text-blue-300 mb-1" />
                  <span className="text-blue-200 text-xs">11PM</span>
                </div>
                
                {/* Eating window */}
                <div className="absolute left-0 right-1/2 top-12 flex justify-center">
                  <span className="text-emerald-300 text-xs">Eating Window (8hrs)</span>
                </div>
                
                {/* Fasting window */}
                <div className="absolute left-1/2 right-0 top-12 flex justify-center">
                  <span className="text-blue-300 text-xs">Fasting (16hrs)</span>
                </div>
              </div>
              
              <p className="text-xs text-blue-100 mt-4">
                Aligning your eating window with your body's natural circadian rhythm optimizes metabolic health and cellular repair mechanisms.
              </p>
            </div>
          </div>
          
          {/* Middle Column - Exercise & Biomarkers */}
          <div className="space-y-6">
            {/* Exercise Section */}
            <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-blue-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-700/30 p-2 rounded-full">
                  <Activity size={20} className="text-blue-300" />
                </div>
                <h2 className="text-lg font-bold text-blue-100">Optimal Exercise Protocol</h2>
              </div>
              
              {/* Exercise Types */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-3 rounded-lg bg-blue-900/50 border border-blue-700/30">
                  <p className="font-bold text-blue-100">Zone 2 Cardio</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-blue-200">150 min/week</p>
                    <div className="w-16 h-2 bg-blue-800 rounded-full">
                      <div className="w-12 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-blue-900/50 border border-blue-700/30">
                  <p className="font-bold text-blue-100">HIIT</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-blue-200">20-30 min/week</p>
                    <div className="w-16 h-2 bg-blue-800 rounded-full">
                      <div className="w-8 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-blue-900/50 border border-blue-700/30">
                  <p className="font-bold text-blue-100">Resistance</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-blue-200">2-3 sessions/week</p>
                    <div className="w-16 h-2 bg-blue-800 rounded-full">
                      <div className="w-14 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-blue-900/50 border border-blue-700/30">
                  <p className="font-bold text-blue-100">Mobility</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-blue-200">Daily practice</p>
                    <div className="w-16 h-2 bg-blue-800 rounded-full">
                      <div className="w-10 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-700/20 mb-3">
                <p className="text-sm text-blue-100">
                  <span className="font-bold text-blue-300">Recovery Focus:</span> Aim for 7-9 hours of quality sleep and active recovery techniques like contrast therapy (hot/cold exposure).
                </p>
              </div>
              
              <p className="text-xs text-blue-200">
                Diverse movement patterns promote longevity by building muscle, improving metabolic flexibility, and enhancing mitochondrial function.
              </p>
            </div>
            
            {/* Biomarkers Section */}
            <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-cyan-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-700/30 p-2 rounded-full">
                  <BarChart size={20} className="text-cyan-300" />
                </div>
                <h2 className="text-lg font-bold text-cyan-100">Key Biomarkers to Track</h2>
              </div>
              
              <div className="space-y-3 mb-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-cyan-900/50 border border-cyan-700/30">
                    <p className="font-bold text-cyan-100 text-sm">Glucose & HbA1c</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-cyan-200">Optimal: &lt;90, &lt;5.0%</p>
                      <p className="text-xs font-bold text-cyan-300">Quarterly</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-cyan-900/50 border border-cyan-700/30">
                    <p className="font-bold text-cyan-100 text-sm">Lipid Panel</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-cyan-200">Optimal: Various</p>
                      <p className="text-xs font-bold text-cyan-300">Quarterly</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-cyan-900/50 border border-cyan-700/30">
                    <p className="font-bold text-cyan-100 text-sm">CRP & IL-6</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-cyan-200">Inflammation markers</p>
                      <p className="text-xs font-bold text-cyan-300">Quarterly</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-cyan-900/50 border border-cyan-700/30">
                    <p className="font-bold text-cyan-100 text-sm">Vitamin D</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-cyan-200">Optimal: 50-70 ng/mL</p>
                      <p className="text-xs font-bold text-cyan-300">Quarterly</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-cyan-900/50 border border-cyan-700/30">
                  <p className="font-bold text-cyan-100 text-sm">Continuous Monitoring</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-cyan-200">CGM, HRV, Sleep Quality, RHR</p>
                    <p className="text-xs font-bold text-cyan-300">Daily</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-cyan-100">
                Biomarkers provide objective feedback about your interventions' effectiveness. Monitor patterns, not just isolated readings.
              </p>
            </div>
            
            {/* Hydration Section */}
            <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-cyan-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-700/30 p-2 rounded-full">
                  <Droplets size={20} className="text-cyan-300" />
                </div>
                <h2 className="text-lg font-bold text-cyan-100">Advanced Hydration Strategy</h2>
              </div>
              
              <div className="relative h-28 mb-4">
                {/* Hydration dial */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-cyan-700/50 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-cyan-300 font-bold text-lg">3.5L</p>
                    <p className="text-cyan-200 text-xs">Daily</p>
                  </div>
                </div>
                
                {/* Hydration type indicators */}
                <div className="absolute left-0 top-0">
                  <div className="bg-cyan-800/50 p-2 rounded w-16 text-center">
                    <p className="text-cyan-200 text-xs font-bold">Mineral</p>
                    <p className="text-cyan-300 text-xs">+Electrolytes</p>
                  </div>
                </div>
                
                <div className="absolute right-0 top-0">
                  <div className="bg-emerald-800/50 p-2 rounded w-16 text-center">
                    <p className="text-emerald-200 text-xs font-bold">Green Tea</p>
                    <p className="text-emerald-300 text-xs">Polyphenols</p>
                  </div>
                </div>
                
                <div className="absolute left-0 bottom-0">
                  <div className="bg-blue-800/50 p-2 rounded w-16 text-center">
                    <p className="text-blue-200 text-xs font-bold">Filtered</p>
                    <p className="text-blue-300 text-xs">Water</p>
                  </div>
                </div>
                
                <div className="absolute right-0 bottom-0">
                  <div className="bg-purple-800/50 p-2 rounded w-16 text-center">
                    <p className="text-purple-200 text-xs font-bold">Herbal</p>
                    <p className="text-purple-300 text-xs">Teas</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-cyan-100">
                Optimal hydration requires more than just water. Timing, mineral balance, and quality matter significantly for cellular function.
              </p>
            </div>
          </div>
          
          {/* Third Column - Supplements & Brain Health */}
          <div className="space-y-6">
            {/* Supplements */}
            <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-purple-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-700/30 p-2 rounded-full">
                  <Beaker size={20} className="text-purple-300" />
                </div>
                <h2 className="text-lg font-bold text-purple-100">Targeted Supplementation</h2>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="p-3 rounded-lg bg-purple-900/50 border border-purple-700/30">
                  <div className="flex justify-between">
                    <p className="font-bold text-purple-100">Tier 1 (Essential)</p>
                    <p className="text-xs bg-purple-700/50 px-2 py-1 rounded text-purple-200">
                      Daily
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-2">
                    <div className="bg-purple-800/30 p-1 rounded text-center">
                      <p className="text-purple-200 text-xs">Vitamin D3</p>
                    </div>
                    <div className="bg-purple-800/30 p-1 rounded text-center">
                      <p className="text-purple-200 text-xs">Magnesium</p>
                    </div>
                    <div className="bg-purple-800/30 p-1 rounded text-center">
                      <p className="text-purple-200 text-xs">Omega-3</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-purple-900/50 border border-purple-700/30">
                  <div className="flex justify-between">
                    <p className="font-bold text-purple-100">Tier 2 (Targeted)</p>
                    <p className="text-xs bg-purple-700/50 px-2 py-1 rounded text-purple-200">
                      Conditional
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-2">
                    <div className="bg-purple-800/30 p-1 rounded text-center">
                      <p className="text-purple-200 text-xs">CoQ10</p>
                    </div>
                    <div className="bg-purple-800/30 p-1 rounded text-center">
                      <p className="text-purple-200 text-xs">NMN</p>
                    </div>
                    <div className="bg-purple-800/30 p-1 rounded text-center">
                      <p className="text-purple-200 text-xs">Berberine</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-purple-900/50 border border-purple-700/30">
                  <div className="flex justify-between">
                    <p className="font-bold text-purple-100">Tier 3 (Experimental)</p>
                    <p className="text-xs bg-purple-700/50 px-2 py-1 rounded text-purple-200">
                      Cycling
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-2">
                    <div className="bg-purple-800/30 p-1 rounded text-center">
                      <p className="text-purple-200 text-xs">Spermidine</p>
                    </div>
                    <div className="bg-purple-800/30 p-1 rounded text-center">
                      <p className="text-purple-200 text-xs">Fisetin</p>
                    </div>
                    <div className="bg-purple-800/30 p-1 rounded text-center">
                      <p className="text-purple-200 text-xs">GlyNAC</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-purple-100">
                Approach supplements with precision. Test, don't guess. They complement but never replace nutrition fundamentals.
              </p>
            </div>
            
            {/* Brain Health */}
            <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-indigo-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-700/30 p-2 rounded-full">
                  <Brain size={20} className="text-indigo-300" />
                </div>
                <h2 className="text-lg font-bold text-indigo-100">Cognitive Optimization</h2>
              </div>
              
              <div className="relative h-32 mb-4">
                {/* Brain health radar chart */}
                <div className="absolute inset-0 rounded-full border border-indigo-700/30 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-indigo-700/50 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full border border-indigo-700/70 flex items-center justify-center">
                      <div className="w-2/3 h-2/3 rounded-full bg-indigo-700/20"></div>
                    </div>
                  </div>
                  <div className="absolute top-0 w-px h-1/2 bg-indigo-700/50 transform -translate-y-full"></div>
                  <div className="absolute right-0 h-px w-1/2 bg-indigo-700/50 transform translate-x-full"></div>
                  <div className="absolute bottom-0 w-px h-1/2 bg-indigo-700/50 transform translate-y-full"></div>
                  <div className="absolute left-0 h-px w-1/2 bg-indigo-700/50 transform -translate-x-full"></div>
                </div>
                
                {/* Cognitive domains */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-center">
                  <p className="text-indigo-300 text-xs font-bold">Memory</p>
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2 text-center">
                  <p className="text-indigo-300 text-xs font-bold">Focus</p>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-center">
                  <p className="text-indigo-300 text-xs font-bold">Mood</p>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2 text-center">
                  <p className="text-indigo-300 text-xs font-bold">Creativity</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="p-2 rounded bg-indigo-900/30 border border-indigo-700/20">
                  <p className="text-sm text-indigo-100">
                    <span className="font-bold text-indigo-300">Daily Practices:</span> Cold exposure, meditation, high-quality sleep, neurofeedback
                  </p>
                </div>
                <div className="p-2 rounded bg-indigo-900/30 border border-indigo-700/20">
                  <p className="text-sm text-indigo-100">
                    <span className="font-bold text-indigo-300">Brain Foods:</span> Fatty fish, blueberries, turmeric, coffee, dark chocolate
                  </p>
                </div>
              </div>
            </div>
            
            {/* Biological Age */}
            <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-cyan-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-700/30 p-2 rounded-full">
                  <Heart size={20} className="text-cyan-300" />
                </div>
                <h2 className="text-lg font-bold text-cyan-100">Biological Age Tracking</h2>
              </div>
              
              <div className="relative h-24 mb-4">
                {/* Age comparison visual */}
                <div className="absolute inset-x-0 top-0 h-8 bg-slate-800 rounded-full"></div>
                <div className="absolute left-0 top-0 w-3/4 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-l-full rounded-r-full flex items-center justify-end">
                  <div className="w-2 h-12 bg-white absolute right-0 rounded"></div>
                </div>
                
                {/* Age labels */}
                <div className="absolute bottom-0 left-0 text-emerald-300 text-xs">
                  0
                </div>
                <div className="absolute bottom-0 right-0 text-cyan-300 text-xs">
                  Chronological Age: 40
                </div>
                <div className="absolute bottom-0 left-3/4 text-white text-xs font-bold transform -translate-x-1/2">
                  Biological Age: 30
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-cyan-900/30 border border-cyan-700/20">
                <p className="text-sm text-cyan-100">
                  <span className="font-bold text-cyan-300">Testing Methods:</span> DNA methylation, blood biomarkers, phenotypic measures, functional capacity
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-slate-600/30 text-center mt-6">
          <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent mb-2">
            "Optimize Your Health Span, Not Just Lifespan"
          </h2>
          <p className="text-sm text-blue-100 mb-3">
            The most powerful longevity interventions are consistent daily habits, not occasional heroics.
          </p>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-emerald-300" />
              <p className="text-xs text-slate-300">Personal insights from Patrick Freyer</p>
            </div>
            <p className="text-xs text-slate-400">Not medical advice • Always consult healthcare professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedLongevityDashboard;