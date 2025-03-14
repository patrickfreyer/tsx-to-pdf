import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Tag, Navigation, Globe, Users, MessageSquare, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const HubSpotTrackingVisual = () => {
  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-lg text-white">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-100">
            HubSpot Contact Tracking Framework
          </h1>
          <p className="text-slate-300 mt-2">Comprehensive guide for tracking leads throughout their journey</p>
        </div>

        {/* Overview Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-lg border border-slate-700">
          <h2 className="text-lg font-bold text-slate-200 mb-3 flex items-center">
            <FileText className="mr-2 p-1 bg-slate-700 rounded-full" size={24} /> 
            Tracking System Overview
          </h2>
          <p className="text-slate-300 text-sm mb-3">This framework enables precise tracking of all contacts in HubSpot, capturing their origin, interaction direction, and campaign associations throughout their customer journey.</p>
          <p className="text-slate-300 text-sm">Example: If someone discovers Comstruct through a webinar they signed up for on the website, then <span className="text-slate-100">Website</span> is the Contact Source, <span className="text-slate-100">Inbound</span> is the Source Direction, and <span className="text-slate-100">webinar-XXX</span> is the Campaign.</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Properties */}
          <div className="space-y-6">
            <div className="bg-slate-800/70 backdrop-blur-sm p-5 rounded-lg border border-slate-700">
              <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center">
                <Tag className="mr-2 p-1 bg-slate-700 rounded-full" size={24} /> 
                Key HubSpot Properties
              </h2>
              
              <div className="space-y-5">
                {/* Contact Source */}
                <div className="bg-slate-900/60 p-4 rounded-lg border-l-2 border-slate-500">
                  <div className="flex items-center">
                    <Globe className="mr-2 text-slate-400" size={20} />
                    <h3 className="font-semibold text-slate-200">Contact Source</h3>
                  </div>
                  <p className="text-slate-300 mt-2 text-sm">First-touch source of a contact - describes how the contact initially discovered or was introduced to your company.</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="bg-slate-800 p-2 rounded text-xs text-slate-300">
                      <span className="text-slate-200 font-medium">Website</span> - Found via website
                    </div>
                    <div className="bg-slate-800 p-2 rounded text-xs text-slate-300">
                      <span className="text-slate-200 font-medium">Referral</span> - Referred by another
                    </div>
                    <div className="bg-slate-800 p-2 rounded text-xs text-slate-300">
                      <span className="text-slate-200 font-medium">Fair</span> - Met at an event
                    </div>
                    <div className="bg-slate-800 p-2 rounded text-xs text-slate-300">
                      <span className="text-slate-200 font-medium">Direct</span> - Direct outreach
                    </div>
                  </div>
                </div>
                
                {/* Source Direction */}
                <div className="bg-slate-900/60 p-4 rounded-lg border-l-2 border-slate-500">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <ArrowDownCircle className="mr-1 text-slate-400" size={18} />
                      <ArrowUpCircle className="mr-2 text-slate-400" size={18} />
                    </div>
                    <h3 className="font-semibold text-slate-200">Source Direction</h3>
                  </div>
                  <p className="text-slate-300 mt-2 text-sm">Indicates whether the contact proactively discovered your company or was passively contacted by your team.</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="bg-slate-800 p-3 rounded">
                      <div className="flex items-center">
                        <ArrowDownCircle className="mr-2 text-slate-400" size={16} />
                        <span className="text-slate-200 font-medium">Inbound</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2">Contact proactively discovered and engaged with your company</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded">
                      <div className="flex items-center">
                        <ArrowUpCircle className="mr-2 text-slate-400" size={16} />
                        <span className="text-slate-200 font-medium">Outbound</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2">Your team identified and reached out to the contact</p>
                    </div>
                  </div>
                </div>
                
                {/* Campaign */}
                <div className="bg-slate-900/60 p-4 rounded-lg border-l-2 border-slate-500">
                  <div className="flex items-center">
                    <Navigation className="mr-2 text-slate-400" size={20} />
                    <h3 className="font-semibold text-slate-200">Campaign</h3>
                  </div>
                  <p className="text-slate-300 mt-2 text-sm">Tracks meaningful interactions throughout the contact's lifespan, regardless of when they occurred (first, mid, or last touch).</p>
                  <div className="mt-3">
                    <p className="text-xs text-slate-300 italic">A "meaningful" interaction is defined as a substantial engagement, such as:</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center text-xs text-slate-300">
                        <CheckCircle2 className="mr-1 text-slate-400" size={12} />
                        Meeting at a fair or conference
                      </li>
                      <li className="flex items-center text-xs text-slate-300">
                        <CheckCircle2 className="mr-1 text-slate-400" size={12} />
                        Participation in a webinar
                      </li>
                      <li className="flex items-center text-xs text-slate-300">
                        <CheckCircle2 className="mr-1 text-slate-400" size={12} />
                        Referral from a partner
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Examples & Rules */}
          <div className="space-y-6">
            {/* Naming Convention */}
            <div className="bg-slate-800/70 backdrop-blur-sm p-5 rounded-lg border border-slate-700">
              <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center">
                <MessageSquare className="mr-2 p-1 bg-slate-700 rounded-full" size={24} /> 
                Campaign Naming Convention
              </h2>
              
              <div className="space-y-3">
                <p className="text-slate-300 text-sm">Follow this structured format for all campaign names:</p>
                <div className="bg-slate-900/60 p-3 rounded-lg">
                  <p className="font-mono text-sm text-slate-200">
                    <span className="text-slate-400">[event-type]</span>-<span className="text-slate-400">[description]</span>-<span className="text-slate-400">[year]</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-2 italic">Example: fair-cs24 (Construction Summit 2024)</p>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-slate-300 mb-2">Always include the year for event-based campaigns.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div className="bg-slate-900/60 p-3 rounded">
                      <div className="text-xs font-medium text-slate-400">Example 1</div>
                      <div className="text-sm mt-1 font-mono">webinar-holcim</div>
                      <div className="text-xs mt-1 text-slate-400">Holcim webinar attendees</div>
                    </div>
                    
                    <div className="bg-slate-900/60 p-3 rounded">
                      <div className="text-xs font-medium text-slate-400">Example 2</div>
                      <div className="text-sm mt-1 font-mono">dinner-oktoberfest24</div>
                      <div className="text-xs mt-1 text-slate-400">Oktoberfest dinner event 2024</div>
                    </div>
                    
                    <div className="bg-slate-900/60 p-3 rounded">
                      <div className="text-xs font-medium text-slate-400">Example 3</div>
                      <div className="text-sm mt-1 font-mono">fair-cs24</div>
                      <div className="text-xs mt-1 text-slate-400">Construction Summit 2024</div>
                    </div>
                    
                    <div className="bg-slate-900/60 p-3 rounded">
                      <div className="text-xs font-medium text-slate-400">Example 4</div>
                      <div className="text-sm mt-1 font-mono">referral-advisory</div>
                      <div className="text-xs mt-1 text-slate-400">Advisory board referrals</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Supplier Example */}
            <div className="bg-slate-800/70 backdrop-blur-sm p-5 rounded-lg border border-slate-700">
              <h2 className="text-lg font-bold text-slate-200 mb-3 flex items-center">
                <Users className="mr-2 p-1 bg-slate-700 rounded-full" size={24} /> 
                Supplier Leads Tracking - Case Study
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Accountable: Jonas Beckort</span>
                  <span>Responsible: Sales Team</span>
                </div>
                
                <div className="bg-slate-900/60 p-4 rounded-lg mt-3">
                  <p className="text-sm text-slate-300 mb-3">When a supplier refers a lead that isn't already in your database:</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Globe className="mr-2 text-slate-400" size={16} />
                      <span className="text-sm">Contact Source: <span className="text-slate-200 font-medium">Referral</span></span>
                    </div>
                    <div className="flex items-center">
                      <ArrowDownCircle className="mr-2 text-slate-400" size={16} />
                      <span className="text-sm">Source Direction: <span className="text-slate-200 font-medium">Inbound</span></span>
                    </div>
                    <div className="flex items-center">
                      <Navigation className="mr-2 text-slate-400" size={16} />
                      <span className="text-sm">Campaign: <span className="text-slate-200 font-medium">supplier-XXX</span></span>
                      <span className="text-xs ml-2 text-slate-400">(replace XXX with supplier name)</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-300">
                    <p>Example: <span className="font-mono">supplier-acme</span> for leads from Acme Construction</p>
                  </div>
                </div>
                
                <div className="bg-slate-900/80 p-4 rounded-lg border-l-2 border-slate-500 mt-2">
                  <div className="flex items-start">
                    <AlertCircle className="text-slate-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-slate-200 text-xs font-medium">Important Note:</p>
                      <p className="text-slate-300 text-xs mt-1">Since the campaign property is at the contact level, but we only want to indicate a company once if they came to us through a supplier, please only mark the main contact you're engaging with as a result of the supplier lead.</p>
                      <p className="text-slate-300 text-xs mt-2 italic">In other words, only one person per company should be tagged with the supplier-XXX campaign.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Internal Documentation • Comstruct CRM Strategy • Last Updated: March 2025
        </div>
      </div>
    </div>
  );
};

export default HubSpotTrackingVisual;