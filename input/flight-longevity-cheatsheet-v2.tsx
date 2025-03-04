import React from 'react';
import { Moon, Sun, Droplet, Clock, Plane, Utensils, Dumbbell, Coffee, Zap, Eye, BedDouble, Wind, Map } from 'lucide-react';

const FlightSurvivalCheatSheet = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8 rounded-xl shadow-xl max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center mb-2">
          <Plane className="text-violet-300 mr-2 transform rotate-45" size={28} />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-300">Night Flight Longevity Protocol</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pre-Flight */}
        <div className="bg-indigo-800/40 p-5 rounded-lg backdrop-blur-sm border border-indigo-600/30 hover:bg-indigo-800/60 transition-colors">
          <div className="flex items-center mb-4 border-b border-pink-500/30 pb-2">
            <Clock className="text-pink-300 mr-2" size={22} />
            <h3 className="text-lg font-bold text-pink-300">PRE-FLIGHT</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-violet-700/40 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                <Utensils className="text-violet-200" size={16} />
              </div>
              <p className="text-violet-100">Fast before & during flight (yes, incl. the champagne)<sup>7</sup></p>
            </li>
            <li className="flex items-start">
              <div className="bg-violet-700/40 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                <Clock className="text-violet-200" size={16} />
              </div>
              <p className="text-violet-100">Begin time zone shift 2-3 days before departure<sup>8</sup></p>
            </li>
            <li className="flex items-start">
              <div className="bg-violet-700/40 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                <Map className="text-violet-200" size={16} />
              </div>
              <p className="text-violet-100">If possible take a hot shower to lower core body temp</p>
            </li>
          </ul>
        </div>
        
        {/* In-Flight */}
        <div className="bg-indigo-800/40 p-5 rounded-lg backdrop-blur-sm border border-indigo-600/30 hover:bg-indigo-800/60 transition-colors">
          <div className="flex items-center mb-4 border-b border-pink-500/30 pb-2">
            <Plane className="text-pink-300 mr-2" size={22} />
            <h3 className="text-lg font-bold text-pink-300">IN-FLIGHT</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-violet-700/40 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                <Droplet className="text-violet-200" size={16} />
              </div>
              <p className="text-violet-100">Drink 500ml water + electrolytes every 2-3 hours<sup>6</sup></p>
            </li>
            <li className="flex items-start">
              <div className="bg-violet-700/40 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                <BedDouble className="text-violet-200" size={16} />
              </div>
              <p className="text-violet-100">Sleep according to destination time zone</p>
            </li>
            <li className="flex items-start">
              <div className="bg-violet-700/40 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                <Wind className="text-violet-200" size={16} />
              </div>
              <p className="text-violet-100">Skip onboard screens; opt for reading or synthorated.com<sup>11</sup></p>
            </li>
          </ul>
        </div>
        
        {/* Post-Flight */}
        <div className="bg-indigo-800/40 p-5 rounded-lg backdrop-blur-sm border border-indigo-600/30 hover:bg-indigo-800/60 transition-colors">
          <div className="flex items-center mb-4 border-b border-pink-500/30 pb-2">
            <Sun className="text-pink-300 mr-2" size={22} />
            <h3 className="text-lg font-bold text-pink-300">POST-FLIGHT</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-violet-700/40 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                <Dumbbell className="text-violet-200" size={16} />
              </div>
              <p className="text-violet-100">30 min light exercise in morning sunlight<sup>9</sup></p>
            </li>
            <li className="flex items-start">
              <div className="bg-violet-700/40 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                <Coffee className="text-violet-200" size={16} />
              </div>
              <p className="text-violet-100">Avoid caffeine or switch to matcha to optimize recovery</p>
            </li>
            <li className="flex items-start">
              <div className="bg-violet-700/40 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                <Eye className="text-violet-200" size={16} />
              </div>
              <p className="text-violet-100">Use blue light blockers after sunset (device settings + potentially glasses)<sup>10</sup></p>
            </li>
          </ul>
        </div>
        
        {/* Supplements */}
        <div className="bg-indigo-800/40 p-5 rounded-lg backdrop-blur-sm border border-indigo-600/30 hover:bg-indigo-800/60 transition-colors">
          <div className="flex items-center mb-4 border-b border-pink-500/30 pb-2">
            <Zap className="text-pink-300 mr-2" size={22} />
            <h3 className="text-lg font-bold text-pink-300">MY TRAVEL SUPPLEMENTS<sup className="text-xs">†</sup></h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Magnesium', desc: 'Sleep & recovery', ref: '1' },
              { name: 'Vitamin D', desc: 'Immune support', ref: '2' },
              { name: 'Methylfolate', desc: 'Energy & mood', ref: '3' },
              { name: 'L-Theanine', desc: 'Calm focus', ref: '4' },
              { name: 'Creatine', desc: 'Brain function', ref: '5' },
              { name: 'Electrolytes', desc: 'Hydration', ref: '6' }
            ].map((supplement) => (
              <div key={supplement.name} className="bg-indigo-700/30 p-2 rounded-md text-center border border-indigo-500/20 hover:bg-indigo-700/50 transition-colors">
                <p className="font-medium text-violet-200 text-sm break-words">{supplement.name}<sup className="text-xs">{supplement.ref}</sup></p>
                <p className="text-xs text-violet-300 mt-0.5 break-words">{supplement.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-violet-400 mt-2 italic text-center">Adjust timing to destination time zone</p>
          <p className="text-xs text-violet-400 mt-1 text-center">†Not medical advice - consult your healthcare provider</p>
        </div>
      </div>
      
      <div className="mt-5 text-xs text-violet-300 border-t border-pink-500/20 pt-3">
        <div className="flex items-center justify-center mb-2">
          <Moon className="text-violet-300 mr-1" size={14} />
          <p>Optimize your travel recovery | #LongevityTravel #JetlagProtocol</p>
        </div>
        
        <div className="text-left text-xs text-violet-400 mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
            <p><sup>1</sup> Abbasi et al. (2012). J Res Med Sci - Magnesium improves sleep quality</p>
            <p><sup>2</sup> Cannell et al. (2006). Epidemiol Infect - Vitamin D reduces respiratory infections</p>
            <p><sup>3</sup> Stahl (2008). CNS Spectr - Methylfolate crosses blood-brain barrier</p>
            <p><sup>4</sup> Nobre et al. (2008). Biol Psychol - L-theanine increases alpha waves</p>
            <p><sup>5</sup> Avgerinos et al. (2018). Exp Gerontol - Creatine enhances cognition</p>
            <p><sup>6</sup> Shirreffs et al. (2004). Br J Nutr - Electrolytes improve rehydration</p>
            <p><sup>7</sup> Hatori et al. (2012). Cell Metab - Fasting helps reset circadian rhythms</p>
            <p><sup>8</sup> Revell & Eastman (2012) - Pre-adaptation shortens jet lag duration</p>
            <p><sup>9</sup> Youngstedt et al. (2019) - Exercise timing influences body clock</p>
            <p><sup>10</sup> Gringras et al. (2015). J Pineal Res - Blue light filters improve melatonin</p>
            <p><sup>11</sup> Chang et al. (2015). PNAS - Screen light suppresses melatonin production</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSurvivalCheatSheet;