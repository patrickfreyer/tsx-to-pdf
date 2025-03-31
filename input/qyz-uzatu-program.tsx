import React from 'react';
import { Calendar, MapPin, Clock, Users, Coffee, Camera, Music, Wine, Map, Phone, Info, Heart, Plane, Utensils, Home, Moon, Sun } from 'lucide-react';

const QyzUzatuProgram = () => {
  return (
    <div className="w-full bg-[#fbfbe8] p-6 rounded-lg text-[#9e2c3a] font-sans">
      {/* Header Section */}
      <div className="text-center mb-8 p-6 bg-[#c3c881]/10 backdrop-blur-sm rounded-lg border border-[#9e2c3a]/20">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#9e2c3a] to-[#c3c881] bg-clip-text text-transparent">Qyz Uzatu</h1>
        <p className="text-xl mb-4 text-[#9e2c3a]">A Traditional Kazakh Bridal Farewell & Civil Wedding Celebration</p>
        <p className="mb-4 text-[#9e2c3a]/80">Karaganda, Kazakhstan • June 18-22, 2025</p>
        <p className="mb-2 text-[#9e2c3a]">In honour of Sofya Durneva & Patrick Freyer</p>
        <p className="text-sm text-[#9e2c3a]/80">Hosted by Natalya & Piotr Durnev</p>
        
        <div className="mt-6 p-4 bg-[#c3c881]/20 rounded-lg text-[#9e2c3a] text-sm">
          <Heart className="inline-block mr-2 h-4 w-4 text-[#9e2c3a]" />
          <span className="italic">
            "Qyz uzatu" is an ancient Kazakh tradition that symbolizes a girl's farewell 
            to her parental home before becoming part of a new family.
          </span>
        </div>
      </div>
      
      {/* Kazakhstan Context Section */}
      <div className="mb-8 bg-[#c3c881]/10 backdrop-blur-sm p-5 rounded-lg border border-[#9e2c3a]/20">
        <div className="flex items-center mb-4">
          <div className="bg-[#9e2c3a]/10 rounded-full p-2 mr-3">
            <MapPin className="h-6 w-6 text-[#9e2c3a]" />
          </div>
          <h2 className="text-lg font-bold text-[#9e2c3a]">About Kazakhstan</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-sm">
            <p className="text-[#9e2c3a]">
              <span className="text-[#9e2c3a] font-bold">Country:</span> The world's largest landlocked country, Kazakhstan is the 9th largest country by area.
            </p>
            <p className="text-[#9e2c3a]">
              <span className="text-[#9e2c3a] font-bold">Astana:</span> The capital city (formerly Nur-Sultan), known for its futuristic architecture and as the second-coldest capital city in the world.
            </p>
            <p className="text-[#9e2c3a]">
              <span className="text-[#9e2c3a] font-bold">Karaganda:</span> The fourth-largest city, historically important for coal mining and as a cultural center in central Kazakhstan.
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <p className="text-[#9e2c3a]">
              <span className="text-[#9e2c3a] font-bold">Culture:</span> Rich nomadic heritage with influences from Russia, Mongolia, and other Central Asian cultures.
            </p>
            <p className="text-[#9e2c3a]">
              <span className="text-[#9e2c3a] font-bold">Traditions:</span> Kazakh culture places high importance on hospitality, respect for elders, and family celebrations like the Qyz Uzatu.
            </p>
            <p className="text-[#9e2c3a]">
              <span className="text-[#9e2c3a] font-bold">Cuisine:</span> Cuisine is rich in meat from the local steppe alongside dairy products. Traditional dishes include Beshbarmak (boiled meat with noodles) and Baursak (fried dough).
            </p>
          </div>
        </div>
      </div>

      {/* Daily Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Day 1 */}
        <div className="bg-[#c3c881]/10 backdrop-blur-sm p-5 rounded-lg border border-[#9e2c3a]/20">
          <div className="flex items-center mb-4">
            <div className="bg-[#9e2c3a]/10 rounded-full p-2 mr-3">
              <Calendar className="h-6 w-6 text-[#9e2c3a]" />
            </div>
            <h2 className="text-lg font-bold text-[#9e2c3a]">Day 1: June 18, 2025</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">00:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Arrival in Astana</p>
                <p className="text-xs text-[#9e2c3a]/80">Early check-in</p>
                <p className="text-xs text-[#9e2c3a]/70 italic">Rest after night flight</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">12:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a] font-bold">Astana City Tour</p>
                <p className="text-xs text-[#9e2c3a]/80">Exploring Kazakhstan's futuristic capital</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">14:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Lunch</p>
                <p className="text-xs text-[#9e2c3a]/80">Traditional Kazakh Lunch</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">18:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a] font-bold">Cultural Program & Dinner</p>
                <p className="text-xs text-[#9e2c3a]/80">Traditional Kazakh entertainment</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">20:00</span>
              </div>
              <div>
                <div className="flex space-x-2">
                  <div className="bg-[#9e2c3a]/10 p-2 rounded text-xs">
                    <p className="text-[#9e2c3a]">Hen Party</p>
                  </div>
                  <div className="bg-[#c3c881]/20 p-2 rounded text-xs">
                    <p className="text-[#9e2c3a]">Stag Party</p>
                  </div>
                  <div className="bg-[#9e2c3a]/10 p-2 rounded text-xs">
                    <p className="text-[#9e2c3a]">Cultural Program</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Day 2 */}
        <div className="bg-[#c3c881]/10 backdrop-blur-sm p-5 rounded-lg border border-[#9e2c3a]/20">
          <div className="flex items-center mb-4">
            <div className="bg-[#9e2c3a]/10 rounded-full p-2 mr-3">
              <Calendar className="h-6 w-6 text-[#9e2c3a]" />
            </div>
            <h2 className="text-lg font-bold text-[#9e2c3a]">Day 2: June 19, 2025</h2>
          </div>
          
          <div className="space-y-3">
          <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">08:30</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Continental Grand Breakfast Buffet & Check-out</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">09:30</span>
              </div>
              <div>
                <p className="text-[#9e2c3a] font-bold">Astana Grand Mosque Visit</p>
                <p className="text-xs text-[#9e2c3a]/80">Tour of the largest mosque in Central Asia</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">10:30</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Trip to Karaganda</p>
                <p className="text-xs text-[#9e2c3a]/80">~3 hour journey by bus</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">13:30</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Welcome Lunch in Karaganda</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">14:30</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Hotel Check-in</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">15:30</span>
              </div>
              <div>
                <div className="flex space-x-2">
                  <div className="bg-[#9e2c3a]/10 p-2 rounded text-xs">
                    <p className="text-[#9e2c3a]">Russian Manicure <span className="text-[#9e2c3a]">(Bridal Party)</span></p>
                  </div>
                  <div className="bg-[#c3c881]/20 p-2 rounded text-xs">
                    <p className="text-[#9e2c3a]">Shooting Range <span className="text-[#9e2c3a]">(Grooms Party)</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">19:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a] font-bold">Dinner with Team Building Games</p>
                <p className="text-xs text-[#9e2c3a]/80">Traditional & modern activities</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Day 3 */}
        <div className="bg-[#c3c881]/10 backdrop-blur-sm p-5 rounded-lg border border-[#9e2c3a]/20">
          <div className="flex items-center mb-4">
            <div className="bg-[#9e2c3a]/10 rounded-full p-2 mr-3">
              <Calendar className="h-6 w-6 text-[#9e2c3a]" />
            </div>
            <h2 className="text-lg font-bold text-[#9e2c3a]">Day 3: June 20, 2025</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">11:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a] font-bold">Civil Wedding Ceremony</p>
                <p className="text-xs text-[#9e2c3a]/80">Official ceremony and signing</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">12:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Photo Session</p>
                <p className="text-xs text-[#9e2c3a]/80">Photo opportunity with the bride and groom alongside wedding reception</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">14:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Rest & Free Time</p>
                <p className="text-xs text-[#9e2c3a]/80">Preparation for evening celebration</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">18:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a] font-bold">Main Qyz Uzatu Celebration Dinner</p>
                <p className="text-xs text-[#9e2c3a]/80">Traditional ceremonial event with Kazakh surprises and fusion cuisine</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">22:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Afterparty</p>
                <p className="text-xs text-[#9e2c3a]/80">Karaganda Nightlife</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Day 4 */}
        <div className="bg-[#c3c881]/10 backdrop-blur-sm p-5 rounded-lg border border-[#9e2c3a]/20">
          <div className="flex items-center mb-4">
            <div className="bg-[#9e2c3a]/10 rounded-full p-2 mr-3">
              <Calendar className="h-6 w-6 text-[#9e2c3a]" />
            </div>
            <h2 className="text-lg font-bold text-[#9e2c3a]">Day 4: June 21, 2025</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">Morning</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Breakfast and Rest</p>
                <p className="text-xs text-[#9e2c3a]/80">Optional spa time</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">13:00</span>
              </div>
              <div>
                <p className="text-[#9e2c3a] font-bold">Garden Afterparty</p>
                <p className="text-xs text-[#9e2c3a]/80">Buffet and drinks at the home of Natalya and Piotr</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-20 text-[#9e2c3a] flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">Flexible</span>
              </div>
              <div>
                <p className="text-[#9e2c3a]">Departure to Astana</p>
                <p className="text-xs text-[#9e2c3a]/80">Arranged according to flight schedules</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Travel Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#c3c881]/10 backdrop-blur-sm p-5 rounded-lg border border-[#9e2c3a]/20">
          <div className="flex items-center mb-4">
            <div className="bg-[#9e2c3a]/10 rounded-full p-2 mr-3">
              <Info className="h-6 w-6 text-[#9e2c3a]" />
            </div>
            <h2 className="text-lg font-bold text-[#9e2c3a]">Cultural Insights</h2>
          </div>
          
          <div className="space-y-3 text-sm">
            <p className="text-[#9e2c3a]"><span className="text-[#9e2c3a] font-bold">Qyz Uzatu:</span> The celebration signifies the bride's journey from her family home to her new life, literally meaning "seeing off the girl".</p>
            <p className="text-[#9e2c3a]"><span className="text-[#9e2c3a] font-bold">Ceremony:</span> Features traditional music (dombra), blessings (bata), and the bride's farewell to her family.</p>
            <p className="text-[#9e2c3a]"><span className="text-[#9e2c3a] font-bold">Attire:</span> Consider elegant attire in friendly colors; traditional attire is welcomed but not required.</p>
          </div>
        </div>
        
        <div className="bg-[#c3c881]/10 backdrop-blur-sm p-5 rounded-lg border border-[#9e2c3a]/20">
          <div className="flex items-center mb-4">
            <div className="bg-[#9e2c3a]/10 rounded-full p-2 mr-3">
              <Plane className="h-6 w-6 text-[#9e2c3a]" />
            </div>
            <h2 className="text-lg font-bold text-[#9e2c3a]">Travel Tips</h2>
          </div>
          
          <div className="space-y-3 text-sm">
            <p className="text-[#9e2c3a]"><span className="text-[#9e2c3a] font-bold">Weather:</span> June in Kazakhstan is generally warm (20-30°C/68-86°F) with occasional rain. Pack light layers and sunscreen.</p>
            <p className="text-[#9e2c3a]"><span className="text-[#9e2c3a] font-bold">Language:</span> Kazakh and Russian are widely spoken. Many younger people in urban areas speak some English. Signage is predominantly in Russian.</p>
            <p className="text-[#9e2c3a]"><span className="text-[#9e2c3a] font-bold">Currency:</span> The Kazakhstani Tenge (KZT). The country is mostly cash-free and accepts major cards.</p>
            <p className="text-[#9e2c3a]"><span className="text-[#9e2c3a] font-bold">Etiquette:</span> Respect for elders is important. Shoes must be removed when entering homes.</p>
            <p className="text-[#9e2c3a]"><span className="text-[#9e2c3a] font-bold">Transportation:</span> Astana International Airport is a highly modern transport hub. Within the country, Yandex taxis are the local Uber equivalent and very low cost.</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-[#c3c881]/10 backdrop-blur-sm p-5 rounded-lg border border-[#9e2c3a]/20 text-center">
        <p className="text-sm text-[#9e2c3a]/80 mb-3">
          <Info className="inline-block h-4 w-4 mr-1 text-[#9e2c3a]" />
          Program is subject to change depending on guest schedules, event availability, and logistics.
        </p>
        
        <div className="mb-4">
          <p className="text-[#9e2c3a] font-bold">Contact Information</p>
          <div className="flex justify-center space-x-6 mt-2">
            <div className="text-sm">
              <p className="text-[#9e2c3a]">Piotr</p>
              <p className="text-[#9e2c3a]/80">+7 701 566 7539</p>
            </div>
            <div className="text-sm">
              <p className="text-[#9e2c3a]">Natalya</p>
              <p className="text-[#9e2c3a]/80">+7 701 717 8451</p>
            </div>
          </div>
        </div>
        
        <p className="text-[#9e2c3a] text-sm">With love, Natalya and Piotr Durnev</p>
        <p className="text-xs text-[#9e2c3a]/70 mt-1">
          <Heart className="inline-block h-3 w-3 mr-1 text-[#9e2c3a]" />
          We look forward to sharing this special moment with you
        </p>
      </div>
    </div>
  );
};

export default QyzUzatuProgram;
