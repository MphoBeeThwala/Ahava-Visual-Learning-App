import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Globe, Star, MapPin, Clock, Zap, Shield, Wifi, Headphones, Calendar, Users } from 'lucide-react'
import { experiences } from '../data/experiences'
import ExperienceCard from '../components/ExperienceCard'

const tourismCategories = [
  { id: 'safari', label: '🦁 Safari & Wildlife', icon: '🦁' },
  { id: 'culture', label: '🏛️ Culture & Heritage', icon: '🏛️' },
  { id: 'adventure', label: '🏔️ Adventure', icon: '🏔️' },
  { id: 'wine', label: '🍷 Wine & Food', icon: '🍷' }
]

const saExperiences = [
  { id: 101, title: "Kruger National Park Safari", category: "safari", subcategory: "wildlife", country: "South Africa", region: "Mpumalanga", grade: "All Ages", duration: 2400, rating: 4.9, reviews: 1240, image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80", premium: true, vr: true, offline: true, price: 450, description: "The ultimate Big Five safari experience. Spot lions, elephants, rhinos, leopards, and buffalo across 19,485 km² of African bush.", learning: ["Big Five ecology", "Conservation efforts", "Anti-poaching initiatives", "Ecosystem balance"] },
  { id: 102, title: "Table Mountain Aerial Tour", category: "adventure", subcategory: "mountains", country: "South Africa", region: "Western Cape", grade: "6-12", duration: 1200, rating: 4.8, reviews: 890, image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80", premium: false, vr: true, offline: true, price: 0, description: "360° aerial tour of Cape Town's iconic flat-topped mountain. Explore the unique fynbos biome and the city's dramatic coastline.", learning: ["Fynbos biodiversity", "Geological formation", "Cape Floral Kingdom", "Climate patterns"] },
  { id: 103, title: "Robben Island: Nelson Mandela's Prison", category: "culture", subcategory: "monuments", country: "South Africa", region: "Western Cape", grade: "7-12", duration: 1800, rating: 4.9, reviews: 2100, image: "https://images.unsplash.com/photo-1579606038888-82c0f02f7f89?w=600&q=80", premium: false, vr: true, offline: true, price: 0, description: "Walk through the prison where Nelson Mandela spent 18 years. Hear stories from former political prisoners and understand the struggle for freedom.", learning: ["Apartheid history", "Reconciliation", "Human rights", "Leadership & resilience"] },
  { id: 104, title: "Cape Winelands Tour", category: "wine", subcategory: "food", country: "South Africa", region: "Western Cape", grade: "Adults", duration: 1500, rating: 4.7, reviews: 567, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80", premium: true, vr: true, offline: false, price: 320, description: "Journey through Stellenbosch, Franschhoek, and Paarl vineyards. Learn about wine-making from grape to glass in world-class estates.", learning: ["Viticulture science", "Wine chemistry", "Colonial history", "Agricultural economics"] },
  { id: 105, title: "Shark Cage Diving Gansbaai", category: "adventure", subcategory: "marine", country: "South Africa", region: "Western Cape", grade: "10-12", duration: 900, rating: 4.8, reviews: 432, image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=600&q=80", premium: true, vr: true, offline: false, price: 280, description: "Come face-to-face with great white sharks in their natural habitat. Understand shark behavior, marine conservation, and ocean ecosystems.", learning: ["Shark biology", "Marine conservation", "Ocean ecosystems", "Dive safety"] },
  { id: 106, title: "Soweto Township Experience", category: "culture", subcategory: "township", country: "South Africa", region: "Gauteng", grade: "All Ages", duration: 1200, rating: 4.7, reviews: 678, image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80", premium: false, vr: true, offline: true, price: 0, description: "Explore the vibrant streets of Soweto — home to 1.3 million people. Visit Vilakazi Street, Hector Pieterson Memorial, and local shebeens.", learning: ["Urban development", "Apartheid legacy", "Community resilience", "South African culture"] },
  { id: 107, title: "Blyde River Canyon", category: "adventure", subcategory: "canyons", country: "South Africa", region: "Mpumalanga", grade: "6-12", duration: 1100, rating: 4.8, reviews: 345, image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=600&q=80", premium: false, vr: true, offline: true, price: 0, description: "The third-largest canyon on Earth. Marvel at God's Window, Bourke's Luck Potholes, and the Three Rondavels.", learning: ["Erosion geology", "Biodiversity", "Water cycle", "Indigenous heritage"] },
  { id: 108, title: "Addo Elephant National Park", category: "safari", subcategory: "wildlife", country: "South Africa", region: "Eastern Cape", grade: "All Ages", duration: 1800, rating: 4.7, reviews: 456, image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&q=80", premium: false, vr: true, offline: true, price: 0, description: "Home to over 600 elephants and the Big Seven (including whales and sharks). A conservation success story.", learning: ["Elephant behavior", "Conservation success", "Marine-terrestrial link", "Ecosystem restoration"] },
  { id: 109, title: "Drakensberg Mountain Hike", category: "adventure", subcategory: "mountains", country: "South Africa", region: "KwaZulu-Natal", grade: "8-12", duration: 2000, rating: 4.9, reviews: 234, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", premium: true, vr: true, offline: false, price: 180, description: "Hike the 'Dragon Mountains' — a UNESCO World Heritage Site. See ancient San rock art and dramatic basalt peaks.", learning: ["San rock art", "Geology", "High-altitude ecology", "UNESCO heritage"] },
  { id: 110, title: "Garden Route Road Trip", category: "adventure", subcategory: "coastal", country: "South Africa", region: "Western/Eastern Cape", grade: "All Ages", duration: 3600, rating: 4.8, reviews: 789, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", premium: true, vr: true, offline: false, price: 520, description: "300km of coastal paradise from Mossel Bay to Storms River. Forests, lagoons, beaches, and the world's highest bungee bridge.", learning: ["Coastal ecology", "Indigenous forests", "Tourism economics", "Marine biology"] }
]

const pricingPlans = [
  { name: 'Student', price: 'R0', period: '/month', desc: 'Always free', features: ['All core experiences', '360° photo & video', 'Basic quizzes', 'Offline downloads (5GB)', 'Standard quality'], cta: 'Get Started', featured: false },
  { name: 'Explorer', price: 'R180', period: '/month', desc: 'For passionate travelers', features: ['Everything in Student', 'Premium 3D experiences', '4K quality streaming', 'Ad-free experience', 'Offline unlimited', 'Trip planner tool'], cta: 'Subscribe', featured: true },
  { name: 'Voyager', price: 'R360', period: '/month', desc: 'For the ultimate explorer', features: ['Everything in Explorer', 'Live events access', 'Expert-guided tours', 'Walkable 3D scenes', 'Spatial audio', 'Priority support'], cta: 'Subscribe', featured: false }
]

function Tourism() {
  const [activeTab, setActiveTab] = useState('safari')
  const [filtered, setFiltered] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const results = saExperiences.filter(exp => exp.category === activeTab)
    setFiltered(results)
  }, [activeTab])

  const premium = saExperiences.filter(e => e.premium)

  const formatPrice = (price) => {
    if (price === 0) return 'Free'
    return `R${price.toLocaleString('en-ZA')}`
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur rounded-full text-sm font-medium mb-6">🇿🇦 South Africa</span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">Explore Before You Go.<br /><span className="text-amber-400">Travel Deeper.</span></h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10">Premium immersive experiences across South Africa. Your subscription funds free education for students nationwide.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => document.getElementById('experiences').scrollIntoView({behavior:'smooth'})} className="btn btn-primary text-lg px-8 py-4">🦁 Start Exploring</button>
            <button onClick={() => document.getElementById('pricing').scrollIntoView({behavior:'smooth'})} className="btn btn-outline text-white border-white/40 hover:bg-white/10 text-lg px-8 py-4">View Pricing</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{val: '10+', label: 'SA Destinations'}, {val: '50+', label: 'Experiences'}, {val: '11', label: 'Official Languages'}, {val: '100%', label: 'Funds Education'}].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-emerald-800">{s.val}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Tabs + Experiences */}
      <section id="experiences" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="section-header">
          <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">South African Experiences</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-4">Discover Mzansi</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">From Kruger to Cape Town, experience South Africa's wonders before you book your flight.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tourismCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all border-2 ${
                activeTab === cat.id
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-lg'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-emerald-400'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Globe className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No experiences found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(exp => (
              <div key={exp.id} className="card group cursor-pointer" onClick={() => navigate(`/experience/${exp.id}`)}>
                <div className="relative h-56 overflow-hidden">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  {exp.premium && <span className="absolute top-3 right-3 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">PREMIUM</span>}
                  {exp.price === 0 && <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">FREE</span>}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {exp.region}
                    <span className="mx-1">•</span>
                    <Clock className="w-3.5 h-3.5" /> {Math.floor(exp.duration/60)} min
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{exp.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{exp.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-semibold">{exp.rating}</span>
                      <span className="text-xs text-gray-400">({exp.reviews})</span>
                    </div>
                    <span className="text-emerald-700 font-bold">{formatPrice(exp.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Premium Experiences */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Premium</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-4">Exclusive Experiences</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">High-fidelity 3D scenes, expert guides, and live events across South Africa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premium.map(exp => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="section-header">
            <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-4">Choose Your Journey</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Every subscription directly supports free access for students in underserved South African communities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map(plan => (
              <div key={plan.name} className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${plan.featured ? 'border-amber-400 shadow-lg scale-105' : 'border-gray-200'}`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-slate-800">{plan.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{plan.desc}</p>
                <div className="mt-6 mb-8">
                  <span className="text-5xl font-extrabold text-slate-800">{plan.price}</span>
                  <span className="text-gray-400 text-lg">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-emerald-500 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 rounded-xl font-semibold transition-all ${plan.featured ? 'bg-emerald-800 text-white hover:bg-emerald-900' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SA Highlights */}
      <section className="py-20 px-6 bg-emerald-900 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-6">Why South Africa?</h2>
            <div className="space-y-6">
              {[
                { icon: '🦁', title: 'Big Five Safaris', desc: 'The best wildlife viewing on Earth, from Kruger to Addo.' },
                { icon: '🏔️', title: 'Diverse Landscapes', desc: 'Mountains, beaches, deserts, forests — all in one country.' },
                { icon: '🏛️', title: 'Rich Heritage', desc: '11 official languages, UNESCO sites, and vibrant townships.' },
                { icon: '💚', title: 'Conservation Leader', desc: 'Home to groundbreaking wildlife and marine conservation.' }
              ].map(item => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-emerald-200 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80', 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80', 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&q=80', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80'].map((src, i) => (
              <img key={i} src={src} alt="SA" className="rounded-2xl h-40 w-full object-cover" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tourism
