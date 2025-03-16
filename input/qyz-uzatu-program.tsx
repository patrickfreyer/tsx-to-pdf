import React from 'react';
import { Calendar, MapPin, Clock, Users, Coffee, Camera, Music, Wine, Map, Phone, Info, Heart, Plane, Utensils, Home, Moon, Sun } from 'lucide-react';

const QyzUzatuProgram = () => {
  return (
    <div className="w-full bg-gradient-to-br from-amber-900 to-teal-900 p-6 rounded-lg text-amber-50 font-sans">
      {/* Header Section */}
      <div className="text-center mb-8 p-6 bg-amber-900/30 backdrop-blur-sm rounded-lg border border-teal-500/20">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-200 to-teal-200 bg-clip-text text-transparent">Qyz Uzatu & Civil Wedding</h1>
        <p className="text-xl mb-4 text-amber-100">A Traditional Kazakh Farewell Celebration and the Civil Wedding of Sofya & Patrick</p>
        <p className="mb-4 text-amber-200">Karaganda, Kazakhstan • June 18-21, 2025</p>
        <p className="text-sm text-amber-200">Hosted by Natalya & Piotr</p>
        
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
            <p className="text-amber-100">
              <span className="text-teal-300 font-bold">Journey:</span> The trip from Astana to Karaganda covers approximately 220 km through the Kazakh Steppe and takes about 3 hours by car.
            </p>
          </div>
          
          <div className="space-y-2 text-sm">
            <p className="text-amber-100">
              <span className="text-teal-300 font-bold">Culture:</span> Rich nomadic heritage with influences from Russia, China, and other Central Asian cultures.
            </p>
            <p className="text-amber-100">
              <span className="text-teal-300 font-bold">Traditions:</span> Kazakh culture places high importance on hospitality, respect for elders, and family celebrations like the Qyz Uzatu.
            </p>
          </div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="mb-8 bg-amber-900/30 backdrop-blur-sm p-5 rounded-lg border border-teal-500/20">
        <div className="flex items-center mb-4">
          <div className="bg-teal-800/50 rounded-full p-2 mr-3">
            <Info className="h-6 w-6 text-amber-200" />
          </div>
          <h2 className="text-lg font-bold text-amber-100">Event Legend</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="flex items-center">
            <div className="bg-teal-800/30 p-2 rounded-md text-xs mr-3 min-w-24 text-center">
              <p className="text-teal-200">Bridal Activities</p>
            </div>
            <p className="text-amber-100 text-sm">For the bride and female attendees</p>
          </div>
          
          <div className="flex items-center">
            <div className="bg-amber-800/30 p-2 rounded-md text-xs mr-3 min-w-24 text-center">
              <p className="text-amber-200">Groom Activities</p>
            </div>
            <p className="text-amber-100 text-sm">For the groom and male attendees</p>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-amber-900/50 to-teal-900/50 p-2 rounded-md text-xs mr-3 min-w-24 text-center">
              <p className="text-amber-100">Shared Events</p>
            </div>
            <p className="text-amber-100 text-sm">For all guests</p>
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
                <p className="text-xs text-amber-200">Early check-in available</p>
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
                <p className="text-xs text-amber-200">Exploring Kazakhstan's capital</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">14:00</span>
              </div>
              <div>
                <p className="text-amber-100">Lunch</p>
                <p className="text-xs text-amber-200">Traditional Kazakh Cuisine</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">18:00</span>
              </div>
              <div>
                <p className="text-amber-100">Cultural Program & Dinner</p>
                <p className="text-xs text-amber-200">Traditional entertainment</p>
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
                    <p className="text-teal-200">Bridal Celebration</p>
                  </div>
                  <div className="bg-amber-800/30 p-2 rounded text-xs">
                    <p className="text-amber-200">Groom Celebration</p>
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
                <span className="text-xs">09:00</span>
              </div>
              <div>
                <p className="text-amber-100">Check-out from Astana</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">09:30</span>
              </div>
              <div>
                <p className="text-amber-100">Astana Grand Mosque Visit</p>
                <p className="text-xs text-amber-200">Cultural exploration</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">10:30</span>
              </div>
              <div>
                <p className="text-amber-100">Trip to Karaganda</p>
                <p className="text-xs text-amber-200">~3 hour journey</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">13:30</span>
              </div>
              <div>
                <p className="text-amber-100">Lunch in Karaganda</p>
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
                    <p className="text-teal-200">Russian Manicure <span className="text-teal-300">(Bride & female guests)</span></p>
                  </div>
                  <div className="bg-amber-800/30 p-2 rounded text-xs">
                    <p className="text-amber-200">Shooting Range <span className="text-amber-300">(Groom & male guests)</span></p>
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
                <p className="text-xs text-amber-200">Official celebration</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">12:00</span>
              </div>
              <div>
                <p className="text-amber-100">Photo Session</p>
                <p className="text-xs text-amber-200">Capturing memories</p>
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
                <p className="text-xs text-amber-200">Traditional ceremonial event</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">22:00</span>
              </div>
              <div>
                <p className="text-amber-100">Nightclub Celebration</p>
                <p className="text-xs text-amber-200">Modern festivities</p>
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
                <p className="text-amber-100">Rest & Free Time</p>
                <p className="text-xs text-amber-200">Recovery from celebrations</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-16 text-amber-300 flex-shrink-0">
                <Clock className="inline-block h-4 w-4 mr-1" />
                <span className="text-xs">13:00</span>
              </div>
              <div>
                <p className="text-amber-100">Second Day Afterparty</p>
                <p className="text-xs text-amber-200">Relaxed gathering</p>
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
              <Plane className="h-6 w-6 text-amber-200" />
            </div>
            <h2 className="text-lg font-bold text-amber-100">Travel Tips</h2>
          </div>
          
          <div className="space-y-3 text-sm">
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Weather:</span> June in Kazakhstan is generally warm (20-30°C/68-86°F) with occasional rain. Pack light layers and sunscreen.</p>
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Language:</span> Kazakh and Russian are widely spoken. Many younger people in urban areas speak some English.</p>
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Currency:</span> The Kazakhstani Tenge (KZT). It's advisable to have some cash; major cards are accepted in cities.</p>
            <p className="text-amber-100"><span className="text-teal-300 font-bold">Etiquette:</span> Respect for elders is important. Remove shoes when entering homes.</p>
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
        
        <p className="text-amber-100 text-sm">With love, Natalya and Piotr</p>
        <p className="text-xs text-amber-300 mt-1">
          <Heart className="inline-block h-3 w-3 mr-1 text-teal-300" />
          We look forward to sharing this special moment with you
        </p>
      </div>
    </div>
  );
};

export default QyzUzatuProgram;
