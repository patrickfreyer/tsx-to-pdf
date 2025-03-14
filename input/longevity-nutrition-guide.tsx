import React from 'react';

const LongevityNutritionGuide: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-2">The Longevity Nutrition Guide</h1>
      <p className="text-center italic text-gray-600 mb-8">"Eating Today for a Healthier You Tomorrow"</p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. The Longevity Plate: The 4P Framework for Smart Eating</h2>
        <p className="mb-3">To simplify what to eat, remember the 4P Longevity Plate:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="broccoli">🥦</span> Plants (50%)</p>
            <p>Colorful vegetables & low-glycemic fruits → antioxidants & fiber</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="chicken">🍗</span> Protein (25%)</p>
            <p>Lean meats, fish, eggs, legumes → muscle maintenance & metabolism</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="avocado">🥑</span> Power Fats (15%)</p>
            <p>Nuts, seeds, olive oil, fatty fish → brain & heart health</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="sweet potato">🍠</span> Power Carbs (10%)</p>
            <p>Whole grains, legumes, tubers → long-lasting energy</p>
          </div>
        </div>
        
        <p className="font-semibold">Key Takeaway: Your body thrives on nutrient diversity. Build meals with this 4P Plate to stay energized, strong, and sharp.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. The "MVP" Nutrients for Longevity</h2>
        <p className="mb-3">Long life isn't about eating more—it's about eating smarter. Focus on these MVP nutrients:</p>
        
        <ul className="mb-4 space-y-3">
          <li className="flex">
            <span className="font-bold mr-2">M = Magnesium & Minerals <span role="img" aria-label="salt">🧂</span></span> 
            <span>(Dark greens, nuts, seeds) → Stress resilience, sleep quality</span>
          </li>
          <li className="flex">
            <span className="font-bold mr-2">V = Vibrant Antioxidants <span role="img" aria-label="strawberry">🍓</span></span> 
            <span>(Berries, green tea, dark chocolate) → Cellular protection, anti-aging</span>
          </li>
          <li className="flex">
            <span className="font-bold mr-2">P = Proteins & Healthy Fats <span role="img" aria-label="avocado">🥑</span></span> 
            <span>(Eggs, fish, olive oil) → Brain & muscle health</span>
          </li>
        </ul>
        
        <p className="font-semibold">Remember: MVP foods fuel your body's defense against aging. Prioritize these daily.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">3. The "YES / LESS" Rule for Everyday Eating</h2>
        <p className="mb-3">Instead of restrictive dieting, use this simple filter:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-bold text-green-600 mb-2"><span role="img" aria-label="checkmark">✅</span> YES to:</p>
            <ul className="space-y-2">
              <li>- Fiber & Fermented Foods (Better gut = better longevity)</li>
              <li>- Deep-Colored Foods (More color = more nutrients)</li>
              <li>- Healthy Fats (Omega-3s for brain & heart)</li>
            </ul>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="font-bold text-red-600 mb-2"><span role="img" aria-label="no entry">🚫</span> LESS of:</p>
            <ul className="space-y-2">
              <li>- Refined Sugars & Oils (Spike inflammation & aging)</li>
              <li>- Ultra-Processed Foods (Your body doesn't recognize them)</li>
              <li>- Late-Night Heavy Meals (Messes with digestion & sleep)</li>
            </ul>
          </div>
        </div>
        
        <p className="font-semibold">Key Takeaway: Eat like you care about your future self.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">4. "WHEN" Matters: The 3-T Rule for Meal Timing</h2>
        <p className="mb-3"><span role="img" aria-label="clock">🕒</span> Timing impacts metabolism, energy, and longevity. Follow the 3-T Rule:</p>
        
        <div className="space-y-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="one">1️⃣</span> Time-Restricted Eating</p>
            <p>Aim for a 12-16 hour fasting window (e.g., 8AM-8PM eating)</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="two">2️⃣</span> Try to Eat Early</p>
            <p>Have dinner before 7PM to align with circadian rhythms</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="three">3️⃣</span> Target Protein First</p>
            <p>Prioritize protein at breakfast for muscle preservation</p>
          </div>
        </div>
        
        <p className="font-semibold">Remember: "It's not just what you eat—it's when you eat."</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">5. The 3H Formula for Hydration & Gut Health</h2>
        <p className="mb-3">Hydration and digestion are the backbone of longevity. Use the 3H Formula:</p>
        
        <div className="space-y-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="water">💧</span> Hydrate Smart</p>
            <p>Start your day with mineral-rich water (add lemon or salt)</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="microbe">🦠</span> Happy Gut</p>
            <p>Feed your microbiome with probiotics (fermented foods) & prebiotics (fiber)</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="herb">🌿</span> Herbal Teas & Broths</p>
            <p>Support digestion & stress control</p>
          </div>
        </div>
        
        <p className="font-semibold">Key Takeaway: Good digestion = good health. Your gut feeds your future.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">6. Smart Supplements: The "BIG 4" for Longevity</h2>
        <p className="mb-3">Not all supplements are essential, but these BIG 4 are:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="sun">☀️</span> D3 + K2</p>
            <p>Bone & immune health (if you don't get enough sun)</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="bone">🦴</span> Magnesium</p>
            <p>Stress relief, better sleep, muscle function</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="brain">🧠</span> Omega-3s (EPA/DHA)</p>
            <p>Brain & heart support</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="microbe">🦠</span> Probiotics</p>
            <p>Gut health = overall health</p>
          </div>
        </div>
        
        <p className="font-semibold">Remember: Supplements support—they don't replace food.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">7. The 80/20 Rule for Food Freedom</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="plate">🍽</span> 80% Nourish</p>
            <p>Whole, unprocessed foods (daily fuel)</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="font-bold"><span role="img" aria-label="cake">🍰</span> 20% Enjoy</p>
            <p>Treats you love (guilt-free, but mindful)</p>
          </div>
        </div>
        
        <p className="font-semibold">Key Takeaway: Consistency wins. Focus on progress, not perfection.</p>
      </section>

      <section className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Final Thought: "Eat Today for the You in 50 Years"</h2>
        <p className="mb-4">Your future health starts with what you put on your plate right now.</p>
        
        <h3 className="text-xl font-bold mb-2">Start Today:</h3>
        <ul className="mb-4 space-y-2">
          <li>- Build your next meal using the 4P Longevity Plate</li>
          <li>- Hydrate using the 3H Formula</li>
          <li>- Shift your meal timing with the 3-T Rule</li>
        </ul>
        
        <p className="italic font-semibold">Your best investment? The food you eat every day.</p>
      </section>

      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-bold mb-2">What's Next?</h3>
        <p className="font-semibold">
          <span role="img" aria-label="pointing right">👉</span> Save this guide. Start small. Your body will thank you.
        </p>
      </div>
    </div>
  );
};

export default LongevityNutritionGuide;
