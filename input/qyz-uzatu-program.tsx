import React from 'react';
import { Calendar, MapPin, Clock, Users, Coffee, Camera, Music, Wine, Map, Phone, Info, Heart, Plane, Utensils, Home, Moon, Sun } from 'lucide-react';

const QyzUzatuProgram = () => {
  return (
    <div className="w-full bg-gradient-to-br from-amber-900 to-teal-900 p-6 rounded-lg text-amber-50 font-sans">
      {/* Header Section */}
      <div className="text-center mb-8 p-6 bg-amber-900/30 backdrop-blur-sm rounded-lg border border-teal-500/20">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-200 to-teal-200 bg-clip-text text-transparent">Qyz Uzatu</h1>
        <p className="text-xl mb-4 text-amber-100">A Traditional Kazakh Farewell & Civil Wedding Celebration</p>
        <p className="mb-4 text-amber-200">Karaganda, Kazakhstan • June 18-21, 2025</p>
        <p className="mb-2 text-amber-100">In honor of Sofya Durneva & Patrick Freyer</p>
        <p className="text-sm text-amber-200">Hosted by Natalya & Piotr Durnev</p>
        
        <div className="mt-6 p-4 bg-amber-950/40 rounded-lg text-amber-200 text-sm">
          <Heart className="inline-block mr-2 h-4 w-4 text-rose-300" />
          <span className="italic">
            "Qyz uzatu" is an ancient Kazakh tradition that symbolizes a girl's farewell 
            to her parental home before becoming part of a new family.
          </span>
        </div>
      </div>
      
      {/* Kazakhstan Context Section */}
      <div className="mb-8 bg-amber-900/30 backdrop-blur-sm p-5 rounded-lg border border-teal-500/20">
        <div className="flex items-center mb-4">
          <div className="bg-teal-800/50 rounded-full p-2 mr-3">
            <MapPin className="h-6 w-6 text-amber-200" />
          </div>
          <h2 className="text-lg font-bold text-amber-100">About Kazakhstan</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-sm">
            <p className="text-amber-100">
              <span className="text-teal-300 font-bold">Country:</span> The world's largest landlocked country, Kazakhstan is the 9th largest country by area.
            </p>
            <p className="text-amber-100">
              <span className="text-teal-300 font-bold">Astana:</span> The capital city (formerly Nur-Sultan), known for its futuristic architecture and as the second-coldest capital city in the world.
            </p>
            <p className="text-amber-100">
              <span className="text-teal-300 font-bold">Karaganda:</span> The fourth-largest city, historically important for coal mining and as a cultural center in central Kazakhstan.
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <p className="text-amber-100">
              <span className="text-teal-300 font-bold">Culture:</span> Rich nomadic heritage with influences from Russia, China, and other Central Asian cultures.
            </p>
            <p className="text-amber-100">
              <span className="text-teal-300 font-bold">Traditions:</span> Kazakh culture places high importance on hospitality, respect for elders, and family celebrations like the Qyz Uzatu.
            </p>
            <p className="text-amber-100">
              <span className="text-teal-300 font-bold">Cuisine:</span> Cuisine is rich in meat from the local steppe alongside dairy products. Traditional dishes include Beshbarmak (boiled meat with noodles) and Baursak (fried dough).
            </p>
          </div>
        </div>
      </div>

      {/* Daily Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Day 1 */}
        <div className="bg-amber-900/30 backdrop-blur-sm p-5 rounded-lg border border-teal-500/20">
          <div className="flex items-center mb-4">
            <div className="bg-teal-800/50 rounded-full p-2 mr-3">
              <Calendar className="h-6 w-6 text-amber-200" />
            </div>
            <h2 className="text-lg font-bold text-amber-100">Day 1: June 18, 2025</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">00:00</span>
              </div>
              <div>
                <p className="text-amber-100">Arrival in Astana</p>
                <p className="text-xs text-amber-200">Early check-in</p>
                <p className="text-xs text-amber-300 italic">Rest after night flight</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">12:00</span>
              </div>
              <div>
                <p className="text-amber-100">Astana City Tour</p>
                <p className="text-xs text-amber-200">Exploring Kazakhstan's futuristic capital</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">14:00</span>
              </div>
              <div>
                <p className="text-amber-100">Lunch</p>
                <p className="text-xs text-amber-200">Traditional Kazakh Lunch</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">18:00</span>
              </div>
              <div>
                <p className="text-amber-100">Cultural Program & Dinner</p>
                <p className="text-xs text-amber-200">Traditional Kazakh entertainment</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">20:00</span>
              </div>
              <div>
                <div className="flex space-x-2">
                  <div className="bg-teal-800/30 p-2 rounded text-xs">
                    <p className="text-teal-200">Hen Party</p>
                  </div>
                  <div className="bg-amber-800/30 p-2 rounded text-xs">
                    <p className="text-amber-200">Stag Party</p>
                  </div>
                  <div className="bg-green-800/30 p-2 rounded text-xs">
                    <p className="text-green-200">Cultural Program</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Day 2 */}
        <div className="bg-amber-900/30 backdrop-blur-sm p-5 rounded-lg border border-teal-500/20">
          <div className="flex items-center mb-4">
            <div className="bg-teal-800/50 rounded-full p-2 mr-3">
              <Calendar className="h-6 w-6 text-amber-200" />
            </div>
            <h2 className="text-lg font-bold text-amber-100">Day 2: June 19, 2025</h2>
          </div>
          
          <div className="space-y-3">
          <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">08:30</span>
              </div>
              <div>
                <p className="text-amber-100">International Breakfast Buffet before Check-out</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">09:30</span>
              </div>
              <div>
                <p className="text-amber-100">Astana Grand Mosque Visit</p>
                <p className="text-xs text-amber-200">Tour of the largest mosque in Central Asia</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">10:30</span>
              </div>
              <div>
                <p className="text-amber-100">Trip to Karaganda</p>
                <p className="text-xs text-amber-200">~3 hour journey by bus</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">13:30</span>
              </div>
              <div>
                <p className="text-amber-100">Welcome Lunch in Karaganda</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">14:30</span>
              </div>
              <div>
                <p className="text-amber-100">Hotel Check-in</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">15:30</span>
              </div>
              <div>
                <div className="flex space-x-2">
                  <div className="bg-teal-800/30 p-2 rounded text-xs">
                    <p className="text-teal-200">Russian Manicure <span className="text-teal-300">(Bridal Party)</span></p>
                  </div>
                  <div className="bg-amber-800/30 p-2 rounded text-xs">
                    <p className="text-amber-200">Shooting Range <span className="text-amber-300">(Grooms Party)</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">19:00</span>
              </div>
              <div>
                <p className="text-amber-100">Dinner with Team Building Games</p>
                <p className="text-xs text-amber-200">Traditional & modern activities</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Day 3 */}
        <div className="bg-amber-900/30 backdrop-blur-sm p-5 rounded-lg border border-teal-500/20">
          <div className="flex items-center mb-4">
            <div className="bg-teal-800/50 rounded-full p-2 mr-3">
              <Calendar className="h-6 w-6 text-amber-200" />
            </div>
            <h2 className="text-lg font-bold text-amber-100">Day 3: June 20, 2025</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">11:00</span>
              </div>
              <div>
                <p className="text-amber-100">Civil Wedding Ceremony</p>
                <p className="text-xs text-amber-200">Official ceremony and signing</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">12:00</span>
              </div>
              <div>
                <p className="text-amber-100">Photo Session</p>
                <p className="text-xs text-amber-200">Photo opportunity with the bride and groom alongside wedding reception</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">14:00</span>
              </div>
              <div>
                <p className="text-amber-100">Rest & Free Time</p>
                <p className="text-xs text-amber-200">Preparation for evening celebration</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">18:00</span>
              </div>
              <div>
                <p className="text-amber-100 font-bold">Main Qyz Uzatu Celebration Dinner</p>
                <p className="text-xs text-amber-200">Traditional ceremonial event with Kazakh surprises and fusion cuisine</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">22:00</span>
              </div>
              <div>
                <p className="text-amber-100">Afterparty</p>
                <p className="text-xs text-amber-200">Karaganda Nightlife</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Day 4 */}
        <div className="bg-amber-900/30 backdrop-blur-sm p-5 rounded-lg border border-teal-500/20">
          <div className="flex items-center mb-4">
            <div className="bg-teal-800/50 rounded-full p-2 mr-3">
              <Calendar className="h-6 w-6 text-amber-200" />
            </div>
            <h2 className="text-lg font-bold text-amber-100">Day 4: June 21, 2025</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">Morning</span>
              </div>
              <div>
                <p className="text-amber-100">Breakfast and Rest</p>
                <p className="text-xs text-amber-200">Optional spa time</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">13:00</span>
              </div>
              <div>
                <p className="text-amber-100">Garden Afterparty</p>
                <p className="text-xs text-amber-200">Buffet and drinks at the home of Natalya and Piotr</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">Flexible</span>
              </div>
              <div>
                <p className="text-amber-100">Departure to Astana</p>
                <p className="text-xs text-amber-200">Arranged according to flight schedules</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Travel Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-900/30 backdrop-blur-sm p-5 rounded-lg border border-teal-500/20">
          <div className="flex items-center mb-4">
            <div className="bg-teal-800/50 rounded-full p-2 mr-3">
              <Info className="h-6 w-6 text-amber-200" />
            </div>
            <h2 className="text-lg font-bold text-amber-100">Cultural Insights</h2>
          </div>
          
          <div className="space-y-3 text-sm">
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Qyz Uzatu:</span> The celebration signifies the bride's journey from her family home to her new life, literally meaning "seeing off the girl".</p>
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Ceremony:</span> Features traditional music (dombra), blessings (bata), and the bride's farewell to her family.</p>
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Attire:</span> Consider elegant attire in friendly colors; traditional attire is welcomed but not required.</p>
          </div>
        </div>
        
        <div className="bg-amber-900/30 backdrop-blur-sm p-5 rounded-lg border border-teal-500/20">
          <div className="flex items-center mb-4">
            <div className="bg-teal-800/50 rounded-full p-2 mr-3">
              <Plane className="h-6 w-6 text-amber-200" />
            </div>
            <h2 className="text-lg font-bold text-amber-100">Travel Tips</h2>
          </div>
          
          <div className="space-y-3 text-sm">
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Weather:</span> June in Kazakhstan is generally warm (20-30°C/68-86°F) with occasional rain. Pack light layers and sunscreen.</p>
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Language:</span> Kazakh and Russian are widely spoken. Many younger people in urban areas speak some English. Signage is predominantly in Russian.</p>
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Currency:</span> The Kazakhstani Tenge (KZT). The country is mostly cash-free and accepts major cards.</p>
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Etiquette:</span> Respect for elders is important. Shoes must be removed when entering homes.</p>
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Transportation:</span> Astana International Airport is a highly modern transport hub. Within the country, Yandex taxis are the local Uber equivalent and very low cost.</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-amber-900/30 backdrop-blur-sm p-5 rounded-lg border border-teal-500/20 text-center">
        <p className="text-sm text-amber-200 mb-3">
          <Info className="inline-block h-4 w-4 mr-1 text-teal-300" />
          Program is subject to change depending on guest schedules, event availability, and logistics.
        </p>
        
        <div className="mb-4">
          <p className="text-amber-100 font-bold">Contact Information</p>
          <div className="flex justify-center space-x-6 mt-2">
            <div className="text-sm">
              <p className="text-amber-200">Piotr</p>
              <p className="text-amber-300">+7 701 566 7539</p>
            </div>
            <div className="text-sm">
              <p className="text-amber-200">Natalya</p>
              <p className="text-amber-300">+7 701 717 8451</p>
            </div>
          </div>
        </div>
        
        <p className="text-amber-100 text-sm">With love, Natalya and Piotr Durnev</p>
        <p className="text-xs text-amber-300 mt-1">
          <Heart className="inline-block h-3 w-3 mr-1 text-teal-300" />
          We look forward to sharing this special moment with you
        </p>
      </div>
    </div>
  );
};

export default QyzUzatuProgram;
