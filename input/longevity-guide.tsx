import React from 'react';
import { Leaf, Battery, Clock, Droplets } from 'lucide-react';

const LongevityNutritionGuide = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-slate-800">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="p-5 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-200 bg-clip-text text-transparent">The Longevity Nutrition Guide</h1>
          <p className="text-blue-200 italic mt-2">"Eating Today for a Healthier You Tomorrow"</p>
        </div>

        {/* The 4P Framework */}
        <div className="p-5 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-600/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-400/20 p-2 rounded-full">
              <Leaf size={20} className="text-teal-300" />
            </div>
            <h2 className="text-lg font-bold text-teal-100">The 4P Longevity Plate</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg bg-emerald-700/40 border border-emerald-500/30">
              <p className="font-bold text-emerald-200">🥦 Plants (50%)</p>
              <p className="text-emerald-100 text-sm">Colorful vegetables & low-glycemic fruits</p>
            </div>
            <div className="p-4 rounded-lg bg-red-800/30 border border-red-600/30">
              <p className="font-bold text-red-200">🍗 Protein (25%)</p>
              <p className="text-red-100 text-sm">Lean meats, fish, eggs, legumes</p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-800/30 border border-yellow-600/30">
              <p className="font-bold text-yellow-200">🥑 Power Fats (15%)</p>
              <p className="text-yellow-100 text-sm">Nuts, seeds, olive oil, fatty fish</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-800/30 border border-blue-600/30">
              <p className="font-bold text-blue-200">🍠 Power Carbs (10%)</p>
              <p className="text-blue-100 text-sm">Whole grains, legumes, tubers</p>
            </div>
          </div>
          
          <p className="text-sm text-emerald-100">Your body thrives on nutrient diversity. Build meals with this 4P Plate to stay energized, strong, and sharp.</p>
        </div>

        {/* MVP Nutrients */}
        <div className="p-5 rounded-lg bg-emerald-800/40 backdrop-blur-sm border border-emerald-600/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-400/20 p-2 rounded-full">
              <Battery size={20} className="text-teal-300" />
            </div>
            <h2 className="text-lg font-bold text-teal-100">MVP Nutrients for Longevity</h2>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-emerald-700/40">
              <p className="font-bold text-emerald-100">M = Magnesium & Minerals 🧂</p>
              <p className="text-emerald-200 text-sm">Dark greens, nuts, seeds → Stress resilience, sleep quality</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-800/30">
              <p className="font-bold text-purple-100">V = Vibrant Antioxidants 🍓</p>
              <p className="text-purple-200 text-sm">Berries, green tea, dark chocolate → Cellular protection</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-800/30">
              <p className="font-bold text-blue-100">P = Proteins & Healthy Fats 🥑</p>
              <p className="text-blue-200 text-sm">Eggs, fish, olive oil → Brain & muscle health</p>
            </div>
          </div>
          
          <p className="text-sm text-teal-100">MVP foods fuel your body's defense against aging. Prioritize these daily.</p>
        </div>

        {/* YES/LESS Rule */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-5 rounded-lg bg-emerald-800/40 backdrop-blur-sm border border-emerald-600/30">
            <h2 className="text-lg font-bold text-emerald-100 mb-3">✅ YES to:</h2>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li className="flex items-start gap-2">
                <span className="text-emerald-300">•</span>
                <span>Fiber & Fermented Foods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-300">•</span>
                <span>Deep-Colored Foods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-300">•</span>
                <span>Healthy Fats (Omega-3s)</span>
              </li>
            </ul>
          </div>
          
          <div className="p-5 rounded-lg bg-red-900/40 backdrop-blur-sm border border-red-700/30">
            <h2 className="text-lg font-bold text-red-100 mb-3">🚫 LESS of:</h2>
            <ul className="space-y-2 text-sm text-red-100">
              <li className="flex items-start gap-2">
                <span className="text-red-300">•</span>
                <span>Refined Sugars & Oils</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-300">•</span>
                <span>Ultra-Processed Foods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-300">•</span>
                <span>Late-Night Heavy Meals</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Meal Timing */}
        <div className="p-5 rounded-lg bg-emerald-800/40 backdrop-blur-sm border border-emerald-600/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-400/20 p-2 rounded-full">
              <Clock size={20} className="text-blue-300" />
            </div>
            <h2 className="text-lg font-bold text-blue-100">The 3-T Rule for Meal Timing</h2>
          </div>
          
          <div className="space-y-3 mb-3">
            <div className="p-3 rounded-lg bg-blue-800/30">
              <p className="font-bold text-blue-100">1️⃣ Time-Restricted Eating</p>
              <p className="text-blue-200 text-sm">Aim for a 12-16 hour fasting window daily</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-800/30">
              <p className="font-bold text-blue-100">2️⃣ Try to Eat Early</p>
              <p className="text-blue-200 text-sm">Have dinner before 7PM to align with circadian rhythms</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-800/30">
              <p className="font-bold text-blue-100">3️⃣ Target Protein First</p>
              <p className="text-blue-200 text-sm">Prioritize protein at breakfast for muscle preservation</p>
            </div>
          </div>
          
          <p className="text-sm text-blue-100">"It's not just what you eat—it's when you eat."</p>
        </div>

        {/* Hydration */}
        <div className="p-5 rounded-lg bg-emerald-800/40 backdrop-blur-sm border border-emerald-600/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-400/20 p-2 rounded-full">
              <Droplets size={20} className="text-cyan-300" />
            </div>
            <h2 className="text-lg font-bold text-cyan-100">The 3H Formula for Hydration</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="p-3 rounded-lg bg-blue-800/30">
              <p className="font-bold text-blue-100">💧 Hydrate Smart</p>
              <p className="text-blue-200 text-xs">Mineral-rich water with lemon or salt</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-700/40">
              <p className="font-bold text-emerald-100">🦠 Happy Gut</p>
              <p className="text-emerald-200 text-xs">Probiotics & prebiotics</p>
            </div>
            <div className="p-3 rounded-lg bg-teal-700/40">
              <p className="font-bold text-teal-100">🌿 Herbal Teas</p>
              <p className="text-teal-200 text-xs">Support digestion</p>
            </div>
          </div>
          
          <p className="text-sm text-cyan-100">Good digestion = good health. Your gut feeds your future.</p>
        </div>

        {/* 80/20 Rule */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-5 rounded-lg bg-emerald-800/40 backdrop-blur-sm border border-emerald-600/30">
            <h2 className="text-lg font-bold text-emerald-100 mb-2">🍽 80% Nourish</h2>
            <p className="text-sm text-emerald-200">Whole, unprocessed foods (daily fuel)</p>
          </div>
          
          <div className="p-5 rounded-lg bg-yellow-800/30 backdrop-blur-sm border border-yellow-600/30">
            <h2 className="text-lg font-bold text-yellow-100 mb-2">🍰 20% Enjoy</h2>
            <p className="text-sm text-yellow-200">Treats you love (guilt-free, but mindful)</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 text-center">
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-300 to-teal-200 bg-clip-text text-transparent mb-3">"Eat Today for the You in 50 Years"</h2>
          <p className="text-blue-100 text-sm mb-4">Your future health starts with what you put on your plate right now.</p>
          <p className="text-xs text-slate-300">Personal insights from Patrick Freyer • Not medical advice</p>
        </div>
      </div>
    </div>
  );
};

export default LongevityNutritionGuide;